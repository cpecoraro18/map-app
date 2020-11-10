
/**
 * User Map
 * @class
 * @constructor
 */
function UserMap() {
  console.log('Init Home Map');
  MapShotMap.call(this);
  this.getPins();
  this.initAdd();
  console.log('Done with Mapshot constructor');
}

UserMap.prototype = Object.create(MapShotMap.prototype);
UserMap.prototype.constructor = UserMap;

/**
  *Gets pins from backend and starts process of putting them on the map
  */
UserMap.prototype.getPins = function() {
  const self = this;
  $.ajax({
    url: '/pin',
    method: 'GET',
    success: function(pins) {
      self.addPinsToMap(pins);
    },
  });
};


/**
  *Gets pins from backend and starts process of putting them on the map
  */
UserMap.prototype.initAdd = function() {
  const self = this;

  $('#addNewPinContainer').slideUp(500);

  //  closes new pin window
  $('#closeAddPin').on('click', () => {
    $('#addNewEventContainer').slideUp(500);
    $('#overlay-back').fadeOut(500);
    $('#newPinForm').trigger('reset');
    $('.image-preview-text')[0].style.display = 'block';
    $('.image-preview-img')[0].style.display = 'none';
    $('.image-preview-img')[0].setAttribute('src', '');
  });
  //  closes new pin window
  $('#overlay-back').on('click', (e) => {
    if (e.target.id == 'addNewPinContainer' || $(e.target).parents('#addNewPinContainer').length) {
      return;
    }
    $('#addNewEventContainer').slideUp(500);
    $('#overlay-back').fadeOut(500);
    $('#newPinForm').trigger('reset');
    $('.image-preview-text')[0].style.display = 'block';
    $('.image-preview-img')[0].style.display = 'none';
    $('.image-preview-img')[0].setAttribute('src', '');
  });

  const searchbox = new google.maps.places.SearchBox($('#location_searchbox')[0]);
  $('#submitButton').click(function(e) {
    e.preventDefault();
    const formData = new FormData($('#newPinForm')[0]);
    const places = searchbox.getPlaces();
    let pos;
    if (places && places[0].geometry) {
      pos = {
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng(),
      };
    } else if (places) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode( {'address': places.formatted_address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          pos = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
        } else {
          // address doesnt Exists
          alert('ADDRESS DOESNT EXIST');
          return;
        }
      });
    } else {
      // invalid location, input not entered
      alert('PLEASE INPUT LOCATION FEILD');
      return;
    }


    formData.append('lat', pos.lat);
    formData.append('lng', pos.lng);
    $.ajax({
      type: 'POST',
      url: '/pin',
      data: formData,
      processData: false,
      contentType: false,
      success: function(result) {
        $('#addNewEventContainer').slideUp(500);
        $('#overlay-back').fadeOut(500);
        self.getPins();
        self.map.setZoom(17);
        self.map.panTo({lat: parseInt(result.lat), lng: parseInt(result.lng)});
      },
    });
  });

  const inpFile = $('input[name=images]');
  const previewImg = $('.image-preview-img');
  const previewText = $('.image-preview-text');
  inpFile[0].addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      previewText[0].style.display = 'none';
      previewImg[0].style.display = 'block';

      reader.addEventListener('load', function() {
        previewImg[0].setAttribute('src', this.result);
      });

      reader.readAsDataURL(file);
    } else {
      previewText[0].style.display = 'block';
      previewImg[0].style.display = 'none';
    }
  });
};


/**
  *Adds a marker and infowindow for each pin on explore map
  *@param {array} pins Map from init map.
  */
UserMap.prototype.addPinsToMap = function(pins) {
  const self = this;
  pins.forEach(function(pin) {
    const marker = self.addMarker(pin);
    self.addInfoWindow(pin, marker);
  });
};

/**
  *Adds a marker based on information from pin
  *@param {object} pin Map from init map.
  * @return {object} marker for map
  */
UserMap.prototype.addMarker = function(pin) {
  const pos = {
    lat: pin.pin_lat,
    lng: pin.pin_lng,
  };
  UserMapMarker.prototype = new google.maps.OverlayView();
  /**
    *Adds custom markers to the explore map
    *@param {map} map Map from init map.
    *@param {object} latlng a lat lng object
    *@param {object} imageSrc image used for marker
    */
  function UserMapMarker(map, latlng, imageSrc) {
    this.latlng_ = latlng;
    this.imageSrc_ = imageSrc;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
  }


  UserMapMarker.prototype.onAdd = function() {
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

  UserMapMarker.prototype.draw = function() {
    // Position the overlay
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
      this.div_.style.left = point.x + 'px';
      this.div_.style.top = point.y + 'px';
    }
  };

  UserMapMarker.prototype.onRemove = function() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };

  UserMapMarker.prototype.getPosition = function() {
    return this.latlng_;
  };

  const marker = new UserMapMarker(this.map, new google.maps.LatLng(pos.lat, pos.lng), pin.user_profilePic);
  return marker;
};

/**
  *Adds an infowindow based on information from the pin
  *@param {array} pin holds information about pin
  *@param {array} marker the marker that the infowindow will be attatched to
  */
UserMap.prototype.addInfoWindow = function(pin, marker) {
  const infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(25, 10),
  });

  $.ajax({
    url: '/pin/images/?pinId=' + pin.pin_id,
    type: 'GET',
    contentType: 'application/json',
    success: function(images) {
      let img = '/assets/images/userProfile.png';
      if (images.length > 0) img = images[0].photo_path.replace(/\\/g, '/');
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
      const self = this;
      marker.addListener('click', function() {
        self.map.setZoom(17);
        self.map.panTo({lat: pin.pin_lat, lng: pin.pin_lng});
      });
    },
  });
};


/**
  *Initializes profile menu
  */
UserMap.prototype.initMenu = function() {
  $.get('/user/info', function( user ) {
    let img = './assets/images/userProfile.png';
    if (user.user_profilePic) img = user.user_profilePic;
    $('#profilePicture').css('background-image', 'url(' + img + ')');
    $('#username').html('@' + user.user_username);
    $('#bio').html(user.user_bio);
  });
};

/**
  *Adds buttons to bucketlist map
  */
UserMap.prototype.addButtons = function() {
  MapShotMap.prototype.addButtons.call(this);
  // button for adding pin
  const addPinControlDiv = document.createElement('div');
  addPinControl(addPinControlDiv);
  this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(addPinControlDiv);
};


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
/** @global */
let map;

/**
  *Initializes the map when the window is loaded
  */
function initMap() {
  map = new UserMap();
}
