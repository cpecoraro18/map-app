
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
  console.log(marker)
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

  //button for adding pin
  const addPinControlDiv = document.createElement("div");
  AddPinControl(addPinControlDiv, map);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(addPinControlDiv);

  //button for seeing pervious pin
  const leftControlDiv = document.createElement("div");
  LeftControl(leftControlDiv, map);
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(leftControlDiv);

  //button for seeing next pin
  const rightControlDiv = document.createElement("div");
  RightControl(rightControlDiv, map);
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(rightControlDiv);

  return;
}

function addStyles(map) {
  return;
}





function LeftControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "leftControl";
  controlUI.style.width = "50px";
  controlUI.style.backgroundColor = "none";
  controlUI.style.borderRadius = "3px";
  controlUI.style.cursor = "pointer";
  controlUI.style.margin = "30px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to see previous pin";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "white";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "100px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = '<i class="fas fa-caret-left"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    //Previous Event
  });
}

function RightControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.id = "rightControl";
  controlUI.style.width = "50px";
  controlUI.style.backgroundColor = "none";
  controlUI.style.borderRadius = "3px";
  controlUI.style.cursor = "pointer";
  controlUI.style.margin = "30px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to see next pin";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "white";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "100px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = '<i class="fas fa-caret-right"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    //next event
  });
}

function AddPinControl(controlDiv, map) {
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
  controlUI.style.margin = "30px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to add a pin";
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
  controlText.innerHTML = '<i class="fas fa-plus"></i>';
  controlUI.appendChild(controlText);

  controlUI.addEventListener("click", () => {
    $('#overlay-back').fadeIn(500);
    $('#addNewEventContainer').slideDown(500);
  });
}
