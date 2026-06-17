<?php
/**
 * Template Name: Energiescan
 *
 * @package Climature
 */
get_header();
?>
    <main id="main" class="scan-page">

      <!-- Hero -->
      <div class="scan-hero">
        <div class="container">
          <p class="eyebrow">Jouw persoonlijk rapport</p>
          <h1>Bereken wat<br>je bespaart.</h1>
          <p class="lead">Vier vragen. Jouw persoonlijk Climature Energierapport — met aanbevolen producten, verwachte besparing en terugverdientijd.</p>

          <!-- Step progress -->
          <nav class="scan-progress" aria-label="Voortgang">
            <div class="scan-progress-dot is-active" data-dot="1" aria-label="Stap 1: Woningtype">1</div>
            <div class="scan-progress-line" data-line="1"></div>
            <div class="scan-progress-dot" data-dot="2" aria-label="Stap 2: Maandrekening">2</div>
            <div class="scan-progress-line" data-line="2"></div>
            <div class="scan-progress-dot" data-dot="3" aria-label="Stap 3: Huidige situatie">3</div>
            <div class="scan-progress-line" data-line="3"></div>
            <div class="scan-progress-dot" data-dot="4" aria-label="Stap 4: Prioriteiten">4</div>
          </nav>
        </div>
      </div>

      <!-- Scan card -->
      <section class="scan-section">
        <div class="container">
          <div class="scan-card">

            <!-- ===== STEP 1: Woningtype ===== -->
            <div class="scan-step is-active" id="step-1" role="group" aria-labelledby="step1-h">
              <p class="scan-step-label">Stap 1 van 4 &nbsp;·&nbsp; Woningtype</p>
              <h2 id="step1-h">Welk type woning heb je?</h2>
              <div class="scan-options">

                <div class="scan-option">
                  <input type="radio" name="woning" id="w-tussenwoning" value="tussenwoning">
                  <label for="w-tussenwoning">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <path d="M6 21L22 9L38 21V36H30V26H14V36H6V21Z" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                    </svg>
                    Tussenwoning
                  </label>
                </div>

                <div class="scan-option">
                  <input type="radio" name="woning" id="w-vrijstaand" value="vrijstaand">
                  <label for="w-vrijstaand">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <path d="M4 22L12 15V36H32V15L40 22" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M12 15L22 7L32 15" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M18 36V27H26V36" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M5 22L12 15M39 22L32 15" stroke="#B6D72A" stroke-width="1.6" opacity=".4" stroke-linecap="round"/>
                    </svg>
                    Vrijstaand
                  </label>
                </div>

                <div class="scan-option">
                  <input type="radio" name="woning" id="w-appartement" value="appartement">
                  <label for="w-appartement">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="8" y="9" width="28" height="27" rx="1.5" stroke="#B6D72A" stroke-width="2.2"/>
                      <path d="M8 18H36M8 27H36" stroke="#B6D72A" stroke-width="1.8" opacity=".5"/>
                      <rect x="13" y="12" width="5" height="4" rx=".5" stroke="#B6D72A" stroke-width="1.6"/>
                      <rect x="26" y="12" width="5" height="4" rx=".5" stroke="#B6D72A" stroke-width="1.6"/>
                      <path d="M19 36V29H25V36" stroke="#B6D72A" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                    Appartement
                  </label>
                </div>

                <div class="scan-option">
                  <input type="radio" name="woning" id="w-twee" value="twee-onder-een-kap">
                  <label for="w-twee">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <path d="M3 22L11 15V36H22V15" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M11 15L16.5 10L22 15" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M22 15L27.5 10L33 15V36H41V22L33 15" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                    </svg>
                    2-onder-1-kap
                  </label>
                </div>

              </div>
              <div class="scan-nav">
                <button class="scan-nav-back" hidden aria-hidden="true">← Vorige</button>
                <button class="scan-nav-next" data-next="2">Volgende →</button>
              </div>
            </div>

            <!-- ===== STEP 2: Maandrekening ===== -->
            <div class="scan-step" id="step-2" role="group" aria-labelledby="step2-h">
              <p class="scan-step-label">Stap 2 van 4 &nbsp;·&nbsp; Maandrekening</p>
              <h2 id="step2-h">Wat betaal je nu per maand?</h2>
              <div class="scan-slider-wrap">
                <div class="scan-slider-display">
                  <span class="scan-amount" id="amount-display">€&nbsp;150</span>
                  <p class="scan-amount-sub" id="kwh-display">≈ 395 kWh / maand</p>
                </div>
                <input type="range" class="scan-range" id="maand-slider" min="50" max="500" value="150" step="10"
                       aria-label="Maandelijkse energierekening in euro's" aria-valuetext="€ 150">
                <div class="scan-range-labels">
                  <span>€ 50</span>
                  <span>€ 500</span>
                </div>
              </div>
              <div class="scan-nav">
                <button class="scan-nav-back" data-back="1">← Vorige</button>
                <button class="scan-nav-next" data-next="3">Volgende →</button>
              </div>
            </div>

            <!-- ===== STEP 3: Huidige situatie ===== -->
            <div class="scan-step" id="step-3" role="group" aria-labelledby="step3-h">
              <p class="scan-step-label">Stap 3 van 4 &nbsp;·&nbsp; Huidige situatie</p>
              <h2 id="step3-h">Wat heb je al in huis?</h2>
              <div class="scan-checks">

                <div class="scan-option">
                  <input type="checkbox" id="has-panelen" name="huidig" value="panelen">
                  <label for="has-panelen">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="5" y="13" width="15" height="10" rx="1" stroke="#B6D72A" stroke-width="2.2"/>
                      <rect x="24" y="13" width="15" height="10" rx="1" stroke="#B6D72A" stroke-width="2.2"/>
                      <rect x="5" y="27" width="15" height="10" rx="1" stroke="#B6D72A" stroke-width="2.2"/>
                      <rect x="24" y="27" width="15" height="10" rx="1" stroke="#B6D72A" stroke-width="2.2"/>
                      <path d="M12.5 13V9M31.5 13V9" stroke="#B6D72A" stroke-width="2" stroke-linecap="round" opacity=".5"/>
                    </svg>
                    Zonnepanelen
                  </label>
                </div>

                <div class="scan-option">
                  <input type="checkbox" id="has-batterij" name="huidig" value="batterij">
                  <label for="has-batterij">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="9" y="14" width="22" height="18" rx="2" stroke="#B6D72A" stroke-width="2.2"/>
                      <path d="M31 19h4v8h-4M9 19H5v8h4" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M20 19v6M17 25h6" stroke="#B6D72A" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Thuisbatterij
                  </label>
                </div>

                <div class="scan-option">
                  <input type="checkbox" id="has-warmtepomp" name="huidig" value="warmtepomp">
                  <label for="has-warmtepomp">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="8" y="20" width="28" height="18" rx="2" stroke="#B6D72A" stroke-width="2.2"/>
                      <circle cx="22" cy="29" r="5" stroke="#B6D72A" stroke-width="2"/>
                      <path d="M22 8C20 12 14 16 22 20C30 16 24 12 22 8Z" stroke="#B6D72A" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                    Warmtepomp
                  </label>
                </div>

                <div class="scan-option">
                  <input type="checkbox" id="has-niets" name="huidig" value="niets">
                  <label for="has-niets">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <circle cx="22" cy="22" r="15" stroke="#B6D72A" stroke-width="2.2"/>
                      <path d="M22 13v10l6 6" stroke="#B6D72A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Nog niets
                  </label>
                </div>

              </div>
              <div class="scan-nav">
                <button class="scan-nav-back" data-back="2">← Vorige</button>
                <button class="scan-nav-next" data-next="4">Volgende →</button>
              </div>
            </div>

            <!-- ===== STEP 4: Prioriteiten ===== -->
            <div class="scan-step" id="step-4" role="group" aria-labelledby="step4-h">
              <p class="scan-step-label">Stap 4 van 4 &nbsp;·&nbsp; Prioriteiten</p>
              <h2 id="step4-h">Wat is voor jou het belangrijkst?</h2>
              <div class="scan-options">

                <div class="scan-option">
                  <input type="radio" name="prioriteit" id="p-besparen" value="besparen">
                  <label for="p-besparen">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <circle cx="22" cy="24" r="14" stroke="#B6D72A" stroke-width="2.2"/>
                      <path d="M22 11v3M22 34v3M9 24H6M38 24h-3" stroke="#B6D72A" stroke-width="2" stroke-linecap="round" opacity=".5"/>
                      <path d="M18 21.5a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM22 17v2M22 27v2M17 24.5l-1.5.5M28 21l-1.5.5" stroke="#B6D72A" stroke-width="1.8" stroke-linecap="round"/>
                      <path d="M22 8l1 3-1 1-1-1z" fill="#B6D72A"/>
                    </svg>
                    Zo snel mogelijk besparen
                  </label>
                </div>

                <div class="scan-option">
                  <input type="radio" name="prioriteit" id="p-duurzaam" value="duurzaam">
                  <label for="p-duurzaam">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <path d="M22 37C22 37 10 29 10 19C10 12.9 15.5 8 22 8C28.5 8 34 12.9 34 19C34 29 22 37 22 37Z" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M22 23C22 23 16 19 18 13C22 15 27 19 22 23Z" fill="rgba(182,215,42,0.25)" stroke="#B6D72A" stroke-width="1.6"/>
                    </svg>
                    Zo duurzaam mogelijk
                  </label>
                </div>

                <div class="scan-option">
                  <input type="radio" name="prioriteit" id="p-onafhankelijk" value="onafhankelijk">
                  <label for="p-onafhankelijk">
                    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <path d="M22 7l5.09 10.26L38 18.9l-8 7.8 1.88 11.09L22 32.73l-9.88 5.06L14 26.7l-8-7.8 10.91-1.64L22 7z" stroke="#B6D72A" stroke-width="2.2" stroke-linejoin="round"/>
                    </svg>
                    Energieonafhankelijkheid
                  </label>
                </div>

              </div>
              <div class="scan-nav">
                <button class="scan-nav-back" data-back="3">← Vorige</button>
                <button class="scan-nav-next" id="btn-rapport">Bekijk mijn rapport →</button>
              </div>
            </div>

            <!-- ===== RESULT SCREEN ===== -->
            <div class="scan-result" id="scan-result" aria-live="polite">
              <div>
                <span class="result-badge">Jouw Climature Energierapport</span>
              </div>
              <h2 class="result-heading" id="result-heading">Dit is jouw potentieel.</h2>

              <div class="result-grid">
                <div class="result-metric">
                  <p class="result-metric-label">Jaarbesparing</p>
                  <span class="result-metric-value">€&nbsp;<span id="res-saving">0</span></span>
                  <p class="result-metric-sub">per jaar, indicatief</p>
                </div>
                <div class="result-metric">
                  <p class="result-metric-label">CO₂-reductie</p>
                  <span class="result-metric-value"><span id="res-trees">0</span><span class="result-metric-unit"> 🌳</span></span>
                  <p class="result-metric-sub">bomen-equivalent per jaar</p>
                </div>
                <div class="result-metric">
                  <p class="result-metric-label">Geschatte investering</p>
                  <span class="result-metric-value">€&nbsp;<span id="res-invest">0</span></span>
                  <p class="result-metric-sub">gratis adviesgesprek</p>
                </div>
              </div>

              <div class="roi-timeline">
                <p class="roi-timeline-label">Terugverdientijd — <span id="roi-label">berekenen…</span></p>
                <div class="roi-track">
                  <div class="roi-fill" id="roi-fill"></div>
                  <div class="roi-marker" id="roi-marker"></div>
                </div>
                <div class="roi-years" id="roi-years"></div>
              </div>

              <div class="result-rec">
                <p class="result-rec-label">Aanbevolen voor jou</p>
                <div class="result-rec-products" id="result-products"></div>
              </div>

              <div class="result-cta">
                <a class="btn btn-primary" href="<?php echo esc_url( climature_link( 'hoe-werken-wij' ) ); ?>">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Plan een gratis gesprek
                </a>
                <button class="scan-restart" id="btn-restart" type="button">Scan opnieuw doen</button>
              </div>
            </div>

          </div><!-- /.scan-card -->
        </div><!-- /.container -->
      </section>

    </main>
<?php
get_footer();
