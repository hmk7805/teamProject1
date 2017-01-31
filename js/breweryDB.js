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
    // make button and add to sidebar
    makeAccordionBtn: function makeAccordionBtn(e) {
        // create variables for info items
        var name = e["brewery"]["name"];
        var lat = e["latitude"];
        var long = e["longitude"];
        var id = e["id"];
        // new button - accordionBtn brewBtn
        var accordianBtn = $("<button>", {
            class: "accordionBtn"
        });
        // faviconHop image - faviconHop
        var hopImg = $("<img>", {
            class: "faviconHop brewBtn",
            src: "../img/hop2.png"
        });
        // append image to accordianBtn
        $(hopImg).appendTo(accordianBtn);
        // h4 - brewName
        var breweryName = $("<h4>", {
            class: "brewName",
            text: name
        });
        // append name to accordianBtn
        $(breweryName).appendTo(accordianBtn);
        // add image - addBtn (data-lat, data-long, data-name)
        var addBtnImage = $("<img>", {
            class: "addBtn",
            src: "../img/plus-img.png",
            "data-lat": lat,
            "data-long": long,
            "data-name": name,
            "data-id": id
        });
        // append image to accordianBtn
        $(addBtnImage).appendTo(accordianBtn);
        // append button to brewSidebar
        $("#brewSidebar").append(accordianBtn);
    },
    // create div, add info, append to sidebar
    makeInfoDiv: function makeInfoDiv(e) {
        console.log(e["isClosed"], e["brewery"]["description"]);
        // e["locationTypeDisplay"]
        // create variables for brewery info items
        var image = e["brewery"]["images"]["squareMedium"];
        var address = e["streetAddress"];
        var hours = e["hoursOfOperation"];
        var website = e["brewery"]["website"];
        // new div - panel brewInfoDiv
        var panelDiv = $("<div>", {
            class: "panel brewInfoDiv"
        });
        // brewery image - brewLogo
        try {
            var brewImg = $("<img>", {
                class: "brewLogo",
                src: image
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
            text: address
        });
        // append address to div
        $(address).appendTo(panelDiv);
        // p - brewHours
        var brewHours = $("<p>", {
            class: "brewHours",
            text: hours
        });
        // append hours to div
        $(brewHours).appendTo(panelDiv);
        // a - brewUrl
        var brewUrl = $("<a>", {
            class: "brewUrl",
            href: website,
            text: website
        });
        // append url to div
        $(brewUrl).appendTo(panelDiv);
        // append to brewSidebar
        $("#brewSidebar").append(panelDiv);
    },
    // make ajax call to api service
    makeCall: function makeCall(callback) {
        // make ajax call
        $.ajax({
            url: breweryAPI.queryURL,
            method: "GET",
        // when complete
        }).done(function(result){
            // empty sidebar
            //$("#brewSidebar").empty();
            // iterate results
            result.data.forEach(function(e) {
                // if location is not closed permanently
                console.log(e["isClosed"]);
                if(!e["isClosed"] === "Y") {
                    // call functions to build sidebar
                    breweryAPI.makeAccordionBtn(e);
                    breweryAPI.makeInfoDiv(e);
                }
            });
            callback();
        // if there is an error
        }).fail(function(err) {
            throw err;
        });
    },
    // make ajax call to api service for info on single location id
    makeSingleCall: function makeSingleCall(brewery) {
        // create queryURL
        breweryAPI.queryURL = breweryAPI.url + "/location/" + brewery.id;
        // make ajax call
        $.ajax({
            url: breweryAPI.queryURL,
            method: "GET",
        // when complete
        }).done(function(result){
            // update brewery with results
            console.log(result);
            // brewery.description = result.description;
        // if there is an error
        }).fail(function(err) {
            throw err;
        });
    }
};
