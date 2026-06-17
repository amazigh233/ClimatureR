<?php
/**
 * 404 — branded "pagina niet gevonden".
 *
 * @package Climature
 */

get_header();
?>
<main id="main">
	<section class="page-hero" aria-labelledby="err-title">
		<div class="container">
			<p class="eyebrow"><?php esc_html_e( 'Pagina niet gevonden', 'climature' ); ?></p>
			<h1 id="err-title"><?php esc_html_e( 'Hier wekt niets op.', 'climature' ); ?></h1>
			<p class="lead"><?php esc_html_e( 'Deze pagina bestaat niet (meer). Ga terug naar huis of bekijk hoe Climature werkt.', 'climature' ); ?></p>
			<div class="button-row">
				<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11l9-8 9 8v10H5V11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
					<?php esc_html_e( 'Terug naar home', 'climature' ); ?>
				</a>
				<?php
				$scan = get_page_by_path( 'energiescan' );
				if ( $scan ) :
					?>
					<a class="btn btn-secondary" href="<?php echo esc_url( get_permalink( $scan ) ); ?>">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
						<?php esc_html_e( 'Doe de energiescan', 'climature' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();
