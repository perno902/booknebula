myApp.factory('author', function() {
    var name = 'Stephen King';
    var books = [
        { id: 35, title: 'It', year: 1986, avgScore: 8.3},
        { id: 201, title: 'The Shining', year: 1977, avgScore: 8.0},
        { id: 20, title: 'Carrie', year: 1976, avgScore: 7.4}
        ];
    return {
        name: name,
        books: books
    };
});