var app = angular.module('miniapp', []);

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
          alert(result);

        }
      });
      alert("After !");
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
