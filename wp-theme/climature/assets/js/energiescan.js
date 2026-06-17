  (function () {
    'use strict';

    var PRODUCTS = {
      panelen: {
        name: 'Zonnepanelen',
        desc: 'Opwek van eigen stroom',
        svg: '<rect x="3" y="6" width="8" height="6" rx=".5" stroke="currentColor" stroke-width="1.8" fill="none"/><rect x="13" y="6" width="8" height="6" rx=".5" stroke="currentColor" stroke-width="1.8" fill="none"/><rect x="3" y="14" width="8" height="6" rx=".5" stroke="currentColor" stroke-width="1.8" fill="none"/><rect x="13" y="14" width="8" height="6" rx=".5" stroke="currentColor" stroke-width="1.8" fill="none"/>'
      },
      batterij: {
        name: 'Thuisbatterij',
        desc: 'Opslag voor dag &amp; nacht',
        svg: '<rect x="5" y="7" width="12" height="13" rx="1" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M17 10h2v7h-2M5 10H3v7h2" stroke="currentColor" stroke-width="1.8"/><path d="M11 10v4M9 14h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
      },
      warmtepomp: {
        name: 'Warmtepomp',
        desc: 'Duurzame verwarming &amp; koeling',
        svg: '<rect x="3" y="11" width="16" height="11" rx="1" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="11" cy="16" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M11 3c0 0-4 4 0 7 4-3 0-7 0-7z" stroke="currentColor" stroke-width="1.6" fill="none"/>'
      },
      monitoring: {
        name: 'Monitoring',
        desc: 'Inzicht in opwek &amp; verbruik',
        svg: '<rect x="2" y="4" width="20" height="13" rx="1" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 13l3-4 3 3 2-5 3 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
      }
    };

    var currentStep = 1;
    var userData = { woning: 'tussenwoning', maand: 150, huidig: [], prioriteit: 'besparen' };

    // ---- Progress ----
    function updateProgress(step) {
      for (var i = 1; i <= 4; i++) {
        var dot = document.querySelector('[data-dot="' + i + '"]');
        var line = document.querySelector('[data-line="' + i + '"]');
        if (!dot) continue;
        dot.classList.toggle('is-active', i === step);
        dot.classList.toggle('is-done', i < step);
        if (line) line.classList.toggle('is-done', i < step);
      }
    }

    // ---- Step switching ----
    function showStep(n) {
      document.querySelectorAll('.scan-step').forEach(function (el) { el.classList.remove('is-active'); });
      document.getElementById('scan-result').classList.remove('is-active');
      var t = document.getElementById('step-' + n);
      if (t) { t.classList.add('is-active'); }
      currentStep = n;
      updateProgress(n);
    }

    function showResult() {
      document.querySelectorAll('.scan-step').forEach(function (el) { el.classList.remove('is-active'); });
      document.getElementById('scan-result').classList.add('is-active');
      for (var i = 1; i <= 4; i++) {
        var dot = document.querySelector('[data-dot="' + i + '"]');
        var line = document.querySelector('[data-line="' + i + '"]');
        if (dot) { dot.classList.remove('is-active'); dot.classList.add('is-done'); }
        if (line) line.classList.add('is-done');
      }
      renderResult();
    }

    // ---- Delegation ----
    document.addEventListener('click', function (e) {
      var next = e.target.closest('[data-next]');
      var back = e.target.closest('[data-back]');
      var rapport = e.target.closest('#btn-rapport');
      var restart = e.target.closest('#btn-restart');

      if (next)    { collectStep(currentStep); showStep(parseInt(next.dataset.next, 10)); }
      if (back)    { showStep(parseInt(back.dataset.back, 10)); }
      if (rapport) { collectStep(4); showResult(); }
      if (restart) {
        document.querySelectorAll('input[type=radio]').forEach(function (r) { r.checked = false; });
        document.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.checked = false; });
        var sl = document.getElementById('maand-slider');
        sl.value = 150;
        updateSlider(150);
        userData = { woning: 'tussenwoning', maand: 150, huidig: [], prioriteit: 'besparen' };
        showStep(1);
      }
    });

    // ---- Collect ----
    function collectStep(step) {
      if (step === 1) {
        var sel = document.querySelector('input[name="woning"]:checked');
        if (sel) userData.woning = sel.value;
      }
      if (step === 2) {
        userData.maand = parseInt(document.getElementById('maand-slider').value, 10);
      }
      if (step === 3) {
        userData.huidig = Array.from(document.querySelectorAll('input[name="huidig"]:checked')).map(function (c) { return c.value; });
      }
      if (step === 4) {
        var sel2 = document.querySelector('input[name="prioriteit"]:checked');
        if (sel2) userData.prioriteit = sel2.value;
      }
    }

    // ---- Slider ----
    function updateSlider(val) {
      document.getElementById('amount-display').textContent = '€ ' + val;
      var kwh = Math.round((val * 12) / (0.38 * 12 / (1000 / 2600)));
      kwh = Math.round(val / 0.38);
      document.getElementById('kwh-display').textContent = '≈ ' + kwh + ' kWh / maand';
      var sl = document.getElementById('maand-slider');
      sl.setAttribute('aria-valuetext', '€ ' + val);
    }

    document.getElementById('maand-slider').addEventListener('input', function () {
      updateSlider(parseInt(this.value, 10));
    });

    // ---- Render result ----
    function renderResult() {
      var w = userData.woning;
      var maand = userData.maand;
      var huidig = userData.huidig;
      var prio = userData.prioriteit;

      var isBig = (w === 'vrijstaand' || w === 'twee-onder-een-kap');
      var hasPanelen  = huidig.indexOf('panelen')    > -1;
      var hasBatterij = huidig.indexOf('batterij')   > -1;
      var hasPomp     = huidig.indexOf('warmtepomp') > -1;

      // Recommend what they don't have
      var recs = [];
      if (!hasPanelen)    recs.push('panelen');
      if (!hasBatterij)   recs.push('batterij');
      if (!hasPomp && (isBig || huidig.indexOf('niets') > -1)) recs.push('warmtepomp');
      recs.push('monitoring');

      // Savings %
      var pct = 0.38;
      if (!hasPanelen)  pct += 0.0;  // panels give the base
      if (!hasBatterij && hasPanelen) pct = 0.22; // only adding battery to existing panels
      if (!hasPomp && recs.indexOf('warmtepomp') > -1) pct += 0.14;
      if (huidig.indexOf('niets') > -1) pct = 0.52; // nothing → full stack

      var jaarbesparing = Math.round(maand * 12 * Math.min(pct, 0.70));

      var kwhPerMaand = Math.round(maand / 0.38);
      var co2PerJaar  = Math.round(kwhPerMaand * 12 * 0.27);
      var trees       = Math.max(1, Math.round(co2PerJaar / 21));

      var invest = 0;
      if (recs.indexOf('panelen')    > -1) invest += isBig ? 7500 : 5500;
      if (recs.indexOf('batterij')   > -1) invest += 4200;
      if (recs.indexOf('warmtepomp') > -1) invest += 5000;
      invest = Math.round(invest / 500) * 500;

      var roi = Math.max(1, Math.min(10, Math.round(invest / Math.max(jaarbesparing, 1))));

      // Headings
      var headings = {
        besparen:      'Zo bespaar jij het meest.',
        duurzaam:      'Zo word jij het duurzaamst.',
        onafhankelijk: 'Zo word jij energieonafhankelijk.'
      };
      document.getElementById('result-heading').textContent = headings[prio] || 'Dit is jouw potentieel.';

      // Animate numbers
      animateCount('res-saving', jaarbesparing, 1300);
      animateCount('res-trees',  trees,          900);
      animateCount('res-invest', invest,         1150);

      // ROI bar
      buildROI(roi);

      // Products
      var container = document.getElementById('result-products');
      container.innerHTML = '';
      recs.forEach(function (key) {
        var p = PRODUCTS[key];
        container.innerHTML +=
          '<div class="result-rec-product">' +
            '<div class="result-rec-icon">' +
              '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + p.svg + '</svg>' +
            '</div>' +
            '<div>' +
              '<span class="result-rec-name">' + p.name + '</span>' +
              '<span class="result-rec-desc">' + p.desc + '</span>' +
            '</div>' +
          '</div>';
      });
    }

    function animateCount(id, target, duration) {
      var el = document.getElementById(id);
      if (!el) return;
      var start = performance.now();
      (function tick(now) {
        var t    = Math.min((now - start) / duration, 1);
        var ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target).toLocaleString('nl-NL');
        if (t < 1) requestAnimationFrame(tick);
      }(start));
    }

    function buildROI(breakYear) {
      var pct = Math.min((breakYear / 10) * 100, 100);

      var yearsEl = document.getElementById('roi-years');
      yearsEl.innerHTML = '';
      [0, 2, 4, 6, 8, 10].forEach(function (y) {
        var s = document.createElement('span');
        s.className = 'roi-year' + (y === breakYear ? ' is-break' : '');
        s.textContent = y === 0 ? 'Nu' : (y === breakYear ? 'Jaar ' + y + ' ✓' : 'Jaar ' + y);
        yearsEl.appendChild(s);
      });

      document.getElementById('roi-label').textContent = 'terugverdiend in ca. ' + breakYear + ' jaar';

      setTimeout(function () {
        document.getElementById('roi-fill').style.width   = pct + '%';
        document.getElementById('roi-marker').style.left  = pct + '%';
      }, 120);
    }

  }());
