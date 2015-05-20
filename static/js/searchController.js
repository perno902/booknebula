myApp.controller('searchCtrl', ['$scope', '$location', 'search', function($scope, $location) {
    $scope.query = '';

    $scope.search = function() {
        $location.path('/searchResults/' + $scope.query)
    };
}]);
