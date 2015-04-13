myApp.controller('reviewCtrl', ['$scope', 'review', function($scope, review) {
    $scope.id = review.id;
    $scope.bookTitle = review.bookTitle;
    $scope.year = review.year;
    $scope.reviewer = review.reviewer;
    $scope.revTitle = review.revTitle;
    $scope.score = review.score;
    $scope.date = review.date;
    $scope.language = review.language;
    $scope.content = review.content;
    $scope.upvotes = review.upvotes;
    $scope.upvote = function() {
        $scope.upvotes = $scope.upvotes + 1;
    };
}]);