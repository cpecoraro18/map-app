

function addButtons(map) {
  return;
}

//https://developers.google.com/maps/documentation/javascript/style-reference
//add user styles to map
function addStyles(map) {
  return;
}

function changeMapStyles() {
  //get colors from selects
  var hueColor = $('#hue').val();
  var waterColor = $('#water').val();
  var landColor = $('#land').val();
  var roadColor = $('#road').val();
  var poiColor = $('#poi').val();
  var showLabels = $('#labelCheckbox').prop('checked') ? 'on' : 'off';

  //apply styles to map
  var userStyles = [
    {
      stylers: [
        {hue: hueColor},
        {gamma: 0.5},
        {weight: 0.5},
        {visibility: 'simplified'}

      ]
    }, {
      elementType: "labels",
      stylers: [
        {visibility: showLabels}
      ]
    }, {
      featureType: "water",
      stylers: [
        {color: waterColor}
      ]
    }, {
      featureType: "landscape",
      stylers: [
        {color: landColor}
      ]
    }, {
      featureType: "road",
      stylers: [
        {color: roadColor}
      ]
    }, {
      featureType: "poi",
      stylers: [
        {color: poiColor}
      ]
    }
  ]
  //set map options with new style
  map.setOptions({
    styles: userStyles
  })
}
