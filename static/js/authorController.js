myApp.controller('authorCtrl', ['$scope', '$routeParams', 'author', function($scope, $routeParams, author) {
    $scope.authorId = $routeParams.authorId;

    loadRemoteData();

    function loadRemoteData() {
        author.getAuthorData($scope.authorId)
            .then(function(data) {
                $scope.name = data.name,
                $scope.country = data.country,
                $scope.birthYear = data.birthYear,
                $scope.books = data.books
                }
        )
    }


}]);