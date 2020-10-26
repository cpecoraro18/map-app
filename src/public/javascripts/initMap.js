
var map;

function initMap() {
  var mapProp= {
    center:new google.maps.LatLng(44.9727, -93.23540000000003),
    zoom:3,
    gestureHandling: 'greedy',
    minZoom: 3,
    disableDefaultUI: true,
    mapTypeControl: true,
    fullscreenControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    backgroundColor: "#5BA8A0"
  };
  map = new google.maps.Map(document.getElementById("map"), mapProp);
  addStaticButtons(map);
  addButtons(map);
  addStyles(map);
  loadMarkers(map);
}




function addStaticButtons(map) {
  //button for title
  const titleDiv = document.createElement("div");
  AddTitle(titleDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleDiv);
  //button for adding pin
  const zoomControlDiv = document.createElement("div");
  ZoomControl(zoomControlDiv, map);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    const sidebarToggleControlDiv = document.createElement("div");
    SidebarToggleControl(sidebarToggleControlDiv, map);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(sidebarToggleControlDiv);
    map.fullscreenControl = false;
    map.mapTypeControl = false;
  }
  return;
}


function AddTitle(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "rightControl";
  controlUI.style.width = "100%";
  controlUI.style.height = "100px";
  controlUI.style.backgroundColor = "none";
  controlUI.style.cursor = "pointer";
  controlUI.style.textAlign = "center";
  controlUI.title = "MapShot";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "#5D6E1E";
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

  return;
}

function ZoomControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "rightControl";
  controlUI.style.width = "75px";
  controlUI.style.height = "75px";
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "100%";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginRight = "30px";
  controlUI.style.marginBottom = "15px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to see next pin";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "30px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.style.paddingTop = "16px";
  controlText.innerHTML = '<i class="fa fa-search-minus" aria-hidden="true"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    map.setZoom(3);
  });

  return;
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
  return;
}
