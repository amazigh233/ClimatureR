<?php
/**
 * Platte navigatie-walker: rendert het primaire menu als losse <a>-tags
 * (geen <ul>/<li>), zodat de bestaande `.main-nav a`-styling in site.css en
 * de mobiele toggle in site.js ongewijzigd blijven werken.
 *
 * @package Climature
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Climature_Nav_Walker extends Walker_Nav_Menu {

	/** Geen sub-niveaus. */
	public function start_lvl( &$output, $depth = 0, $args = null ) {}
	public function end_lvl( &$output, $depth = 0, $args = null ) {}

	/** Eén item = één <a>. */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$atts            = array();
		$atts['href']    = ! empty( $item->url ) ? $item->url : '';
		$atts['class']   = ''; // platte links; styling via .main-nav a.

		// Laat de nav_menu_link_attributes-filter toe (o.a. aria-current).
		$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

		$attributes = '';
		foreach ( $atts as $key => $value ) {
			if ( '' === $value && 'class' === $key ) {
				continue;
			}
			if ( is_scalar( $value ) && '' !== $value ) {
				$attributes .= ' ' . $key . '="' . esc_attr( $value ) . '"';
			}
		}

		$title = apply_filters( 'the_title', $item->title, $item->ID );

		$output .= '<a' . $attributes . '>' . esc_html( $title ) . '</a>';
	}

	/** Geen afsluitende markup nodig. */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}
