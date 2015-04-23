myApp.factory('userData', [ '$http', '$q', function($http, $q) {
    return ({getUserData: getUserData});

    function getUserData() {
        var request = $http({
            method: "get",
            url: "/userData",
            params: {
                id: 1
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



}]);