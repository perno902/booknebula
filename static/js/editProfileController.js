myApp.controller('editProfileCtrl', ['$scope', '$routeParams', 'userData', function($scope, $routeParams, userData) {
    $scope.countries = [ "Sweden", "England", "USA", "France", "Spain", "Germany", "Norway",
        "Denmark", "India", "China"
    ];

    loadRemoteData();

    function loadRemoteData() {
        userData.getUserData('signedIn')
            .then(function(data) {
                if (data !== undefined) {
                    $scope.userName = data.userName;
                    $scope.country = data.country;
                    $scope.email = data.email;
                    $scope.presentation = data.presentation;
                }
            })
    };


    // Calls the submit function in the service
    $scope.submitUserData = function() {
        userData.submitUserData($scope.userName, $scope.country, $scope.email, $scope.presentation);
    };
}]);