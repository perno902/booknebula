
myApp.controller('searchResultsCtrl', ['$scope', 'search', function($scope, search) {
    $scope.query = search.query;
    $scope.books = search.books;
    $scope.authors = search.authors;
    $scope.reviewers = search.reviewers;
}]);