myApp.controller('writeReviewCtrl', ['$scope', '$routeParams', 'title', 'review', function($scope, $routeParams, title, review) {
    $scope.bookId = $routeParams.bookId;
    $scope.reviewId = $routeParams.reviewId;


    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];
    $scope.points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if ($scope.reviewId == "new") {
        loadBookData();

        $scope.revTitle = '';
        $scope.score = 0;
        $scope.content = '';
        $scope.language = '';
    } else {
        loadReviewData()
    }

    $scope.submitReview = function() {
        data = {
            reviewId: $scope.reviewId,
            bookId: $scope.bookId,
            revTitle: $scope.revTitle,
            score: $scope.score,
            content: $scope.content,
            language: $scope.language
        }
        review.submitReview(data);
    };

    function loadReviewData() {
        review.getReviewData($scope.reviewId, 'edit')
            .then(function(data) {
                if (data !== undefined) {
                    $scope.bookId = data.bookId;
                    $scope.bookTitle = data.bookTitle;
                    $scope.year = data.year;
                    $scope.revTitle = data.revTitle;
                    $scope.score = data.score;
                    $scope.content = data.content;
                    $scope.language = data.language;
                }

            }
        )
    };

    function loadBookData() {
        title.getBookData($scope.bookId)
            .then(function(data) {
                if (data !== undefined) {
                    $scope.bookTitle = data.title;
                    $scope.year = data.year;
                }
            }
        )
    };

}]);