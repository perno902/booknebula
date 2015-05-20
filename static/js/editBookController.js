myApp.controller('editBookCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.bookId;
    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];
    $scope.author = '';


    if ($scope.bookId == 'new') {
        $scope.title = '';
        $scope.year = '';
        $scope.language = '';
        $scope.plot = '';
        $scope.authors = [];
    } else {
        $scope.title = title.title();
        $scope.year = title.year();
        $scope.language = title.language();
        $scope.plot = title.plot();
        $scope.authors = title.authors();

    };

    getAuthorList();

    function getAuthorList() {
        title.getAuthorList();
        $scope.authorList = function() {return title.authorList()};
    };

    function authorIdList() {
        l = [];
        for(i = 0; i < $scope.authors.length; i++) {
            l.push($scope.authors[i].id);
        }
        return l;
    };

    $scope.submitBookData = function() {
        title.submitBookData($scope.bookId, $scope.title, $scope.year, $scope.language, $scope.plot, authorIdList());
    };

    $scope.addAuthor = function () {
        if (($scope.authors.indexOf($scope.author) == -1) && $scope.author != '') {
            $scope.authors.push($scope.author);
        }
        $scope.author = '';
    };

    $scope.removeAuthor = function (author) {
        index = $scope.authors.indexOf(author);
        if (index > -1) {
            $scope.authors.splice(index, 1);
        }
    };


}]);