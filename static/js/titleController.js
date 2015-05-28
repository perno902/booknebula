myApp.controller('titleCtrl', ['$scope', '$routeParams', '$filter', 'title', function($scope, $routeParams, $filter, title) {
    $scope.bookId = $routeParams.titleId;
    var orderBy = $filter('orderBy');
    $scope.head = {
        a: ['-upvotes', 'Upvotes', "col-md-1"],
        b: ['-reviewer', 'Reviewer', "col-md-2"],
        c: ['-revTitle', 'Review title', "col-md-2"],
        d: ['-score', 'Score', "col-md-1"],
        e: ['-date', 'Date', "col-md-1"]
    };
    $scope.predicate = '-date';


    loadRemoteData();

    function loadRemoteData() {
        title.getBookData($scope.bookId)
            .then(function(data) {
                $scope.title = data.title;
                $scope.year = data.year;
                $scope.language = data.language;
                $scope.avgScore = data.avgScore;
                $scope.plot = data.plot;
                $scope.reviews = data.reviews;
                $scope.hasReviewed = data.hasReviewed;
                $scope.user = data.user;
                $scope.authors = data.authors;
                $scope.emptyReviews = $scope.reviews.length < 1;
                setAuthorText();
                $scope.order('-date',false);
            }
        )
    };

    function setAuthorText() {
        if ($scope.authors.length > 1) {
            $scope.authorText = 'Authors';
        } else {
            $scope.authorText = 'Author';
        }
    }

    $scope.order = function(predicate, reverse) {
        $scope.reverse = reverse;
        if (predicate !== $scope.predicate) {
            $scope.reverse = true;
        }
        $scope.predicate = predicate;
        $scope.reviews = orderBy($scope.reviews, predicate, $scope.reverse);
    };

    $scope.isOrdered = function(predicate, reverse) {
        return (predicate == $scope.predicate && reverse == $scope.reverse);
    };

}]);
