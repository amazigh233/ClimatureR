/* ============================================================
   Climature — Dak-paneel configurator ("Plan je dak")
   Plaats panelen op een dakraster en zie live opwek, besparing,
   CO2-winst en dakbenutting. Mock realtime: alles in JS berekend.
   ============================================================ */
(function () {
  'use strict';

  var root = document.querySelector('[data-roof]');
  if (!root) return;

  var svg  = root.querySelector('[data-roof-svg]');
  var grid = root.querySelector('[data-roof-grid]');
  if (!svg || !grid) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Rekenmodel (mock, realistisch) ---- */
  var COLS = 6;
  var ROWS = 4;
  var TOTAL = COLS * ROWS;
  var KWH_PER_PANEL_SOUTH = 405;   // ~430 Wp paneel, optimale zuid-ligging
  var PRIJS_PER_KWH = 0.28;        // EUR per kWh
  var CO2_PER_KWH = 0.27;          // kg CO2 per kWh (NL gridmix)
  var KG_CO2_PER_BOOM = 21;        // kg CO2 dat 1 boom/jaar opneemt

  var ORIENT_FACTOR = {
    zuid:      1.00,
    'oost-west': 0.88,
    oost:      0.82,
    west:      0.82
  };

  /* ---- Dakvlak (geschoven parallellogram = perspectief dakvlak) ---- */
  var TL = { x: 250, y: 150 };
  var TR = { x: 660, y: 150 };
  var BL = { x: 190, y: 360 };
  var BR = { x: 600, y: 360 };

  // bilineaire interpolatie over het dakvlak
  function pointAt(u, v) {
    var top = { x: TL.x + (TR.x - TL.x) * u, y: TL.y + (TR.y - TL.y) * u };
    var bot = { x: BL.x + (BR.x - BL.x) * u, y: BL.y + (BR.y - BL.y) * u };
    return { x: top.x + (bot.x - top.x) * v, y: top.y + (bot.y - top.y) * v };
  }

  /* ---- State ---- */
  var active = new Set();
  var orient = 'zuid';

  var cells = []; // { el, index }

  /* ---- Bouw het raster ---- */
  var PAD = 0.06; // marge binnen elke cel zodat panelen lucht hebben
  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      var index = r * COLS + c;
      var u0 = (c + PAD) / COLS, u1 = (c + 1 - PAD) / COLS;
      var v0 = (r + PAD) / ROWS, v1 = (r + 1 - PAD) / ROWS;
      var p1 = pointAt(u0, v0), p2 = pointAt(u1, v0),
          p3 = pointAt(u1, v1), p4 = pointAt(u0, v1);

      var poly = document.createElementNS(SVGNS, 'polygon');
      poly.setAttribute('points',
        p1.x.toFixed(1) + ',' + p1.y.toFixed(1) + ' ' +
        p2.x.toFixed(1) + ',' + p2.y.toFixed(1) + ' ' +
        p3.x.toFixed(1) + ',' + p3.y.toFixed(1) + ' ' +
        p4.x.toFixed(1) + ',' + p4.y.toFixed(1));
      poly.setAttribute('class', 'roof-cell');
      poly.setAttribute('data-cell', index);
      poly.setAttribute('tabindex', '0');
      poly.setAttribute('role', 'button');
      poly.setAttribute('aria-pressed', 'false');
      poly.setAttribute('aria-label', 'Paneelplek ' + (index + 1) + ' van ' + TOTAL);
      grid.appendChild(poly);
      cells.push({ el: poly, index: index });
    }
  }

  function setCell(index, on, animate) {
    var cell = cells[index];
    if (!cell) return;
    if (on) {
      if (active.has(index)) return;
      active.add(index);
      cell.el.classList.add('is-on');
      cell.el.setAttribute('aria-pressed', 'true');
      if (animate && !reduceMotion) {
        cell.el.classList.remove('pop');
        // force reflow zodat de pop-animatie opnieuw start
        void cell.el.getBBox();
        cell.el.classList.add('pop');
      }
    } else {
      if (!active.has(index)) return;
      active.delete(index);
      cell.el.classList.remove('is-on', 'pop');
      cell.el.setAttribute('aria-pressed', 'false');
    }
  }

  /* ---- Schilderen met de pointer (klik + sleep) ---- */
  var painting = false;
  var paintValue = true;
  var stroke = new Set(); // cellen al geraakt in deze sleepbeweging

  function cellFromEvent(e) {
    var t = document.elementFromPoint(e.clientX, e.clientY);
    return t && t.closest ? t.closest('[data-cell]') : null;
  }

  function applyTo(el) {
    if (!el) return;
    var idx = parseInt(el.getAttribute('data-cell'), 10);
    if (stroke.has(idx)) return;
    stroke.add(idx);
    setCell(idx, paintValue, true);
    update();
  }

  svg.addEventListener('pointerdown', function (e) {
    var el = e.target.closest && e.target.closest('[data-cell]');
    if (!el) return;
    e.preventDefault();
    var idx = parseInt(el.getAttribute('data-cell'), 10);
    painting = true;
    paintValue = !active.has(idx); // togglen op basis van de eerste cel
    stroke.clear();
    applyTo(el);
  });

  window.addEventListener('pointermove', function (e) {
    if (!painting) return;
    applyTo(cellFromEvent(e));
  });

  window.addEventListener('pointerup', function () {
    painting = false;
    stroke.clear();
    hideHint();
  });

  // toetsenbord: Enter/Spatie togglet een cel
  grid.addEventListener('keydown', function (e) {
    var el = e.target.closest && e.target.closest('[data-cell]');
    if (!el) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      var idx = parseInt(el.getAttribute('data-cell'), 10);
      setCell(idx, !active.has(idx), true);
      update();
      hideHint();
    }
  });

  /* ---- Knoppen: oriëntatie + vullen/wissen ---- */
  var orientBtns = root.querySelectorAll('[data-orient]');
  orientBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      orient = btn.getAttribute('data-orient');
      orientBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      update();
    });
  });

  var fillBtn = root.querySelector('[data-action="fill"]');
  var clearBtn = root.querySelector('[data-action="clear"]');

  if (fillBtn) fillBtn.addEventListener('click', function () {
    for (var i = 0; i < TOTAL; i++) setCell(i, true, true);
    hideHint();
    update();
  });

  if (clearBtn) clearBtn.addEventListener('click', function () {
    for (var i = 0; i < TOTAL; i++) setCell(i, false, false);
    update();
  });

  /* ---- Hint verbergen na eerste interactie ---- */
  var hint = root.querySelector('[data-hint]');
  var hintHidden = false;
  function hideHint() {
    if (hintHidden || !hint) return;
    hintHidden = true;
    hint.classList.add('is-hidden');
  }

  /* ---- Geanimeerde tellers (zelfde easing als de energiescan) ---- */
  var raf = {};       // lopende animatie per element-id
  var shown = {};     // laatst getoonde waarde per id

  function animateCount(el, target, duration, fmt) {
    if (!el) return;
    var id = el.getAttribute('data-out');
    if (raf[id]) cancelAnimationFrame(raf[id]);
    var from = shown[id] || 0;
    if (reduceMotion || duration === 0) {
      shown[id] = target;
      el.textContent = fmt(target);
      return;
    }
    var start = performance.now();
    (function tick(now) {
      var t = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      var val = from + (target - from) * ease;
      shown[id] = val;
      el.textContent = fmt(val);
      if (t < 1) raf[id] = requestAnimationFrame(tick);
      else { shown[id] = target; el.textContent = fmt(target); }
    })(start);
  }

  function nl(n) { return Math.round(n).toLocaleString('nl-NL'); }

  var out = {};
  root.querySelectorAll('[data-out]').forEach(function (el) {
    out[el.getAttribute('data-out')] = el;
  });

  var benuttingBar = root.querySelector('[data-benutting-bar]');

  /* ---- Herbereken + render ---- */
  function update() {
    var n = active.size;
    var factor = ORIENT_FACTOR[orient] || 1;
    var perPanel = Math.round(KWH_PER_PANEL_SOUTH * factor);
    var kwh = n * perPanel;
    var besparing = kwh * PRIJS_PER_KWH;
    var co2 = kwh * CO2_PER_KWH;
    var bomen = co2 / KG_CO2_PER_BOOM;
    var benutting = Math.round((n / TOTAL) * 100);

    animateCount(out.panelen, n, 250, nl);
    animateCount(out.opwek, kwh, 650, nl);
    animateCount(out.perpaneel, n ? perPanel : 0, 400, nl);
    animateCount(out.besparing, besparing, 650, nl);
    animateCount(out.co2, co2, 650, nl);
    animateCount(out.bomen, bomen, 650, nl);

    if (out.benutting) out.benutting.textContent = benutting;
    if (benuttingBar) benuttingBar.style.width = benutting + '%';
  }

  // startwaarden direct tonen (zonder animatie) — leeg dak
  update();
})();
