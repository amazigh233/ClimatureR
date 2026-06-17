<?php
/**
 * Generieke pagina-template (voor Pages zonder eigen page-template).
 *
 * @package Climature
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<main id="main">
		<section class="page-hero" aria-labelledby="page-title">
			<div class="container">
				<p class="eyebrow"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
				<h1 id="page-title"><?php the_title(); ?></h1>
			</div>
		</section>

		<?php if ( trim( get_the_content() ) ) : ?>
		<section class="section">
			<div class="container">
				<div class="lead"><?php the_content(); ?></div>
			</div>
		</section>
		<?php endif; ?>
	</main>
	<?php
endwhile;

get_footer();
