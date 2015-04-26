myApp.controller('titleCtrl', ['$scope', '$routeParams', 'title', function($scope, $routeParams, title) {
    $scope.bookId = $routeParams.titleId;
    setBookId();

    function setBookId() {
        title.setBookId($scope.bookId);
    };

    loadRemoteData();

    function applyRemoteData(bookData) {
        $scope.title = bookData.title;
        $scope.year = bookData.year;
        $scope.authors = bookData.authors;
        $scope.language = bookData.language;
        //$scope.avgScore = bookData.avgScore;
        $scope.plot = bookData.plot;
        $scope.reviews = bookData.reviews;

        if ($scope.authors.length > 1) {
            $scope.multipleAuthors = false;
        }
    }

    function loadRemoteData() {
        title.getBookData()
            .then(
                function(bookData) {
                    console.log(bookData);
                    applyRemoteData(bookData);
                }
        )
    }

    /*
    $scope.title = title.title;
    $scope.year = title.year;
    $scope.author = title.author;
    $scope.origLang = title.origLang;
    $scope.avgScore = title.avgScore;
    $scope.plot = title.plot;
    $scope.reviews = title.reviews; */
}]);
