// Team Project 1 - BrewVentures
// Jarrett Tolman - firebase.js

// create a variable to reference the database.
var database = firebase.database();

// create a variable database reference object
var databaseRef = database.ref();

var tripsRef = database.ref("/trips/");

// function to add trip object to database
function addTrip(tripName) {
    var timeNow = Math.floor(Date.now());
    //console.log('add trip', uid);
    debugger;
    tripsRef.push({
        user: 'test',
        name: tripName,
        date: timeNow,
        stops: breweryList
    });
}

// listener to get all trips from firebase
tripsRef.on("value", function(snapshot) {
    //console.log(snapshot.val());
    for(e in snapshot.val()) {
        console.log(snapshot.val()[e].name);
        // create trips with data-tripId attribute
    }
});

// function to get one trip from database
function getPreviousTrip(tripId) {
    console.log(tripId);
    return database.ref("/trips/-" + tripId).once("value").then(function(snapshot) {
        console.log("got trip: " + snapshot.val().name);
    });
}


// listener for previous trips
$(".previousTrip").on("click", function() {
    getPreviousTrip($(this).data("tripId"));
});

$('document').ready(getPreviousTrip("KbSR4FcyaNtzmckKW7I"));
