<?php
// Define the AJAX endpoint to handle the tracking data
add_action('wp_ajax_track_user_journey', 'track_user_journey');
add_action('wp_ajax_nopriv_track_user_journey', 'track_user_journey');

function track_user_journey() {
  // Retrieve the tracking data from the AJAX request
  $tracking_data = $_POST['tracking_data'];

  // Decode the JSON string into an associative array
  $tracking_data = json_decode($tracking_data, true);

  // Get the individual tracking data fields
  $userID = $tracking_data['userID'];
  $sessionStartTime = $tracking_data['sessionStartTime'];
  $sessionEndTime = $tracking_data['sessionEndTime'];
  $referrerURL = $tracking_data['referrerURL'];
  $pageVisits = json_encode($tracking_data['pageVisits']);
  $visitCount = $tracking_data['visitCount'];

  // Save the tracking data to the database
  global $wpdb;
  $table_name = $wpdb->prefix . 'user_tracking';

  $wpdb->insert(
    $table_name,
    array(
      'user_id' => $userID,
      'session_start_time' => $sessionStartTime,
      'session_end_time' => $sessionEndTime,
      'referrer_url' => $referrerURL,
      'visit_count' => $visitCount,
      'page_visits' => $pageVisits
    ),
    array(
      '%s',
      '%s',
      '%s',
      '%s',
      '%d',
      '%s'
    )
  );

  // Send a response back to the JavaScript code
  wp_send_json_success('Tracking data received and saved successfully');
}
