myApp.controller('editAuthorCtrl', ['$scope', '$routeParams', 'author', function($scope, $routeParams, author) {
    $scope.authorId = $routeParams.authorId;
    $scope.countries = [ "Sweden", "England", "USA", "France", "Spain", "Germany", "Norway",
        "Denmark", "India", "China", "Russia"];

    if ($scope.authorId == 'new') {
        $scope.name = '';
        $scope.country = '';
        $scope.birthYear = '';
    } else {
        loadRemoteData();
    };

    function loadRemoteData() {
        author.getAuthorData($scope.authorId)
            .then(function(data) {
                $scope.name = data.name,
                $scope.country = data.country,
                $scope.birthYear = data.birthYear
                }
        )
    }

    $scope.submitAuthorData = function() {
        author.submitAuthorData($scope.authorId, $scope.name, $scope.country, $scope.birthYear);
    };
}]);