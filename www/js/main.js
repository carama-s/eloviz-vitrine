$(function() {
  $('body').scrollspy({ target: '.navbar', offset: 70 });

  $("#navbar").find("a").click(function(e) {
      e.preventDefault();
      var section = $(this).attr("href");
      $("html, body").animate({
          scrollTop: $(section).offset().top,
      }, 1200);
  });

  $('#form-contact-us').bootstrapValidator({
      feedbackIcons: {
          valid: null,
          invalid: null,
          validating: null
      },
      live: 'disabled',
      fields: {
          contactInputFirstname: {
              message: 'The firstname is not valid',
              validators: {
                  notEmpty: {
                      message: 'The firstname is required and cannot be empty'
                  }
              }
          },
          contactInputLastname: {
              message: 'The lastname is not valid',
              validators: {
                  notEmpty: {
                      message: 'The lastname is required and cannot be empty'
                  }
              }
          },
          contactInputEmail: {
              message: 'The email is not valid',
              validators: {
                  notEmpty: {
                      message: 'The email is required and cannot be empty'
                  },
                  emailAddress: {
                      message: 'The email address is not a valid'
                  }
              }
          },
          contactInputSubject: {
              message: 'The subject is not valid',
              validators: {
                  notEmpty: {
                      message: 'The subject is required and cannot be empty'
                  }
              }
          },
          contactInputMessage: {
              message: 'The message is not valid',
              validators: {
                  notEmpty: {
                      message: 'The message is required and cannot be empty'
                  },
                  stringLength: {
                      min: 10,
                      message: 'The message must have at least 10 characters'
                  }
              }
          }
      }
  });
  $('.img-holder').imageScroll({
    coverRatio: 0.35}
    );
});
