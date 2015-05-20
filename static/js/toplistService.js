myApp.factory('toplist', [ '$http', '$location', function($http, $location) {

    return {
        getToplistData: getToplistData
    };


    function getToplistData() {
        var request = $http({
            method: "get",
            url: "/toplist",
        });
        return (request.then(handleSuccess, handleError));
    };


    function handleError() {
        $location.path('/error');
    };


    function handleSuccess(response) {
        return response.data.data;
    };
}]);
