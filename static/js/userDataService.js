myApp.factory('userData', [ '$http', '$location', function($http, $location) {
    var userId = '';
    var userName = '';
    var email = '';
    var noOfReviews = '';
    var grade = '';
    var noOfUpvotes = '';
    var joinedDate = '';
    var country = '';
    var presentation = '';
    var reviews = [];

    function setUserId(id) {
        userId = id;
    };

    function getUserData() {
        var request = $http({
            method: "get",
            url: "/userData",
            params: {
                id: userId
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    function setUserData(newName, newCountry, newEmail, newPresentation) {
        userName = newName;
        country = newCountry;
        email = newEmail;
        presentation = newPresentation;
    };

    function submitUserData() {
        var request = $http({
            method: "post",
            url: "/userData",
            data: {
                userName: userName,
                country: country,
                email: email,
                presentation: presentation
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };

    function handleError(response) {
        console.log('error')
    }

    function handleSuccess(response) {
        console.log('success');
        applyRemoteData(response.data.data);
        $location.path('/profile/' + userId);
    }

    function handleSubmitSuccess() {
        console.log('success');
        $location.path('/profile/signedIn');
    }

    function applyRemoteData(data) {
        userId = data.userId;
        userName = data.userName;
        email = data.email;
        noOfReviews = data.noOfReviews;
        grade = data.grade;
        noOfUpvotes = data.noOfUpvotes;
        joinedDate = data.joinedDate;
        country = data.country;
        presentation = data.presentation;
        reviews = data.reviews;
    };

    return ({
        getUserData: getUserData,
        setUserId: setUserId,
        setUserData: setUserData,
        submitUserData: submitUserData,
        userId: function() {return userId},
        userName: function() {return userName},
        email: function() {return email},
        noOfReviews: function() {return noOfReviews},
        grade: function() {return grade},
        noOfUpvotes: function() {return noOfUpvotes},
        joinedDate: function() {return joinedDate},
        country: function() {return country},
        presentation: function() {return presentation},
        reviews: function() {return reviews}
    });

}]);