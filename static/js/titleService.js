myApp.factory('title', [ '$http', '$location', function($http, $location) {
    var bookId = '';
    var title = '';
    var year = '';
    var authors= [];
    var language = '';
    var avgScore = '';
    var plot = '';
    var reviews = [];
    var hasReviewed = false;
    var user = '';

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

    function submitBookData(id, newTitle, newYear, newLanguage, newPlot) {
        var request = $http({
            method: "post",
            url: "/title",
            data: {
                bookId: id,
                title: newTitle,
                year: newYear,
                language: newLanguage,
                plot: newPlot
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };

    function handleError(response) {
        console.log('error');
    };

    function handleSuccess(response) {
        console.log('success');
        applyRemoteData(response.data.data);
    };

    function handleSubmitSuccess(response) {
        console.log('success');
        $location.path('/title/' + response.data.bookId)
    }

    function applyRemoteData(data) {
        title = data.title;
        year = data.year;
        authors = data.authors;
        language = data.language;
        avgScore = data.avgScore;
        plot = data.plot;
        reviews = data.reviews;
        hasReviewed = data.hasReviewed;
        user = data.user;
    };

    return {
        setBookId: setBookId,
        getBookData: getBookData,
        submitBookData: submitBookData,
        bookId: function() {return bookId},
        title: function() {return title},
        year: function() {return year},
        authors: function() {return authors},
        language: function() {return language},
        avgScore: function() {return avgScore},
        plot: function() {return plot},
        reviews: function() {return reviews},
        hasReviewed: function() {return hasReviewed},
        user: function() {return user}
    };

}]);