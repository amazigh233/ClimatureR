<?php
/**
 * Auto-provisioning bij thema-activatie: maakt de pagina's aan, koppelt de
 * juiste page-templates, zet Home als statische voorpagina en bouwt het
 * primaire menu. Draait één keer (gemarkeerd via een optie).
 *
 * @package Climature
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * De pagina's die het thema verwacht, in menu-volgorde.
 * slug => [ titel, template ('' = standaard/voorpagina) ]
 */
function climature_pages_config() {
	return array(
		'home'                => array( 'Home', '' ),
		'hoe-werken-wij'      => array( 'Hoe werken wij', 'page-templates/tmpl-hoe-werken-wij.php' ),
		'energie-in-beweging' => array( 'Energie in beweging', 'page-templates/tmpl-energie-in-beweging.php' ),
		'speel-met-de-zon'    => array( 'Speel met de zon', 'page-templates/tmpl-speel-met-de-zon.php' ),
		'verken'              => array( 'Verken', 'page-templates/tmpl-verken.php' ),
		'energiescan'         => array( 'Energiescan', 'page-templates/tmpl-energiescan.php' ),
	);
}

function climature_after_switch() {
	if ( get_option( 'climature_provisioned' ) ) {
		return;
	}

	$ids = array();

	foreach ( climature_pages_config() as $slug => $cfg ) {
		list( $title, $template ) = $cfg;

		$existing = get_page_by_path( $slug );
		if ( $existing ) {
			$page_id = $existing->ID;
		} else {
			$page_id = wp_insert_post(
				array(
					'post_title'   => $title,
					'post_name'    => $slug,
					'post_status'  => 'publish',
					'post_type'    => 'page',
					'post_content' => '',
				)
			);
		}

		if ( $page_id && ! is_wp_error( $page_id ) ) {
			if ( $template ) {
				update_post_meta( $page_id, '_wp_page_template', $template );
			}
			$ids[ $slug ] = $page_id;
		}
	}

	// Home als statische voorpagina.
	if ( isset( $ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
	}

	// Primair menu opbouwen.
	climature_build_menu( $ids );

	update_option( 'climature_provisioned', 1 );
}
add_action( 'after_switch_theme', 'climature_after_switch' );

/**
 * Maakt (indien nodig) het menu en koppelt het aan de 'primary'-locatie.
 *
 * @param array $ids slug => page ID.
 */
function climature_build_menu( $ids ) {
	$menu_name = 'Climature hoofdmenu';
	$menu      = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu ) {
		$menu_id = wp_create_nav_menu( $menu_name );
	} else {
		$menu_id = $menu->term_id;
		// Niet dubbel vullen als het menu al items heeft.
		$items = wp_get_nav_menu_items( $menu_id );
		if ( ! empty( $items ) ) {
			climature_assign_menu_location( $menu_id );
			return;
		}
	}

	if ( is_wp_error( $menu_id ) ) {
		return;
	}

	foreach ( climature_pages_config() as $slug => $cfg ) {
		if ( empty( $ids[ $slug ] ) ) {
			continue;
		}
		wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-title'     => $cfg[0],
				'menu-item-object'    => 'page',
				'menu-item-object-id' => $ids[ $slug ],
				'menu-item-type'      => 'post_type',
				'menu-item-status'    => 'publish',
			)
		);
	}

	climature_assign_menu_location( $menu_id );
}

/**
 * Koppelt een menu aan de 'primary'-themalocatie.
 *
 * @param int $menu_id menu term-id.
 */
function climature_assign_menu_location( $menu_id ) {
	$locations            = get_theme_mod( 'nav_menu_locations', array() );
	$locations['primary'] = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );
}
