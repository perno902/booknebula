myApp.controller('profileCtrl', ['$scope', '$routeParams', 'userData', function($scope, $routeParams, userData) {
    $scope.userId = $routeParams.userId;

    loadRemoteData();

    function loadRemoteData() {
        userData.getUserData($scope.userId)
            .then(function(data) {
                $scope.userName = data.userName;
                $scope.email = data.email;
                $scope.noOfReviews = data.noOfReviews;
                $scope.grade = data.grade;
                $scope.noOfUpvotes = data.noOfUpvotes;
                $scope.joinedDate = data.joinedDate;
                $scope.country = data.country;
                $scope.presentation = data.presentation;
                $scope.reviews = data.reviews;
                $scope.emptyPresentation = ($scope.presentation == '');
                $scope.emptyCountry = ($scope.country =='')
            })
    };

}]);