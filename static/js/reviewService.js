myApp.factory('review', [ '$http', function($http) {
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
    var signedIn = '';
    var hasUpvoted = '';
    var own = '';

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


    function handleError(response) {
        console.log('error');
    };

    function handleSuccess(response) {
        console.log('success');
        applyRemoteData(response.data.data);
    };

    function handleUpvoteSuccess(response) {
        console.log('success');
        upvotes = response.data.data.upvotes;
        hasUpvoted = response.data.data.hasUpvoted;
    };

    function handleSubmitSuccess(response) {
        console.log('success');
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
        signedIn = reviewData.signedIn;
        hasUpvoted = reviewData.hasUpvoted;
        own = reviewData.own;
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
        signedIn: function() {return signedIn},
        hasUpvoted: function() {return hasUpvoted},
        own : function() {return own}
    })

}]);