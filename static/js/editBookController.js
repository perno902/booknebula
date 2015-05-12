myApp.controller('editBookCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.bookId;
    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];

    if ($scope.bookId == 'new') {
        $scope.title = '';
        $scope.year = '';
        $scope.language = '';
        $scope.plot = '';
    } else {
        $scope.title = title.title();
        $scope.year = title.year();
        $scope.language = title.language();
        $scope.plot = title.plot();
    };


    $scope.submitBookData = function() {
        title.submitBookData($scope.bookId, $scope.title, $scope.year, $scope.language, $scope.plot);
    };
}]);