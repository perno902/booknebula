import myapp
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import declarative_base
import random
import string


db = SQLAlchemy(myapp.app)
Base = declarative_base()

def generate_id():
    return ''.join(random.choice(string.lowercase) for i in range(10))

upvotes = db.Table('upvotes',
                   db.Column('user_id', db.Integer, db.ForeignKey('user.id') ),
                   db.Column('review_id', db.Integer, db.ForeignKey('review.id')))


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.String(10), primary_key=True, nullable=False)
    userName = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50))
    country = db.Column(db.String(50))
    presentation = db.Column(db.Text)
    joinedDate = db.Column(db.String(20))
    noOfUpvotes = db.Column(db.Integer)
    isAdmin = db.Column(db.Boolean)
    reviews = db.relationship('Review', backref='user', lazy='dynamic')
    upvotes = db.relationship('Review', secondary=upvotes, backref=db.backref('upvoter', lazy='dynamic'))


    def __init__(self, username, email, country, presentation, joined_date, is_admin):
        id = generate_id()
        while User.query.filter_by(id=id).first() is not None:
            id = generate_id()

        self.id = id
        self.userName = username
        self.email = email
        self.country = country
        self.presentation = presentation
        self.joinedDate = joined_date
        self.noOfUpvotes = 0
        self.isAdmin = is_admin

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
    id = db.Column(db.String(10), primary_key=True)
    revTitle = db.Column(db.String(50))
    content = db.Column(db.Text)
    score = db.Column(db.Integer)
    language = db.Column(db.String(50))
    date = db.Column(db.String(20))
    reviewerId = db.Column(db.Integer, db.ForeignKey('user.id'))
    bookId = db.Column(db.Integer, db.ForeignKey('book.id'))
    upvoters = db.relationship('User', secondary=upvotes, backref=db.backref('upvoted_review', lazy='dynamic'))


    def __init__(self, title, content, score, language, date, reviewer, book):
        id = generate_id()
        while Review.query.filter_by(id=id).first() is not None:
            id = generate_id()

        self.id = id
        self.revTitle = title
        self.content = content
        self.score = score
        self.language = language
        self.date = date
        self.reviewerId = reviewer.id
        self.bookId = book.id




has_written = db.Table('has_written',
                   db.Column('book_id', db.Integer, db.ForeignKey('book.id')),
                   db.Column('author_id', db.Integer, db.ForeignKey('author.id'))
)


class Book(db.Model):
    id = db.Column(db.String(10), primary_key=True, nullable=False)
    title = db.Column(db.String(50))
    year = db.Column(db.Integer)
    plot = db.Column(db.Text)
    language = db.Column(db.String(50))
    avgScore = db.Column(db.Float)
    reviews = db.relationship('Review', backref='book', lazy='dynamic')
    written_by = db.relationship('Author', secondary=has_written, backref=db.backref('books', lazy='dynamic'))

    def __init__(self, title, year, plot, language):
        id = generate_id()
        while Book.query.filter_by(id=id).first() is not None:
            id = generate_id()

        self.id = id

        self.title = title
        self.year = year
        self.plot = plot
        self.language = language



class Author(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(50))
    country = db.Column(db.String(50))
    birthYear= db.Column(db.Integer)
    wrote = db.relationship('Book', secondary=has_written, backref=db.backref('author', lazy='dynamic'))

    def __init__(self, name, country, birth_year):
        id = generate_id()
        while Author.query.filter_by(id=id).first() is not None:
            id = generate_id()

        self.id = id
        self.name = name
        self.country = country
        self.birthYear = birth_year

class State(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    date = db.Column(db.Date)

    def __init__(self, id, date):
        self.id = id
        self.date = date