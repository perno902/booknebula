myApp.controller('writeReviewCtrl', ['$scope', 'title', 'review', function($scope, title, review) {
    $scope.bookId = function() {return title.bookId()};
    $scope.bookTitle = function() { return title.title()};
    $scope.year = function() {return title.year()};
    $scope.revTitle = '';
    $scope.score = 0;
    $scope.points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.content = '';
    $scope.language = '';
    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];


    $scope.submitReview = function() {
        data = {
            bookId: $scope.bookId(),
            revTitle: $scope.revTitle,
            score: $scope.score,
            content: $scope.content,
            language: $scope.language
        }
        review.submitReview(data);
    };

}]);