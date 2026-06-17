<?php
/**
 * Climature theme — bootstrap.
 *
 * @package Climature
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CLIMATURE_VERSION', '1.0.0' );
define( 'CLIMATURE_DIR', get_template_directory() );
define( 'CLIMATURE_URI', get_template_directory_uri() );

/* -------------------------------------------------------------------------
 * Theme setup
 * ---------------------------------------------------------------------- */
function climature_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	register_nav_menus(
		array(
			'primary' => __( 'Hoofdnavigatie', 'climature' ),
		)
	);
}
add_action( 'after_setup_theme', 'climature_setup' );

/* -------------------------------------------------------------------------
 * Assets — globaal + conditioneel per template
 * ---------------------------------------------------------------------- */
function climature_assets() {
	$css = CLIMATURE_URI . '/assets/css';
	$js  = CLIMATURE_URI . '/assets/js';

	// Google Fonts (zelfde families als het prototype).
	wp_enqueue_style(
		'climature-fonts',
		'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	// Basis-stylesheet (globaal).
	wp_enqueue_style( 'climature-base', $css . '/site.css', array(), CLIMATURE_VERSION );

	// Het verplichte style.css (WP-header + kleine aanvullingen).
	wp_enqueue_style( 'climature-theme', get_stylesheet_uri(), array( 'climature-base' ), CLIMATURE_VERSION );

	// Globale JS (nav-toggle, scroll-reveal, count-up). Defer + footer.
	wp_enqueue_script( 'climature-site', $js . '/site.js', array(), CLIMATURE_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );

	// --- Conditioneel ---
	if ( is_front_page() ) {
		wp_enqueue_style( 'climature-home', $css . '/page-home.css', array( 'climature-base' ), CLIMATURE_VERSION );
	}

	if ( is_page_template( 'page-templates/tmpl-speel-met-de-zon.php' ) ) {
		wp_enqueue_style( 'climature-speel', $css . '/page-speel.css', array( 'climature-base' ), CLIMATURE_VERSION );
		wp_enqueue_script( 'climature-sun', $js . '/sun-sandbox.js', array(), CLIMATURE_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
	}

	if ( is_page_template( 'page-templates/tmpl-verken.php' ) ) {
		wp_enqueue_style( 'climature-verken', $css . '/page-verken.css', array( 'climature-base' ), CLIMATURE_VERSION );
		wp_enqueue_script( 'climature-explore', $js . '/explore-game.js', array(), CLIMATURE_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
	}

	if ( is_page_template( 'page-templates/tmpl-energiescan.php' ) ) {
		wp_enqueue_style( 'climature-scan', $css . '/page-energiescan.css', array( 'climature-base' ), CLIMATURE_VERSION );
		wp_enqueue_script( 'climature-scan', $js . '/energiescan.js', array( 'climature-site' ), CLIMATURE_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
	}

	if ( is_page_template( 'page-templates/tmpl-energie-in-beweging.php' ) ) {
		// ES-module; importeert three relatief via ../vendor/three/three.module.js.
		wp_enqueue_script( 'climature-energyflow', $js . '/energy-flow.js', array(), CLIMATURE_VERSION, array( 'in_footer' => true ) );
	}
}
add_action( 'wp_enqueue_scripts', 'climature_assets' );

/**
 * Laad energy-flow.js als ES-module (nodig voor de relatieve three-import).
 */
function climature_module_type( $tag, $handle ) {
	if ( 'climature-energyflow' === $handle ) {
		$tag = str_replace( ' src=', ' type="module" src=', $tag );
	}
	return $tag;
}
add_filter( 'script_loader_tag', 'climature_module_type', 10, 2 );

/**
 * Geef het actieve menu-item aria-current="page".
 */
function climature_nav_aria_current( $atts, $item ) {
	if ( in_array( 'current-menu-item', (array) $item->classes, true ) ) {
		$atts['aria-current'] = 'page';
	}
	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'climature_nav_aria_current', 10, 2 );

/**
 * Body-class voor de 3D-energiepagina (origineel: <body class="energy-page">).
 */
function climature_body_class( $classes ) {
	if ( is_page_template( 'page-templates/tmpl-energie-in-beweging.php' ) ) {
		$classes[] = 'energy-page';
	}
	return $classes;
}
add_filter( 'body_class', 'climature_body_class' );

/* -------------------------------------------------------------------------
 * Includes
 * ---------------------------------------------------------------------- */
require_once CLIMATURE_DIR . '/inc/class-nav-walker.php';
require_once CLIMATURE_DIR . '/inc/customizer.php';
require_once CLIMATURE_DIR . '/inc/theme-setup.php';

/* -------------------------------------------------------------------------
 * Kleine helper: haal een Customizer-tekst op met fallback.
 * ---------------------------------------------------------------------- */
function climature_text( $key, $default = '' ) {
	$value = get_theme_mod( $key, $default );
	return '' === $value ? $default : $value;
}

/**
 * Permalink voor een interne pagina op slug (met fallback naar home).
 *
 * @param string $slug pagina-slug, of 'home'.
 * @return string URL.
 */
function climature_link( $slug ) {
	if ( '' === $slug || 'home' === $slug ) {
		return home_url( '/' );
	}
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' );
}
