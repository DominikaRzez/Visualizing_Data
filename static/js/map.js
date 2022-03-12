function createMap(stop_and_search) {

  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "Stop and Searches": stop_and_search
  };

  // Create the map object with options.
  var map = L.map('map', {
    center: [51.5072, -0.1276],
    zoom: 10,
    layers: [streetmap, stop_and_search]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "stations" property from response.data.
  var stops = response.features;

  // Initialize an array to hold bike markers.
  var stopMarkers = [];

  // Loop through the stations array.
  for (var index = 0; index < stops.length; index++) {
    var stop = stops[index];

    // For each station, create a marker, and bind a popup with the station's name.
    var stopMarker = L.marker([stop.geometry.coordinates[1], stop.geometry.coordinates[0]])
      .bindPopup("<h3>" + stop.properties.City + "<h3><h3>Object of search: " + stop.properties.Object_of_search + "</h3>");

    // Add the marker to the bikeMarkers array.
    stopMarkers.push(stopMarker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(stopMarkers));
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("/api/locations").then(createMarkers);
