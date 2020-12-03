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
                'name'  =>  __('White','gutenberg_project'),
                'slug'  =>  'white',
                'color' =>  '#ffffff'
            ),
            array(
                'name'  =>  __('Black','gutenberg_project'),
                'slug'  =>  'black',
                'color' =>  '#000000'
            ),
            array(
                'name'  =>  __('Pink','gutenberg_project'),
                'slug'  =>  'pink',
                'color' =>  '#ff4444'
            )
        )
    );

    add_theme_support(
        'editor-font-sizes',
        array(
            array(
                'name'  =>  __('Normal','gutenberg_project'),
                'slug'  =>  'normal',
                'size'  =>  16
            ),
            array(
                'name'  =>  __('Large','gutenberg_project'),
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

    wp_register_script( 'custom-cover-js', get_template_directory_uri() . '/build/index.js', 
        array( 'wp-blocks', 'wp-editor', 'wp-components', 'wp-api-fetch', 'wp-compose', ) 
    );

    wp_register_script( 'custom-portfolio-js', get_template_directory_uri() . '/build/index.js', 
        array( 'wp-blocks', 'wp-editor', 'wp-components', 'wp-api-fetch', 'wp-compose', ) 
    );

    wp_register_style('custom-cta-css', get_template_directory_uri() . '/gutenberg-block-style.css', array());

    register_block_type( 'gutenberg-project/custom-cta', array(
        'editor_script' =>  'custom-cta-js',
        'style' =>  'custom-cta-css',
    ) );

    register_block_type( 'gutenberg-project/cover', array(
        'editor_script' =>  'custom-cover-js',
        'style' =>  'custom-cta-css',
    ) );

    register_block_type( 'gutenberg-project/portfolio', array(
        'editor_script' =>  'custom-portfolio-js',
        'style' =>  'custom-cta-css',
        'render_callback' => 'render_portfolio_block',
    ) );

}
add_action( 'init', 'gutenberg_project_blocks' );

function render_portfolio_block( $attributes ){
    ob_start();
    ?>

<div class="portfolio_section" id="portfolio_section">
    <div class="container-wrapper">
        <div class="portfolio_upper">
            <div class="portfolio_upper_left">
                <p class="portfolio_upper_title"><?php echo $attributes['portfolioBlockTitle'] ?></p>
            </div>
        </div>
        <hr class="other_hr"/>
        <?php

            $paged = get_query_var( 'page' ) ? get_query_var( 'page' ) : 1;

            $args = array(
                'post_type'     => 'portfolio',
                'post_status'   => 'publish',
                'order'       => 'asc',
                'posts_per_page' => $attributes['postPerPage'],
                'paged' => $paged, 
            );
            $posts = new WP_QUERY($args);
            $count = count(get_posts($args));
            
            if ( $posts -> have_posts() ) :
        ?>
        <div class="vertical">
        <?php
                $k=0;
                for($i=0;$i<$count/3;$i++){
                
        ?>
            <div class="horizontal">
                <?php
                    for($j=0;$j<3;$j++){
                        $k++;
                        $posts -> the_post();
                        if(has_post_thumbnail()):
                ?>
                    <div class="imgcontainer">
                    
                        <a href="#img<?php echo $k; ?>"><img class="port_img" src="<?php echo the_post_thumbnail_url(); ?>" /></a>
                        
                    </div>

                    <div class="lightbox" id="img<?php echo $k; ?>">
                        <a class="close_out" href="#portfolio_section"></a>
                        <div class="box">
	                        <a class="close" href="#portfolio_section"><?php echo __('X', 'wprtt'); ?></a>
                            <br/>
                            <div class="content">
                            	<img class="lightbox_img" src="<?php echo the_post_thumbnail_url(); ?>"/> 
                            </div>
                            <div class="title_container">
                            <a class="prev_button" href="#img<?php echo $k-1; ?>"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/prev.png" /></a>
                                <p class="title"><?php echo the_title(); ?></p>
                                <?php 
                                    if(! ($k % $count) == 0){
                                        ?>
                                        <a class="next_button" href="#img<?php echo $k+1; ?>"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/next.png" /></a>
                                    <?php
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                    
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
                'total' => $posts->max_num_pages,
                'current' => max( 1, $paged ),
            ) );
        ?>
            </div>
        
        </div>
        <?php
            else:
        ?>
                <div>
                    <h1><?php echo __('No Portfolio Found.', 'gutenberg_project'); ?></h1>
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