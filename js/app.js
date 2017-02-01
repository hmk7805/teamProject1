var breweryList = [];

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
    var loc = $("#locationform").val().trim();
    // and draw a google map of the given location
    placeEmptyMap(loc);

    // get breweries
    breweryAPI.setURL(name = loc);
    breweryAPI.makeCall(accordion);

    accordion();
});




//handler for create button to draw the route and create a trip.
$("#createBtn").on("click", function(event) {
    // prevent event bubbling
    event.preventDefault();

    // grab location array from firdb

    //draw the route mapping all chosen breweries
    calcRoute(breweryList);

});