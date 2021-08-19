<?php

/*
Plugin Name: Featured Academic Block Type
Version: 1.0
Author: Victoria
Author URI: https://github.com/vacb
*/

// Exit if accessed directly
if( ! defined('ABSPATH')) exit;

class FeaturedAcademic {
  function __construct() {
    add_action('init', [$this, 'onInit']);
  }

  function onInit() {
    wp_register_script('featuredProfessorScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('featuredProfessorStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    register_block_type('ourplugin/featured-academic', array(
      'render_callback' => [$this, 'renderCallback'],
      'editor_script' => 'featuredAcademicScript',
      'editor_style' => 'featuredAcademicStyle'
    ));
  }
  
  function renderCallback($attributes) {
    return '<p>We will replace this content soon.</p>';
  }

}

$featuredProfessor = new FeaturedProfessor();