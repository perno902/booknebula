myApp.factory('search', [ '$http', '$location', function($http, $location) {

    return ({
        getSearchResults: getSearchResults
    });

    function getSearchResults(query) {
        var request = $http({
            method: "get",
            url: "/search",
            params: {
                query: query
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    function handleError() {
        $location.path('/error');
    };

    function handleSuccess(response) {
        if (response.data.data !== undefined) {
            return response.data.data;
        } else {
            handleError();
        }
    };

}]);
