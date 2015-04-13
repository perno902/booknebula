
myApp.controller('authorCtrl', ['$scope', 'author', function($scope, author) {
    $scope.name = author.name;
    $scope.books = author.books;
}]);