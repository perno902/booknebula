myApp.directive('myReviews', function() {
  return {
      restrict: 'EA',
      scope: {
          reviews: '=reviews'
      },
      templateUrl: 'static/templates/my-reviews.html'
  }
});