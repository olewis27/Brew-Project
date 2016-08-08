window.onload = function() {

var map;
  function initialize() {
    var center = new google.maps.LatLng(28.7442507,-81.3076821);
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 16
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
}
