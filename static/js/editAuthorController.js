myApp.controller('editAuthorCtrl', ['$scope', '$routeParams', 'author', function($scope, $routeParams, author) {
    $scope.authorId = $routeParams.authorId;
    $scope.countries = [ "Sweden", "England", "USA", "France", "Spain", "Germany", "Norway",
        "Denmark", "India", "China", "Russia"];

    if ($scope.authorId == 'new') {
        $scope.name = '';
        $scope.country = '';
        $scope.birthYear = '';
    } else {
        $scope.name = author.name();
        $scope.country = author.country();
        $scope.birthYear = author.birthYear();
    };


    $scope.submitAuthorData = function() {
        author.submitAuthorData($scope.authorId, $scope.name, $scope.country, $scope.birthYear);
    };
}]);