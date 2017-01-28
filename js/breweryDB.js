// Team Project 1 - BrewVentures
// Jarrett Tolman - breweryDB.js

var breweryAPI = {
    // *** api variables ***
    url: "https://secret-spire-74760.herokuapp.com/php/breweryDbService.php",
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
    makeCall: function makeCall(callback) {
        // make ajax call
        $.ajax({
            url: breweryAPI.queryURL,
            method: "GET",
        // when complete
        }).done(function(result){
            // iterate results
            result.data.forEach(function(e) {
                
                // data points to use
                // e["brewery"]["name"]
                // e["brewery"]["description"]
                // e["brewery"]["website"]
                // e["brewery"]["images"]["squareMedium"]
                // e["latitude"]
                // e["longitude"]
                // e["phone"]
                // e["streetAddress"]
                // e["locationTypeDisplay"]
                // e["hoursOfOperation"]

                // new button - accordionBtn brewBtn
                var accordianBtn = $("<button>", {
                    class: "accordionBtn brewBtn"
                });
                // faviconHop image - faviconHop
                var hopImg = $("<img>", {
                    class: "faviconHop",
                    src: "../img/hop2.png"
                });
                // append image to accordianBtn
                $(hopImg).appendTo(accordianBtn);
                // h4 - brewName
                var breweryName = $("<h4>", {
                    class: "brewName",
                    text: e["brewery"]["name"]
                });
                // append name to accordianBtn
                $(breweryName).appendTo(accordianBtn);
                // add image - addBtn (data-lat, data-long, data-name)
                var addBtnImage = $("<img>", {
                    class: "addBtn",
                    src: "../img/plus-img.png",
                    "data-lat": e["latitude"],
                    "data-long": e["longitude"],
                    "data-name": e["brewery"]["name"]
                });
                // append image to accordianBtn
                $(addBtnImage).appendTo(accordianBtn);
                // append button to brewSidebar
                $("#brewSidebar").append(accordianBtn);

                // new div - panel brewInfoDiv
                var panelDiv = $("<div>", {
                    class: "panel brewInfoDiv"
                });
                // brewery image - brewLogo
                try {
                    var brewImg = $("<img>", {
                        class: "brewLogo",
                        src: e["brewery"]["images"]["squareMedium"]
                    });
                    // append image to div
                    $(brewImg).appendTo(panelDiv);
                }
                catch (e) {
                    console.log("image does not exist");
                }
                // p - brewAddress
                var address = $("<p>", {
                    class: "brewAddress",
                    text: e["streetAddress"]
                });
                // append address to div
                $(address).appendTo(panelDiv);
                // p - brewHours
                var brewHours = $("<p>", {
                    class: "brewHours",
                    text: e["hoursOfOperation"]
                });
                // append hours to div
                $(brewHours).appendTo(panelDiv);
                // a - brewUrl
                var brewUrl = $("<a>", {
                    class: "brewUrl",
                    href: e["brewery"]["website"],
                    text: e["brewery"]["website"]
                });
                // append url to div
                $(brewUrl).appendTo(panelDiv);
                // append to brewSidebar
                $("#brewSidebar").append(panelDiv);
            });
            callback();
        // if there is an error
        }).fail(function(err) {
            throw err;
        });
    }
}
