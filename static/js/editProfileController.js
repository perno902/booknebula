myApp.controller('editProfileCtrl', ['$scope', 'userData', function($scope, userData) {
    $scope.userName = userData.userName();
    $scope.country = userData.country();
    $scope.email = userData.email();
    $scope.countries = [ "Sweden", "England", "USA", "France", "Spain", "Germany", "Norway",
        "Denmark", "India", "China"
    ];
    $scope.presentation = userData.presentation();

    // Calls the submit function in the service
    $scope.submitUserData = function() {
        userData.submitUserData($scope.userName, $scope.country, $scope.email, $scope.presentation);
    };
}]);