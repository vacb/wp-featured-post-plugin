<?php

/*
Plugin Name: Featured Academic Block Type
Version: 1.0
Author: Victoria
Author URI: https://github.com/vacb
Text Domain: featured-academic
Domain Path: /languages
*/

// Exit if accessed directly
if( ! defined('ABSPATH')) exit;

require_once plugin_dir_path( __FILE__ ) . 'inc/generateAcademicHTML.php';
require_once plugin_dir_path( __FILE__ ) . 'inc/relatedPostsHTML.php';

class FeaturedAcademic {
  function __construct() {
    add_action('init', [$this, 'onInit']);
    add_action('rest_api_init', [$this, 'academicHTML']);
    add_filter('the_content', [$this, 'addRelatedPosts']);
  }

  // FILTER CONTENT ON ACADEMIC PAGES TO ADD LIST OF POSTS FEATURING THAT ACADEMIC
  function addRelatedPosts($content) {
    if (is_singular('academic') && in_the_loop() && is_main_query()) {
      return $content . relatedPostsHTML(get_the_id());
    }
    return $content;
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
    load_plugin_textdomain('featured-academic', false, dirname(plugin_basename(__FILE__)) . '/languages');

    register_meta('post', 'featuredAcademic', array(
      'show_in_rest' => true,
      'type' => 'number',
      // i.e. don't try to serialise multiple items into one db row, create separate row for each entry
      'single' => false
    ));

    wp_register_script('featuredAcademicScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('featuredAcademicStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    // Tell WP to tie the specified JS file to the translation system and provide location of language files
    wp_set_script_translations('featuredAcademicScript', 'featured-academic', plugin_dir_path(__FILE__) . '/languages');

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