myApp.controller('titleCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.titleId;

    loadRemoteData();

    function loadRemoteData() {
        title.getBookData($scope.bookId)
            .then(function(data) {
                $scope.title = data.title;
                $scope.year = data.year;
                $scope.language = data.language;
                $scope.avgScore = data.avgScore;
                $scope.plot = data.plot;
                $scope.reviews = data.reviews;
                $scope.hasReviewed = data.hasReviewed;
                $scope.user = data.user;
                $scope.authors = data.authors;
                $scope.multipleAuthors = ($scope.authors.length > 1);
            }
        )
    };

}]);
