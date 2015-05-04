myApp.controller('writeReviewCtrl', ['$scope', '$routeParams', 'title', 'review', function($scope, $routeParams, title, review) {
    $scope.reviewId = $routeParams.reviewId;

    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];
    $scope.points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if ($scope.reviewId == "new") {
        $scope.bookId = function() {return title.bookId()};
        $scope.bookTitle = function() { return title.title()};
        $scope.year = function() {return title.year()};

        $scope.revTitle = '';
        $scope.score = 0;
        $scope.content = '';
        $scope.language = '';
    } else {
        review.setReviewId($scope.reviewId);
        review.getReviewData();

        $scope.bookId = function() {return review.bookId()};
        $scope.bookTitle = function() {return review.bookTitle()};
        $scope.year = function() {return review.year()};

        $scope.revTitle = review.revTitle();
        $scope.score = review.score();
        $scope.content = review.content();
        $scope.language = review.language();
    }

    $scope.submitReview = function() {
        data = {
            reviewId: $scope.reviewId,
            bookId: $scope.bookId(),
            revTitle: $scope.revTitle,
            score: $scope.score,
            content: $scope.content,
            language: $scope.language
        }
        review.submitReview(data);
    };

}]);