var breweryList = [];
var tripLoc;

// accordian
function accordion() {
    var acc = document.getElementsByClassName("accordionBtn");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {

            //// Grabs data from UI
            var bName = $(this).data("name");
            var addr = $(this).data("address");
            var zip = $(this).data("zip");
            var id = $(this).data("id");
            // addBrewery icon
            addBrewery(bName, addr, zip, id);

            // display info panel
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
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
    tripLoc = $("#locationform").val().trim();
    $("#locationform").val("");
    // create regular expression objects for testing search input
    var alpNum = new RegExp(/^[a-z0-9]| +$/i);
    if(alpNum.test(tripLoc)) {
        // and draw a google map of the given location
        placeEmptyMap(tripLoc);

        // get breweries
        breweryAPI.setURL(name = tripLoc);
        breweryAPI.makeCall(accordion);

        accordion();
    } else {
        // invalid search
        $("#brewSidebar").text("invalid search, please try again");
    }
});

//handler for create button to draw the route and create a trip.
$("#createBtn").on("click", function(event) {
    // prevent event bubbling
    event.preventDefault();

    // grab location array from firdb
    var tId = fb.addTrip("test trip " + (initCount + 1));

    //draw the route mapping all chosen breweries
    calcRoute(breweryList);

    window.open("trip.html?tripId=" + tId);

});

$(document).ready(placeEmptyMap("charlotte"));
