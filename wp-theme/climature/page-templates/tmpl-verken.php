<?php
/**
 * Template Name: Verken
 *
 * @package Climature
 */
get_header();
?>
    <main id="main" class="explore-page">

      <div class="explore-hero">
        <div class="container">
          <p class="eyebrow">Speeltuin</p>
          <h1>Verken Climature.</h1>
          <p class="lead">Loop rond met W A S D (of de pijltjes) en ontdek hoe een Climature-woning leeft: wandel langs de zon, de zonnepanelen, de thuisbatterij en het huis.</p>
        </div>
      </div>

      <section class="explore-section">
        <div class="container">
          <div data-game>
            <div class="explore-stage" aria-label="Verkenwereld: loop met W A S D rond. De omgeving toont de zon, zonnepanelen, een thuisbatterij en het Climature-huis.">
              <canvas data-game-canvas></canvas>

              <p class="play-hint" data-hint>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 11V6a3 3 0 0 1 6 0v5M9 11l-1.5-1.5a1.8 1.8 0 0 0-2.6 2.6L9 16.5a5 5 0 0 0 4 2H15a4 4 0 0 0 4-4v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Loop met W A S D · pijltjes ook
              </p>

              <div class="poi-label" data-poi-label aria-live="polite">
                <b data-poi-title></b>
                <span data-poi-text></span>
              </div>

              <div class="dpad" role="group" aria-label="Bestuur de speler">
                <button class="d-up" type="button" data-dir="up" aria-label="Omhoog">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button class="d-left" type="button" data-dir="left" aria-label="Links">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button class="d-right" type="button" data-dir="right" aria-label="Rechts">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button class="d-down" type="button" data-dir="down" aria-label="Omlaag">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </div>

            <p class="key-legend">
              <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> lopen</span>
              <span><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> ook prima</span>
              <span>Loop naar een onderdeel voor uitleg</span>
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="cta-band reveal">
            <p class="eyebrow">Van verkennen naar doen</p>
            <h2>Klaar om je eigen energiesysteem te bouwen?</h2>
            <p class="lead">Je hebt net gezien hoe zon, panelen, batterij en woning samenwerken. Speel verder met de zon of bereken meteen jouw besparing.</p>
            <div class="button-row">
              <a class="btn btn-primary" href="<?php echo esc_url( climature_link( 'energiescan' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Doe de gratis energiescan
              </a>
              <a class="btn btn-secondary" href="<?php echo esc_url( climature_link( 'speel-met-de-zon' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                Speel met de zon
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
<?php
get_footer();
