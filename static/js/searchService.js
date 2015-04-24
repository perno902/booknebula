
myApp.factory('search', [ '$http', function($http, $rootScope) {
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

    function handleError(response) {
        console.log('error')
        if (!angular.isObject(response.data) || !angular.response.data.message) {
            return($q.reject("Unknown error."));
        }
        return ($q.reject(response.data.message));
    };

    function handleSuccess(response) {
        console.log('success');
        applyRemoteData(response.data.data);
    };

    function applyRemoteData(data) {
        books = data.books;
        authors = data.authors;
        reviewers = data.reviewers;
    };

}]);
