myApp.factory('review', [ '$http', '$location', function($http, $location) {

    function getReviewData(reviewId) {
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

    function deleteReview(reviewId) {
        var request = $http({
            method: "post",
            url: "/deleteReview",
            data: {
                id: reviewId
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };


    function upvote(reviewId) {
        var request = $http({
            method: "post",
            url: "/upvote",
            data: {
                id: reviewId
            }
        });
        return (request.then(handleUpvoteSuccess, handleError));
    };

    function unUpvote(reviewId) {
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
        return response.data.data;
    };

    function handleUpvoteSuccess(response) {
        var data = {};
        data.upvotes = response.data.data.upvotes;
        data.hasUpvoted = response.data.data.hasUpvoted;
        return data;
    };

    function handleSubmitSuccess(response) {
        $location.path('/title/' + response.data.bookId)
    };


    return ({
        getReviewData: getReviewData,
        submitReview: submitReview,
        deleteReview: deleteReview,
        upvote: upvote,
        unUpvote: unUpvote
    })

}]);