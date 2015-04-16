myApp.factory('author', function() {
    var name = 'Vladimir Nabokov';
    var books = [
        { id: 35, title: 'Lolita', year: 1955, avgScore: 8.7},
        ];
    return {
        name: name,
        books: books
    };
});