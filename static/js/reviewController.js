myApp.controller('reviewCtrl', ['$scope', '$routeParams', 'review', function($scope, $routeParams, review) {
    $scope.reviewId = $routeParams.reviewId;
    setReviewId();

    loadRemoteData();

    $scope.bookTitle = function() {return review.bookTitle()};
    $scope.bookId = function() {return review.bookId()};
    $scope.year = function() {return review.year()};
    $scope.reviewer = function() {return review.reviewer()};
    $scope.revTitle = function() {return review.revTitle()};
    $scope.score = function() {return review.score()};
    $scope.date = function() {return review.date()};
    $scope.language = function() {return review.language()};
    $scope.content = function() {return review.content()};
    $scope.upvotes = function() {return review.upvotes()};
    $scope.hasUpvoted = function() {return review.hasUpvoted()};


    function loadRemoteData() {
        review.getReviewData()
    }

    function setReviewId() {
        review.setReviewId($scope.reviewId);
    };

    $scope.upvote = function() {
        review.upvote();
    };

    $scope.unUpvote = function() {
        review.unUpvote();
    };

    $scope.deleteReview = function() {
        review.deleteReview()
    };

}]);