
var map;

function initMap() {
  var mapProp= {
  center:new google.maps.LatLng(44.9727, -93.23540000000003),
  zoom:3,
  gestureHandling: 'greedy',
  minZoom: 3,
  disableDefaultUI: true
};
  map = new google.maps.Map(document.getElementById("map"), mapProp);
  addButtons(map);
  addStyles(map);

}

function addButtons(map) {

  //button for title
  const titleDiv = document.createElement("div");
  AddTitle(titleDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleDiv);
  AddSearchBar(map);

}

//https://developers.google.com/maps/documentation/javascript/style-reference
//add user styles to map
function addStyles(map) {

}

function AddTitle(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "rightControl";
  controlUI.style.width = "75px";
  controlUI.style.width = "75px";
  controlUI.style.backgroundColor = "none";
  controlUI.style.cursor = "pointer";
  controlUI.style.textAlign = "center";
  controlUI.title = "MapShot";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = '<h1>MapShot</h1>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    //add event
  });
}

function AddSearchBar(map) {
  const input = document.createElement('input');
  input.style.backgroundColor = "#fff";
  input.style.fontSize = "15px;"
  input.style.margin = "12px"
  input.style.padding = "0 11px 0 13px"
  input.style.textOverflow = "ellipsis"
  input.style.width = "200px"
  input.style.height = "1.5em"
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
