$(function() {
  expandMenu();
});


function retractMenu() {
  $('.dynamic-sidebar').css('margin-left', '-27%');
  $('.dynamic-sidebar').css('margin-right', '0');
  $('.menu-toggle').html('<i class="fas fa-caret-right"></i>');
}

function expandMenu() {
  $('.dynamic-sidebar').css('margin-left', '0');
  $('.dynamic-sidebar').css('margin-right', '-30%');
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
