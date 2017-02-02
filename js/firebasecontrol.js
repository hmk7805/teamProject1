// Team Project 1 - BrewVentures
// Jarrett Tolman - firebase.js

// create a variable to reference the database
var database = firebase.database();

// for testing
var initCount;

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
            initCount = snapshot.numChildren();
            for(e in snapshot.val()) {
                // create previous trip elements
                console.log(snapshot.val()[e].name);
                // new button - accordion-title tourBtn
                var accordionBtn = $("<p>", {
                    class: "accodion-title tourBtn",
                    text: snapshot.val()[e].name
                });
                // faviconHop image - faviconHop
                var hopImg = $("<img>", {
                    class: "faviconHop",
                    src: "img/hop2.png"
                });
                // append image to accordionBtn
                $(hopImg).prependTo(accordionBtn);

                // div accordion-inner tourExpand
                var innerDiv = $("<div>", {
                    class: "accordion-inner tourExpand",

                });
                // p tourName
                var tName = $("<p>", {
                    class: "tourName",
                    text: snapshot.val()[e].name
                });
                // p tourCity
                var tCity = $("<p>", {
                    class: tourCity,
                    text: snapshot.val()[e].location
                });
                // a tourLink with data-tripId attribute
                var tLink = $("<a>", {
                    class: "tourLink",
                    href: "trip.html?" + e,
                    target: "_blank",
                    text: "Share Your Trip!"
                });

                // append button to brewSidebar
                $("#previousTrips").append(accordionBtn);

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
              //  $("#previousTrips").append(accordionBtn);
                

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
            location: tripLoc,
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
