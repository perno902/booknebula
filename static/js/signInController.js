myApp.controller('signInCtrl', [ '$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.signIn = function() {
        $window.location.href = $window.URL_AUTH;
    };
    $scope.signOut = function() {
        $window.location.href = "/logout"
    };

}]);