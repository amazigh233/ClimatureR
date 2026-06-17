<?php
/**
 * Header: <head>, skip-link, site-header met merk en primaire navigatie.
 * Opent .site-shell en sluit na </header> (de templates renderen <main>).
 *
 * @package Climature
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php if ( function_exists( 'wp_body_open' ) ) { wp_body_open(); } ?>
<a class="skip-link" href="#main"><?php esc_html_e( 'Naar inhoud', 'climature' ); ?></a>
<div class="site-shell">
	<header class="site-header">
		<div class="nav-wrap">
			<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Climature home">
				<svg class="brand-mark" viewBox="0 0 110 110" fill="none" aria-hidden="true">
					<path d="M27 56 L27 90 L83 90 L83 56" stroke="#FAFBF7" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
					<path d="M19 59 L55 30 L91 59" stroke="#FAFBF7" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
					<path d="M61 40 C61 23 76 15 92 13 C88 28 77 38 61 40 Z" fill="#B6D72A"/>
					<path d="M60 49 L42 73 L54 73 L48 92 L72 62 L59 62 L66 49 Z" fill="#B6D72A"/>
				</svg>
				<span class="brand-name">CLIMATURE</span>
			</a>
			<button class="nav-toggle" type="button" aria-label="<?php esc_attr_e( 'Menu openen', 'climature' ); ?>" aria-expanded="false" data-nav-toggle><span></span></button>
			<nav class="main-nav" aria-label="<?php esc_attr_e( 'Hoofdnavigatie', 'climature' ); ?>" data-main-nav>
				<?php
				if ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'items_wrap'     => '%3$s',
							'walker'         => new Climature_Nav_Walker(),
							'fallback_cb'    => false,
						)
					);
				}
				?>
			</nav>
		</div>
	</header>
