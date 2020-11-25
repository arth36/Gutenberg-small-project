<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
        <?php wp_head(); ?>
        <?php wp_enqueue_media(); ?>
    </head>
    <body>
<?php

$args = array(
    'post_type' =>  'post'
);

$post_query =new WP_Query( $args );

if($post_query -> have_posts()):
    while($post_query -> have_posts()):
        $post_query -> the_post();
        ?>
        <?php echo the_content(); ?>
        <?php
    endwhile;
endif;
?>
</body>
</html>