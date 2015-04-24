myApp.controller('searchCtrl', ['$scope', 'search', function($scope, search) {
    $scope.query = '';

    $scope.loadRemoteData = function() {
        if ($scope.query != '') {
            search.setQuery($scope.query);
            search.getSearchResults();
        }
    };

}]);
