<?php
/**
 * Front page — home (omgezet uit Climature.html).
 * Hero-teksten en CTA's komen uit de Customizer (met defaults).
 * page-home.css wordt conditioneel ge-enqueued in functions.php.
 *
 * @package Climature
 */

get_header();

$hero_kicker = climature_text( 'climature_hero_kicker', 'Slimme energie voor thuis' );
$hero_title  = climature_text( 'climature_hero_title', 'Haal meer uit de zon.' );
$hero_copy   = climature_text( 'climature_hero_copy', 'Climature laat opwekken, opslaan en gebruiken samenwerken als één systeem — met blijvend inzicht in wat je woning doet.' );

$cta1_txt = climature_text( 'climature_hero_cta1_txt', 'Doe de gratis energiescan' );
$cta1_url = get_theme_mod( 'climature_hero_cta1_url', '' );
$cta1_url = $cta1_url ? $cta1_url : climature_link( 'energiescan' );

$cta2_txt = climature_text( 'climature_hero_cta2_txt', 'Hoe werken wij' );
$cta2_url = get_theme_mod( 'climature_hero_cta2_url', '' );
$cta2_url = $cta2_url ? $cta2_url : climature_link( 'hoe-werken-wij' );
?>
<main id="main">
	<section class="home-hero" aria-labelledby="home-title">
		<div class="home-hero-content">
			<div class="hero-lede">
				<p class="hero-kicker"><?php echo esc_html( $hero_kicker ); ?></p>
				<h1 id="home-title"><?php echo esc_html( $hero_title ); ?></h1>
				<p class="hero-copy"><?php echo esc_html( $hero_copy ); ?></p>
				<div class="button-row">
					<a class="btn btn-primary" href="<?php echo esc_url( $cta1_url ); ?>">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
						<?php echo esc_html( $cta1_txt ); ?>
					</a>
					<a class="btn btn-secondary" href="<?php echo esc_url( $cta2_url ); ?>">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5v14l11-7-11-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
						<?php echo esc_html( $cta2_txt ); ?>
					</a>
				</div>

				<div class="hero-metrics" aria-label="Climature speerpunten">
					<div class="metric">
						<strong>1</strong>
						<span>helder plan voor woning, installatie en energiegedrag</span>
					</div>
					<div class="metric">
						<strong>24/7</strong>
						<span>inzicht in opwek, opslag en verbruik</span>
					</div>
					<div class="metric">
						<strong>4</strong>
						<span>stappen van scan tot slimme monitoring</span>
					</div>
				</div>
			</div>

			<div class="hero-visual" aria-label="Live energiestroom van zon naar woning">
				<div class="hero-visual-head">
					<span class="hero-visual-title">Jouw energiestroom</span>
					<span class="hero-live" aria-hidden="true">LIVE</span>
				</div>
				<div class="hero-readout">
					<strong data-count-to="4.2" data-count-decimals="1">0.0</strong>
					<span>kW opwek &middot; nu actief</span>
				</div>
				<div class="hero-flow">
					<div class="hero-node node-sun">
						<span class="hero-node-ico">
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
						</span>
						<b>Zon</b>
						<small>opwek</small>
					</div>
					<div class="hero-node node-cell">
						<span class="hero-node-ico">
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M20 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 9.5l-2 3h3l-2 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</span>
						<b>Batterij</b>
						<small>opslag</small>
					</div>
					<div class="hero-node node-house">
						<span class="hero-node-ico">
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11l8-7 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9h12v-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 19v-4h4v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</span>
						<b>Woning</b>
						<small>gebruik</small>
					</div>
				</div>
				<div class="hero-stat">
					<span>Eigen verbruik <b>78%</b></span>
					<span>Vandaag bespaard <b>&euro;3,10</b></span>
				</div>
			</div>
		</div>
	</section>

	<section class="section section-alt" aria-labelledby="why-title">
		<div class="container">
			<div class="section-head reveal">
				<p class="eyebrow">Waarom Climature</p>
				<h2 id="why-title">Energie die logisch samenwerkt.</h2>
				<p class="lead">Niet nog een losse installatie, maar een praktische route naar meer grip: advies, plaatsing, opslag en inzicht in een systeem.</p>
			</div>
			<div class="feature-grid">
				<article class="feature reveal">
					<span class="feature-icon">01</span>
					<h3>Advies op maat</h3>
					<p>We kijken naar je dak, huishouden, piekmomenten en toekomstplannen voordat er een oplossing wordt gekozen.</p>
				</article>
				<article class="feature reveal" style="--reveal-delay: 90ms">
					<span class="feature-icon">02</span>
					<h3>Slim opslaan</h3>
					<p>Thuisbatterijen maken opgewekte energie bruikbaar op de momenten dat je die echt nodig hebt.</p>
				</article>
				<article class="feature reveal" style="--reveal-delay: 180ms">
					<span class="feature-icon">03</span>
					<h3>Blijvend inzicht</h3>
					<p>Monitoring maakt zichtbaar wat er gebeurt, zodat je systeem ook na installatie blijft presteren.</p>
				</article>
			</div>
		</div>
	</section>

	<section class="section" aria-labelledby="services-title">
		<div class="container split-band">
			<div class="reveal">
				<p class="eyebrow">Van dak naar dagelijks gebruik</p>
				<h2 id="services-title">Je woning als klein energiesysteem.</h2>
				<p class="lead">Climature verbindt techniek met begrijpelijke keuzes. Zo weet je wat zin heeft, wat nu kan en wat later schaalbaar blijft.</p>
				<div class="button-row">
					<a class="btn btn-primary" href="<?php echo esc_url( climature_link( 'hoe-werken-wij' ) ); ?>">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
						Proces bekijken
					</a>
				</div>
			</div>
			<div class="power-map reveal" style="--reveal-delay: 120ms" aria-label="Visuele energiekaart">
				<span class="power-map-live" aria-hidden="true">LIVE</span>
				<span class="flow-line flow-a"></span>
				<span class="flow-line flow-b"></span>
				<div class="power-node node-sun" data-tip="Zonnepanelen wekken stroom op">Zon<small>opwek</small></div>
				<div class="power-node node-battery" data-tip="Batterij slaat energie op voor later">Batterij<small>opslag</small></div>
				<div class="power-node node-home" data-tip="Woning gebruikt slimme eigen energie">Woning<small>gebruik</small></div>
			</div>
		</div>
	</section>

	<section class="section section-alt" aria-labelledby="unique-title">
		<div class="container">
			<div class="section-head reveal">
				<p class="eyebrow">Onderscheidende ervaring</p>
				<h2 id="unique-title">Zie wat energie doet.</h2>
				<p class="lead">De nieuwe energiepagina laat de route van stroom door de woning voelen: opwek, opslag, gebruik en inzicht.</p>
			</div>
			<div class="service-grid">
				<article class="service reveal">
					<span class="service-tag">PV</span>
					<h3>Opwekken</h3>
					<p>Zonnepanelen leveren het startpunt voor een slimmer huishouden.</p>
				</article>
				<article class="service reveal" style="--reveal-delay: 90ms">
					<span class="service-tag">BAT</span>
					<h3>Opslaan</h3>
					<p>Een batterij houdt energie beschikbaar wanneer de zon niet levert.</p>
				</article>
				<article class="service reveal" style="--reveal-delay: 180ms">
					<span class="service-tag">APP</span>
					<h3>Monitoren</h3>
					<p>Inzicht maakt verbruik begrijpelijk en helpt keuzes beter timen.</p>
				</article>
			</div>
			<div class="button-row">
				<a class="btn btn-secondary" href="<?php echo esc_url( climature_link( 'energie-in-beweging' ) ); ?>">
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"/></svg>
					Open energie in beweging
				</a>
			</div>
		</div>
	</section>

	<section class="section" aria-labelledby="cta-title">
		<div class="container">
			<div class="cta-band reveal">
				<p class="eyebrow">Klaar voor de volgende stap</p>
				<h2 id="cta-title">Van idee naar werkend energiesysteem.</h2>
				<p class="lead">Bekijk hoe Climature werkt of verken zelf een Climature-woning.</p>
				<div class="button-row">
					<a class="btn btn-primary" href="<?php echo esc_url( climature_link( 'hoe-werken-wij' ) ); ?>">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5v14l11-7-11-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
						Bekijk uitleg
					</a>
					<a class="btn btn-secondary" href="<?php echo esc_url( climature_link( 'verken' ) ); ?>">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
						Verken Climature
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();
