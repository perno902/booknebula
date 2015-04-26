myApp.factory('author', [ '$http', function($http) {
    var authorId = '';

    function setAuthorId(id) {
        authorId = id;
    };

    function getAuthorData() {
        var request = $http({
            method: "get",
            url: "/author",
            params: {
                id: authorId
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function handleError(response) {
        console.log('error');
    }

    function handleSuccess(response) {
        console.log('success');
        return response.data.data;
    }

    return {
        setAuthorId: setAuthorId,
        getAuthorData: getAuthorData
    };

}]);