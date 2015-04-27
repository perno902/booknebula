myApp.controller('reviewCtrl', ['$scope', '$routeParams', 'review', function($scope, $routeParams, review) {
    $scope.reviewId = $routeParams.reviewId;
    setReviewId();

    function setReviewId() {
        review.setReviewId($scope.reviewId);
    };

    loadRemoteData();

    function applyRemoteData(reviewData) {
        $scope.id = reviewData.id;
        $scope.bookTitle = reviewData.bookTitle;
        $scope.bookId = reviewData.bookId;
        $scope.year = reviewData.year;
        $scope.reviewer = reviewData.reviewer;
        $scope.revTitle = reviewData.revTitle;
        $scope.score = reviewData.score;
        $scope.date = reviewData.date;
        $scope.language = reviewData.language;
        $scope.content = reviewData.content;
        $scope.upvotes = reviewData.upvotes;
    }

    function loadRemoteData() {
        review.getReviewData()
            .then(
                function(reviewData) {
                    applyRemoteData(reviewData);
                }
        )
    }

    $scope.upvote = function() {
        review.upvote()
            .then(
                function(upvotes) {
                    $scope.upvotes = upvotes;
                }
        )
    };

}]);