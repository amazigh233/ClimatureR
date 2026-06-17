<?php
/**
 * Fallback-template. Wordt zelden gebruikt — de inhoud draait via
 * front-page.php en de page-templates — maar is verplicht.
 *
 * @package Climature
 */

get_header();
?>
<main id="main">
	<section class="page-hero">
		<div class="container">
			<p class="eyebrow"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
			<h1><?php is_home() ? esc_html_e( 'Blog', 'climature' ) : the_archive_title(); ?></h1>
		</div>
	</section>

	<section class="section">
		<div class="container">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class( 'feature' ); ?>>
						<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
						<div><?php the_excerpt(); ?></div>
					</article>
					<?php
				endwhile;
				the_posts_pagination();
			else :
				?>
				<p class="lead"><?php esc_html_e( 'Geen inhoud gevonden.', 'climature' ); ?></p>
				<?php
			endif;
			?>
		</div>
	</section>
</main>
<?php
get_footer();
