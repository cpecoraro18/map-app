/**
  *Loads pins from backend
  *@param {map} map Map from init map.
  */
function loadMarkers(map) {
  $.ajax({
    url: '/pin',
    method: 'GET',
    success: function(pins) {
      addPinsToMap(map, pins);
    },
  });
}
/**
  *Adds a marker and infowindow for each pin on explore map
  *@param {object} map Map from init map.
  *@param {array} pins Map from init map.
  */
function addPinsToMap(map, pins) {
  pins.forEach(function(pin) {
    const marker = addMarker(map, pin);
    addInfoWindow(pin, marker, map);
  });
}
/**
  *Adds custom markers to the explore map
  *@param {map} map Map from init map.
  *@param {object} pin a pin object
  *@return {object} custom marker
  */
function addMarker(map, pin) {
  const pos = {
    lat: pin.lat,
    lng: pin.lng,
  };
  CustomMarker.prototype = new google.maps.OverlayView();
  /**
    *Adds custom markers to the explore map
    *@param {map} map Map from init map.
    *@param {object} latlng a lat lng object
    *@param {object} imageSrc image used for marker
    */
  function CustomMarker(map, latlng, imageSrc) {
    this.latlng_ = latlng;
    this.imageSrc_ = imageSrc;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
  }


  CustomMarker.prototype.onAdd = function() {
    // Check if the div has been created.
    let div = this.div_;
    if (!div) {
      // Create a overlay text DIV
      div = this.div_ = document.createElement('div');
      // Create the DIV representing our CustomMarker
      div.className = 'customMarker';


      const imgDiv = document.createElement('div');
      imgDiv.setAttribute('style', 'background-image: url("'+ this.imageSrc_+ '")');
      imgDiv.className = 'customMarkerImage';
      const maxColors = 3;
      const color = Math.floor(Math.random()*maxColors);
      if (color == 0) imgDiv.style.border = 'solid #94B447';
      if (color == 1) imgDiv.style.border = 'solid #3B5284';
      if (color == 2) imgDiv.style.border = 'solid #5BA8A0';
      div.appendChild(imgDiv);
      console.log(div);
      const me = this;
      google.maps.event.addDomListener(div, 'mouseover', function(event) {
        google.maps.event.trigger(me, 'mouseover');
      });
      google.maps.event.addDomListener(div, 'mouseout', function(event) {
        google.maps.event.trigger(me, 'mouseout');
      });
      google.maps.event.addDomListener(div, 'click', function(event) {
        google.maps.event.trigger(me, 'click');
      });

      // Then add the overlay to the DOM
      const panes = this.getPanes();
      panes.overlayImage.appendChild(div);
    }
  };

  CustomMarker.prototype.draw = function() {
    // Position the overlay
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
      this.div_.style.left = point.x + 'px';
      this.div_.style.top = point.y + 'px';
    }
  };

  CustomMarker.prototype.onRemove = function() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };

  CustomMarker.prototype.getPosition = function() {
    return this.latlng_;
  };

  const marker = new CustomMarker(map, new google.maps.LatLng(pos.lat, pos.lng), pin.userPic_url);
  return marker;
}
/**
  *Adds infowindow to maker with pin information
  *@param {map} map Map from init map.
  *@param {object} pin a pin object
  *@param {object} marker a marker object
  */
function addInfoWindow(map, pin, marker) {
  const infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(25, 10),
  });
  const contentString =
  '<div class="infowindow">' +
    '<div>' +
      '<h1>'+ pin.title + '</h1>' +
    '</div>'+

    '<div>'+
      '<div class="pin-img" style="background-image: url('+ pin.img_url +'); "></div>'+
    '</div>' +
    '<div>'+
      '<p><b>'+ pin.userName + ' </b>'+ pin.description + '</p>' +
    '</div>'+
  '</div>';
  infowindow.setContent(contentString);

  marker.addListener('mouseover', function() {
    infowindow.open(map, marker);
  });
  marker.addListener('mouseout', function() {
    infowindow.close();
  });
  marker.addListener('click', function() {
    map.setZoom(17);
    map.panTo({lat: pin.lat, lng: pin.lng});
  });
}
/**
 * Adds user map buttons
 * @param {map} map Map from init map.
 */
function addButtons(map) {
  // button for adding pin
  const addPinControlDiv = document.createElement('div');
  AddPinControl(addPinControlDiv, map);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(addPinControlDiv);

  return;
}

/**
 * Adds user map buttons
 * @param {map} map Map from init map.
 */
function addStyles(map) {
  $.get('/user/userInfo', function(userInfo, status) {
    setUserStyles(map, userInfo.style);
  });
}
/**
 * Adds home map buttons
 * @param {map} map Map from init map.
 * @param {object} userStyle Users map style
 */
function setUserStyles(map, userStyle) {
  map.setOptions({
    styles: userStyle,
  });
}

/**
 * Adds add pin control to map
* @param {html} controlDiv Map from init map.
 * @param {map} map Map from init map.
 */
function AddPinControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'rightControl';
  controlUI.style.width = '75px';
  controlUI.style.height = '75px';
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '100%';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '30px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to add a new pin';
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '30px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.style.paddingTop = '15px';
  controlText.innerHTML = '<i class="fas fa-plus"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    $('#overlay-back').fadeIn(500);
    $('#addNewEventContainer').slideDown(500);
  });
  return;
}
