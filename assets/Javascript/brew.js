var map;
  function initialize() {
    var center = new google.maps.LatLng(28.7442507,-81.3076821);
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 16
    });
    var request = {
        location: center,
        radius: 10000,
        types: ['cafe']
    };

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      postion: place.geometry.location
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
