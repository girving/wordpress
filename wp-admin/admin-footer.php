<?php
/**
 * WordPress Administration Template Footer
 *
 * @package WordPress
 * @subpackage Administration
 */
?>

<br class="clear" /></div><!-- wpbody-content -->
</div><!-- wpbody -->
<br class="clear" /></div><!-- wpcontent -->
</div><!-- wpwrap -->

<div id="footer">
<p><?php
do_action('in_admin_footer', '');
$upgrade = apply_filters( 'update_footer', '' );
echo __('Thank you for creating with <a href="http://wordpress.org/">WordPress</a>').' | '.__('<a href="http://codex.wordpress.org/">Documentation</a>').' | '.__('<a href="http://wordpress.org/support/forum/4">Feedback</a>').' '.$upgrade;

$quick_edit_help = array( 'edit.php', 'edit-pages.php', 'edit-comments.php', 'edit-tags.php', 'categories.php', 'edit-link-categories.php' );
if ( in_array($pagenow, $quick_edit_help) )
	echo '<br />' . __('Hint: double-click on a row to open Quick Edit.');
?></p>
</div>
<?php do_action('admin_footer', ''); ?>
<script type="text/javascript">if(typeof wpOnload=='function')wpOnload();</script>
</body>
</html>
