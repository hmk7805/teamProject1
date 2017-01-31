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
            //console.log(snapshot.val());
            for(e in snapshot.val()) {
                console.log(e, snapshot.val()[e].name);
                // create trips with data-tripId attribute

                // button class accordion tourBtn
                    // img class faviconHop
                    // h4 class tourName

                // div class panel tourInfoDiv
                    // p class tourInfoName
                    // p class tourInfoCity
                    // a class tourInfoLink
                    // ul
                        // for i in [e].stops
                            // var brewery = {
                            //     id: i.id,
                            // };
                            // breweryAPI.makeSingleCall(brewery);
                            // li i.name - linked to website
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
$('document').ready(fb.getPreviousTrip(fb.addTrip("test trip 23")));
