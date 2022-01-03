var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat:28.538336, lng:-81.379234 },
    zoom: 7,
    fullscreenControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false
  });

  initMapTypes(map);
  initSearch(map);

  console.log('api version: ' + google.maps.version);
}


function initMapTypes(map) {
  var main = new google.maps.StyledMapType(
    [
      { featureType: "landscape", elementType: "all", stylers: [{"lightness":-5}] },
      { featureType: "administrative", elementType: "geometry", stylers: [{"visibility": "off"}] },
      { featureType: "poi", elementType: "labels", stylers: [{"visibility": "off"}] },
      { featureType: "transit", stylers: [{"visibility": "off"}] }
    ],
    {name: 'main'}
  );

  var site = new google.maps.StyledMapType(
    [
      { featureType: "landscape", elementType: "all", stylers: [{"lightness":-5}] },
      { featureType: "road", elementType: "all", stylers: [{"visibility": "off"}] },
      { featureType: "administrative", elementType: "geometry", stylers: [{"visibility": "off"}] },
      { featureType: "poi", elementType: "labels", stylers: [{"visibility": "off"}] },
      { featureType: "transit", stylers: [{"visibility": "off"}] }
    ],
    {name: 'site'}
  );

  var road = new google.maps.StyledMapType(
    [
      { featureType: "landscape", elementType: "all", stylers: [{"lightness":-4}] },
      { featureType: "landscape.man_made", elementType: "all", stylers: [{"visibility":"off"}] },
      { featureType: "administrative", elementType: "geometry", stylers: [{"visibility": "off"}] },
      { featureType: "poi", elementType: "labels", stylers: [{"visibility": "off"}] },
      { featureType: "transit", stylers: [{"visibility": "off"}] }
    ],
    {name: 'road'}
  );

  map.mapTypes.set('main', main);
  map.mapTypes.set('road', road);
  map.mapTypes.set('site', site);
}

function setMain() {
  map.setMapTypeId('main');
}

function setRoad() {
  map.setMapTypeId('road');
}

function setSite() {
  map.setMapTypeId('site');
}

function setHybrid() {
  map.setMapTypeId('hybrid');
}

function initSearch(map) {
  var input = (document.getElementById('box'));
  var searchBox = new google.maps.places.SearchBox((input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
    var listener = google.maps.event.addListener(map, 'idle', function() {
      if (map.getZoom() > 19) map.setZoom(19);
      google.maps.event.removeListener(listener);
    });
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

function initMapSearch(map) {
  var input = (document.getElementById('sbox'));
  var searchBox = new google.maps.places.SearchBox((input));
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(input);

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
    var listener = google.maps.event.addListener(map, 'idle', function() {
      if (map.getZoom() > 19) map.setZoom(19);
      google.maps.event.removeListener(listener);
    });
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}
