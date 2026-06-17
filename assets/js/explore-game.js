/* ============================================================
   Climature — Verken-game ("Verken Climature")
   Loop met W A S D (of pijltjes) vrij rond door een klein
   Climature-wereldje. Bovenaanzicht, camera volgt de speler,
   ontdek-momenten bij huis, panelen, batterij en zon.
   Vanilla canvas, geen libs.
   ============================================================ */
(function () {
  'use strict';

  var root = document.querySelector('[data-game]');
  if (!root) return;

  var canvas = root.querySelector('[data-game-canvas]');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var hintEl  = root.querySelector('[data-hint]');
  var poiEl   = root.querySelector('[data-poi-label]');
  var poiTtl  = root.querySelector('[data-poi-title]');
  var poiTxt  = root.querySelector('[data-poi-text]');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Wereld ---------- */
  var WORLD = { w: 1600, h: 1100 };
  var ASPECT = 1.6; // canvas breedte / hoogte

  /* ---------- Decor ---------- */
  var TREES = [
    { x: 240, y: 240 }, { x: 1340, y: 250 }, { x: 300, y: 840 },
    { x: 1280, y: 860 }, { x: 1460, y: 520 }, { x: 170, y: 580 },
    { x: 980, y: 900 }, { x: 600, y: 880 }, { x: 1400, y: 760 },
    { x: 150, y: 360 }, { x: 1180, y: 360 }, { x: 470, y: 520 }
  ].map(function (t, i) { t.seed = i * 1.7; return t; });

  var HOUSE = { x: 800, y: 500, w: 240, h: 160 };
  var PANELS = { x: 800, y: 392, w: 210, h: 70 };
  var BATTERY = { x: 1060, y: 560, w: 70, h: 86 };
  var SUN = { x: 430, y: 300, r: 58 };

  var POIS = [
    { x: HOUSE.x, y: HOUSE.y, r: 165,
      titel: 'Climature-huis',
      tekst: 'Hier komt alles samen: opwek, opslag en slim verbruik in één systeem.' },
    { x: PANELS.x, y: PANELS.y, r: 130,
      titel: 'Zonnepanelen',
      tekst: 'Overdag wek je hier je eigen stroom op — de basis van je systeem.' },
    { x: BATTERY.x, y: BATTERY.y, r: 120,
      titel: 'Thuisbatterij',
      tekst: 'Bewaart zonne-energie voor de avond en piekmomenten.' },
    { x: SUN.x, y: SUN.y, r: 130,
      titel: 'De zon',
      tekst: 'Gratis brandstof voor je hele woning. Speel ermee op "Speel met de zon".' }
  ];

  /* ---------- Vuurvliegjes ---------- */
  var FIREFLIES = [];
  for (var i = 0; i < 26; i++) {
    FIREFLIES.push({
      x: Math.random() * WORLD.w,
      y: Math.random() * WORLD.h,
      a: Math.random() * Math.PI * 2,
      spd: 8 + Math.random() * 14,
      ph: Math.random() * Math.PI * 2
    });
  }

  /* ---------- Speler ---------- */
  var player = { x: HOUSE.x, y: HOUSE.y + 220, vx: 0, vy: 0, r: 17, face: 1 };
  var MAX_SPEED = 250; // px/s

  /* ---------- Input ---------- */
  var keys = {};
  var pad = { up: false, down: false, left: false, right: false };
  var moved = false;

  var KEYMAP = {
    KeyW: 'up', ArrowUp: 'up',
    KeyS: 'down', ArrowDown: 'down',
    KeyA: 'left', ArrowLeft: 'left',
    KeyD: 'right', ArrowRight: 'right'
  };

  window.addEventListener('keydown', function (e) {
    var dir = KEYMAP[e.code];
    if (!dir) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    keys[dir] = true;
    e.preventDefault();
  });
  window.addEventListener('keyup', function (e) {
    var dir = KEYMAP[e.code];
    if (dir) keys[dir] = false;
  });
  window.addEventListener('blur', function () {
    keys = {}; pad = { up: false, down: false, left: false, right: false };
  });

  // d-pad (touch / klik)
  root.querySelectorAll('[data-dir]').forEach(function (btn) {
    var dir = btn.getAttribute('data-dir');
    var set = function (v) { return function (e) { e.preventDefault(); pad[dir] = v; }; };
    btn.addEventListener('pointerdown', set(true));
    btn.addEventListener('pointerup', set(false));
    btn.addEventListener('pointerleave', set(false));
    btn.addEventListener('pointercancel', set(false));
  });

  function inputVector() {
    var ix = (keys.right || pad.right ? 1 : 0) - (keys.left || pad.left ? 1 : 0);
    var iy = (keys.down || pad.down ? 1 : 0) - (keys.up || pad.up ? 1 : 0);
    if (ix && iy) { var inv = 1 / Math.sqrt(2); ix *= inv; iy *= inv; }
    return { ix: ix, iy: iy };
  }

  /* ---------- Canvas-maat ---------- */
  var viewW = 0, viewH = 0, dpr = 1;
  function resize() {
    var cssW = root.querySelector('.explore-stage').clientWidth;
    var cssH = Math.round(cssW / ASPECT);
    viewW = cssW; viewH = cssH;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------- Camera ---------- */
  var cam = { x: 0, y: 0 };
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function updateCamera() {
    cam.x = clamp(player.x - viewW / 2, 0, Math.max(0, WORLD.w - viewW));
    cam.y = clamp(player.y - viewH / 2, 0, Math.max(0, WORLD.h - viewH));
  }

  /* ---------- Botsing met huis ---------- */
  function blockedBy(rect, x, y) {
    var hw = rect.w / 2, hh = rect.h / 2;
    return x > rect.x - hw - player.r && x < rect.x + hw + player.r &&
           y > rect.y - hh - player.r && y < rect.y + hh + player.r;
  }

  /* ---------- Update ---------- */
  function update(dt, time) {
    var v = inputVector();
    var tx = v.ix * MAX_SPEED;
    var ty = v.iy * MAX_SPEED;
    var k = Math.min(1, dt * 12); // soepel versnellen/afremmen
    player.vx += (tx - player.vx) * k;
    player.vy += (ty - player.vy) * k;

    if (Math.abs(player.vx) > 4 || Math.abs(player.vy) > 4) moved = true;
    if (player.vx > 6) player.face = 1;
    else if (player.vx < -6) player.face = -1;

    var nx = player.x + player.vx * dt;
    var ny = player.y + player.vy * dt;

    // huis blokkeert (per as zodat je er langs glijdt)
    if (!blockedBy(HOUSE, nx, player.y)) player.x = nx; else player.vx = 0;
    if (!blockedBy(HOUSE, player.x, ny)) player.y = ny; else player.vy = 0;

    // wereldgrenzen
    player.x = clamp(player.x, player.r, WORLD.w - player.r);
    player.y = clamp(player.y, player.r, WORLD.h - player.r);

    updateCamera();
    updatePOI();

    if (moved && hintEl && !hintEl.classList.contains('is-hidden')) {
      hintEl.classList.add('is-hidden');
    }
  }

  /* ---------- Dichtstbijzijnde POI ---------- */
  var activePOI = null;
  function updatePOI() {
    var found = null, best = Infinity;
    for (var j = 0; j < POIS.length; j++) {
      var p = POIS[j];
      var dx = player.x - p.x, dy = player.y - p.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < p.r && d < best) { best = d; found = p; }
    }
    if (found !== activePOI) {
      activePOI = found;
      if (found && poiEl) {
        poiTtl.textContent = found.titel;
        poiTxt.textContent = found.tekst;
        poiEl.classList.add('is-visible');
      } else if (poiEl) {
        poiEl.classList.remove('is-visible');
      }
    }
  }

  /* ---------- Tekenhelpers ---------- */
  function sx(x) { return x - cam.x; }
  function sy(y) { return y - cam.y; }

  function drawGround(time) {
    var g = ctx.createLinearGradient(0, 0, 0, viewH);
    g.addColorStop(0, '#1F6B3A');
    g.addColorStop(1, '#123C24');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, viewW, viewH);

    // zachte lichtere plekken (vast geseed)
    ctx.save();
    for (var i = 0; i < 7; i++) {
      var px = ((i * 263) % WORLD.w);
      var py = ((i * 421) % WORLD.h);
      var rad = 120 + (i % 3) * 40;
      var rg = ctx.createRadialGradient(sx(px), sy(py), 0, sx(px), sy(py), rad);
      rg.addColorStop(0, 'rgba(182,215,42,0.10)');
      rg.addColorStop(1, 'rgba(182,215,42,0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(sx(px), sy(py), rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // graspolletjes
    ctx.strokeStyle = 'rgba(11,47,26,0.30)';
    ctx.lineWidth = 2;
    for (var t = 0; t < 90; t++) {
      var gx = (t * 137) % WORLD.w;
      var gy = (t * 269) % WORLD.h;
      var scrX = sx(gx), scrY = sy(gy);
      if (scrX < -10 || scrX > viewW + 10 || scrY < -10 || scrY > viewH + 10) continue;
      ctx.beginPath();
      ctx.moveTo(scrX, scrY);
      ctx.lineTo(scrX - 3, scrY - 6);
      ctx.moveTo(scrX, scrY);
      ctx.lineTo(scrX + 3, scrY - 6);
      ctx.stroke();
    }
  }

  function drawSun(time) {
    var x = sx(SUN.x), y = sy(SUN.y);
    var pulse = reduce ? 1 : 1 + Math.sin(time / 600) * 0.06;
    var glow = ctx.createRadialGradient(x, y, 0, x, y, SUN.r * 2.6 * pulse);
    glow.addColorStop(0, 'rgba(215,169,0,0.55)');
    glow.addColorStop(1, 'rgba(215,169,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, SUN.r * 2.6 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // stralen
    if (!reduce) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time / 4000);
      ctx.strokeStyle = '#D7A900';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      for (var r = 0; r < 12; r++) {
        var a = (r / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (SUN.r + 12), Math.sin(a) * (SUN.r + 12));
        ctx.lineTo(Math.cos(a) * (SUN.r + 26), Math.sin(a) * (SUN.r + 26));
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.fillStyle = '#D7A900';
    ctx.beginPath();
    ctx.arc(x, y, SUN.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,233,150,0.5)';
    ctx.beginPath();
    ctx.arc(x - SUN.r * 0.25, y - SUN.r * 0.25, SUN.r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawTree(t, time) {
    var x = sx(t.x), y = sy(t.y);
    if (x < -60 || x > viewW + 60 || y < -80 || y > viewH + 60) return;
    var sway = reduce ? 0 : Math.sin(time / 700 + t.seed) * 4;

    // schaduw
    ctx.fillStyle = 'rgba(11,47,26,0.28)';
    ctx.beginPath();
    ctx.ellipse(x, y + 22, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // stam
    ctx.fillStyle = '#0B2F1A';
    ctx.fillRect(x - 4, y - 6, 8, 28);

    // kroon (drie blobs zoals de zon-sandbox boom)
    ctx.fillStyle = '#1F6B3A';
    ctx.beginPath(); ctx.arc(x - 13 + sway, y + 2, 15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 13 + sway, y + 2, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#B6D72A';
    ctx.beginPath(); ctx.arc(x + sway, y - 14, 21, 0, Math.PI * 2); ctx.fill();
  }

  function drawPanels() {
    var x = sx(PANELS.x), y = sy(PANELS.y);
    var w = PANELS.w, h = PANELS.h;
    ctx.fillStyle = '#0B2F1A';
    ctx.fillRect(x - w / 2 - 4, y - h / 2 - 4, w + 8, h + 8);
    var cols = 4, rows = 2, cw = w / cols, ch = h / rows;
    for (var c = 0; c < cols; c++) {
      for (var r = 0; r < rows; r++) {
        ctx.fillStyle = '#123C24';
        ctx.fillRect(x - w / 2 + c * cw + 2, y - h / 2 + r * ch + 2, cw - 4, ch - 4);
        ctx.strokeStyle = 'rgba(182,215,42,0.55)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x - w / 2 + c * cw + 2, y - h / 2 + r * ch + 2, cw - 4, ch - 4);
      }
    }
  }

  function drawHouse() {
    var x = sx(HOUSE.x), y = sy(HOUSE.y);
    var w = HOUSE.w, h = HOUSE.h;

    ctx.fillStyle = 'rgba(11,47,26,0.30)';
    ctx.beginPath();
    ctx.ellipse(x, y + h / 2 + 6, w / 2, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // muur
    ctx.fillStyle = '#FAFBF7';
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
    ctx.strokeStyle = 'rgba(16,32,23,0.18)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - w / 2, y - h / 2, w, h);

    // dak (band bovenaan)
    ctx.fillStyle = '#123C24';
    ctx.fillRect(x - w / 2 - 8, y - h / 2 - 18, w + 16, 22);

    // deur + ramen
    ctx.fillStyle = '#123C24';
    ctx.fillRect(x - 18, y + h / 2 - 60, 36, 60);
    ctx.fillStyle = '#B6D72A';
    ctx.fillRect(x - w / 2 + 24, y - h / 2 + 28, 44, 34);
    ctx.fillRect(x + w / 2 - 68, y - h / 2 + 28, 44, 34);
  }

  function drawBattery() {
    var x = sx(BATTERY.x), y = sy(BATTERY.y);
    var w = BATTERY.w, h = BATTERY.h;
    ctx.fillStyle = 'rgba(11,47,26,0.30)';
    ctx.beginPath();
    ctx.ellipse(x, y + h / 2 + 4, w / 2, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0B2F1A';
    ctx.strokeStyle = 'rgba(182,215,42,0.7)';
    ctx.lineWidth = 2;
    roundRect(x - w / 2, y - h / 2, w, h, 10);
    ctx.fill(); ctx.stroke();
    // bliksem
    ctx.fillStyle = '#B6D72A';
    ctx.beginPath();
    ctx.moveTo(x + 4, y - 22);
    ctx.lineTo(x - 12, y + 4);
    ctx.lineTo(x - 1, y + 4);
    ctx.lineTo(x - 5, y + 24);
    ctx.lineTo(x + 13, y - 6);
    ctx.lineTo(x + 1, y - 6);
    ctx.closePath();
    ctx.fill();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawPOIRing(time) {
    if (!activePOI) return;
    var x = sx(activePOI.x), y = sy(activePOI.y);
    var pulse = reduce ? 0 : (Math.sin(time / 400) + 1) * 6;
    ctx.strokeStyle = 'rgba(182,215,42,0.55)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.arc(x, y, activePOI.r * 0.6 + pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawFireflies(time) {
    for (var i = 0; i < FIREFLIES.length; i++) {
      var f = FIREFLIES[i];
      var x = sx(f.x), y = sy(f.y);
      if (x < -20 || x > viewW + 20 || y < -20 || y > viewH + 20) continue;
      var tw = (Math.sin(time / 300 + f.ph) + 1) / 2;
      ctx.fillStyle = 'rgba(182,215,42,' + (0.25 + tw * 0.55) + ')';
      ctx.beginPath();
      ctx.arc(x, y, 2.5 + tw * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function moveFireflies(dt, time) {
    if (reduce) return;
    for (var i = 0; i < FIREFLIES.length; i++) {
      var f = FIREFLIES[i];
      f.a += (Math.random() - 0.5) * dt * 2;
      f.x += Math.cos(f.a) * f.spd * dt;
      f.y += Math.sin(f.a) * f.spd * dt;
      if (f.x < 0) f.x += WORLD.w; if (f.x > WORLD.w) f.x -= WORLD.w;
      if (f.y < 0) f.y += WORLD.h; if (f.y > WORLD.h) f.y -= WORLD.h;
    }
  }

  function drawPlayer(time) {
    var x = sx(player.x), y = sy(player.y);
    var speed = Math.hypot(player.vx, player.vy);
    var bob = (reduce || speed < 10) ? 0 : Math.sin(time / 90) * 3;

    // schaduw
    ctx.fillStyle = 'rgba(11,47,26,0.35)';
    ctx.beginPath();
    ctx.ellipse(x, y + player.r + 4, player.r * 0.9, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    var cy = y - bob;
    // lichaam
    ctx.fillStyle = '#1F6B3A';
    ctx.strokeStyle = '#B6D72A';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, cy, player.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // gezichtje
    ctx.fillStyle = '#FAFBF7';
    ctx.beginPath();
    ctx.arc(x + player.face * 4, cy - 2, player.r * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#102017';
    ctx.beginPath();
    ctx.arc(x + player.face * 6, cy - 3, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---------- Render ---------- */
  function render(time) {
    ctx.clearRect(0, 0, viewW, viewH);
    drawGround(time);
    drawSun(time);

    // decor op y-volgorde voor diepte
    var items = TREES.map(function (t) { return { y: t.y, fn: function () { drawTree(t, time); } }; });
    items.push({ y: PANELS.y, fn: drawPanels });
    items.push({ y: HOUSE.y, fn: drawHouse });
    items.push({ y: BATTERY.y, fn: drawBattery });
    items.push({ y: player.y, fn: function () { drawPlayer(time); } });
    items.sort(function (a, b) { return a.y - b.y; });

    drawPOIRing(time);
    items.forEach(function (it) { it.fn(); });
    drawFireflies(time);
  }

  /* ---------- Loop ---------- */
  var last = 0, running = true;
  function frame(now) {
    if (!running) return;
    if (!last) last = now;
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt, now);
    moveFireflies(dt, now);
    render(now);
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true; last = 0;
      requestAnimationFrame(frame);
    }
  });

  requestAnimationFrame(frame);
})();
