<?php

require get_template_directory() . '/inc/gutenberg.php';

function gutenberg_theme_setup() { 
    add_theme_support( 'post-thumbnails'); 
    add_post_type_support( 'page', 'excerpt' );
} 
add_action( 'after_setup_theme', 'gutenberg_theme_setup' );

function gutenberg_custom_portfolio_posttype(){

    $labels = array(
        'name'                    => 'Portfolio',
        'singular_name'           => 'Portfolio',
        'add_new'                 => 'Add Item',
        'all_items'               => 'All Items',
        'add_new_item'            => 'Add item',
        'edit_item'               => 'Edit Item',
        'new_item'                => 'New Item',
        'view_item'               => 'View Item',       
        'search_item'             => 'Search Item',
        'not_found'               => 'No Items Found',
        'not_found_in_trash'      => 'No Items Found In Trash',
        'parent_item_colon'       => 'Parent Item',
    );

    $args = array(
        'labels'                    => $labels,
        'public'                    => true,
        'show_in_rest'              => true,
        'has_archive'               => true,
        'publicly_queryable'        => true,
        'query_var'                 => true,
        'rewrite'                   => true,
        'capability_type'           => 'post',
        'hierarchical'              => false,
        'supports'                   => array(
            'title',
            'editor',
            'excerpt',
            'thumbnail',
            'revisions',
            'comments',
        ),
        'taxonomies'                => array(
            'category',
            'post_tag',
        ),
        'menu_position'             => 5,
        'exclude_from_search'       => false,
    );

    register_post_type( 'portfolio', $args );

}

add_action( 'init', 'gutenberg_custom_portfolio_posttype' );