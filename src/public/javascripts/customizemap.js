

var map;

function initMap() {
  var mapProp= {
  center:new google.maps.LatLng(44.9727, -93.23540000000003),
  zoom:3,
  gestureHandling: 'greedy',
  minZoom: 3,
  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
  map = new google.maps.Map(document.getElementById("map"), mapProp);
  addStaticButtons(map);
  addButtons(map);
  addStyles(map);

}

function addButtons(map) {

}

//https://developers.google.com/maps/documentation/javascript/style-reference
//add user styles to map
function addStyles(map) {
}

function changeMapStyles() {
  var hueColor = $('#hue').val();
  var waterColor = $('#water').val();
  var landColor = $('#land').val();
  var roadColor = $('#road').val();
  var poiColor = $('#poi').val();
  var showLabels = $('#labelCheckbox').prop('checked') ? 'on' : 'off';
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
  console.log(map);
  map.setOptions({
    styles: userStyles
  })
  console.log(userStyles)
}
