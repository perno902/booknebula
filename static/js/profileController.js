myApp.controller('profileCtrl', ['$scope', '$routeParams', 'userData', function($scope, $routeParams, userData) {
    $scope.userId = $routeParams.userId;

    setUserId();
    loadRemoteData();


    function setUserId() {
        userData.setUserId($scope.userId);
    };

    function applyRemoteData(userData) {

        $scope.userName = userData.userName;
        $scope.email = userData.email;
        $scope.noOfReviews = userData.noOfReviews;
        $scope.grade = userData.grade;
        $scope.noOfUpvotes = userData.upvotes;
        $scope.joinedDate = userData.joinedDate;
        $scope.country = userData.country;
        $scope.presentation = userData.presentation;
        $scope.reviews = userData.reviews;
    }

    function loadRemoteData() {
        console.log('loading remote data')
        userData.getUserData()
            .then(
                function(userData) {
                    console.log(userData)
                    applyRemoteData(userData)
                }
        )

    }

    /*
    $scope.userName = '';
    $scope.email = '';
    $scope.noOfReviews = '';
    $scope.grade = '';
    $scope.upvotes = '';
    $scope.joinedDate = '';
    $scope.country = '';
    $scope.presentation = '';
    $scope.reviews = [];


     */
}]);