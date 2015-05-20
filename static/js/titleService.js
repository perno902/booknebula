myApp.factory('title', [ '$http', '$location', function($http, $location) {

    function getBookData(bookId) {
        var request = $http({
            method: "get",
            url: "/title",
            params: {
                id: bookId
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    function submitBookData(id, newTitle, newYear, newLanguage, newPlot, newAuthors) {
        var request = $http({
            method: "post",
            url: "/title",
            data: {
                bookId: id,
                title: newTitle,
                year: newYear,
                language: newLanguage,
                plot: newPlot,
                authors: newAuthors
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };

    function getAuthorList() {
        var request = $http({
            method: "get",
            url: "/authorList"
        });
        return (request.then(handleSuccess, handleError));
    };

    function handleError() {
        $location.path('/error');
    };

    function handleSuccess(response) {
        return response.data.data;
    };

    function handleSubmitSuccess(response) {
        $location.path('/title/' + response.data.bookId)
    };


    return {
        getBookData: getBookData,
        submitBookData: submitBookData,
        getAuthorList: getAuthorList
    };

}]);