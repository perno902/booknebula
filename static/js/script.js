'use strict';

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',
    function($routeProvider) {
    $routeProvider

    // Home page
        .when('/', {
            templateUrl: '../static/pages/home.html'
        })
    // Toplist page
        .when('/toplist', {
            templateUrl: '../static/pages/toplist.html',
            controller: 'toplistCtrl'
        })
    // Profile page
        .when('/profile/:userId', {
            templateUrl: function(params){ return '/?doc=profile&id=' + params.userId;},
            controller: 'profileCtrl'
        })
    // Profile editing page
        .when('/editProfile', {
            templateUrl: '../static/pages/editProfile.html',
            controller: 'editProfileCtrl'
        })
    // Search results page
        .when('/searchResults', {
            templateUrl: '../static/pages/searchResults.html',
            controller: 'searchResultsCtrl'
        })
    // Title page
        .when('/title/:titleId', {
            templateUrl: function(params){ return '/?doc=title&id=' + params.titleId;},
            controller: 'titleCtrl'
        })
    // Author page
        .when('/author/:authorId', {
            templateUrl: function(params){ return '/?doc=author&id=' + params.authorId;},
            controller: 'authorCtrl'
        })
    // Review page
        .when('/review/:reviewId', {
            templateUrl: function(params){ return '/?doc=review&id=' + params.reviewId;},
            controller: 'reviewCtrl'
        })
    // Review page
        .when('/writeReview/:reviewId', {
            templateUrl: '../static/pages/writeReview.html',
            controller: "writeReviewCtrl"
        })
    // Edit author page
        .when('/editAuthor/:authorId', {
            templateUrl: '../static/pages/editAuthor.html',
            controller: "editAuthorCtrl"
        })
    // Edit book page
        .when('/editBook/:bookId', {
            templateUrl: '../static/pages/editBook.html',
            controller: "editBookCtrl"
        })
    // Error page
        .when('/error', {
            template: '<html><h2> Oops! </h2><br> \
                        <p> Something went wrong! </p><br> </html>'
        })
}]);
