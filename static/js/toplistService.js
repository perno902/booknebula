myApp.factory('toplist', function() {
    var books = [
        { id: 300, title: 'Lolita', year: 1955 , author: 'Vladimir Nabokov', score: 8.7},
        { id: 322, title: 'Wicked', year: 1995 , author: 'Gregory Maguire', score: 8.5},
        { id: 304, title: 'It', year: 1986 , author: 'Stephen King', score: 8.4},
        { id: 633, title: 'Candide', year: 1759 , author: 'Voltaire', score: 8.3},
        { id: 195, title: 'Matilda', year: 1988 , author: 'Roald Dahl', score: 8.1}
        ];
    var reviewers = [
        { id: 76, name: 'n0rp3r_the_critic', upvotes: 1407},
        { id: 2, name: 'Jack Shepard', upvotes: 832},
        { id: 76, name: 'Cain', upvotes: 544},
        { id: 76, name: 'Abel', upvotes: 123},
        { id: 76, name: 'Dr Pangloss', upvotes: 109}
    ];
    return {
        books: books ,
        reviewers : reviewers
    };
});
