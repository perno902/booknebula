myApp.factory('toplist', [ '$http', function($http) {

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


    function handleError(response) {
        console.log('error');
    };


    function handleSuccess(response) {
        console.log('success');
        return response.data.data;
    };
}]);
