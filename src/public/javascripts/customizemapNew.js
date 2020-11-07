/**
* Home Map
*@module CustomizeMap
*/

function CustomizeMap() {
  console.log("Init Home Map")
  MapShotMap.call(this);
  this.template = [];
  console.log("Done with Mapshot constructor")
}

CustomizeMap.prototype = Object.create(MapShotMap.prototype);
CustomizeMap.prototype.constructor = CustomizeMap;



CustomizeMap.prototype.initMenu = function() {
  return;
}

CustomizeMap.prototype.addButtons = function() {
  MapShotMap.prototype.addButtons.call(this);
}

CustomizeMap.prototype.changeMapStyles = function() {
  //  get colors from selects
  this.template = mapStyles[$('#styleTemplate').val()];
  const roadLabel = $('#roadVisible').val();
  const labels = $('#labels').val();
  const landmarks = $('#landmarks').val();


  if (landmarks == 'on') {
    this.template = changeFeatureStyle(this.template,
        'administrative', 'geometry', 'visibility', 'on');
    this.template = changeFeatureStyle(this.template,
        'poi', 'all', 'visibility', 'on');
    this.template = changeFeatureStyle(this.template,
        'road', 'labels.icon', 'visibility', 'on');
    this.template = changeFeatureStyle(template,
        'transit', 'all', 'visibility', 'on');
  } if (landmarks == 'simplified') {
    this.template = changeFeatureStyle(this.template,
        'administrative', 'geometry', 'visibility', 'on');
    this.template = changeFeatureStyle(template,
        'poi', 'all', 'visibility', 'off');
    this.template = changeFeatureStyle(this.template,
        'transit', 'all', 'visibility', 'off');
  } else if (landmarks == 'off') {
    this.template = changeFeatureStyle(this.template,
        'administrative', 'geometry', 'visibility', 'off');
    this.template = changeFeatureStyle(this.template,
        'poi', 'all', 'visibility', 'off');
    this.template = changeFeatureStyle(this.template,
        'transit', 'all', 'visibility', 'off');
  }

  this.template = changeFeatureStyle(this.this.template,
      'road', null, 'visibility', roadLabel);
  this.template = changeFeatureStyle(this.template,
      null, 'labels', 'visibility', labels);

  //  set map options with new style
  this.map.setOptions({
    styles: this.template,
  });
}

CustomizeMap.prototype.saveStyle  = function() {
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
var sitemap;

function initMap() {
  sitemap = new CustomizeMap();
}
