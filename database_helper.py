import app
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import declarative_base
import datetime


db = SQLAlchemy(app.app)
Base = declarative_base()

upvotes = db.Table('upvotes',
                   db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                   db.Column('review_id', db.Integer, db.ForeignKey('review.id'))
)


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    userName = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(80))
    country = db.Column(db.String(50))
    presentation = db.Column(db.Text)
    joinedDate = db.Column(db.String(20))
    reviews = db.relationship('Review', backref='user', lazy='dynamic')
    upvotes = db.relationship('Review', secondary=upvotes, backref=db.backref('upvoter', lazy='dynamic'))

    def __init__(self, username, email, country, presentation, joined_date):
        self.userName = username
        self.email = email
        self.country = country
        self.presentation = presentation
        self.joinedDate = joined_date
        print "userName: " + self.userName
        print "date: " + self.joinedDate

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def __repr__(self):
        return '<User %r>' % self.id


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    content = db.Column(db.Text)
    score = db.Column(db.Integer)
    language = db.Column(db.String(50))
    reviewer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))


    def __init__(self, title, content, score, language, reviewer, book):
        self.title = title
        self.content = content
        self.score = score
        self.language = language
        self.reviewer_id = reviewer.id
        self.book_id = book.id




written_by = db.Table('written_by',
                   db.Column('book_id', db.Integer, db.ForeignKey('book.id')),
                   db.Column('author_id', db.Integer, db.ForeignKey('author.id'))
)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(80))
    year = db.Column(db.String(4))
    language = db.Column(db.String(50))
    reviews = db.relationship('Review', backref='book', lazy='dynamic')
    authors = db.relationship('Author', secondary=written_by, backref=db.backref('books', lazy='dynamic'))

    def __init__(self, title, year, language):
        self.title = title
        self.year = year
        self.language = language



class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    def __init__(self, name):
        self.name = name

# ----- Test -----

def test():
    User.query.delete()
    user = User('n0rp3r_the_critic', 'pelle.nordfors@gmail.com', 'Sweden', 'hi everyone!', str(datetime.date.today()))
    db.session.add(user)
    db.session.commit()

    author = Author('Vladimir Nabokov')

    book = Book('Lolita', '1955', 'English')
    book.authors.append(author)
    db.session.add(book)
    db.session.commit()

    review = Review('Awesome!', 'blabla', 9, 'Swedish', user, book)
    db.session.add(review)
    db.session.commit()


    print User.query.all()
    print Author.query.all()
    print Book.query.all()
    print Review.query.all()

    return ''

# ----- Help functions -----

def get_user(email):
    user = User.query.filter_by(email=email).first()
    return user

def get_user_by_id(id):
    user = User.query.filter_by(id=id).first()
    return user

def add_user(user):
    db.session.add(user)
    db.session.commit()

def get_user_data(id):
    profile_data = User.query.filter_by(id=id).first()
    data_dict = row_to_dict(profile_data)

    noOfReviews = get_review_count(id)
    data_dict['noOfReviews'] = noOfReviews
    data_dict['grade'] = get_grade(noOfReviews)
    data_dict['upvotes'] = get_upvotes_count(id)

    reviews = Review.query.filter_by(reviewer_id=id).all()
    data_dict['reviews'] = list_to_dict(reviews)

    return data_dict

def get_review_count(id):
    count = Review.query.filter_by(reviewer_id=id).count()
    return count

def get_grade(count):
    if (count <= 10):
        return "Beginning reader"
    elif (count <= 20):
        return "Intermediate reader"
    elif (count <= 40):
        return "Avid reader"
    else:
        return "Senior bookworm"

def get_upvotes_count(id):
    count = Review.query.filter(Review.upvoter.any(id=id)).count()
    return count

def list_to_dict(list):
    res = []
    for e in list:
        res.append(row_to_dict(e))
    return res

def row_to_dict(obj):
    if not (obj is None):
        d = dict(obj.__dict__)
        d.pop('_sa_instance_state')
        return d

# ----- Init function -----

def init_db():
    print "Initializing database"
    db.drop_all()
    db.create_all()


