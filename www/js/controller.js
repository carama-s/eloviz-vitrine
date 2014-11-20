var app = angular.module('miniapp', ['pascalprecht.translate'])
  .config(function($translateProvider) {

  $translateProvider.translations('en', {
    HOME: 'Home',
    PROJECT: 'Project',
    TECHNOLOGIES: 'Technologies',
    TEAM: 'Team',
    CONTACT: 'Contact',
    DEVELOPER: 'Developer',
    DESIGNER: 'Designer',
    SUBMIT: 'Submit',

    OUR: 'Our',
    THE: 'The',
    HOW_TO: 'How to',
    CONTACT_US: 'Contact us',

    FIRSTNAME: 'Firstname',
    LASTNAME: 'Lastname',
    EMAIL: 'Email',
    PHONE: 'Phone number',
    SUBJECT: 'Subject',
    MESSAGE: 'Message',
    FIRSTNAME_ERR_EMPTY: 'The firstname is required and cannot be empty.',
    LASTNAME_ERR_EMPTY: 'The lastname is required and cannot be empty.',
    MAIL_ERR_EMPTY: 'The email is required and cannot be empty.',
    MAIL_ERR_WRONG: 'The email address is not valid.',
    SUBJECT_ERR_EMPTY: 'The subject is required and cannot be empty.',
    MSG_ERR_EMPTY: 'The message is required and cannot be empty.',
    MSG_ERR_20CARAC: 'The message must have at least 20 characters.',
    SUCCESS_MESSAGE: 'Your message has been sent, thank you !',
    IF_QUESTION: 'If any questions, requests or ideas, please contact us !',

    RIGHTS_RESERVED: 'All rights reserved.'
  })

  .translations('fr', {
    HOME: 'Accueil',
    PROJECT: 'Projet',
    TECHNOLOGIES: 'Technologies',
    TEAM: 'Equipe',
    CONTACT: 'Contact',
    DEVELOPER: 'Développeur',
    DESIGNER: 'Designer',
    SUBMIT: 'Envoyer',

    OUR: 'Notre',
    THE: 'Les',
    HOW_TO: 'Comment',
    CONTACT_US: 'Nous contacter',

    FIRSTNAME: 'Prénom',
    LASTNAME: 'Nom de famille',
    EMAIL: 'Adresse mail',
    PHONE: 'Numéro de téléphone',
    SUBJECT: 'Sujet',
    MESSAGE: 'Message',
    FIRSTNAME_ERR_EMPTY: 'Le prénom est obligatoire et ne peut pas être vide.',
    LASTNAME_ERR_EMPTY: 'Le nom de famille est obligatoire et ne peut pas être vide.',
    MAIL_ERR_EMPTY: 'L\'adresse mail est obligatoire et ne peut pas être vide.',
    MAIL_ERR_WRONG: 'L\'adresse mail est incorrecte.',
    SUBJECT_ERR_EMPTY: 'Le sujet est obligatoire et ne peut pas être vide.',
    MSG_ERR_EMPTY: 'Le message est obligatoire et ne peut pas être vide.',
    MSG_ERR_20CARAC: 'Le message doit comporter au moins 20 caractères.',
    SUCCESS_MESSAGE: 'Votre message a correctement été envoyé, merci !',
    IF_QUESTION: 'Pour toutes questions, demandes ou idées, merci de nous contacter !',

    RIGHTS_RESERVED: 'Tous droits réservés.'
  });

  $translateProvider.preferredLanguage('en');
});

app.controller('TranslateController', function($translate, $scope) {
  $scope.current_language = $translate.use();

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    $scope.current_language = $translate.use();

  };
});

app.controller("AppController", function($scope) {
  $scope.height_logo = 40;
});

// Le submit angularjs + bootstrapvalidator n'est pas optimal, à modifier plus tard
app.controller("ContactUsController", ['$scope', '$http', function($scope, $http) {
  $scope.submit_contact_us = function(isValid) {
    $scope.submitted = true;
    if (isValid) {

      var request = $.ajax({
        type: "POST",
        url: "/scripts/send_mail.php",
        data: {
          firstname: $scope.contactInputFirstname,
          lastname: $scope.contactInputLastname,
          email: $scope.contactInputEmail,
          phone: $scope.contactInputPhone,
          subject: $scope.contactInputSubject,
          message: $scope.contactInputMessage
        },
        success: function(result) {
        }
      });
      $scope.sent = true;
    }
  };
}]);

app.directive('resize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
      return { 'h': w.height(), 'w': w.width() };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;

      scope.style = function () {
        return {
          'height': (newValue.h) + 'px',
          'width': (newValue.w) + 'px'
        };
       };
    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  };
});

app.directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    var w = angular.element($window);

    w.bind("scroll", function() {
      if (this.pageYOffset >= (w.height() - 70)) { // 70 is the navbar height
        $("#navbar").removeClass("my-navbar-notfixed");
        $("#navbar").addClass("my-navbar-fixedtop");
      } else {
        $("#navbar").removeClass("my-navbar-fixedtop");
        $("#navbar").addClass("my-navbar-notfixed");
      }
    });
  };
});
