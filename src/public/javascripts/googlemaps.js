//add google maps script to html page
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0) {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBy106-dumHQTbeuqRa4XkmPc_tO98YGrA&libraries=places&callback=initMap&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});


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
  // add buttons

  const leftControlDiv = document.createElement("div");
  LeftControl(leftControlDiv, map);
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(leftControlDiv);

  const rightControlDiv = document.createElement("div");
  RightControl(rightControlDiv, map);
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(rightControlDiv);

  const sidebarToggleControlDiv = document.createElement("div");
  SidebarToggleControl(sidebarToggleControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(sidebarToggleControlDiv);

}

//https://developers.google.com/maps/documentation/javascript/style-reference

function addStyles(map) {
  var userStyles = [
    {
      stylers: [
        {visibility: 'simplified'}
      ]
    },
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ]
  map.setOptions({
    styles: userStyles
  })
}

function LeftControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "leftControl";
  controlUI.style.width = "100px";
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.margin = "30px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = '<i class="fas fa-arrow-left"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    //Previous Event
  });
}

function RightControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "rightControl";
  controlUI.style.width = "100px";
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.margin = "30px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = '<i class="fas fa-arrow-right"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    //next event
  });
}

function SidebarToggleControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.margin = "30px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = '<i class="fas fa-bars"></i>';
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    $('#sidebar').toggleClass('active');
  });
}
