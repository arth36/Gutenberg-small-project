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

function gutenberg_project_blocks(){
    wp_register_script( 'custom-cta-js', get_template_directory_uri() . '/build/index.js', 
        array( 'wp-blocks', 'wp-editor', 'wp-components', 'wp-api-fetch', 'wp-compose', ) 
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

    register_block_type( 'gutenberg-project/portfolio', array(
        'editor_script' =>  'custom-cta-js',
        'style' =>  'custom-cta-css',
        'render_callback' => 'render_portfolio_block',
    ) );

}
add_action( 'init', 'gutenberg_project_blocks' );

function render_portfolio_block( $attributes ){
    ob_start();
    ?>

<div class="portfolio_section">
<div class="container-wrapper">
    <div class="portfolio_upper">
        <div class="portfolio_upper_left">
            <p class="portfolio_upper_title"><?php echo $attributes['portfolioBlockTitle'] ?></p>
        </div>
    </div>
    <hr class="other_hr"/>
    <?php

    $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;

        $args = array(
            'post_type'     => 'portfolio',
            'post_status'   => 'publish',
            'order'       => 'asc',
            'posts_per_page' => $attributes['postPerPage'],
            'paged' => $paged, 
        );
        $posts = new WP_Query($args);
        $count = count(get_posts($args));
        if ( $posts -> have_posts() ) :
    ?>
    <div class="vertical">
    <?php
            for($i=0;$i<$count/3;$i++){
            
    ?>
        <div class="horizontal">
            <?php
                for($j=0;$j<3;$j++){
                    $posts -> the_post();
                    if(has_post_thumbnail()):
            ?>
                
                    <img class="port_img" src="<?php echo the_post_thumbnail_url(); ?>" />  
                
            <?php
            
            endif;
        }
            ?>
        </div>
    <?php        
        }
        ?>
        <div class="pagination_bar">
        <?php
        echo paginate_links( array(
            'total' => $posts->max_num_pages
        ) );
    ?>
        </div>
    
    </div>
    <?php
        else:
    ?>
            <div>
                <h1>No Portfolio Found.</h1>
            </div>
    <?php
        endif;
    ?>
</div>
</div>

    <?php
    return ob_get_clean();
}

add_action( 'init', 'gutenberg_project_default_colors' );