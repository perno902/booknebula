---------------------------

   Links:
---------------------------

## Link to Openshift: ##
http://booknebula-perno902.openshift.ida.liu.se


## Link to screencast (youtube): ##
https://www.youtube.com/watch?v=glfoTzzkNzU






---------------------------

I. Functional specification
---------------------------

1. Vision
Book Nebula is a web application which will allow users to read and publish 
book reviews. 

2. Core functions
Users will be able to search for book titles, authors and reviewers and view
the result.

When viewing a specific book, the user will see basic facts about the book 
(such as author, year, original language) as well as reviews. There will also
be an average score for the book based on the reviews.

When viewing an author, all the author's books will be listed. It will be 
possible to choose a book from the list and go to its specific "book view".

When viewing a reviewer, all the reviewer's reviews will be listed. A reviewer
also has a grade based on the number of published reviews.

There will also be a list showing the highest rated books in the database. This
list will serve as the "home view".

It will be possible for users to sign in using a Google account. 
When signed in, the users can edit a basic user profile and publish reviews. 
For users who are signed in, it s also possible to upvote and downvote reviews.

For a specific user - the administrator - it will be possible to add new books
to the database and remove offensive reviews.


II. Technical specification
---------------------------

1. Client framework
For the client-side of the application, the AngularJS framework will be used. 
Bootstrap will be used in order to make the design responsive. The client will
communicate with the server via XMLHttpRequests.

2. Server framework
For the server-side, the Flask microframework for Python will be used, 
along with extensions mentioned in the following paragraphs. The server will
route URL:s to the appropriate functions on the server-side and manage the 
application database. It will also keep track of which users are signed in.

3. Persistence with data storage
For storing data persistently, SQLAlchemy will be used via the Flask-sQLAlchemy
extension.

4. Authentication
The OAuth protocol will be used for authentication via the Flask-Login and 
Flask-Googlelogin extensions. (Flask-Googlelogin will be used since the users 
sign in using Google accounts.)

5. Client types
Only one type of client is intended.

6. Testing frameworks
The Jasmine framework will be used for unit testing of the Angular application. 
For end to end testing, the Protractor framework (which uses Jasmine) will be 
used. (These are recommended for unit testing and end to end testing, 
respectively, in the AngularJS Developer Guide.)




