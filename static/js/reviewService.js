myApp.factory('review', function() {
    var service = {};
    service.id = 23;
    service.bookTitle = "Lolita";
    service.year = 1955;
    service.reviewer = 'n0rp3r_the_critic';
    service.revTitle = 'A great book!';
    service.score= 10;
    service.date = '2015-02-11';
    service.language = 'Swedish';
    service.content = 'Even though some of the wit probably got lost in translation, this is a great book! 10/10! ' +
                    'consectetur adipiscing elit. Cras arcu eros, eleifend vitae urna et, ' +
                    ' tristique dapibus eros. Praesent at posuere ipsum, eu blandit dui. ' +
                    ' Etiam venenatis odio quis auctor ultricies. Quisque pretium vitae ' +
                    'orci sit amet tempor. Vestibulum vehicula blandit tortor, venenatis ' +
                    ' tempus nisi tempor ac. Vestibulum ante ipsum primis in faucibus orci luctus ' +
                    'et ultrices posuere cubilia Curae; Fusce ac tempor eros, sit amet varius ex.'
    service.upvotes = 46;

    return service;
});