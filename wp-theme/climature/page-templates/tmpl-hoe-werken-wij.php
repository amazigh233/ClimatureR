<?php
/**
 * Template Name: Hoe werken wij
 *
 * @package Climature
 */
get_header();
?>
    <main id="main">
      <section class="page-hero" aria-labelledby="process-title">
        <div class="container">
          <p class="eyebrow">Hoe werken wij</p>
          <h1 id="process-title">Van woningcheck naar slimme opslag.</h1>
          <p class="lead">Een helder proces voorkomt losse keuzes. Climature brengt je woning, opwek en verbruik samen in een advies dat uitvoerbaar blijft.</p>
        </div>
      </section>

      <section class="section" aria-labelledby="video-title">
        <div class="container process-layout">
          <div>
            <div class="section-head">
              <p class="eyebrow">Proces</p>
              <h2 id="video-title">Vier stappen, een werkend systeem.</h2>
            </div>
            <div class="step-grid">
              <article class="step-card">
                <span class="step-num">01</span>
                <h3>Inventarisatie</h3>
                <p>We verzamelen de basis: dak, meterkast, huidig verbruik, wensen en beschikbare ruimte voor techniek.</p>
              </article>
              <article class="step-card">
                <span class="step-num">02</span>
                <h3>Ontwerp</h3>
                <p>Daarna vertalen we de situatie naar een logisch systeem met zonnepanelen, batterijcapaciteit en monitoring.</p>
              </article>
              <article class="step-card">
                <span class="step-num">03</span>
                <h3>Installatie</h3>
                <p>De gekozen oplossing wordt voorbereid, geplaatst en gecontroleerd met oog voor veiligheid en uitbreidbaarheid.</p>
              </article>
              <article class="step-card">
                <span class="step-num">04</span>
                <h3>Inzicht</h3>
                <p>Na oplevering blijft zichtbaar wat de woning opwekt, opslaat en gebruikt, zodat het systeem begrijpelijk blijft.</p>
              </article>
            </div>
          </div>

          <aside class="video-frame" aria-label="Uitlegvideo">
            <video controls preload="metadata" playsinline>
              <source src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/video/BatteryVideoVoice.mp4" type="video/mp4">
              Je browser ondersteunt deze video niet. Het videobestand staat in assets/video/BatteryVideoVoice.mp4.
            </video>
            <p class="video-caption">Deze uitlegvideo is lokaal opgenomen in het prototype en kan later als WordPress media-asset worden gebruikt.</p>
          </aside>
        </div>
      </section>

      <section class="section section-alt" aria-labelledby="after-title">
        <div class="container">
          <div class="cta-band">
            <p class="eyebrow">Na de uitleg</p>
            <h2 id="after-title">Maak energie zichtbaar.</h2>
            <p class="lead">De 3D energiepagina laat hetzelfde verhaal op een opvallende manier zien: van dak naar batterij, woning en monitoring.</p>
            <div class="button-row">
              <a class="btn btn-primary" href="<?php echo esc_url( climature_link( 'energie-in-beweging' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h4l2-6 4 12 2-6h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Bekijk energie in beweging
              </a>
              <a class="btn btn-secondary" href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11l9-8 9 8v10H5V11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                Terug naar home
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
<?php
get_footer();
