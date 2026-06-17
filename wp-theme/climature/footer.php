<?php
/**
 * Footer: site-footer + sluit .site-shell. Roept wp_footer() aan.
 *
 * @package Climature
 */
?>
	<footer class="site-footer">
		<div class="footer-wrap">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>">CLIMATURE</a>
			<span>&copy; <?php echo esc_html( climature_text( 'climature_footer_tagline', 'Climature - kracht uit de natuur' ) ); ?></span>
		</div>
	</footer>
</div><!-- /.site-shell -->
<?php wp_footer(); ?>
</body>
</html>
