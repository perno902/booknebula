myApp.factory('review', [ '$http', function($http) {
    var reviewId = '';

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
                bookId: data.bookId,
                revTitle: data.revTitle,
                score: data.score,
                content: data.content,
                language: data.language
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    function upvote() {
        var request = $http({
            method: "post",
            url: "/upvote",
            data: {
                id: reviewId
            }
        });
        return (request.then(handleSuccess, handleError));
    };

    function handleError(response) {
        console.log('error');
    }

    function handleSuccess(response) {
        console.log('success');
        return response.data.data;
    }

    return {
        setReviewId: setReviewId,
        getReviewData: getReviewData,
        submitReview: submitReview,
        upvote: upvote
    };

}]);