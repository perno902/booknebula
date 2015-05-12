myApp.controller('authorCtrl', ['$scope', '$routeParams', 'author', function($scope, $routeParams, author) {
    $scope.authorId = $routeParams.authorId;

    $scope.name = function() {return author.name()};
    $scope.country = function() {return author.country()};
    $scope.birthYear = function() {return author.birthYear()}
    $scope.books = function() {return author.books()};

    setAuthorId();

    function setAuthorId() {
        author.setAuthorId($scope.authorId);
    };

    loadRemoteData();

    function loadRemoteData() {
        author.getAuthorData()
    }
}]);