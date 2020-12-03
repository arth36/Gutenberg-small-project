<?php

require get_template_directory() . '/inc/gutenberg.php';

function gutenberg_theme_setup() { 
    add_theme_support( 'post-thumbnails'); 
    add_post_type_support( 'page', 'excerpt' );
} 
add_action( 'after_setup_theme', 'gutenberg_theme_setup' );

function gutenberg_custom_portfolio_posttype(){

    $labels = array(
        'name'                    =>    __('Portfolio','gutenberg_project'),
        'singular_name'           =>    __('Portfolio','gutenberg_project'),
        'add_new'                 =>    __('Add Item','gutenberg_project'),
        'all_items'               =>    __('All Items','gutenberg_project'),
        'add_new_item'            =>    __('Add item','gutenberg_project'),
        'edit_item'               =>    __('Edit Item','gutenberg_project'),
        'new_item'                =>    __('New Item','gutenberg_project'),
        'view_item'               =>    __('View Item','gutenberg_project'),       
        'search_item'             =>    __('Search Item','gutenberg_project'),
        'not_found'               =>    __('No Items Found','gutenberg_project'),
        'not_found_in_trash'      =>    __('No Items Found In Trash','gutenberg_project'),
        'parent_item_colon'       =>    __('Parent Item','gutenberg_project'),
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