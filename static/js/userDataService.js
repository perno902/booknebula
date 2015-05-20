myApp.factory('userData', [ '$http', '$location', function($http, $location) {

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
        $location.path('/error');
    }

    function handleSuccess(response) {
        return response.data.data;
    }

    function handleSubmitSuccess() {
        $location.path('/profile/signedIn');
    }

    // Service functions used by controllers
    return ({
        getUserData: getUserData,
        submitUserData: submitUserData
    });

}]);