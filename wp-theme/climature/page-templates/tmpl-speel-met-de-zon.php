<?php
/**
 * Template Name: Speel met de zon
 *
 * @package Climature
 */
get_header();
?>
    <main id="main" class="play-page">

      <div class="play-hero">
        <div class="container">
          <p class="eyebrow">Speeltuin</p>
          <h1>Speel met de zon.</h1>
          <p class="lead">Sleep de zon over de hemel en zie live hoe je zonnepanelen, thuisbatterij en woning samenwerken. Zet apparaten aan, trek een wolk voor de zon — en ontdek hoe een slim energiesysteem ademt.</p>
        </div>
      </div>

      <section class="sandbox-section">
        <div class="container">
          <div class="sandbox-layout">

            <!-- ===== Interactive stage ===== -->
            <div class="sun-stage" data-stage aria-label="Interactieve energie-scène: sleep de zon over de hemel">
              <p class="play-hint" data-hint>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 11V6a3 3 0 0 1 6 0v5M9 11l-1.5-1.5a1.8 1.8 0 0 0-2.6 2.6L9 16.5a5 5 0 0 0 4 2H15a4 4 0 0 0 4-4v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Sleep de zon ☀️
              </p>
              <svg class="sun-svg" viewBox="0 0 760 460" role="img" aria-label="Zon boven een huis met zonnepanelen en thuisbatterij" data-svg>
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#0B2F1A" data-sky-top/>
                    <stop offset="1" stop-color="#123C24" data-sky-bottom/>
                  </linearGradient>
                  <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stop-color="#D7A900" stop-opacity="0.9"/>
                    <stop offset="1" stop-color="#D7A900" stop-opacity="0"/>
                  </radialGradient>
                  <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#1F6B3A"/>
                    <stop offset="1" stop-color="#123C24"/>
                  </linearGradient>
                </defs>

                <!-- sky -->
                <rect x="0" y="0" width="760" height="460" fill="url(#skyGrad)"/>

                <!-- stars (visible at night) -->
                <g data-stars opacity="0">
                  <circle cx="90" cy="60" r="1.5" fill="#fff"/>
                  <circle cx="200" cy="40" r="1.1" fill="#fff"/>
                  <circle cx="300" cy="90" r="1.4" fill="#fff"/>
                  <circle cx="470" cy="55" r="1.2" fill="#fff"/>
                  <circle cx="560" cy="100" r="1.5" fill="#fff"/>
                  <circle cx="650" cy="48" r="1.1" fill="#fff"/>
                  <circle cx="700" cy="120" r="1.3" fill="#fff"/>
                  <circle cx="140" cy="130" r="1.1" fill="#fff"/>
                  <circle cx="380" cy="35" r="1.3" fill="#fff"/>
                </g>

                <!-- sun -->
                <g data-sun id="sun">
                  <circle cx="0" cy="0" r="58" fill="url(#sunGlow)"/>
                  <g id="sun-rays">
                    <g stroke="#D7A900" stroke-width="3.4" stroke-linecap="round">
                      <line x1="0" y1="-30" x2="0" y2="-42"/>
                      <line x1="0" y1="30" x2="0" y2="42"/>
                      <line x1="-30" y1="0" x2="-42" y2="0"/>
                      <line x1="30" y1="0" x2="42" y2="0"/>
                      <line x1="-21" y1="-21" x2="-30" y2="-30"/>
                      <line x1="21" y1="21" x2="30" y2="30"/>
                      <line x1="21" y1="-21" x2="30" y2="-30"/>
                      <line x1="-21" y1="21" x2="-30" y2="30"/>
                    </g>
                  </g>
                  <circle cx="0" cy="0" r="22" fill="#D7A900" stroke="#D7A900" stroke-width="2"/>
                </g>

                <!-- ground -->
                <path d="M0 372 C 180 350, 320 360, 420 366 C 560 374, 660 360, 760 368 L760 460 L0 460 Z" fill="url(#hillGrad)"/>

                <!-- bomen die opgroeien naarmate je CO₂ bespaart -->
                <g data-trees>
                  <g transform="translate(70 392)"><g class="tree-sprite" data-tree>
                    <rect x="-2.5" y="6" width="5" height="14" rx="1.5" fill="#0B2F1A"/>
                    <circle cx="0" cy="-2" r="13" fill="#B6D72A"/>
                    <circle cx="-8" cy="6" r="9" fill="#1F6B3A"/>
                    <circle cx="8" cy="6" r="9" fill="#1F6B3A"/>
                  </g></g>
                  <g transform="translate(132 400)"><g class="tree-sprite" data-tree>
                    <rect x="-2.5" y="6" width="5" height="14" rx="1.5" fill="#0B2F1A"/>
                    <circle cx="0" cy="-2" r="13" fill="#B6D72A"/>
                    <circle cx="-8" cy="6" r="9" fill="#1F6B3A"/>
                    <circle cx="8" cy="6" r="9" fill="#1F6B3A"/>
                  </g></g>
                  <g transform="translate(196 396)"><g class="tree-sprite" data-tree>
                    <rect x="-2.5" y="6" width="5" height="14" rx="1.5" fill="#0B2F1A"/>
                    <circle cx="0" cy="-2" r="13" fill="#B6D72A"/>
                    <circle cx="-8" cy="6" r="9" fill="#1F6B3A"/>
                    <circle cx="8" cy="6" r="9" fill="#1F6B3A"/>
                  </g></g>
                  <g transform="translate(688 398)"><g class="tree-sprite" data-tree>
                    <rect x="-2.5" y="6" width="5" height="14" rx="1.5" fill="#0B2F1A"/>
                    <circle cx="0" cy="-2" r="13" fill="#B6D72A"/>
                    <circle cx="-8" cy="6" r="9" fill="#1F6B3A"/>
                    <circle cx="8" cy="6" r="9" fill="#1F6B3A"/>
                  </g></g>
                </g>

                <!-- connector lines -->
                <path d="M 528 214 C 452 244, 372 276, 306 312" fill="none" stroke="rgba(182,215,42,0.32)" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>
                <path d="M 322 332 L 470 332" fill="none" stroke="rgba(182,215,42,0.32)" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>

                <!-- battery -->
                <g>
                  <rect x="248" y="296" width="74" height="74" rx="11" fill="#0B2F1A" stroke="rgba(182,215,42,0.6)" stroke-width="2"/>
                  <rect x="276" y="289" width="18" height="9" rx="3" fill="rgba(182,215,42,0.7)"/>
                  <!-- fill (height/y set by JS) -->
                  <rect data-batt-fill x="255" y="312" width="60" height="51" rx="7" fill="#B6D72A" opacity="0.9"/>
                  <path d="M289 312l-12 18h9l-3 14 14-20h-9l3-12z" fill="#0B2F1A"/>
                </g>

                <!-- house -->
                <g>
                  <rect x="470" y="284" width="150" height="90" rx="6" fill="#FAFBF7" stroke="rgba(16,32,23,0.18)" stroke-width="2"/>
                  <path d="M458 286 L545 222 L632 286 Z" fill="#123C24"/>
                  <!-- solar panels on roof -->
                  <g transform="translate(0 0)">
                    <g fill="#123C24" stroke="#1F6B3A" stroke-width="1.2" opacity="0.96">
                      <rect x="500" y="252" width="30" height="20" rx="2" transform="skewX(-18)"/>
                    </g>
                    <g fill="#123C24" stroke="#1F6B3A" stroke-width="1.2">
                      <polygon points="512,242 556,242 548,266 500,266"/>
                      <line x1="524" y1="242" x2="516" y2="266" stroke="#1F6B3A" stroke-width="1"/>
                      <line x1="536" y1="242" x2="530" y2="266" stroke="#1F6B3A" stroke-width="1"/>
                    </g>
                  </g>
                  <!-- door + windows -->
                  <rect x="532" y="326" width="26" height="48" rx="3" fill="#123C24"/>
                  <rect data-window x="486" y="300" width="26" height="22" rx="3" fill="#B6D72A"/>
                  <rect data-window x="582" y="300" width="26" height="22" rx="3" fill="#B6D72A"/>
                </g>

                <!-- energy dots -->
                <circle class="flow-dot flow-gen-dot d1" r="4.5" fill="#B6D72A"/>
                <circle class="flow-dot flow-gen-dot d2" r="4.5" fill="#B6D72A"/>
                <circle class="flow-dot flow-use-dot d1" r="4" fill="#1F6B3A"/>
                <circle class="flow-dot flow-use-dot d2" r="4" fill="#1F6B3A"/>
              </svg>
            </div>

            <!-- ===== Control panel ===== -->
            <div class="sun-panel">
              <div class="readout">
                <div class="readout-head">
                  <span class="readout-title">Jouw energiestroom</span>
                  <span class="readout-live">LIVE</span>
                </div>
                <div class="readout-hero">
                  <strong data-out-opwek>0,0</strong>
                  <span>kW opwek · nu</span>
                </div>
                <div class="readout-grid">
                  <div class="readout-cell">
                    <span class="k">Huisverbruik</span>
                    <span class="v"><span data-out-verbruik>0,4</span> kW</span>
                  </div>
                  <div class="readout-cell">
                    <span class="k">Eigen verbruik</span>
                    <span class="v"><span data-out-eigen>0</span>%</span>
                  </div>
                  <div class="readout-cell batt-cell">
                    <span class="k">Thuisbatterij — <span data-out-batt>50</span>%</span>
                    <div class="batt-bar"><div class="batt-bar-fill" data-batt-bar></div></div>
                  </div>
                  <div class="readout-cell net-cell" data-net-cell>
                    <span class="k" data-net-label>Status</span>
                    <span class="v" data-net-value>—</span>
                  </div>
                  <div class="readout-cell co2-cell">
                    <span class="k icon-lead">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21v-7M12 14c-4 0-7-2.5-7-6.5C5 4 8 3 12 3s7 1 7 4.5C19 11.5 16 14 12 14Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 14c0-2 1-3.5 3-4.5M12 17c0-1.5-.8-2.6-2.4-3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                      CO₂ bespaard
                    </span>
                    <span class="v"><span data-out-co2>0,0</span> kg</span>
                    <p class="co2-sub">≈ <span data-out-trees>0</span> bomen geplant</p>
                    <div class="tree-bar"><div class="tree-bar-fill" data-tree-bar></div></div>
                  </div>
                </div>
              </div>

              <div class="controls">
                <p class="controls-label">Het weer</p>
                <div class="weather-seg" role="group" aria-label="Weer">
                  <button class="seg-btn" type="button" data-weather="1" aria-pressed="true">
                    <span class="icon-lead">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                      Zonnig
                    </span>
                  </button>
                  <button class="seg-btn" type="button" data-weather="0.35" aria-pressed="false">
                    <span class="icon-lead">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.5 9 4 4 0 0 0 7 18Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                      Bewolkt
                    </span>
                  </button>
                </div>

                <p class="controls-label">Apparaten in huis</p>
                <div class="toggles">
                  <button class="toggle-btn" type="button" data-load="0.8" aria-pressed="false">
                    <span class="icon-lead">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="13" r="4.5" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="6.5" r="1" fill="currentColor"/></svg>
                      Wasmachine
                    </span>
                    <span class="load">+0,8 kW</span>
                  </button>
                  <button class="toggle-btn" type="button" data-load="2.2" aria-pressed="false">
                    <span class="icon-lead">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 18V9l2-4h7l2 4v9" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="8" cy="18" r="1.6" stroke="currentColor" stroke-width="1.6"/><circle cx="15" cy="18" r="1.6" stroke="currentColor" stroke-width="1.6"/><path d="M19 11l2 1v3l-2 1M11 9l-1.5 2.5h2L10 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      EV laden
                    </span>
                    <span class="load">+2,2 kW</span>
                  </button>
                  <button class="toggle-btn" type="button" data-load="1.4" aria-pressed="false">
                    <span class="icon-lead">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="16" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 3c0 0-3.5 3.5 0 6 3.5-2.5 0-6 0-6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                      Warmtepomp
                    </span>
                    <span class="load">+1,4 kW</span>
                  </button>
                </div>
              </div>
            </div>

          </div><!-- /.sandbox-layout -->
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="cta-band reveal">
            <p class="eyebrow">Van spelen naar doen</p>
            <h2>Benieuwd wat dit voor jouw woning oplevert?</h2>
            <p class="lead">Je hebt net gevoeld hoe opwek, opslag en verbruik samenwerken. Doe de gratis energiescan en ontdek jouw persoonlijke besparing en terugverdientijd.</p>
            <div class="button-row">
              <a class="btn btn-primary" href="<?php echo esc_url( climature_link( 'energiescan' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Doe de gratis energiescan
              </a>
              <a class="btn btn-secondary" href="<?php echo esc_url( climature_link( 'hoe-werken-wij' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5v14l11-7-11-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                Hoe werken wij
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
<?php
get_footer();
