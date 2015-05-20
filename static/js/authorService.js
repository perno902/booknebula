myApp.factory('author', [ '$http', '$location', function($http, $location) {

    function getAuthorData(authorId) {
        var request = $http({
            method: "get",
            url: "/author",
            params: {
                id: authorId
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function submitAuthorData(id, newName, newCountry, newBirthYear) {
        var request = $http({
            method: "post",
            url: "/author",
            data: {
                authorId: id,
                name: newName,
                country: newCountry,
                birthYear: newBirthYear
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };

    function handleError() {
        $location.path('/error');
    }

    function handleSuccess(response) {
        return response.data.data;
    }

    function handleSubmitSuccess(response) {
        $location.path('/author/' + response.data.authorId)
    }

    return {
        getAuthorData: getAuthorData,
        submitAuthorData: submitAuthorData
    };

}]);