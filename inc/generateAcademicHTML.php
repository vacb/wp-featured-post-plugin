<?php

function generateAcademicHTML($id) {
  $academicPost = new WP_Query(array(
    'post_type' => 'academic',
    'p' => $id
  ));

  while($academicPost->have_posts()) {
    $academicPost->the_post();
    ob_start(); ?>
      <div class="academic-callout">
        <div class="academic-callout__photo" style="background-image: url(<?php the_post_thumbnail_url('academicPortrait'); ?>)"></div>
        <div class="academic-callout__text">
          <h5><?php echo the_title(); ?></h5>
          <p><?php echo wp_trim_words(get_the_content(), 30); ?></p>

          <?php 
            $relatedPrograms = get_field('related_program');
            if($relatedPrograms) { ?>
              <p><?php echo esc_html(get_the_title()); ?> teaches: 
                <?php foreach($relatedPrograms as $key => $program) {
                  echo get_the_title($program);
                  if($key != array_key_last($relatedPrograms) && count($relatedPrograms) > 1) {
                    echo ', '; 
                  }
                } ?>.
              </p>
            <?php }
          ?>
          <p><strong><a href="<?php the_permalink(); ?>">Learn more about <?php the_title(); ?> &raquo;</a></strong></p>
        </div>
      </div>
    <?php
    wp_reset_postdata();
    return ob_get_clean();
  }
}