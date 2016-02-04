/* This function slides the sidebar on the page */

    $(".glyphicon-arrow-left").click(function() {
        $("#sidebar-wrapper").css("margin-left", "-340px").css('transition-duration','1s');;
    });

/* This function slides the sidebar off the page */

    $(".openGraphBtm .glyphicon-arrow-right").click(function() {
        $("#sidebar-wrapper").css("margin-left", "25px").css('transition-duration','1s');;
    });

/* This function opens the logout menu on the graph page */

    $(function() {
      $("#hideMenu").addClass("b");
    });
    $("#hamClick").click(function() {
        $("#hideMenu").toggleClass("a b");
    });

/* This function opens the logout menu on the profile page */

    $(function() {
      $("#hideMenuMain").addClass("bMain");
    });
    $("#hamClickMain").click(function() {
        $("#hideMenuMain").toggleClass("aMain bMain");
        $(".stockIn").toggleClass("slideR", 600);
        $(".stockInIcon").toggleClass("hide", 200);
    });
