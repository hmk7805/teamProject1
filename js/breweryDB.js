// Team Project 1 - BrewVentures
// Jarrett Tolman - breweryDB.js

var breweryAPI = {
    // *** api variables ***
    url: "https://infinite-shore-11678.herokuapp.com/breweryDbService.php",
    queryURL: "",
    name: "charlotte",
    type: "micro,brewpub",
    order: "postalCode",
    endpoint: "locations",
    // *** api functions ***
    // set parameters, with default options
    setURL: function setURL(name = breweryAPI.name,
                            type = breweryAPI.type,
                            order = breweryAPI.order,
                            endpoint = breweryAPI.endpoint) {
        breweryAPI.queryURL = breweryAPI.url + "?" + $.param({
            'locality': name,
            'locationType': type,
            'order': order,
            'endpoint': endpoint
        });
    },
    // reset queryURL
    resetURL: function resetURL() {
        breweryAPI.queryURL = "";
    },
    // make ajax call to api service
    makeCall: function makeCall() {
        // make ajax call
        $.ajax({
            url: breweryAPI.queryURL,
            method: "GET",
        // when complete
        }).done(function(result){
            // iterate results
            result.data.forEach(function(e) {
                console.log(e["brewery"]["name"]);

                // e["brewery"]["name"]
                // e["brewery"]["description"]
                // e["brewery"]["website"]
                // e["latitude"]
                // e["longitude"]
                // e["phone"]
                // e["streetAddress"]
                // e["locationTypeDisplay"]

                // // new h5 for rating
                // var newH5 = $("<h5/>", {
                //     text: "rating: " + e.rating
                // });
                // // new image for gif, including data attributes for still url, animated url, and state
                // var newImg = $("<img/>", {
                //     src: e.images.original_still.url,
                //     'data-still': e.images.original_still.url,
                //     'data-animate': e.images.original.url,
                //     'data-state': "still",
                //     class: 'gif'
                // });
                // // create new div for rating & gif
                // var newDiv = $("<div>", {
                //     class: 'left'
                // });
                // // append rating to new div
                // newDiv.append(newH5);
                // // append img to new div
                // newDiv.append(newImg);
                // // append new div to left column section
                // newDiv.appendTo("#gifsDiv");
            });
        // if there is an error
        }).fail(function(err) {
            throw err;
        });
    }
}
