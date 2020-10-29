(function ($) {
  $(document).ready(()=>{
    // slide contain content01 content02 user and content03 with fadeIn fadeout
    $("#content01").on('click', (e) => {
      e&&e.preventDefault();
      e.stopPropagation();
      $elem = $(e.target);
      $active = $elem.attr("class").split(' ').includes('active');
      if($active)
        return;
      $elem.addClass("active");
      $elem.parent().siblings().find('a').removeClass("active");
      $("#content01").addClass("show active");
      $("#content02").removeClass("show active");
      $("#content03").removeClass("show active");
    })
    $("#content02").on('click', (e) => {
      e&&e.preventDefault();
      e.stopPropagation();
      $elem = $(e.target);
      $active = $elem.attr("class").split(' ').includes('active');
      if($active)
        return;
      $elem.addClass("active");
      $elem.parent().siblings().find('a').removeClass("active");
      $("#content01").removeClass("show active");
      $("#content02").addClass("show active");
      $("#content03").removeClass("show active");
    })
    $("#content03").on('click', (e) => {
      e&&e.preventDefault();
      e.stopPropagation();
      $elem = $(e.target);
      $active = $elem.attr("class").split(' ').includes('active');
      if($active)
        return;
      $elem.addClass("active");
      $elem.parent().siblings().find('a').removeClass("active");
      $("#content01").removeClass("show active");
      $("#content02").removeClass("show active");
      $("#content03").addClass("show active");
    });


    /**
     * ONGUENE Code
     */
    $('#btn-toggle-menu-bar').click(function () {
      if ($('body').attr('data-menu-collapsed') == 'true') {
        $('#menu-bar').hide("slide", { direction: "up" }, 300)
        $('#main').attr("style", "margin-top: 60px !important")
        $('body').removeAttr('data-menu-collapsed')
      } else {
        $('#menu-bar').show("slide", { direction: "up" }, 300)
        $('#main').attr("style", "margin-top: 190px !important")
        $('body').attr('data-menu-collapsed','true')
      }
    })
  });
})(jQuery)


$(window).resize(function() {
  if ($( window ).width() > 768) {
    $('body').removeAttr('data-menu-collapsed')
    $('#menu-bar').show("slide", { direction: "up" }, 300)
    $('#main').removeAttr("style")
  }else{
    $('#menu-bar').hide()
  }
})
