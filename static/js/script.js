'use strict';

window.onload

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',
    function($routeProvider) {
    $routeProvider


        .when('/', {
            templateUrl: '../static/pages/home.html',
        })
    // Home page
        .when('/home', {
            templateUrl: '../static/pages/home.html',
        })
    // Toplist page
        .when('/toplist', {
            templateUrl: '../static/pages/toplist.html',
        })
        .otherwise({
            reDirectTo:'/hejsan'
        })

}]);

// Create the controllers
myApp.controller('mainController', function($scope) {
    $scope.message = 'main page view'
});

myApp.controller('toplistController', function($scope) {
    $scope.message = 'toplist page view'
});