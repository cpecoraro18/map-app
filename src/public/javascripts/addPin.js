$( document ).ready(function() {
  $('#addNewEventContainer').slideUp(500);
});

$("#closeAddPin").on("click", () => {
  $('#addNewEventContainer').slideUp(500);
  $('#overlay-back').fadeOut(500);

});
