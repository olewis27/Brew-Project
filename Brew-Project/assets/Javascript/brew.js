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


// console.log( mySearchingPlace.longitude )
$(function(){
    // $(document).ready(function(){


    var mySearchingPlace = {
        longitude:0,
        latitude:0

        // console.log( mySearchingPlace.longitude )
    }


    $("#search").click(function() {
        
        //Grabing latitude and longitude 
        var address = $("#myAddress").val().split(" ").join("+");
        console.log(address);//if space then +
    

          // Call Yelp and receive data
          function cb(data) {
    var jsonPretty = JSON.stringify(data, null, '\t');
    $("#target").html(jsonPretty);
}

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey: "1agR7FgmVwXIRWzi6CbfvQ",
    consumerSecret: "6BKuyGMJUW9tcfA9yztoZwf364w",
    accessToken: "HrVQAd23FfInIj7DgpBxY7ZGWAYwTV4G",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript. You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "QxmBmwCeHxBnFRXbkmpDvp37-PA",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
};

// Location and Term Variables
var terms = 'coffee';
 

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

var parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', address]);
parameters.push(['limit', 10]);
parameters.push(['sort', 5]);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
    'action': 'https://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
console.log('callingajax');

$.ajax({
    'url': message.action,
    'data': parameterMap,
    'dataType': 'jsonp',
    'jsonpCallback': 'cb',
    'cache': true
}).done(function(data, textStatus, jqXHR) {
    console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
}).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
});










        var searchResultsURL ="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAm3HqcepBEeWZeWlafQzV154c_wffX4m0"

        $.ajax({
            url: searchResultsURL,
            method: 'GET'
        })
        .done(function(response){
            
            console.log( response );

            //initialize function showmaps
            mySearchingPlace.latitude = response.results[0].geometry.location.lat;
            mySearchingPlace.longitude = response.results[0].geometry.location.lng;
            //console.log( mySearchingPlace.latitude )
            //console.log(mySearchingPlace.longitude)

            initMap(mySearchingPlace.latitude, mySearchingPlace.longitude);
        })


        //var map;
        function initMap(lat, lng) {
            console.log("HERE")
             var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 15
      });

 


    }       

    //var map;
    // function initMap() {
    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: mySearchingPlace.latitude, lng: mySearchingPlace.longitude},
    //     zoom: 8
    //   });
    // }

    

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
      center: new google.maps.LatLng(28.7442507,-81.3076821),
      zoom: 11,
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




