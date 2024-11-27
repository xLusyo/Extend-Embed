<?php

/**
 * Plugin Name:         Embed Ext.
 * Description:         Extending embed block. 
 * Version:             0.1.0
 * Requires at least:   6.5
 */


function enquee_embed_editor_assets () {
    $asset_file = include plugin_dir_path(__FILE__) . '/build/index.asset.php';

    wp_enqueue_script(
        'extend-embed',
        plugin_dir_url(__FILE__) . '/build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );
}

add_action('enqueue_block_editor_assets', 'enquee_embed_editor_assets');

function addEmbedHeightAttribute( $args, $block_type ) {

    // Only add the attribute to Image blocks.
    if ( $block_type === 'core/embed' ) {
        if ( ! isset( $args['attributes'] ) ) {
            $args['attributes'] = array();
        }

        $args['attributes']['height'] = array(
            'type'    => 'number',
            'default' => '100px',
        );
    }

    return $args;
}
add_filter( 'register_block_type_args', 'addEmbedHeightAttribute', 10, 2 );

function addHeightToIframe ( $block_content, $block ){ 
    $is_core_embed = $block['attrs']['height'] ?? false;

    if($is_core_embed) {
        $processor = new WP_HTML_Tag_Processor( $block_content );

        if ($processor->next_tag('iframe')) {
            $processor->set_attribute('style', 'height:'. $block['attrs']['height']);
        }
        return $processor->get_updated_html();
    }
    return $block_content;
}

add_filter( 'render_block_core/embed', 'addHeightToIframe', 10, 2 );