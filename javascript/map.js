var map, bounds, routePoints = {}, markerCoordinates = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    gestureHandling: 'cooperative',
    draggable: true
  });
  bounds = new google.maps.LatLngBounds();
}

function getCoordinates(callback){
  var location = navigator.geolocation;
  if (location) {
    location.getCurrentPosition(function(position){
      callback.call(position);
    }, function(){
      console.log('Error: The Geolocation service failed.');
    });
  } else {
    console.log('Error: Your browser doesn\'t support geolocation.');
  }
}

function getUserPosition(){
  getCoordinates(function(){
    var _this = this;
    var pos = {
      lat: _this.coords.latitude,
      lng: _this.coords.longitude
    };
    var coordinates = setMarkerOnMap(pos, 'Your location', 'origin'),
        posCoordinates= new google.maps.LatLng(coordinates.lat, coordinates.lng);

    sendUserPosition(coordinates);
    bounds.extend(posCoordinates);
    map.fitBounds(bounds);
  });
}

function setMarkerOnMap(location, title, key){
  if(typeof routePoints[key] !== 'undefined'){
    routePoints[key].setMap(null);
  }
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title
  });

  routePoints[key] = marker;
  markerCoordinates[key] = {
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng()
  };
  return markerCoordinates[key];
}
