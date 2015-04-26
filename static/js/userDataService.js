myApp.factory('userData', [ '$http', '$q', function($http, $q) {
    var userId = '';

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
    }

    function handleError(response) {
        console.log('error')
        if (!angular.isObject(response.data) || !angular.response.data.message) {
            return($q.reject("Unknown error."))
        }
        return ($q.reject(response.data.message))
    }

    function handleSuccess(response) {
        console.log('success')
        return response.data.data
    }

    return ({
        getUserData: getUserData,
        setUserId: setUserId
    });

}]);