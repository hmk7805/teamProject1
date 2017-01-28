breweryList: [];

// accordian
function accordion() {
    var acc = document.getElementsByClassName("accordionBtn");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        }
    } 
};
//accordian end


$("#locationsubmit").on("click", function(event) { 
     event.preventDefault();

    var loc = $("#locationform").val().trim();
    breweryAPI.setURL(name = loc);
    breweryAPI.makeCall(accordion);

}) ;


// 2. Button for adding breweries
$(".add-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var bName = $("this").data("name");
  var lat = $("this").data("lat");
  var long = $("this").data("long");
  var loc = new google.maps.LatLng(lat, long);
  
  // Creates local "temporary" object for holding brewery data
  var newBrewery = {
    name: bName,
    loc: loc
  };

  // add to brewery array
  breweryList.push(newBrewery); 
  
  // place a marker on the map 
  placeMarker(map, loc, name); 

  // Alert
  alert("Brewery successfully added");
  

  // Prevents moving to new page
  return false;
});


$(".createBtn").on("click", function(event) {    
  event.preventDefault();
  // grab location array from firdb

  

  calcRoute(locList);

  });

