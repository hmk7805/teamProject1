// Team Project 1 - BrewVentures
// Jarrett Tolman - firebase.js

// create a variable to reference the database
var database = firebase.database();

var fb = {
    // create database reference objects
    databaseRef: database.ref(),
    tripsRef: database.ref("/trips/"),
    // initiate fb object
    start: function start () {
        // listener to get all trips from firebase
        fb.tripsRef.on("value", function(snapshot) {
            // clear div
            $("#previousTrips").empty();
            //console.log(snapshot.val());
            for(e in snapshot.val()) {
                console.log(e, snapshot.val()[e].name);
                // create trips with data-tripId attribute
                
                // new button - accordionBtn tourBtn
                var accordianBtn = $("<button>", {
                    class: "accordionBtn tourBtn",
                    "data-tripId": e
                });
                // faviconHop image - faviconHop
                var hopImg = $("<img>", {
                    class: "faviconHop",
                    src: "img/hop2.png"
                });
                // append image to accordianBtn
                $(hopImg).appendTo(accordianBtn);
                // h6 - brewName
                var breweryName = $("<h6>", {
                    class: "brewName",
                    text: snapshot.val()[e].name
                });
                // append name to accordianBtn
                $(breweryName).appendTo(accordianBtn);
                // append button to brewSidebar
                $("#previousTrips").append(accordianBtn);

                // new div - panel tourInfoDiv
                var panelDiv = $("<div>", {
                    class: "panel tourInfoDiv"
                });
                    // p class tourInfoCity
                    // a class tourInfoLink
                    // ul
                        // for i in [e].stops
                            // var brewery = {
                            //     id: i.id,
                            // };
                            // breweryAPI.makeSingleCall(brewery);
                            // li i.name - linked to website
                // append div to brewSidebar
              //  $("#previousTrips").append(accordianBtn);
                // <p class="accordion-title tourBtn"><img src='img/hop2.png' alt='hop' class='faviconHop'> Tour Name</p>
                // <div class="accordion-inner tourExpand">
                //     <p class='tourName'>Tour Name</p>
                //     <p class='tourCity'>Tour City</p>
                //     <a href='trip.html' target='_blank'><p class = 'tourLink'>URL to Share</p></a>
                // </div>

            }
        });
    },
    // function to add trip object to database, returns key
    addTrip: function addTrip (tripName) {
        var timeNow = Math.floor(Date.now());
        //console.log('add trip', uid);
        //debugger;
       return fb.tripsRef.push({
            //user: 'test',
            name: tripName,
            date: timeNow,
            stops: breweryList
        }).key;
    },
    // function to get one trip from database
    getPreviousTrip: function getPreviousTrip (tripId) {
        database.ref("/trips/" + tripId).once("value").then(function(snapshot) {
            //console.log(snapshot.val().name);
            // load breweryList
            // breweryList = snapshot.val().stops;
            //breweryList.push(snapshot.val().name);
            //console.log(breweryList);
        });
    },
};

fb.start();

// listener for previous trips
$(".previousTrip").on("click", function() {
    // load previous trip into breweryList
    fb.getPreviousTrip($(this).data("tripId"));
    // create trip
    
});

// fb.addTrip returns key
//$('document').ready(fb.getPreviousTrip(fb.addTrip("test trip 23")));

// for testing
var counter = (function () {
    var count = 24;
    return function () { return count += 1; }
})();
