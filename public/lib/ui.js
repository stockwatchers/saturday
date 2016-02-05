if($(window).width() < 400) {
  $('#button-6M').hide();
} else {
  $('#button-6M').show();
}
if (parseInt($(window).height()) > parseInt($(window).width())) {
  $('html').css('overflow-y','hidden');
  $('#wrapper').height($(window).height());
  $('#page-content-wrapper').height($(window).height());
  $('#body').height($(window).height() - $('.openPortBtm').height());
  var stockGraphContainerHeight = $(window).height() - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
  $('#stockGraphContainer').height(stockGraphContainerHeight);
  $('#sidebar-wrapper').height($(window).height() - $('.openPort').height());
  $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
  $('#sidebar-wrapper').css('left', '0px');
} else {
  $('html').css('overflow-y','visible');
  $('#wrapper').height(900);
  $('#page-content-wrapper').height(900);
  $('#body').height(900 - $('.openPortBtm').height());
  var stockGraphContainerHeight = 900 - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
  $('#stockGraphContainer').height(stockGraphContainerHeight);
  $('#sidebar-wrapper').height(900 - $('.openPort').height());
  $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
  $('#sidebar-wrapper').css('left', '0px');
}
$(window).resize(function() {
  if (parseInt($(window).height()) > parseInt($(window).width())) {
    $('html').css('overflow-y','hidden');
    $('#wrapper').height($(window).height());
    $('#page-content-wrapper').height($(window).height());
    $('#body').height($(window).height() - $('.openPortBtm').height());
    var stockGraphContainerHeight = $(window).height() - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
    $('#stockGraphContainer').height(stockGraphContainerHeight);
    $('#sidebar-wrapper').height($(window).height() - $('.openPort').height());
    $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
    if($('#sidebar-wrapper').css('left') !== '0px') $('#sidebar-wrapper').css('left', ($(window).width() + 'px'));
    if($(window).width() < 400) {
      $('#button-6M').hide();
    } else {
      $('#button-6M').show();
    }
    //for calling update graph after things have resized.  Taken from https://css-tricks.com/snippets/jquery/done-resizing-event/
    resizeTimer = setTimeout(function() {
      if($('#stockGraph').length) {
        updateGraph($('#stock-symbol').text(), false);
      }
      clearTimeout(resizeTimer);
    }, 250);
  } else {
    $('html').css('overflow-y','visible');
    $('#wrapper').height(900);
    $('#page-content-wrapper').height(900);
    $('#body').height(900 - $('.openPortBtm').height());
    var stockGraphContainerHeight = 900 - $('.openPort').height() - $('.page-header').height() - $('.page-header').position().top - $('.rangeWrap').height();
    $('#stockGraphContainer').height(stockGraphContainerHeight);
    $('#sidebar-wrapper').height(900 - $('.openPort').height());
    $('#sidebar-wrapper').css('top', ($('.openPort').height() + 'px'));
    if($('#sidebar-wrapper').css('left') !== '0px') $('#sidebar-wrapper').css('left', ($(window).width() + 'px'));
    if($(window).width() < 400) {
      $('#button-6M').hide();
    } else {
      $('#button-6M').show();
    }
    //for calling update graph after things have resized, this keeps the loading icon centered.  Taken from https://css-tricks.com/snippets/jquery/done-resizing-event/
    resizeTimer = setTimeout(function() {
      if($('#stockGraph').length) {
        updateGraph($('#stock-symbol').text(), false);
      }
      clearTimeout(resizeTimer);
    }, 250);
  }
});
