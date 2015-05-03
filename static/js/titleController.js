myApp.controller('titleCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.titleId;

    loadRemoteData();

    function loadRemoteData() {
        title.setBookId($scope.bookId);
        title.getBookData()
    };

    $scope.deleteReview = function(id) {
        console.log("delete review");

    };

    $scope.title = function() {return title.title()};
    $scope.year = function() {return title.year()};
    $scope.authors = function() {return title.authors()};
    $scope.language = function() {return title.language()};
    $scope.avgScore = function() {return title.avgScore()}
    $scope.plot = function() {return title.plot()};
    $scope.reviews = function() {return title.reviews()};
    $scope.multipleAuthors = function() {return $scope.authors().length > 1};
    $scope.hasReviewed = function() {return title.hasReviewed()};
    $scope.user = function() {return title.user()};

    $scope.ownReview = function(reviewerId) {
        return $scope.user() == reviewerId;
    };
}]);
