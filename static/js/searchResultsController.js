
myApp.controller('searchResultsCtrl', ['$scope', '$routeParams', 'search', function($scope, $routeParams, search) {
    $scope.query = $routeParams.query;

    loadRemoteData();

    function loadRemoteData() {
        search.getSearchResults($scope.query)
            .then(function(data) {
                $scope.query = data.query
                $scope.books = data.books;
                $scope.authors = data.authors;
                $scope.reviewers = data.reviewers;
            })
    };


    $scope.isEmpty = function(list) {
        if (list === undefined || list.length < 1) {
            return true;
        } else {
            return false;
        }
    };
}]);