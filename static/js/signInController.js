myApp.controller('signInCtrl', [ '$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.signIn = function() {
        localStorage.setItem("userToken", "sld8887989dsf7s7f7d7d7f7ddfs");
        console.log('logging in');
        console.log($window.URL_AUTH)
        $window.location.href = $window.URL_AUTH;
    };
    $scope.signOut = function() {
        localStorage.removeItem("userToken");
    };

    $scope.isSignedIn = function() {
        if (localStorage.getItem("userToken")=== null) {
            return false;
        }
        return true;
    };
}]);