//  sets up new pin windows to scroll down
$( document ).ready(function() {
  $('#addNewBucketContainer').slideUp(500);
});
//  closes new pin window
$('#closeAddBucket').on('click', () => {
  $('#addNewBucketContainer').slideUp(500);
  $('#overlay-back').fadeOut(500);
});
