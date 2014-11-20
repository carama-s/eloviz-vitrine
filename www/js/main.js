$(function() {
  $('body').scrollspy({ target: '.navbar', offset: 70 });

  $("#navbar").find("a").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
          scrollTop: $(section).offset().top - 70,
      }, 1200);
  });

  $('.img-holder').imageScroll({
    coverRatio: 0.4
    });
});
