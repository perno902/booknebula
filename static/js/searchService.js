
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
        { id: 14302, userName: 'n0rp3r_the_critic'}
    ];

    service.updateQuery = function(query){
    this.query = query;
    $rootScope.$broadcast("valuesUpdated");
    };

    return service;
});
