/**
* Customize Map
*@module customizeMap
*/

/**
* current template that is styling the customize map. Can be saved as a user style
* @type {Object}
*/
let template = [];

/**
 * Adds buttons necessary for customize map
 * @param {map} map Map from init map.
 */
function addButtons(map) {
  return;
}


/**
  *Adds initial styles to the cu
  stomize map
  *@param {map} map Map from init map.
  */
function addStyles(map) {
  return;
}

/**
  *Adds markers that will be displayed on the customize map
  *@param {map} map Map from init map.
  */
function loadMarkers(map) {
  return;
}

function initMenu(map) {
}

/**
  * Changes map styles based on values selected from a dropdown
  */
function changeMapStyles() {
  //  get colors from selects
  template = mapStyles[$('#styleTemplate').val()];
  const roadLabel = $('#roadVisible').val();
  const labels = $('#labels').val();
  const landmarks = $('#landmarks').val();


  if (landmarks == 'on') {
    template = changeFeatureStyle(template,
        'administrative', 'geometry', 'visibility', 'on');
    template = changeFeatureStyle(template,
        'poi', 'all', 'visibility', 'on');
    template = changeFeatureStyle(template,
        'road', 'labels.icon', 'visibility', 'on');
    template = changeFeatureStyle(template,
        'transit', 'all', 'visibility', 'on');
  } if (landmarks == 'simplified') {
    template = changeFeatureStyle(template,
        'administrative', 'geometry', 'visibility', 'on');
    template = changeFeatureStyle(template,
        'poi', 'all', 'visibility', 'off');
    template = changeFeatureStyle(template,
        'transit', 'all', 'visibility', 'off');
  } else if (landmarks == 'off') {
    template = changeFeatureStyle(template,
        'administrative', 'geometry', 'visibility', 'off');
    template = changeFeatureStyle(template,
        'poi', 'all', 'visibility', 'off');
    template = changeFeatureStyle(template,
        'transit', 'all', 'visibility', 'off');
  }

  template = changeFeatureStyle(template,
      'road', null, 'visibility', roadLabel);
  template = changeFeatureStyle(template,
      null, 'labels', 'visibility', labels);

  //  set map options with new style
  map.setOptions({
    styles: template,
  });
}
/**
  * Sends style to server
  */
function saveStyle() {
  $.ajax({
    type: 'PUT',
    url: '/user/style',
    data: {userStyle: JSON.stringify(template)},
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded',
    success: function(data, status) {
      window.location = '/profile';
    },
  });
}

/**
  * Changes any given google style template to add or change a given style
  * @param {json} template - Map style template
  * @param {String} featureType - Map feature being edited
  * @param {String} elementType - Map element being edited
  * @param {String} attr - the style attribute being edited
  * @param {String} val - the value of the style attr
  * @return {json} Edited template
  */
function changeFeatureStyle(template, featureType, elementType, attr, val) {
  let elementExists = false;
  let propertyExists = false;
  template.forEach(function(element) {
    // if the feature and element is in the template
    if (featureType == element.featureType &&
        elementType == element.elementType) {
      elementExists = true;
      element.stylers.forEach(function(style) {
        propertyExists = true;
        if (style.hasOwnProperty(attr)) {
          style[attr] = val;
        }
      });
      if (!propertyExists) {
        const newStyle = {};
        newStyle[attr] = val;
        element.stylers.push(newStyle);
      }
    }
  });
  if (!elementExists) {
    // if the element is not in the tempalte
    const newElement = {
      'stylers': [
        {},
      ],
    };
    newElement.stylers[0][attr] = val;
    if (featureType) {
      newElement['featureType'] = featureType;
    }
    if (elementType) {
      newElement['elementType'] = elementType;
    }
    template.push(newElement);
  }
  return template;
}
