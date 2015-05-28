myApp.controller('reviewCtrl', ['$scope', '$routeParams', 'review', function($scope, $routeParams, review) {
    $scope.reviewId = $routeParams.reviewId;
    $scope.origin = $routeParams.page;

    loadRemoteData();

    function loadRemoteData() {
        review.getReviewData($scope.reviewId, 'view')
            .then(function(data) {
                if (data !== undefined) {
                    $scope.bookTitle = data.bookTitle;
                    $scope.bookId = data.bookId;
                    $scope.year = data.year;
                    $scope.reviewer = data.reviewer;
                    $scope.reviewerId = data.reviewerId;
                    $scope.revTitle = data.revTitle;
                    $scope.score = data.score;
                    $scope.date = data.date;
                    $scope.language = data.language;
                    $scope.content = data.content;
                    $scope.upvotes = data.upvotes;
                    $scope.hasUpvoted = data.hasUpvoted;
                    $scope.backLink = makeLink();
                }
            })
    }

    function makeLink() {
        if ($scope.origin == "title") {
            return $scope.origin + "/" + $scope.bookId;
        } else {
            return $scope.origin + "/" + $scope.reviewerId;
        }
    };

    $scope.upvote = function() {
        review.upvote($scope.reviewId)
            .then(function(data) {
                if (data !== undefined) {
                    $scope.upvotes = data.upvotes;
                    $scope.hasUpvoted = data.hasUpvoted;
                }
            })
    };

    $scope.unUpvote = function() {
        review.unUpvote($scope.reviewId)
            .then(function(data) {
                if (data !== undefined) {
                    $scope.upvotes = data.upvotes;
                    $scope.hasUpvoted = data.hasUpvoted;
                }
            })
    };

    $scope.deleteReview = function() {
        review.deleteReview($scope.reviewId)
    };

}]);