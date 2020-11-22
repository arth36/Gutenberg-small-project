<?php

/**
    * 
    * Custom Gutenberg functions
    * 
*/

function gutenberg_project_default_colors(){
    add_theme_support(
        'editor-color-palette', 
        array(
            array(
                'name'  =>  'White',
                'slug'  =>  'white',
                'color' =>  '#ffffff'
            ),
            array(
                'name'  =>  'Black',
                'slug'  =>  'black',
                'color' =>  '#000000'
            ),
            array(
                'name'  =>  'Pink',
                'slug'  =>  'pink',
                'color' =>  '#ff4444'
            )
        )
    );

    add_theme_support(
        'editor-font-sizes',
        array(
            array(
                'name'  =>  'Normal',
                'slug'  =>  'normal',
                'size'  =>  16
            ),
            array(
                'name'  =>  'Large',
                'slug'  =>  'large',
                'size'  =>  24
            )
        )
    );
}

add_action( 'init', 'gutenberg_project_default_colors' );

function gutenberg_project_blocks(){
    wp_register_script( 'custom-cta-js', get_template_directory_uri() . '/build/index.js', 
        array( 'wp-blocks', 'wp-editor', 'wp-components' ) 
    );

    wp_register_style('custom-cta-css', get_template_directory_uri() . '/gutenberg-block-style.css', array());

    register_block_type( 'gutenberg-project/custom-cta', array(
        'editor_script' =>  'custom-cta-js',
        'style' =>  'custom-cta-css',
    ) );

    register_block_type( 'gutenberg-project/cover', array(
        'editor_script' =>  'custom-cta-js',
        'style' =>  'custom-cta-css',
    ) );


}
add_action( 'init', 'gutenberg_project_blocks' );