myApp.controller('toplistCtrl', ['$scope', 'toplist', function($scope, toplist) {
    $scope.currentList = 'Highest rated books';
    $scope.toplists = ['Highest rated books', 'Most upvoted reviewers'];
    $scope.books = [];
    $scope.reviewers = [];
    $scope.isCurrentList = function(list) {
        return (list == $scope.currentList);
    };

    loadRemoteData();

    function loadRemoteData() {
        toplist.getToplistData()
            .then(
                function(toplistData) {
                    $scope.books = toplistData.books;
                    $scope.reviewers = toplistData.reviewers;
                }
        )
    }
}]);