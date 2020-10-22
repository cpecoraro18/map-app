

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
  controlUI.title = "Click to recenter the map";
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
  controlUI.title = "Click to see next pin";
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
  });
}
