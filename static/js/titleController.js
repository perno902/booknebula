myApp.controller('titleCtrl', ['$scope', 'title', function($scope, title) {
    $scope.title = title.title;
    $scope.year = title.year;
    $scope.author = title.author;
    $scope.origLang = title.origLang;
    $scope.avgScore = title.avgScore;
    $scope.plot = title.plot;
    $scope.reviews = title.reviews;
}]);
