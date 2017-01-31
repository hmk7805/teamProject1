var breweryList = [];

// accordian
function accordion() {
    var acc = document.getElementsByClassName("accordionBtn");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            // addBrewery
            addBrewery();
        }
    }
};
//accordian end

// handler for new location entered by user
$("#locationsubmit").on("click", function(event) {
    // prevent event bubbling
    event.preventDefault();

    // clear the breweryList
    breweryList = [];

    // get the location from user
    var loc = $("#locationform").val().trim();
    // and draw a google map of the given location
    placeEmptyMap(loc);

    // get breweries
    breweryAPI.setURL(name = loc);
    breweryAPI.makeCall(accordion);
});


// 2. Button for adding breweries
// $(".addBtn").on("click", function(event) {
//     // prevent event bubbling
//     event.preventDefault();

//     // Grabs user input
//     var bName = $(this).data("name");
//     var lat = $(this).data("lat");
//     var lng = $(this).data("long");
//     var loc = new google.maps.LatLng(lat, lng);

//     // Creates local "temporary" object for holding brewery data
//     var newBrewery = {
//         name: bName,
//         loc: loc
//     };

//     // add to brewery array
//     breweryList.push(newBrewery);

//     // place a marker on the map 
//     placeMarker(map, loc, bName);
// });


function addBrewery() {
    // Grabs user input
    var bName = $(this).data("name");
    var lat = $(this).data("lat");
    var lng = $(this).data("long");
    var loc = new google.maps.LatLng(lat, lng);

    // Creates local "temporary" object for holding brewery data
    var newBrewery = {
        name: bName,
        loc: loc
    };

    // add to brewery array
    breweryList.push(newBrewery);

    // place a marker on the map 
    placeMarker(map, loc, bName);
};


$("#createBtn").on("click", function(event) {
    // prevent event bubbling
    event.preventDefault();

    // grab location array from firdb

    //draw the route mapping all chosen breweries
    calcRoute(breweryList);

});