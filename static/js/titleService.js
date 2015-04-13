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
        {id: 23, upvotes: 46, reviewer: 'n0rp3r_the_critic', revTitle: 'A great book!', score: 10, date: '2015-02-11'},
        {id: 24, upvotes: 2, reviewer: 'frau_blucher', revTitle: 'This book is filth!', score: 1, date: '2012-06-29'}
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