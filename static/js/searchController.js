myApp.controller('searchCtrl', ['$scope', 'search', function($scope, search) {
    $scope.query = '';
    $scope.searchfn = function searchfn() {

    };

    $scope.$watch('query', function() {
       search.updateQuery($scope.query);
    });
    $scope.$on('query', function () {
       $scope.query = search.query;
    });
}]);
