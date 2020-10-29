
var template;

function addButtons(map) {
  return;
}

//start with a blank map
function addStyles(map) {

}

function loadMarkers(map) {
  return;
}

function changeMapStyles() {
  //get colors from selects
  template = mapStyles[$("#styleTemplate").val()];
  var roadLabel = $("#roadVisible").val();
  var labels = $("#labels").val();
  var landmarks = $("#landmarks").val();


  if(landmarks == "on") {
    template = changeFeatureStyle(template, "administrative", "geometry", "visibility", "on");
    template = changeFeatureStyle(template, "poi", "all", "visibility", "on");
    template = changeFeatureStyle(template, "road", "labels.icon", "visibility", "on");
    template = changeFeatureStyle(template, "transit", "all", "visibility", "on");
  }
  if(landmarks == "simplified"){
    template = changeFeatureStyle(template, "administrative", "geometry", "visibility", "on");
    template = changeFeatureStyle(template, "poi", "all", "visibility", "off");
    template = changeFeatureStyle(template, "transit", "all", "visibility", "off");
  }
  else if(landmarks == "off"){
    template = changeFeatureStyle(template, "administrative", "geometry", "visibility", "off");
    template = changeFeatureStyle(template, "poi", "all", "visibility", "off");
    template = changeFeatureStyle(template, "transit", "all", "visibility", "off");
  }

  template = changeFeatureStyle(template, "road", null, "visibility", roadLabel);
  template = changeFeatureStyle(template, null, "labels", "visibility", labels);
  //set map options with new style
  map.setOptions({
    styles: template
  })
}

function saveStyle() {
  $.ajax({
    type: "PUT",
    url: "/user/style",
    data: {userStyle: template},
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function(data, status) {
      window.location = "/profile";
    }
  })
}


function changeFeatureStyle(template, featureType, elementType, attr, val) {
  var elementExists = false;
  var propertyExists = false;
  template.forEach(function(element) {
    //if the feature and element is in the template
    if(featureType == element.featureType && elementType == element.elementType){
      console.log("changing existing feature");
      elementExists = true;
      element.stylers.forEach(function(style) {
        console.log("changing existing style")
        propertyExists = true;
        if(style.hasOwnProperty(attr)) {
          style[attr] = val;
        }
      });
      if(!propertyExists){
        console.log("adding new style to existing feature")
        var newStyle = {};
        newStyle[attr] = val;
        element.stylers.push(newStyle);

      }
    }
  });
  if(!elementExists) {
    console.log("adding new feature");
    //if the element is not in the tempalte
    var newElement = {
      "stylers": [
        {}
      ]
    }
    newElement.stylers[0][attr] = val;
    if(featureType) {
      newElement["featureType"] = featureType;
    }
    if(elementType) {
      newElement["elementType"] = elementType;
    }
    template.push(newElement);
  }
  return template;
}
