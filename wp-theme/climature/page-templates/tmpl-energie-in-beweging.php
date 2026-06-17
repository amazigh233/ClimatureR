<?php
/**
 * Template Name: Energie in beweging
 *
 * @package Climature
 */
get_header();
?>
    <main id="main">
      <section class="energy-stage" aria-labelledby="flow-title">
        <div class="energy-canvas-wrap">
          <div data-energy-flow aria-hidden="true"></div>
          <div class="energy-overlay"></div>

          <div class="energy-title">
            <p class="eyebrow">Energie in beweging</p>
            <h1 id="flow-title">Verken je energiesysteem.</h1>
            <p class="lead">Sleep om rond te kijken, zoom in en klik op een onderdeel &mdash; zie hoe opwek, opslag, gebruik en inzicht samenwerken.</p>
          </div>

          <p class="drag-hint" data-drag-hint aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v6m0 0L9.5 6.5M12 9l2.5-2.5M3 12h6m-6 0l2.5-2.5M3 12l2.5 2.5M21 12h-6m6 0l-2.5-2.5M21 12l-2.5 2.5M12 21v-6m0 6l-2.5-2.5M12 21l2.5-2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Sleep om te draaien &middot; scroll om te zoomen &middot; klik een fase
          </p>

          <div class="stage-panel" data-stage-panel aria-live="polite">
            <p class="stage-panel-eyebrow" data-panel-eyebrow></p>
            <h2 data-panel-title></h2>
            <p data-panel-text></p>
          </div>

          <nav class="stage-nav" aria-label="Energiefases">
            <button type="button" class="stage-btn" data-stage="opwek"><span class="stage-btn-num">01</span> Opwek</button>
            <button type="button" class="stage-btn" data-stage="opslag"><span class="stage-btn-num">02</span> Opslag</button>
            <button type="button" class="stage-btn" data-stage="gebruik"><span class="stage-btn-num">03</span> Gebruik</button>
            <button type="button" class="stage-btn" data-stage="monitoring"><span class="stage-btn-num">04</span> Inzicht</button>
          </nav>

          <div class="flow-fallback" aria-label="Energieroute">
            <article class="fallback-card">
              <span class="service-tag">01</span>
              <h3>Opwek</h3>
              <p>Zonnepanelen leveren duurzame stroom voor direct gebruik of opslag.</p>
            </article>
            <article class="fallback-card">
              <span class="service-tag">02</span>
              <h3>Opslag</h3>
              <p>De thuisbatterij bewaart energie voor avonduren en piekmomenten.</p>
            </article>
            <article class="fallback-card">
              <span class="service-tag">03</span>
              <h3>Gebruik</h3>
              <p>De woning gebruikt beschikbare energie op het moment dat die waardevol is.</p>
            </article>
            <article class="fallback-card">
              <span class="service-tag">04</span>
              <h3>Inzicht</h3>
              <p>Monitoring laat zien hoe het systeem presteert en waar winst zit.</p>
            </article>
          </div>
        </div>

        <!-- Copy source read by energy-flow.js for the active-stage panel -->
        <div class="stage-copy-data" hidden>
          <span data-stage-copy="opwek" data-eyebrow="01 &mdash; Opwek" data-title="Zon wordt bruikbare stroom.">Het dak levert de basis. Climature kijkt naar ligging, opbrengst en het dagelijkse patroon van de woning.</span>
          <span data-stage-copy="opslag" data-eyebrow="02 &mdash; Opslag" data-title="Overdag laden, later gebruiken.">Een thuisbatterij maakt zonnestroom beschikbaar wanneer de woning er meer aan heeft.</span>
          <span data-stage-copy="gebruik" data-eyebrow="03 &mdash; Gebruik" data-title="De woning kiest slimmer.">Apparaten, laadmomenten en basisverbruik worden gevoed vanuit de meest logische bron.</span>
          <span data-stage-copy="monitoring" data-eyebrow="04 &mdash; Inzicht" data-title="Elke stroomstap wordt zichtbaar.">Monitoring maakt prestaties, verbruik en optimalisatie begrijpelijk voor bewoners.</span>
        </div>
      </section>

      <section class="section" aria-labelledby="flow-cta-title">
        <div class="container">
          <div class="cta-band">
            <p class="eyebrow">WordPress-ready concept</p>
            <h2 id="flow-cta-title">Een opvallende pagina met een duidelijke route.</h2>
            <p class="lead">Deze ervaring staat los als prototypepagina en kan later als WordPress template met dezelfde hooks worden opgebouwd.</p>
            <div class="button-row">
              <a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11l9-8 9 8v10H5V11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                Terug naar home
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
