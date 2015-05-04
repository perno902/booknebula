myApp.controller('profileCtrl', ['$scope', '$routeParams', 'userData', function($scope, $routeParams, userData) {
    $scope.userId = $routeParams.userId;

    loadRemoteData();

    function loadRemoteData() {
        userData.setUserId($scope.userId);
        userData.getUserData()
    };


        $scope.userName = function() {return userData.userName()};
        $scope.email = function() {return userData.email()};
        $scope.noOfReviews = function() {return userData.noOfReviews()};
        $scope.grade = function() {return userData.grade()};
        $scope.noOfUpvotes = function() {return userData.noOfUpvotes()};
        $scope.joinedDate = function() {return userData.joinedDate()};
        $scope.country = function() {return userData.country()};
        $scope.presentation = function() {return userData.presentation()};
        $scope.reviews = function() {return userData.reviews()};
        $scope.userId = function() {return userData.userId()};
        $scope.own = function() {return userData.own()};


}]);