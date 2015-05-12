myApp.factory('author', [ '$http', '$location', function($http, $location) {
    var authorId = '';
    var name = '';
    var country = '';
    var birthYear = '';
    var books = [];

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
        console.log('error');
    }

    function handleSuccess(response) {
        console.log('success');
        return applyRemoteData(response.data.data);
    }

    function handleSubmitSuccess(response) {
        console.log('success');
        $location.path('/author/' + response.data.authorId)
    }

    function applyRemoteData(authorData) {
        name = authorData.name;
        country = authorData.country;
        birthYear = authorData.birthYear;
        books = authorData.books;
    }

    return {
        setAuthorId: setAuthorId,
        getAuthorData: getAuthorData,
        submitAuthorData: submitAuthorData,
        authorId: function() {return authorId},
        name: function() {return name},
        country: function() {return country},
        birthYear: function() {return birthYear},
        books: function() {return books}
    };

}]);