<!-- 
  require php/Pintlabs/Services/Brewerydb.php

  use this to keep API key private

  this service is provided by / listed on official website

-->

<!--This service is a simple PHP wrapper for the Brewerydb.com API.


Usage:

$bdb = new Pintlabs_Service_Brewerydb($apikey);
$bdb->setFormat('php'); // if you want to get php back.  'xml' and 'json' are also valid options.

Then you can call the API:

try {
    // The first argument to request() is the endpoint you want to call
    // 'brewery/BrvKTz', 'beers', etc.
    // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
    $results = $bdb->request('beers', $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.
} catch (Exception $e) {
    $results = array('error' => $e->getMessage());
}-->


<?php

    require('Pintlabs/Services/Brewerydb.php');

    header('Content-Type: application/json');

    $apikey = 'f0479b27c9f9d643b57d9bd53db8937f';

    $params = array(
        "locality" => "charlotte",
    );

    $bdb = new Pintlabs_Service_Brewerydb($apikey);
    $bdb->setFormat('json'); // if you want to get php back.  'xml' and 'php' are also valid options.

    try {
        // The first argument to request() is the endpoint you want to call
        // 'brewery/BrvKTz', 'beers', etc.
        // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
        $results = $bdb->request('beers', $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.
    } catch (Exception $e) {
        $results = array('error' => $e->getMessage());
    }

    echo $results;

?>
