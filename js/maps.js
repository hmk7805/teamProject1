
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function placeEmptyMap(city)
  {    
    directionsDisplay = new google.maps.DirectionsRenderer();
    var cityLatLong = new google.maps.LatLng(city);
    var mapOptions = {
      zoom: 7,
      center: city
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  };

  function placeMarker(map, location, name) {
    var marker = new google.maps.Marker({
      position: location,
      icon: "../img/hop2.png",
      map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: name + 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
    });
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function(event) {
    infowindow.open(map,marker);
        
    });
};




function calcRoute(breweryList) {
   directionsDisplay = new google.maps.DirectionsRenderer();
    var map = map = new google.maps.Map(document.getElementById('tourMap'), mapOptions);
    directionsDisplay.setMap(map);
    //var start = new google.maps.LatLng(37.334818, -121.884886);
    var start = breweryList[0].loc;    
    //var end = new google.maps.LatLng(37.441883, -122.143019);
    var end = breweryList[breweryList.length -1].loc;
    // var wayPoints = [
    //     {
    //     location: 'Googleplex',
    //     stopover: true
    //     },
    //     {
    //     location: 'NASA Ames Research Center',
    //     stopover: true
    // }];
    var wayPoints = [];
    for(var i =1; i<breweryList.length; i++ )
    {
      wayPoints.push(
        {location: breweryList[i].loc, stopover: true }
      );
    }


    var request = {
      origin: start,
      destination: end,
      waypoints: wayPoints,
      travelMode: google.maps.TravelMode.DRIVING      
    };

    
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }