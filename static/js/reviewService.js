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

    function handleError(response) {
        console.log('error');
    }

    function handleSuccess(response) {
        console.log('success');
        return response.data.data;
    }

    return {
        setReviewId: setReviewId,
        getReviewData: getReviewData
    };

}]);