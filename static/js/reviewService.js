myApp.factory('review', [ '$http', '$location', function($http, $location) {
    var reviewId = '';
    var bookTitle = '';
    var bookId = '';
    var year = '';
    var reviewer = '';
    var revTitle = '';
    var score = '';
    var date = '';
    var language = '';
    var content = '';
    var upvotes = '';
    var hasUpvoted = '';

    function setReviewId(id) {
        reviewId = id;
    };


    function getReviewData() {
        var request = $http({
            method: "get",
            url: "/review",
            params: {
                id: reviewId
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function submitReview(data) {
        var request = $http({
            method: "post",
            url: "/review",
            data: {
                reviewId: data.reviewId,
                bookId: data.bookId,
                revTitle: data.revTitle,
                score: data.score,
                content: data.content,
                language: data.language
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };

    function deleteReview() {
        var request = $http({
            method: "post",
            url: "/deleteReview",
            data: {
                id: reviewId
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };


    function upvote() {
        var request = $http({
            method: "post",
            url: "/upvote",
            data: {
                id: reviewId
            }
        });
        return (request.then(handleUpvoteSuccess, handleError));
    };

    function unUpvote() {
        var request = $http({
            method: "post",
            url: "/unUpvote",
            data: {
                id: reviewId
            }
        });
        return (request.then(handleUpvoteSuccess, handleError));
    };


    function handleError() {
        $location.path('/error');
    };

    function handleSuccess(response) {
        applyRemoteData(response.data.data);
    };

    function handleUpvoteSuccess(response) {
        upvotes = response.data.data.upvotes;
        hasUpvoted = response.data.data.hasUpvoted;
    };

    function handleSubmitSuccess(response) {
        console.log('success');
        $location.path('/title/' + response.data.bookId)
    };



    function applyRemoteData(reviewData) {
        reviewId = reviewData.id;
        bookTitle = reviewData.bookTitle;
        bookId = reviewData.bookId;
        year = reviewData.year;
        reviewer = reviewData.reviewer;
        revTitle = reviewData.revTitle;
        score = reviewData.score;
        date = reviewData.date;
        language = reviewData.language;
        content = reviewData.content;
        upvotes = reviewData.upvotes;
        hasUpvoted = reviewData.hasUpvoted;
    };

    return ({
        setReviewId: setReviewId,
        getReviewData: getReviewData,
        submitReview: submitReview,
        deleteReview: deleteReview,
        upvote: upvote,
        unUpvote: unUpvote,
        reviewId: function() {return reviewId},
        bookTitle: function() {return bookTitle},
        bookId: function() {return bookId},
        year: function() {return year},
        reviewer: function() {return reviewer},
        revTitle: function() {return revTitle},
        score: function() {return score},
        date: function() {return date},
        language: function() {return language},
        content: function() {return content},
        upvotes: function() {return upvotes},
        hasUpvoted: function() {return hasUpvoted},
    })

}]);