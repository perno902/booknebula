myApp.controller('editBookCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.bookId;
    $scope.languages = ['English', 'French', 'German', 'Russian', 'Spanish', 'Swedish'];

    loadAuthorList();

    if ($scope.bookId == 'new') {
        $scope.title = '';
        $scope.year = '';
        $scope.language = '';
        $scope.plot = '';
        $scope.authors = [];
    } else {
        loadRemoteData()
    };

    function loadRemoteData() {
        title.getBookData($scope.bookId)
            .then(function(data) {
                $scope.title = data.title;
                $scope.year = data.year;
                $scope.language = data.language;
                $scope.plot = data.plot;
                $scope.authors = data.authors;
            }
        )
    };


    function loadAuthorList() {
        title.getAuthorList()
            .then(function(data) {
                $scope.authorList = data;
            }
        )
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

    function authorIdList() {
        l = [];
        for(i = 0; i < $scope.authors.length; i++) {
            l.push($scope.authors[i].id);
        }
        return l;
    };
}]);