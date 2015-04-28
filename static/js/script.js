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
            templateUrl: '../static/pages/profile.html',
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
            templateUrl: '../static/pages/title.html',
            controller: 'titleCtrl'
        })
    // Author page
        .when('/author/:authorId', {
            templateUrl: '../static/pages/author.html',
            controller: 'authorCtrl'
        })
    // Review page
        .when('/review/:reviewId', {
            templateUrl: '../static/pages/review.html',
            controller: 'reviewCtrl'
        })
    // Review page
        .when('/writeReview', {
            templateUrl: '../static/pages/writeReview.html',
            controller: "writeReviewCtrl"
        })
}]);
