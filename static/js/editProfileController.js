myApp.controller('editProfileCtrl', ['$scope', 'userData', function($scope, userData) {
    $scope.userName = userData.userName;
    $scope.country = userData.country;
    $scope.countries = [ "Sweden", "England", "USA", "France", "Spain", "Germany", "Norway",
        "Denmark", "India", "China"
    ];
    $scope.presentation = userData.presentation;
}]);