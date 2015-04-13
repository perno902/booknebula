myApp.controller('toplistCtrl', ['$scope', 'toplist', function($scope, toplist) {
    $scope.currentList = 'Highest rated books';
    $scope.toplists = ['Highest rated books', 'Most upvoted reviewers'];
    $scope.topBooks = toplist.books;
    $scope.topReviewers = toplist.reviewers;
    $scope.isCurrentList = function(list) {
        return (list == $scope.currentList);
    };
}]);