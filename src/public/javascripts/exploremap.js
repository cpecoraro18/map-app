

function addButtons(map) {
  AddSearchBar(map);
  return;
}

//https://developers.google.com/maps/documentation/javascript/style-reference
//add user styles to map
function addStyles(map) {
  return;
}



function AddSearchBar(map) {
  const input = document.createElement('input');
  input.style.backgroundColor = "#fff";
  input.style.fontSize = "100px;"
  input.style.margin = "12px"
  input.style.padding = "0 11px 0 13px"
  input.style.textOverflow = "ellipsis"
  input.style.width = "200px"
  input.style.height = "4em"
  input.placeholder = 'Search'
  const searchBox = new google.maps.places.SearchBox(input);
  console.log(searchBox);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
