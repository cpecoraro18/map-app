
/**
 * User Map
 * @class
 * @constructor
 */
function UserMap() {
  console.log('Init Home Map');
  MapShotMap.call(this);
  this.pinObjects = []
  this.getPins();
  this.getTags();
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
    url: '/pin/user',
    method: 'GET',
    success: function(pins) {
      pins.forEach(function(pin) {
        self.getPinImages(pin);
      });
    },
  });
};
/**
  *Gets pins images
  */
UserMap.prototype.getPinImages = function(pin) {
  //to be removed
  const self = this;
    $.ajax({
      url: '/pin/images/?pinId=' + pin.pin_id,
      type: 'GET',
      contentType: 'application/json',
      success: function(images) {
        pin.images = images;
        self.getPinTags(pin);
      },
    });

};

/**
  *Gets pins tags
  */
UserMap.prototype.getPinTags = function(pin) {
  //to be removed
  const self = this;
  $.ajax({
    url: '/pin/tags/?pinId=' + pin.pin_id,
    type: 'GET',
    contentType: 'application/json',
    success: function(tags) {
      pin.tags = tags;
      self.addPinToMap(pin);
    },
  });
};

UserMap.prototype.getTags = function() {
  const self = this;
  $.ajax({
    url: '/user/tags',
    method: 'GET',
    success: function(tags) {
      self.addTagstoMenu(tags);
    },
  });
};

UserMap.prototype.addTagstoMenu = function(tags) {
  let self = this;
  let tagContainer = $('#tags')[0]
  let allTagRow = document.createElement('tr');
  let allTagContainer = document.createElement('td');
  allTagContainer.addEventListener('click', function(){
    self.filterEventsByTag({tag_name: "All"})
  })
  let allTag = document.createElement("span");
  allTag.className = "tag"
  allTag.innerHTML = "All";
  allTagContainer.appendChild(allTag);

  allTagRow.appendChild(allTagContainer);

  tagContainer.appendChild(allTagRow);

  tags.forEach((tag, i) => {
    console.log(tag)
    if(i%2 == 0) return;

    let tagRow = document.createElement('tr');


    let firstTagContainer = document.createElement('td');
    firstTagContainer.addEventListener('click', function(){
      self.filterEventsByTag(tag)
    })
    let firstTag = document.createElement("span");
    firstTag.className = "tag"
    firstTag.innerHTML = tag.tag_name;
    firstTagContainer.appendChild(firstTag);

    tagRow.appendChild(firstTagContainer);


    if(tags[i+1]){
      let secondTagContainer = document.createElement('td');
      secondTagContainer.addEventListener('click', function(){
        self.filterEventsByTag(tags[i + 1])
      })
      let secondTag = document.createElement("span");
      secondTag.className = "tag"
      secondTag.innerHTML = tags[i + 1].tag_name;
      secondTagContainer.appendChild(secondTag);
      tagRow.appendChild(secondTagContainer);
    }


    tagContainer.appendChild(tagRow);

  });
};

UserMap.prototype.filterEventsByTag = function(tag) {
  console.log(tag);
  let self = this;
  var bounds = new google.maps.LatLngBounds();
  this.pinObjects.forEach((pinObject) => {
    let hasTag = false;
    pinObject.pin.tags.forEach((t) => {
      if(t.tag_name == tag.tag_name || tag.tag_name == "All") {
        hasTag = true;
      }
    });
    if(hasTag){
      pinObject.marker.setMap(self.map);
      bounds.extend(pinObject.marker.latlng_);
    }
    else pinObject.marker.setMap(null);
  });
  this.map.fitBounds(bounds, {padding: {
            top: 0,
            bottom: 0,
            left:600,
            right: 0
        }});
  retractMenu();
};


/**
  *Adds a marker and infowindow for each pin on explore map
  *@param {array} pins Map from init map.
  */
UserMap.prototype.addPinToMap = function(pin) {
  const pinMarker = this.addMarker(pin);
  const pinInfoWindow = this.addInfoWindow(pin, pinMarker);

  var pinElements = {
    pin: pin,
    marker: pinMarker,
    infowindow: pinInfoWindow,
  }
  this.pinObjects.push(pinElements)
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
  let img = './assets/images/userProfile.png';
  if(pin.user_profilePic) img = pin.user_profilePic

  const marker = new UserMapMarker(this.map, new google.maps.LatLng(pos.lat, pos.lng), img);
  return marker;
};

/**
  *Adds an infowindow based on information from the pin
  *@param {array} pin holds information about pin
  *@param {array} marker the marker that the infowindow will be attatched to
  */
UserMap.prototype.addInfoWindow = function(pin, marker) {
  console.log(pin);
  const infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(25, 10),
  });
  const self = this;
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
      marker.addListener('click', function() {
        self.map.setZoom(17);
        self.map.panTo({lat: pin.pin_lat, lng: pin.pin_lng});
      });
    },
  });
  return infowindow;
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
    $('#user').html(user.user_name);
    if(user.user_bio) $('#profile_TextBox').html(user.user_bio);
    else $('#profile_TextBox').css('display', 'none')
  });
};



/** @global */
let map;

/**
  *Initializes the map when the window is loaded
  */
function initMap() {
  map = new UserMap();
}
