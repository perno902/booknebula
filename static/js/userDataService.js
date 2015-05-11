myApp.factory('userData', [ '$http', '$location', function($http, $location) {
    var userName = '';
    var email = '';
    var noOfReviews = '';
    var grade = '';
    var noOfUpvotes = '';
    var joinedDate = '';
    var country = '';
    var presentation = '';
    var reviews = [];


    // Gets user data for a profile from the server
    function getUserData(id) {
        var request = $http({
            method: "get",
            url: "/userData",
            params: {
                id: id
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    // Submits user data after editing a profile
    function submitUserData(newUserName, newCountry, newEmail, newPresentation) {
        var request = $http({
            method: "post",
            url: "/userData",
            data: {
                userName: newUserName,
                country: newCountry,
                email: newEmail,
                presentation: newPresentation
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };


    //Functions for handling error and success
    function handleError() {
        console.log('error')
    }

    function handleSuccess(response) {
        console.log('success');
        applyRemoteData(response.data.data);
    }

    function handleSubmitSuccess() {
        console.log('success');
        $location.path('/profile/signedIn');
    }


    // Applies data to the variables in the service
    function applyRemoteData(data) {
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

    // Service functions used by controllers
    return ({
        getUserData: getUserData,
        submitUserData: submitUserData,
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