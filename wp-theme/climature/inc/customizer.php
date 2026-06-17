<?php
/**
 * Customizer — bewerkbare kernteksten (hero, CTA's, contact, footer).
 * Defaults = de oorspronkelijke prototype-teksten, zodat het ontwerp
 * identiek blijft wanneer er niets is ingevuld.
 *
 * @package Climature
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function climature_customize_register( $wp_customize ) {

	$wp_customize->add_panel(
		'climature_content',
		array(
			'title'    => __( 'Climature — Inhoud', 'climature' ),
			'priority' => 30,
		)
	);

	/* ---------- Home hero ---------- */
	$wp_customize->add_section(
		'climature_hero',
		array(
			'title' => __( 'Home — hero', 'climature' ),
			'panel' => 'climature_content',
		)
	);

	$hero_fields = array(
		'climature_hero_kicker'   => array( 'Slimme energie voor thuis', __( 'Kicker', 'climature' ) ),
		'climature_hero_title'    => array( 'Haal meer uit de zon.', __( 'Titel', 'climature' ) ),
		'climature_hero_copy'     => array( 'Climature laat opwekken, opslaan en gebruiken samenwerken als één systeem — met blijvend inzicht in wat je woning doet.', __( 'Introtekst', 'climature' ) ),
		'climature_hero_cta1_txt' => array( 'Doe de gratis energiescan', __( 'Knop 1 — tekst', 'climature' ) ),
		'climature_hero_cta1_url' => array( '', __( 'Knop 1 — URL (leeg = Energiescan)', 'climature' ) ),
		'climature_hero_cta2_txt' => array( 'Hoe werken wij', __( 'Knop 2 — tekst', 'climature' ) ),
		'climature_hero_cta2_url' => array( '', __( 'Knop 2 — URL (leeg = Hoe werken wij)', 'climature' ) ),
	);

	foreach ( $hero_fields as $id => $cfg ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $cfg[0],
				'sanitize_callback' => ( false !== strpos( $id, '_url' ) ) ? 'esc_url_raw' : 'sanitize_text_field',
				'transport'         => 'refresh',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'   => $cfg[1],
				'section' => 'climature_hero',
				'type'    => ( false !== strpos( $id, '_copy' ) ) ? 'textarea' : 'text',
			)
		);
	}

	/* ---------- Contact ---------- */
	$wp_customize->add_section(
		'climature_contact',
		array(
			'title' => __( 'Contactgegevens', 'climature' ),
			'panel' => 'climature_content',
		)
	);

	$contact_fields = array(
		'climature_contact_email' => array( 'hallo@climature.nl', __( 'E-mailadres', 'climature' ), 'sanitize_email' ),
		'climature_contact_phone' => array( '', __( 'Telefoonnummer', 'climature' ), 'sanitize_text_field' ),
	);

	foreach ( $contact_fields as $id => $cfg ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $cfg[0],
				'sanitize_callback' => $cfg[2],
				'transport'         => 'refresh',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'   => $cfg[1],
				'section' => 'climature_contact',
				'type'    => 'text',
			)
		);
	}

	/* ---------- Footer ---------- */
	$wp_customize->add_section(
		'climature_footer',
		array(
			'title' => __( 'Footer', 'climature' ),
			'panel' => 'climature_content',
		)
	);

	$wp_customize->add_setting(
		'climature_footer_tagline',
		array(
			'default'           => 'Climature - kracht uit de natuur',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		'climature_footer_tagline',
		array(
			'label'   => __( 'Footer-tagline', 'climature' ),
			'section' => 'climature_footer',
			'type'    => 'text',
		)
	);
}
add_action( 'customize_register', 'climature_customize_register' );
