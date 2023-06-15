<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<?php astra_content_bottom(); ?>
	</div> <!-- ast-container -->
	</div><!-- #content -->
<?php 
	astra_content_after();
		
	astra_footer_before();
		
	astra_footer();
		
	astra_footer_after(); 
?>
	</div><!-- #page -->
<?php 
	astra_body_bottom();    
	wp_footer(); 
?>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NC6QHLL"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<!--Whatsapp Floating Button Start-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 90px;
            right: 25px;
            background-color: #25d366;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            /*box-shadow: 2px 2px 3px #999;*/
            z-index: 100;
        }

        .my-float {
            margin-top: 16px;
			background-color: #25d366;
            color: #FFF;
        }
    </style>
<body>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <a href="https://api.whatsapp.com/send?phone=919873578748"
        class="float" target="_blank">
        <i class="fa fa-whatsapp my-float"></i>
    </a>
</body>
<!--Whatsapp Floating Button End-->
	</body>
</html>
