myApp.controller('signInCtrl', [ '$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.signIn = function() {
        localStorage.setItem("userToken", "sld8887989dsf7s7f7d7d7f7ddfs");
        $window.location.href = $window.URL_AUTH;
    };
    $scope.signOut = function() {
        localStorage.removeItem("userToken");
        $http.get('/logout')
            .success(function() {
                console.log('Successfully signed out')
            })
            .error(function() {
                console.log('Error: signing out')
            });
    };

    $scope.isSignedIn = function() {
        if (localStorage.getItem("userToken")=== null) {
            return false;
        }
        return true;
    };
}]);