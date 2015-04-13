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