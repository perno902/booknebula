myApp.controller('profileCtrl', ['$scope', 'userData', function($scope, userData) {
    $scope.userName = userData.userName;
    $scope.noOfReviews = userData.noOfReviews;
    $scope.grade = userData.grade;
    $scope.upvotes = userData.upvotes;
    $scope.joinedDate = userData.joinedDate;
    $scope.country = userData.country;
    $scope.presentation = userData.presentation;
    $scope.reviews = userData.reviews;
}]);