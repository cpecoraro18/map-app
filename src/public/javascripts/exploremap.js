//loads pins from pages user doesnt follow
function loadMarkers(map) {
  $.ajax({
   url:"/pin/feed",
   method: "GET",
   success:function(pins) {
     console.log(pins);
     addPinsToMap(pins, map);
   }
 });
}

function addPinsToMap(pins, map) {
  pins.forEach(function(pin) {
    var marker = addMarker(pin, map);
    addInfoWindow(pin, marker, map);
  })
}

function addMarker(pin, map) {
  var pos = {
    lat: pin.lat,
    lng: pin.lng
  };
  CustomMarker.prototype = new google.maps.OverlayView();

  function CustomMarker(latlng, map, imageSrc) {
      this.latlng_ = latlng;
      this.imageSrc_ = imageSrc;
      // Once the LatLng and text are set, add the overlay to the map.  This will
      // trigger a call to panes_changed which should in turn call draw.
      this.setMap(map);
  }


  CustomMarker.prototype.onAdd = function() {
    // Check if the div has been created.
    var div = this.div_;
    if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('div');
        // Create the DIV representing our CustomMarker
        div.className = "customMarker"


        var imgDiv = document.createElement("div");
        imgDiv.setAttribute('style', 'background-image: url("'+ this.imageSrc_+ '")');
        imgDiv.className = "customMarkerImage"
        var maxColors = 3;
        var color = Math.floor(Math.random()*maxColors);
        if(color == 0) imgDiv.style.border = "solid #94B447";
        if(color == 1) imgDiv.style.border = "solid #3B5284";
        if(color == 2) imgDiv.style.border = "solid #5BA8A0";
        div.appendChild(imgDiv);
        console.log(div)
        var me = this;
        google.maps.event.addDomListener(div, "mouseover", function (event) {
            google.maps.event.trigger(me, "mouseover");
        });
        google.maps.event.addDomListener(div, "mouseout", function (event) {
            google.maps.event.trigger(me, "mouseout");
        });
        google.maps.event.addDomListener(div, "click", function (event) {
            google.maps.event.trigger(me, "click");
        });

        // Then add the overlay to the DOM
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
  }

  CustomMarker.prototype.draw = function () {
      // Position the overlay
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
          this.div_.style.left = point.x + 'px';
          this.div_.style.top = point.y + 'px';
      }
  };

  CustomMarker.prototype.onRemove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
      }
  };

  CustomMarker.prototype.getPosition = function () {
      return this.latlng_;
  };

  var marker = new CustomMarker(new google.maps.LatLng(pos.lat, pos.lng), map, pin.userPic_url);
  return marker;
}

function addInfoWindow(pin, marker, map) {
  var infowindow = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(25, 10)
  });
  var contentString =
  '<div class="infowindow">' +
    '<div>' +
      '<h1>'+ pin.title + '</h1>' +
    '</div>'+

    '<div>'+
      '<div class="pin-img" style="background-image: url('+ pin.img_url +'); "></div>'+
    '</div>' +
    '<div>'+
      '<p><b>'+ pin.userName + ' </b>'+ pin.description + "</p>" +
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
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);
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
