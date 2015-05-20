myApp.controller('reviewCtrl', ['$scope', '$routeParams', 'review', function($scope, $routeParams, review) {
    $scope.reviewId = $routeParams.reviewId;

    loadRemoteData();

    function loadRemoteData() {
        review.getReviewData($scope.reviewId)
            .then(function(data) {
                $scope.bookTitle = data.bookTitle;
                $scope.bookId = data.bookId;
                $scope.year = data.year;
                $scope.reviewer = data.reviewer;
                $scope.revTitle = data.revTitle;
                $scope.score = data.score;
                $scope.date = data.date;
                $scope.language = data.language;
                $scope.content = data.content;
                $scope.upvotes = data.upvotes;
                $scope.hasUpvoted = data.hasUpvoted;
            })
    }

    $scope.upvote = function() {
        review.upvote($scope.reviewId)
            .then(function(data) {
                $scope.upvotes = data.upvotes;
                $scope.hasUpvoted = data.hasUpvoted;
            })
    };

    $scope.unUpvote = function() {
        review.unUpvote($scope.reviewId)
            .then(function(data) {
                $scope.upvotes = data.upvotes;
                $scope.hasUpvoted = data.hasUpvoted;
            })
    };

    $scope.deleteReview = function() {
        review.deleteReview($scope.reviewId)
    };

}]);