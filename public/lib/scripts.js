/* This function slides the sidebar on the page */

    $(".glyphicon-arrow-left").click(function() {
        $("#sidebar-wrapper").css("left", '0px').css('transition-duration','1s');
    });

    $(".openPortBtm p").click(function() {
        $("#sidebar-wrapper").css("left", '0px').css('transition-duration','1s');
    });

    $(".openPortBtm p").on("swipeleft",function(){
      $("#sidebar-wrapper").css("left", '0px').css('transition-duration','1s');
    });

/* This function slides the sidebar off the page */

    $(".openGraphBtm .glyphicon-arrow-right").click(function() {
        $("#sidebar-wrapper").css("left", ($(window).width() + 'px')).css('transition-duration','1s');
    });

    $(".openGraphBtm p").click(function() {
        $("#sidebar-wrapper").css("left", ($(window).width() + 'px')).css('transition-duration','1s');
    });

    $(".openPortBtm p").on("swipe",function(){
      $("#sidebar-wrapper").css("left", ($(window).width() + 'px')).css('transition-duration','1s');
    });
    $("#viewGraph").click(function(){
      $("#sidebar-wrapper").css("left", ($(window).width() + 'px')).css('transition-duration','1s');
    });
    $('.stockWatch').click(function() {
      $("#sidebar-wrapper").css("left", ($(window).width() + 'px')).css('transition-duration','1s');
    });

/* This function opens the logout menu on the graph page */

    $(function() {
      $("#hideMenu").addClass("b");
    });
    $("#hamClick").click(function() {
        $("#hideMenu").toggleClass("a b");
    });
