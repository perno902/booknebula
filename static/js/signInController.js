myApp.controller('signInCtrl', function($scope) {
    $scope.signIn = function() {
        localStorage.setItem("userToken", "sld8887989dsf7s7f7d7d7f7ddfs");
    }
    $scope.signOut = function() {
        localStorage.removeItem("userToken");
    };

    $scope.isSignedIn = function() {
        if (localStorage.getItem("userToken")=== null) {
            return false;
        }
        return true;
    };
});