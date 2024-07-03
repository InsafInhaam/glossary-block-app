<?php

function create_glossary_post_type() {
    $labels = array(
        'name'               => _x( 'Glossary', 'post type general name', 'your-text-domain' ),
        'singular_name'      => _x( 'Glossary Term', 'post type singular name', 'your-text-domain' ),
        'menu_name'          => _x( 'Glossary', 'admin menu', 'your-text-domain' ),
        'name_admin_bar'     => _x( 'Glossary Term', 'add new on admin bar', 'your-text-domain' ),
        'add_new'            => _x( 'Add New', 'glossary term', 'your-text-domain' ),
        'add_new_item'       => __( 'Add New Glossary Term', 'your-text-domain' ),
        'new_item'           => __( 'New Glossary Term', 'your-text-domain' ),
        'edit_item'          => __( 'Edit Glossary Term', 'your-text-domain' ),
        'view_item'          => __( 'View Glossary Term', 'your-text-domain' ),
        'all_items'          => __( 'All Glossary Terms', 'your-text-domain' ),
        'search_items'       => __( 'Search Glossary Terms', 'your-text-domain' ),
        'parent_item_colon'  => __( 'Parent Glossary Terms:', 'your-text-domain' ),
        'not_found'          => __( 'No glossary terms found.', 'your-text-domain' ),
        'not_found_in_trash' => __( 'No glossary terms found in Trash.', 'your-text-domain' )
    );

    $args = array(
        'labels'             => $labels,
        'description'        => __( 'Description.', 'your-text-domain' ),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'glossary' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'excerpt' ),
        'show_in_rest'       => true,
    );

    register_post_type( 'glossary', $args );
}
add_action( 'init', 'create_glossary_post_type' );