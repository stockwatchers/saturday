if (parseInt($(window).height()) > parseInt($(window).width())) {
  $('html').css('overflow-y','hidden');
  $('#wrapper').height($(window).height());
  $('#page-content-wrapper').height($(window).height());
  $('#body').height($(window).height() - $('.openPortBtm').height());
  var stockGraphHeight = $(window).height() - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
  $('#stockGraph').height(stockGraphHeight);
} else {
  $('html').css('overflow-y','visible');
  $('#wrapper').height(640);
  $('#page-content-wrapper').height(640);
  $('#body').height(640 - $('.openPortBtm').height());
  var stockGraphHeight = 640 - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
  $('#stockGraph').height(stockGraphHeight);
}
$(window).resize(function() {
  if (parseInt($(window).height()) > parseInt($(window).width())) {
    $('html').css('overflow-y','hidden');
    $('#wrapper').height($(window).height());
    $('#page-content-wrapper').height($(window).height());
    $('#body').height($(window).height() - $('.openPortBtm').height());
    var stockGraphHeight = $(window).height() - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
    $('#stockGraph').height(stockGraphHeight);
  } else {
    $('html').css('overflow-y','visible');
    $('#wrapper').height(640);
    $('#page-content-wrapper').height(640);
    $('#body').height(640 - $('.openPortBtm').height());
    var stockGraphHeight = 640 - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
    $('#stockGraph').height(stockGraphHeight);
  }
});

if (parseInt($(window).height()) > parseInt($(window).width())) {
  $('html').css('overflow-y','hidden');
  $('#sidebar-wrapper').height($(window).height() - $('.openPort').height());
  $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
  $('#sidebar-wrapper').css('left', '0px');
} else {
  $('html').css('overflow-y','visible');
  $('#sidebar-wrapper').height(640 - $('.openPort').height());
  $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
  $('#sidebar-wrapper').css('left', '0px');
}
$(window).resize(function() {
  if (parseInt($(window).height()) > parseInt($(window).width())) {
    $('html').css('overflow-y','hidden');
    $('#sidebar-wrapper').height($(window).height() - $('.openPort').height());
    $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
    if($('#sidebar-wrapper').css('left') !== '0px') $('#sidebar-wrapper').css('left', ($(window).width() + 'px'));
  } else {
    $('html').css('overflow-y','visible');
    $('#sidebar-wrapper').height(640 - $('.openPort').height());
    $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
    if($('#sidebar-wrapper').css('left') !== '0px') $('#sidebar-wrapper').css('left', ($(window).width() + 'px'));
  }
});
