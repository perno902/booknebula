myApp.factory('title', [ '$http', function($http) {
    var bookId = '';
    var title = '';
    var year = '';
    var authors= [];
    var language = '';
    var avgScore = '';
    var plot = '';
    var reviews = [];

    function setBookId(id) {
        bookId = id;
    };


    function getBookData() {
        var request = $http({
            method: "get",
            url: "/title",
            params: {
                id: bookId
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    function handleError(response) {
        console.log('error');
    };

    function handleSuccess(response) {
        console.log('success');
        applyRemoteData(response.data.data);
    };

    function applyRemoteData(data) {
        title = data.title;
        year = data.year;
        authors = data.authors;
        language = data.language;
        //avgScore = data.avgScore;
        plot = data.plot;
        reviews = data.reviews;
    };

    return {
        setBookId: setBookId,
        getBookData: getBookData,
        bookId: function() {return bookId},
        title: function() {return title},
        year: function() {return year},
        authors: function() {return authors},
        language: function() {return language},
        avgScore: function() {return avgScore},
        plot: function() {return plot},
        reviews: function() {return reviews}

    };

}]);