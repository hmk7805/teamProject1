// Team Project 1 - BrewVentures
// Jarrett Tolman - firebase.js

// add to index.html -> <script src="https://www.gstatic.com/firebasejs/3.6.7/firebase.js"></script>

// initialize firebase
var config = {
    apiKey: "AIzaSyAqJwLe-xGxjo5IpHLcl28UNz7_5W7uEig",
    authDomain: "brewventures-bd06d.firebaseapp.com",
    databaseURL: "https://brewventures-bd06d.firebaseio.com",
    storageBucket: "brewventures-bd06d.appspot.com",
    messagingSenderId: "772130205350"
};

firebase.initializeApp(config);

// anonymous authentication
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode, errorMessage);
});

// if authentication was successful
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    // ...
    console.log(uid);
    // create a variable to reference the database.
    var database = firebase.database();

    // create a variable database reference object
    var databaseRef = database.ref();

    var tripsRef = database.ref("/trips");

    // function to add trip object to database
    function addTrip(tripName) {
        var timeNow = Math.floor(Date.now());
        tripsRef.push({
            user: uid,
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
        
    }
  } else {
    // User is signed out.
    // ...
  }
  // ...
});



// listener for previous trips
$(".previousTrip").on("click", function() {
    getPreviousTrip($(this).data("tripId"));
});
