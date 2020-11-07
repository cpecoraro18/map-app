$(function() {
  expandMenu();
});


function retractMenu() {
  const width = $('.dynamic-sidebar').width();
  // console.log(width);
  $('.dynamic-sidebar').css('margin-left', width*-1+'px');
  $('.dynamic-sidebar').css('margin-right', '-5px');
  $('.menu-toggle').html('<i class="fas fa-caret-right"></i>');
}

function expandMenu() {
  const width = $('.dynamic-sidebar').width();
  // console.log(width);
  $('.dynamic-sidebar').css('margin-left', '0px');
  $('.dynamic-sidebar').css('margin-right', width*-1+'px');
  $('.menu-toggle').html('<i class="fas fa-caret-left"></i>');
}

function toggleMenu() {
  const menu = $('.dynamic-sidebar');
  if (menu.hasClass( 'active' )) {
    menu.removeClass('active');
    expandMenu();
  } else {
    menu.addClass('active');
    retractMenu();
  }
}
