
myApp.controller('searchResultsCtrl', ['$scope', 'search', function($scope, search) {
    $scope.query = function() {return search.query()}
    $scope.books = function() {return search.books()};
    $scope.authors = function() {return search.authors()};
    $scope.reviewers = function() {return search.reviewers()};

    $scope.isEmpty = function(list) {
        if (list.length < 1) {
            return true;
        } else {
            return false;
        }
    };
}]);