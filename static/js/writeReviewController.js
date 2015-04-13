myApp.controller('writeReviewCtrl', ['$scope', 'title', function($scope, title) {
    $scope.bookTitle = title.title;
    $scope.year = title.year;
    $scope.revTitle = '';
    $scope.score = 0;
    $scope.points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.content = '';
    $scope.language = '';
    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];
}]);