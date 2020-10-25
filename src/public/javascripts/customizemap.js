

function addButtons(map) {
  return;
}

//https://developers.google.com/maps/documentation/javascript/style-reference
//add user styles to map
function addStyles(map) {
}

function loadMarkers(map) {
  return;
}

function changeMapStyles() {
  //get colors from selects


  var userStyles = mapTemplates[$("#template").val()];
  //based on labels


  //set map options with new style
  map.setOptions({
    styles: userStyles
  })
}
