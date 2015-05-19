myApp.controller('titleCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.titleId;

    loadRemoteData();

    function loadRemoteData() {
        title.setBookId($scope.bookId);
        title.getBookData()
    };

    $scope.title = function() {return title.title()};
    $scope.year = function() {return title.year()};
    $scope.language = function() {return title.language()};
    $scope.avgScore = function() {return title.avgScore()}
    $scope.plot = function() {return title.plot()};
    $scope.reviews = function() {return title.reviews()};
    $scope.hasReviewed = function() {return title.hasReviewed()};
    $scope.user = function() {return title.user()};

    $scope.authors = function() {
        a = title.authors()
        $scope.multipleAuthors = (a.length > 1);
        return a
    };
}]);
