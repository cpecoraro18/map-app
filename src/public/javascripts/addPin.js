//  sets up new pin windows to scroll down
$( document ).ready(function() {
  $('#addNewPinContainer').slideUp(500);
});
//  closes new pin window
$('#closeAddPin').on('click', () => {
  $('#addNewEventContainer').slideUp(500);
  $('#overlay-back').fadeOut(500);
});
