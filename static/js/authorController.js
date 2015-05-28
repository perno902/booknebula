myApp.controller('authorCtrl', ['$scope', '$routeParams', '$filter', 'author', function($scope, $routeParams, $filter, author) {
    $scope.authorId = $routeParams.authorId;
    var orderBy = $filter('orderBy');
    $scope.head = {
        a: ['-year', 'Year', "col-md-1"],
        b: ['-title', 'Title', "col-md-2"],
        c: ['-avgScore', 'Avg. score', "col-md-1"]
    };
    $scope.predicate = '-year';

    loadRemoteData();

    function loadRemoteData() {
        author.getAuthorData($scope.authorId)
            .then(function(data) {
                $scope.name = data.name;
                $scope.country = data.country;
                $scope.birthYear = data.birthYear;
                $scope.books = data.books;
                $scope.order('-year', false);
                }
        )
    };

    $scope.order = function(predicate, reverse) {
        $scope.reverse = reverse;
        if (predicate !== $scope.predicate) {
            $scope.reverse = true;
        }
        $scope.predicate = predicate;
        $scope.books = orderBy($scope.books, predicate, $scope.reverse);
    };

    $scope.isOrdered = function(predicate, reverse) {
        return (predicate == $scope.predicate && reverse == $scope.reverse);
    };


}]);