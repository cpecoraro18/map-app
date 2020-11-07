/**
* Home Map
*@module homeMap
*/

function HomeMap() {
  console.log("Init Home Map")
  MapShotMap.call(this);
  this.getPins();
  console.log("Done with Mapshot constructor")
}

HomeMap.prototype = Object.create(MapShotMap.prototype);
HomeMap.prototype.constructor = HomeMap;

HomeMap.prototype.getPins = function() {
  var self = this;
  $.ajax({
    url: '/pin/feed',
    method: 'GET',
    success: function(pins) {
      console.log(pins);
      self.addPinsToMap(pins);
    },
  });
}

/**
  *Adds a marker and infowindow for each pin on explore map
  *@param {object} map Map from init map.
  *@param {array} pins Map from init map.
  */
HomeMap.prototype.addPinsToMap = function(pins) {
  var self = this;
  pins.forEach(function(pin) {
    const marker = self.addMarker(pin);
    self.addInfoWindow(pin, marker);
  });
}

HomeMap.prototype.addMarker = function(pin) {
  const pos = {
    lat: pin.pin_lat,
    lng: pin.pin_lng,
  };
  HomeMapMarker.prototype = new google.maps.OverlayView();
  /**
    *Adds custom markers to the explore map
    *@param {map} map Map from init map.
    *@param {object} latlng a lat lng object
    *@param {object} imageSrc image used for marker
    */
  function HomeMapMarker(map, latlng, imageSrc) {
    this.latlng_ = latlng;
    this.imageSrc_ = imageSrc;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
  }


  HomeMapMarker.prototype.onAdd = function() {
    // Check if the div has been created.
    let div = this.div_;
    if (!div) {
      // Create a overlay text DIV
      div = this.div_ = document.createElement('div');
      // Create the DIV representing our CustomMarker
      div.className = 'customMarker';


      const imgDiv = document.createElement('div');
      imgDiv.setAttribute('style',
          'background-image: url("'+ this.imageSrc_+ '")');
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

  HomeMapMarker.prototype.draw = function() {
    // Position the overlay
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
      this.div_.style.left = point.x + 'px';
      this.div_.style.top = point.y + 'px';
    }
  };

  HomeMapMarker.prototype.onRemove = function() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };

  HomeMapMarker.prototype.getPosition = function() {
    return this.latlng_;
  };

  const marker = new HomeMapMarker(this.map, new google.maps.LatLng(pos.lat, pos.lng), pin.user_profilePic);
  return marker;
}


HomeMap.prototype.addInfoWindow = function(pin, marker) {
  const infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(25, 10),
  });

  let img = './assets/images/userProfile.png';
  if (pin.pin_imgUrl) img = pin.pin_imgUrl;
  const contentString =
  '<div class="infowindow">' +
    '<div>' +
      '<h1>'+ pin.pin_title + '</h1>' +
    '</div>'+

    '<div>'+
      '<div class="pin-img" style="background-image: url('+ img +'); "></div>'+
    '</div>' +
    '<div>'+
      '<p><b>'+ pin.user_username + ' </b>'+ pin.pin_description + '</p>' +
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
    this.map.setZoom(17);
    this.map.panTo({lat: pin.pin_lat, lng: pin.pin_lng});
  });
}


HomeMap.prototype.addPlaceInfoWIndow = function() {
  const infowindow = new google.maps.InfoWindow();
  const contentString =
  '<div class="infowindow">' +
    '<div>' +
      '<h1>'+ place.name + '</h1>' +
      '<h3>'+ place.formatted_address + '</h3>' +
    '</div>'+

    '<div>'+
      '<div class="pin-img" style="background-image: url('+ place.photos[0].getUrl() +'); "></div>'+
      '<button>Use Location for New Event'
    '</div>' +
  '</div>';
  infowindow.setContent(contentString);

  marker.addListener('click', function() {
    this.map.setZoom(17);
    this.map.panTo(place.geometry.location)
    infowindow.open(this.map, marker);
  });
}

HomeMap.prototype.initMenu = function() {
}

HomeMap.prototype.addButtons = function() {
  MapShotMap.prototype.addButtons.call(this);
  // button for adding pin
  const addPinControlDiv = document.createElement('div');
  addPinControl(addPinControlDiv);
  this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(addPinControlDiv);

  // button for seeing pervious pin
  const leftControlDiv = document.createElement('div');
  addLeftControl(leftControlDiv);
  this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(leftControlDiv);

  // button for seeing next pin
  const rightControlDiv = document.createElement('div');
  addRightControl(rightControlDiv);
  this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(rightControlDiv);

}

/**
 * Adds left control to map
* @param {html} controlDiv Map from init map.
 * @param {map} map Map from init map.
 */
function addLeftControl(controlDiv) {
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'leftControl';
  controlUI.style.width = '50px';
  controlUI.style.backgroundColor = 'none';
  controlUI.style.borderRadius = '3px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '30px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to see previous pin';
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.style.color = 'white';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '100px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<i class="fas fa-caret-left"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    // Previous Event
  });
}
/**
 * Adds right control to map
* @param {html} controlDiv Map from init map.
 * @param {map} map Map from init map.
 */
function addRightControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'rightControl';
  controlUI.style.width = '50px';
  controlUI.style.backgroundColor = 'none';
  controlUI.style.borderRadius = '3px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '30px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to see next pin';
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.style.color = 'white';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '100px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<i class="fas fa-caret-right"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    // next event
  });
}
/**
 * Adds add pin control to map
* @param {html} controlDiv Map from init map.
 * @param {map} map Map from init map.
 */
function addPinControl(controlDiv) {
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
  controlUI.title = 'Click to add a pin';
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
  controlText.innerHTML = '<i class="fas fa-plus"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', () => {
    $('#overlay-back').fadeIn(500);
    $('#addNewPinContainer').slideDown(500);
  });
}

var sitemap;

function initMap() {
  sitemap = new HomeMap();
}
