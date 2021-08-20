<?php

/*
Plugin Name: Featured Academic Block Type
Version: 1.0
Author: Victoria
Author URI: https://github.com/vacb
*/

// Exit if accessed directly
if( ! defined('ABSPATH')) exit;

require_once plugin_dir_path( __FILE__ ) . 'inc/generateAcademicHTML.php';

class FeaturedAcademic {
  function __construct() {
    add_action('init', [$this, 'onInit']);
    add_action('rest_api_init', [$this, 'academicHTML']);
  }


  // API TO GET LIST OF ACADEMICS
  function academicHTML() {
    // Namespace/version, specific name for route, options array 
    register_rest_route('featuredAcademic/v1', 'getHTML', array(
      // i.e. can send a GET request but not a POST
      'methods' => WP_REST_SERVER::READABLE,
      'callback' => [$this, 'getAcademicHTML']
    ));
  }

  function getAcademicHTML($data) {
    // Returns as JSON at the API endpoint base/wp-json/featuredAcademic/v1/getHTML
    // Adds escape characters into JSON automatically
    // return '<h4>Hello from our endpoint</h4>';
    return generateAcademicHTML($data['academicId']);
  }

  // REGISTER BLOCK TYPE
  // REGISTER META FOR FEATURED ACADEMIC LINK
  function onInit() {
    register_meta('post', 'featuredAcademic', array(
      'show_in_rest' => true,
      'type' => 'number',
      // i.e. don't try to serialise multiple items into one db row, create separate row for each entry
      'single' => false
    ));

    wp_register_script('featuredAcademicScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('featuredAcademicStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    register_block_type('ourplugin/featured-academic', array(
      'render_callback' => [$this, 'renderCallback'],
      'editor_script' => 'featuredAcademicScript',
      'editor_style' => 'featuredAcademicStyle'
    ));
  }

  function renderCallback($attributes) {
    if($attributes['academicId']) {
      wp_enqueue_style('featuredAcademicStyle');
      return generateAcademicHTML($attributes['academicId']);
    } else {
      return NULL;
    }
  }

}

$featuredAcademic = new FeaturedAcademic();