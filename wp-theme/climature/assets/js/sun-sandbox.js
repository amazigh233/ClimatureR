/* ===========================================================================
   Speel met de zon — energie-sandbox
   Sleep de zon over de hemel; zonnepanelen, thuisbatterij en woning reageren
   live. Geen echte data: een eenvoudig, geloofwaardig energiemodel.
   =========================================================================== */
(function () {
  'use strict';

  var stage = document.querySelector('[data-stage]');
  var svg   = document.querySelector('[data-svg]');
  var sun   = document.querySelector('[data-sun]');
  if (!stage || !svg || !sun) return;

  var skyTop  = document.querySelector('[data-sky-top]');
  var skyBot  = document.querySelector('[data-sky-bottom]');
  var stars   = document.querySelector('[data-stars]');
  var battFill = document.querySelector('[data-batt-fill]');
  var windows = document.querySelectorAll('[data-window]');
  var hint    = document.querySelector('[data-hint]');

  var outOpwek   = document.querySelector('[data-out-opwek]');
  var outVerbruik = document.querySelector('[data-out-verbruik]');
  var outEigen   = document.querySelector('[data-out-eigen]');
  var outBatt    = document.querySelector('[data-out-batt]');
  var battBar    = document.querySelector('[data-batt-bar]');
  var netCell    = document.querySelector('[data-net-cell]');
  var netLabel   = document.querySelector('[data-net-label]');
  var netValue   = document.querySelector('[data-net-value]');
  var outCo2     = document.querySelector('[data-out-co2]');
  var outTrees   = document.querySelector('[data-out-trees]');
  var treeBar    = document.querySelector('[data-tree-bar]');
  var treeSprites = document.querySelectorAll('[data-trees] [data-tree]');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Model constants ----
  var MAX_KW    = 5.0;   // piekvermogen panelen
  var BASE_LOAD = 0.4;   // basislast woning (kW)
  var BATT_RATE = 4;     // %-verandering per seconde per kW netto
  var GRID_FACTOR = 0.39; // kg CO₂ vermeden per kWh zonne-energie (NL)
  var KG_PER_TREE = 21;   // kg CO₂ die één boom per jaar opneemt
  var TIME_ACCEL  = 1800; // 1 echte seconde ≈ 30 gespeelde minuten

  // ---- State ----
  var state = {
    t: 0.5,        // zonpositie op de boog [0..1]
    weather: 1,    // opwekfactor (1 = zonnig, 0.35 = bewolkt)
    soc: 50,       // batterijlading %
    co2: 0,        // bespaarde CO₂ deze sessie (kg)
    loads: {}      // actieve apparaten -> kW
  };

  // ---- Sun arc geometry (viewBox 760 x 460) ----
  function sunX(t) { return 70 + 620 * t; }
  function sunY(t) { return 372 - 320 * Math.sin(Math.PI * t); }
  function elevation(t) { return Math.max(0, Math.sin(Math.PI * t)); }

  // ---- Colour helpers ----
  function lerp(a, b, f) { return a + (b - a) * f; }
  function mix(c1, c2, f) {
    return 'rgb(' +
      Math.round(lerp(c1[0], c2[0], f)) + ',' +
      Math.round(lerp(c1[1], c2[1], f)) + ',' +
      Math.round(lerp(c1[2], c2[2], f)) + ')';
  }

  var NIGHT_TOP = [11, 47, 26],  NIGHT_BOT = [18, 60, 36];
  var GOLD_TOP  = [31, 107, 58], GOLD_BOT  = [215, 169, 0];
  var DAY_TOP   = [243, 248, 242], DAY_BOT  = [182, 215, 42];

  function paintSky(e) {
    var top, bot;
    if (e < 0.3) {
      var f = e / 0.3;
      top = mix(NIGHT_TOP, GOLD_TOP, f);
      bot = mix(NIGHT_BOT, GOLD_BOT, f);
    } else {
      var g = (e - 0.3) / 0.7;
      top = mix(GOLD_TOP, DAY_TOP, g);
      bot = mix(GOLD_BOT, DAY_BOT, g);
    }
    skyTop.setAttribute('stop-color', top);
    skyBot.setAttribute('stop-color', bot);

    if (stars) stars.setAttribute('opacity', Math.max(0, (0.18 - e) / 0.18).toFixed(2));

    // windows glow warmer in the evening / at night
    var glow = Math.max(0, (0.32 - e) / 0.32);
    var win = mix([182, 215, 42], [215, 169, 0], glow);
    for (var i = 0; i < windows.length; i++) windows[i].setAttribute('fill', win);
  }

  // ---- Number formatting (nl) ----
  function kw(x) { return x.toFixed(1).replace('.', ','); }
  function nl(x, d) { return x.toFixed(d).replace('.', ','); }

  // ---- Apply sun position ----
  function placeSun() {
    sun.setAttribute('transform', 'translate(' + sunX(state.t).toFixed(1) + ',' + sunY(state.t).toFixed(1) + ')');
  }

  // ---- Totaal verbruik ----
  function totalLoad() {
    var sum = BASE_LOAD;
    for (var k in state.loads) if (state.loads.hasOwnProperty(k)) sum += state.loads[k];
    return sum;
  }

  // ---- Render (per frame) ----
  function render() {
    var e = elevation(state.t);
    var opwek = MAX_KW * e * state.weather;
    var verbruik = totalLoad();
    var net = opwek - verbruik;

    // numeric readouts
    outOpwek.textContent = kw(opwek);
    outVerbruik.textContent = kw(verbruik);

    // eigen verbruik %
    var eigen;
    if (verbruik <= 0.01 || opwek >= verbruik || state.soc > 0) eigen = 100;
    else eigen = Math.round((opwek / verbruik) * 100);
    outEigen.textContent = eigen;

    // battery visuals
    var soc = state.soc;
    outBatt.textContent = Math.round(soc);
    battBar.style.width = soc + '%';
    battBar.classList.toggle('is-low', soc < 20);
    var h = 51 * (soc / 100);
    battFill.setAttribute('y', (363 - h).toFixed(1));
    battFill.setAttribute('height', h.toFixed(1));

    // net status cell
    var absKw = kw(Math.abs(net));
    netCell.classList.remove('surplus', 'deficit');
    if (net >= 0.05) {
      netCell.classList.add('surplus');
      netLabel.textContent = soc < 99.5 ? 'Batterij laadt op' : 'Teruglevering aan net';
      netValue.textContent = '+' + absKw + ' kW';
    } else if (net <= -0.05) {
      netCell.classList.add('deficit');
      netLabel.textContent = soc > 0.5 ? 'Batterij levert' : 'Stroom van het net';
      netValue.textContent = '−' + absKw + ' kW';
    } else {
      netLabel.textContent = 'In balans';
      netValue.textContent = '0,0 kW';
    }

    // CO₂ bespaard + bomen-equivalent
    var trees = Math.floor(state.co2 / KG_PER_TREE);
    if (outCo2) outCo2.textContent = nl(state.co2, 1);
    if (outTrees) outTrees.textContent = trees;
    if (treeBar) {
      var frac = (state.co2 % KG_PER_TREE) / KG_PER_TREE;
      treeBar.style.width = (frac * 100).toFixed(1) + '%';
    }
    if (treeSprites.length) {
      for (var t = 0; t < treeSprites.length; t++) {
        treeSprites[t].classList.toggle('is-grown', trees > t);
      }
    }

    // flow particles
    stage.classList.toggle('is-generating', opwek > 0.05);
    stage.classList.toggle('is-consuming', verbruik > 0.05);

    return net;
  }

  // ---- Animation loop: integrates the battery over time ----
  var last = null;
  function loop(now) {
    if (last === null) last = now;
    var dt = Math.min((now - last) / 1000, 0.1); // s, capped
    last = now;

    var net = render();
    state.soc = Math.max(0, Math.min(100, state.soc + net * dt * BATT_RATE));

    // CO₂ telt alleen op: opwek (kW) * gespeelde uren * netfactor
    var opwek = MAX_KW * elevation(state.t) * state.weather;
    state.co2 += opwek * (dt * TIME_ACCEL / 3600) * GRID_FACTOR;

    requestAnimationFrame(loop);
  }

  // ---- Drag interaction ----
  var dragging = false;

  function pointerToT(clientX) {
    var rect = svg.getBoundingClientRect();
    var fx = (clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(1, fx));
  }

  function startDrag(clientX) {
    dragging = true;
    svg.classList.add('is-grabbing');
    if (hint) hint.classList.add('is-hidden');
    moveDrag(clientX);
  }

  function moveDrag(clientX) {
    state.t = pointerToT(clientX);
    placeSun();
    paintSky(elevation(state.t));
  }

  function endDrag() {
    dragging = false;
    svg.classList.remove('is-grabbing');
  }

  svg.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    startDrag(e.clientX);
  });
  window.addEventListener('pointermove', function (e) {
    if (dragging) moveDrag(e.clientX);
  });
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  // ---- Weather segmented control ----
  document.querySelectorAll('[data-weather]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.weather = parseFloat(btn.getAttribute('data-weather'));
      document.querySelectorAll('[data-weather]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  // ---- Appliance toggles ----
  document.querySelectorAll('[data-load]').forEach(function (btn, i) {
    var key = 'load' + i;
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      if (on) state.loads[key] = parseFloat(btn.getAttribute('data-load'));
      else delete state.loads[key];
    });
  });

  // ---- Init ----
  placeSun();
  paintSky(elevation(state.t));
  render();
  requestAnimationFrame(loop);
}());
