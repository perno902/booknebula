myApp.controller('profileCtrl', ['$scope', '$routeParams', '$filter', 'userData', function($scope, $routeParams, $filter, userData) {
    $scope.userId = $routeParams.userId;
    var orderBy = $filter('orderBy');
    $scope.head = {
        a: ['-bookTitle', 'Book title', "col-md-2"],
        b: ['-revTitle', 'Review title', "col-md-2"],
        c: ['-score', 'Score', "col-md-1"],
        d: ['-upvotes', 'Upvotes', "col-md-1"],
        e: ['-date', 'Date', "col-md-1"]
    };
    $scope.predicate = '-date';


    loadRemoteData();

    function loadRemoteData() {
        userData.getUserData($scope.userId)
            .then(function(data) {
                $scope.userName = data.userName;
                $scope.email = data.email;
                $scope.noOfReviews = data.noOfReviews;
                $scope.grade = data.grade;
                $scope.noOfUpvotes = data.noOfUpvotes;
                $scope.joinedDate = data.joinedDate;
                $scope.country = data.country;
                $scope.presentation = data.presentation;
                $scope.reviews = data.reviews;
                $scope.emptyReviews = ($scope.reviews.length < 1);
                $scope.emptyPresentation = ($scope.presentation == '');
                $scope.emptyCountry = ($scope.country =='');
                $scope.order('-date',false);
            })
    };

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