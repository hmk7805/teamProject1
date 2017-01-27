<?php
    // https://github.com/PintLabs/PHP-Brewerydb

    require('Pintlabs/Service/Brewerydb.php');

    header('Content-Type: application/json');

    $apikey = 'f0479b27c9f9d643b57d9bd53db8937f';

    $params = array(
        "locality" => $_GET["locality"],
        "locationType" => $_GET["locationType"],
        "order" => $_GET["order"],
    );

    $bdb = new Pintlabs_Service_Brewerydb($apikey);
    $bdb->setFormat('json'); // if you want to get php back.  'xml' and 'php' are also valid options.

    try {
        // The first argument to request() is the endpoint you want to call
        // 'brewery/BrvKTz', 'beers', etc.
        // The third parameter is the HTTP method to use (GET, PUT, POST, or DELETE)
        $results = $bdb->request($_GET["endpoint"], $params, 'GET'); // where $params is a keyed array of parameters to send with the API call.
    } catch (Exception $e) {
        $results = array('error' => $e->getMessage());
    }

    echo json_encode($results);

?>
