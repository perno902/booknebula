
myApp.factory('search', [ '$http', '$location', function($http, $location) {
    var query = '';
    var books = [];
    var authors = [];
    var reviewers = [];

    return ({
        setQuery: setQuery,
        getSearchResults: getSearchResults,
        query: function() {return query},
        books: function() {return books},
        authors: function() {return authors},
        reviewers: function() {return reviewers}
    });

    function setQuery(q) {
        query = q;
    };

    function getSearchResults() {
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
        applyRemoteData(response.data.data);
        $location.path('/searchResults');
    };

    function applyRemoteData(data) {
        books = data.books;
        authors = data.authors;
        reviewers = data.reviewers;
    };

}]);
