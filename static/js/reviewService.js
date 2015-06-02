myApp.factory('review', [ '$http', '$location', function($http, $location) {

    function getReviewData(reviewId, edit) {
        var request = $http({
            method: "get",
            url: "/review",
            params: {
                id: reviewId,
                edit: edit
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
                reviewId: reviewId
            }
        });
        return (request.then(handleSubmitSuccess, handleError));
    };


    function upvote(reviewId) {
        var request = $http({
            method: "post",
            url: "/upvote",
            data: {
                reviewId: reviewId
            }
        });
        return (request.then(handleUpvoteSuccess, handleError));
    };

    function unUpvote(reviewId) {
        var request = $http({
            method: "post",
            url: "/unUpvote",
            data: {
                reviewId: reviewId
            }
        });
        return (request.then(handleUpvoteSuccess, handleError));
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

    function handleUpvoteSuccess(response) {
        if (response.data.data !== undefined) {
            var data = {};
            data.upvotes = response.data.data.upvotes;
            data.hasUpvoted = response.data.data.hasUpvoted;
            return data;
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


    return ({
        getReviewData: getReviewData,
        submitReview: submitReview,
        deleteReview: deleteReview,
        upvote: upvote,
        unUpvote: unUpvote
    })

}]);