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
        if (response.data.data !== undefined) {
            return response.data.data;
        } else {
            handleError();
        }
    };

    function handleSubmitSuccess(response) {
        if (response.data.bookId !== undefined) {
            $location.path('/title/' + response.data.bookId)
        } else {
            handleError();
        }
    };


    return {
        getBookData: getBookData,
        submitBookData: submitBookData,
        getAuthorList: getAuthorList
    };

}]);