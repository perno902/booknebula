
myApp.controller('authorCtrl', ['$scope', '$routeParams', 'author', function($scope, $routeParams, author) {
    $scope.authorId = $routeParams.authorId;
    setAuthorId();

    function setAuthorId() {
        author.setAuthorId($scope.authorId);
    };

    loadRemoteData();

    function applyRemoteData(authorData) {
        $scope.name = authorData.name;
        $scope.books = authorData.books;
    }

    function loadRemoteData() {
        author.getAuthorData()
            .then(
                function(authorData) {
                    applyRemoteData(authorData);
                }
        )
    }
}]);