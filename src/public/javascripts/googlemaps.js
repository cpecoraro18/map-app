//add google maps script to html page
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#googleMap').length > 0) {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBy106-dumHQTbeuqRa4XkmPc_tO98YGrA&libraries=places&callback=initMap&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});


var map;

function initMap() {
  var mapProp= {
  center:new google.maps.LatLng(44.9727, -93.23540000000003),
  zoom:3,
  gestureHandling: 'greedy',
  minZoom: 3,
  disableDefaultUI: true,
  fullscreenControl: true
};

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
