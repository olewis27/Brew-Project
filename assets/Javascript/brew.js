// var map;
//   function initialize() {
//     var center = new google.maps.LatLng(28.5407157,-81.2385077);
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: center,
//       zoom: 16
//     });

//     var request = {
//         location: center,
//         radius: 10000,
//         types: ['cafe']
//     };

//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
//   }

//   function callback(results, status) {
//     if(status == google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }
//     }
//   }

//   function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//       map: map,
//       postion: place.geometry.location
//     });
//   }
//   google.maps.event.addDomListener(window, 'load', initialize);



$(document).ready(function() {
  $('.button').click(function() {
    alert($('.form-control').val());
  });
});

var geocoder;
var map;
var infowindow;
var $scope = {
  places: []
};

function initialize() {
  map = new google.maps.Map(
    document.getElementById("map"), {
      center: new google.maps.LatLng(28.5407157,-81.2385077),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  // var location = new google.maps.LatLng(28.7442507,-81.3076821);
  var service = new google.maps.places.PlacesService(map);
  infowindow = new google.maps.InfoWindow();

  service.nearbySearch({
    location: map.getCenter(),
    radius: 10000,
    types: ['cafe']
  }, callback);

  function callback(results, status) {
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].name + ":" + results[i].geometry.location);
        $scope.places.push(results[i]);
        createMarker(results[i]);
      }
    } else alert("places request failed, status=" + status)
  };

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
}

google.maps.event.addDomListener(window, "load", initialize);

