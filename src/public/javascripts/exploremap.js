/**
* Explore Map
*@module BucketListMap
*/

/**
 * Explore Map
 * @class
 * @constructor
 */

function ExploreMap() {
  console.log("Init Explore Map")
  MapShotMap.call(this);
  console.log("Done with Mapshot constructor")
  this.initMenu();
  this.getPins();
}

ExploreMap.prototype = Object.create(MapShotMap.prototype);
ExploreMap.prototype.constructor = ExploreMap;

/**
  *Gets pins from backend and starts process of putting them on the map
  */
ExploreMap.prototype.getPins = function() {
  var self = this;
  $.ajax({
    url: '/pin/feed',
    method: 'GET',
    success: function(pins) {
      self.addPinsToMap(pins);
    },
  });
}

/**
  *Adds a marker and infowindow for each pin on explore map
  *@param {array} pins Map from init map.
  */
ExploreMap.prototype.addPinsToMap = function(pins) {
  var self = this;
  pins.forEach(function(pin) {
    const marker = self.addMarker(pin);
    self.addInfoWindow(pin, marker);
  });
}

/**
  *Adds a marker based on pin information
  *@param {array} pin has pin information
  */
ExploreMap.prototype.addMarker = function(pin) {
  const pos = {
    lat: pin.pin_lat,
    lng: pin.pin_lng,
  };
  ExploreMapMarker.prototype = new google.maps.OverlayView();
  /**
    *Adds custom markers to the explore map
    *@param {map} map Map from init map.
    *@param {object} latlng a lat lng object
    *@param {object} imageSrc image used for marker
    */
  function ExploreMapMarker(map, latlng, imageSrc) {
    this.latlng_ = latlng;
    this.imageSrc_ = imageSrc;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
  }


  ExploreMapMarker.prototype.onAdd = function() {
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

  ExploreMapMarker.prototype.draw = function() {
    // Position the overlay
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
      this.div_.style.left = point.x + 'px';
      this.div_.style.top = point.y + 'px';
    }
  };

  ExploreMapMarker.prototype.onRemove = function() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  };

  ExploreMapMarker.prototype.getPosition = function() {
    return this.latlng_;
  };

  const marker = new ExploreMapMarker(this.map, new google.maps.LatLng(pos.lat, pos.lng), pin.user_profilePic);
  return marker;
}

/**
  *Adds a infowindow to marker based on pin information
  *@param {array} pin holds pin information
  *@param {array} marker for infowindow to be attatched to
  */
ExploreMap.prototype.addInfoWindow = function(pin, marker) {
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

/**
  *Adds a infowindow to marker based on place information
  *@param {array} pin holds pin information
  *@param {array} marker for infowindow to be attatched to
  */
ExploreMap.prototype.addPlaceInfoWindow = function(place, marker) {
  let img = './assets/images/userProfile.png';
  if (place.photos) img = place.photos[0].getUrl()
  const infowindow = new google.maps.InfoWindow();
  const contentString =
  '<div class="infowindow">' +
    '<div>' +
      '<h1>'+ place.name + '</h1>' +
      '<h3>'+ place.formatted_address + '</h3>' +
    '</div>'+

    '<div>'+
      '<div class="pin-img" style="background-image: url('+ img +'); "></div>'+
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
/**
  *Initializes explore map menu
  */
ExploreMap.prototype.initMenu = function() {
  console.log("Initializing Menu");
  const searchbox = new google.maps.places.SearchBox($("#explore_textbox")[0]);
  this.map.addListener('bounds_changed', () => {
    searchbox.setBounds(this.map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchbox.addListener('places_changed', () => {
    const places = searchbox.getPlaces();

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
        console.log('Returned place contains no geometry');
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place
      let markerMap = this.map;
      const marker = new google.maps.Marker({
          map: markerMap,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
        });
      markers.push(
        marker
      );

      this.addPlaceInfoWindow(place, marker);


      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.map.fitBounds(bounds);
  });
}
/** @global */
var map;
/**
  *Initializes the map when the window is loaded
  */
function initMap() {
  map = new ExploreMap();
}
