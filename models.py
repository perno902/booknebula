import app
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import declarative_base


db = SQLAlchemy(app.app)
Base = declarative_base()

upvotes = db.Table('upvotes',
                   db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                   db.Column('review_id', db.Integer, db.ForeignKey('review.id')))


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
    revTitle = db.Column(db.String(80))
    content = db.Column(db.Text)
    score = db.Column(db.Integer)
    language = db.Column(db.String(50))
    date = db.Column(db.String(20))
    reviewerId = db.Column(db.Integer, db.ForeignKey('user.id'))
    bookId = db.Column(db.Integer, db.ForeignKey('book.id'))
    upvoters = db.relationship('User', secondary=upvotes, backref=db.backref('upvoted_review', lazy='dynamic'))


    def __init__(self, title, content, score, language, date, reviewer, book):
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
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(80))
    year = db.Column(db.String(4))
    plot = db.Column(db.Text)
    language = db.Column(db.String(50))
    reviews = db.relationship('Review', backref='book', lazy='dynamic')
    written_by = db.relationship('Author', secondary=has_written, backref=db.backref('books', lazy='dynamic'))

    def __init__(self, title, year, plot, language):
        self.title = title
        self.year = year
        self.plot = plot
        self.language = language



class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))



    def __init__(self, name):
        self.name = name