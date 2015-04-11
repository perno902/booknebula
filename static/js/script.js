function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}




'use strict';

window.onload

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
        .when('/profile', {
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
        .when('/title', {
            templateUrl: '../static/pages/title.html',
            controller: 'titleCtrl'
        })
}]);

// Create the controllers

myApp.controller('toplistCtrl', ['$scope', 'toplist', function($scope, toplist) {
    $scope.currentList = 'Highest rated books';
    $scope.toplists = ['Highest rated books', 'Most upvoted reviewers'];
    $scope.topBooks = toplist.books;
    $scope.topReviewers = toplist.reviewers;
    $scope.isCurrentList = function(list) {
        return (list == $scope.currentList);
    };
}]);

myApp.factory('toplist', function() {
    var topBooks = [
        { id: 300, title: 'Lolita', year: 1955 , author: 'Vladimir Nabokov', score: 8.7},
        { id: 322, title: 'Wicked', year: 1995 , author: 'Gregory Maguire', score: 8.5},
        { id: 304, title: 'It', year: 1986 , author: 'Stephen King', score: 8.4},
        { id: 633, title: 'Candide', year: 1759 , author: 'Voltaire', score: 8.3},
        { id: 195, title: 'Matilda', year: 1988 , author: 'Roald Dahl', score: 8.1}
        ];
    var topReviewers = [
        { id: 76, name: 'n0rp3r_the_critic', upvotes: 1407},
        { id: 2, name: 'Jack Shepard', upvotes: 832},
        { id: 76, name: 'Cain', upvotes: 544},
        { id: 76, name: 'Abel', upvotes: 123},
        { id: 76, name: 'Dr Pangloss', upvotes: 109}
    ];
    return {
        books: topBooks ,
        reviewers : topReviewers
    };
});






myApp.controller('signInCtrl', function($scope) {
    $scope.signIn = function() {
        localStorage.setItem("userToken", "sld8887989dsf7s7f7d7d7f7ddfs");
    }
    $scope.signOut = function() {
        localStorage.removeItem("userToken");
    };

    $scope.isSignedIn = function() {
        if (localStorage.getItem("userToken")=== null) {
            return false;
        }
        return true;
    };
});


myApp.controller('profileCtrl', ['$scope', 'userData', function($scope, userData) {
    $scope.userName = userData.userName;
    $scope.noOfReviews = userData.noOfReviews;
    $scope.grade = userData.grade;
    $scope.upvotes = userData.upvotes;
    $scope.joinedDate = userData.joinedDate;
    $scope.country = userData.country;
    $scope.presentation = userData.presentation;
    $scope.reviews = userData.reviews;
}]);


myApp.factory('userData', function() {
    var userName = 'n0rp3r_the_critic';
    var noOfReviews = 102;
    var grade = 'Senior bookworm';
    var upvotes = 1492;
    var joinedDate = '2015-04-01';
    var country = 'Sweden';
    var presentation = 'A huge fan of classic literature. Lorem ipsum dolor sit amet, ' +
                    'consectetur adipiscing elit. Cras arcu eros, eleifend vitae urna et, ' +
    '               tristique dapibus eros. Praesent at posuere ipsum, eu blandit dui. ' +
                    ' Etiam venenatis odio quis auctor ultricies. Quisque pretium vitae ' +
                    'orci sit amet tempor. Vestibulum vehicula blandit tortor, venenatis ' +
    '               tempus nisi tempor ac. Vestibulum ante ipsum primis in faucibus orci luctus ' +
                    'et ultrices posuere cubilia Curae; Fusce ac tempor eros, sit amet varius ex.';
    var reviews = [
        { id: 14302, title: 'Lolita', year: 1955 , author: 'Vladimir Nabokov', score: 7, date: '2015-04-03', upvotes: 57},
        { id: 9992, title: 'Wicked', year: 1995 , author: 'Gregory Maguire', score: 8, date: '2015-04-04', upvotes: 22},
        { id: 20445, title: 'It', year: 1986 , author: 'Stephen King', score: 5, date: '2015-04-09', upvotes: 10}
    ];
    return {
        userName: userName,
        noOfReviews : noOfReviews,
        grade: grade,
        upvotes: upvotes,
        joinedDate: joinedDate,
        country: country,
        presentation: presentation,
        reviews: reviews
    };
});

myApp.controller('searchCtrl', ['$scope', 'search', function($scope, search) {
    $scope.query = '';
    $scope.searchfn = function searchfn() {

    };

    $scope.$watch('query', function() {
       search.updateQuery($scope.query);
    });
    $scope.$on('query', function () {
       $scope.query = search.query;
    });
}]);


myApp.controller('searchResultsCtrl', ['$scope', 'search', function($scope, search) {
    $scope.query = search.query;
    $scope.books = search.books;
    $scope.authors = search.authors;
    $scope.reviewers = search.reviewers;
}]);

myApp.factory('search', function($rootScope) {
    var service = {};
    service.query = '';
    service.books = [
        { id: 14302, title: 'Lolita', year: 1955},
        { id: 9992, title: 'Wicked', year: 1995},
        { id: 20445, title: 'It', year: 1986}
    ];
    service.authors = [
        { id: 99, Name: 'Vladimir Nabokov'},
        { id: 102, title: 'Gregory Maguire'}
    ];
    service.reviewers = [
        { id: 14302, userName: 'Pelle Nordfors'}
    ];

    service.updateQuery = function(query){
    this.query = query;
    $rootScope.$broadcast("valuesUpdated");
    };

    return service;
});

myApp.controller('titleCtrl', ['$scope', 'title', function($scope, title) {
    $scope.title = title.title;
    $scope.year = title.year;
    $scope.author = title.author;
    $scope.origLang = title.origLang;
    $scope.avgScore = title.origLang;
    $scope.plot = title.origLang;
    $scope.reviews = title.reviews;
}]);

myApp.factory('title', function() {
    var title = 'Lolita';
    var year = 1955;
    var author = 'Vladimir Nabokov';
    var origLang = 'English';
    var avgScore = 8.7;
    var plot = 'A man marries his landlady so he can take advantage of her daughter.' +
                    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras arcu eros, ' +
                    'eleifend vitae urna et tristique dapibus eros. Praesent at posuere ipsum, eu blandit dui. '
    var reviews = [
        {id: 23, upvotes: 46, reviewer: 'n0rp3r_the_critic', revTitle: 'A great book!', score: 10, date: '2015-02-11',
        language: 'Swedish', content: 'Even though some of the wit probably got lost in translation, this is a great book! 10/10!'},
        {id: 24, upvotes: 2, reviewer: 'frau_blucher', revTitle: 'This book is filth!', score: 1, date: '2012-06-29',
        language: 'Pig latin', content: 'Some books are too... Too!'}
        ];
    return {
        title: title,
        year: year,
        author: author,
        origLang: origLang,
        avgScore: avgScore,
        plot: plot,
        reviews: reviews
    };
});
