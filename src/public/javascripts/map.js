/**
* Map
*@module Map
*/

function MapShotMap() {
    console.log("Init MapShot Map");
    const mapProp = {
      center: new google.maps.LatLng(44.9727, -93.23540000000003),
      zoom: 3,
      gestureHandling: 'greedy',
      minZoom: 2,
      disableDefaultUI: true,
      mapTypeControl: true,
      fullscreenControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      backgroundColor: '#3B5284',
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProp);
    console.log(this.map);
    this.addButtons();
    this.addStyles();
    this.initMenu();
}

MapShotMap.prototype.addButtons = function() {
  console.log("Adding Buttons")
  const titleDiv = document.createElement('div');
  this.addTitle(titleDiv);
  this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleDiv);
  // button for adding pin
  const zoomControlDiv = document.createElement('div');
  this.addZoom(zoomControlDiv);
  this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    const sidebarToggleControlDiv = document.createElement('div');
    this.addSidebarToggle(sidebarToggleControlDiv);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(sidebarToggleControlDiv);
    this.map.fullscreenControl = false;
    this.map.mapTypeControl = false;
  }
  return;
}

MapShotMap.prototype.addStyles = function() {
  console.log("Adding styles")
  var self = this;
  $.get('/user/style', function(mapStyle, status) {
    self.setMapStyle(mapStyle.mapStyle_template);
  });
}


MapShotMap.prototype.setMapStyle = function(mapStyle) {
  console.log("Setting Map Style")
  const userStyleValue = JSON.parse('[' + mapStyle + ']');
  console.log("User style: " + userStyleValue);
  this.map.setOptions({
    styles: userStyleValue,
  });
}

/**
  *Adds title
  * @param {html} controlDiv Map from init map.
  *@param {map} map Map from init map.
  */
MapShotMap.prototype.addTitle = function(controlDiv) {
  console.log("Adding Title")
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'title';
  controlUI.classList.add('map');
  controlUI.style.width = '100%';
  controlUI.style.height = '100px';
  controlUI.style.backgroundColor = 'none';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'MapShot';
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.style.color = '#fff';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<h1>MapShot</h1>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    // add event
  });

  return;
}

/**
  *Adds zoom control
  * @param {html} controlDiv Map from init map.
  *@param {map} map Map from init map.
  */
MapShotMap.prototype.addZoom = function(controlDiv) {
  console.log("Adding zoom")
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'zoomControl';
  controlUI.class = 'map';
  controlUI.style.width = '75px';
  controlUI.style.height = '75px';
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '100%';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginRight = '30px';
  controlUI.style.marginBottom = '15px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to zoom out';
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '30px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.style.paddingTop = '16px';
  controlText.innerHTML = '<i class="fa fa-search-minus" aria-hidden="true"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    this.map.setZoom(3);
  });

  return;
}
/**
  *Adds sidebar toggle for mobile
  * @param {html} controlDiv Map from init map.
  *@param {map} map Map from init map.
  */
MapShotMap.prototype.addSidebarToggle = function(controlDiv) {
  console.log("Adding Sidebar Toggle")
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '30px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<i class="fas fa-bars"></i>';
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    $('#sidebar').toggleClass('active');
  });
  return;
}
