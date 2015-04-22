import app
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import declarative_base
import datetime


db = SQLAlchemy(app.app)
Base = declarative_base()

upvotes = db.Table('upvotes',
                   db.Column('reviewer_id', db.Integer, db.ForeignKey('reviewer.id')),
                   db.Column('review_id', db.Integer, db.ForeignKey('review.id'))
)


class Reviewer(db.Model):
    __tablename__ = 'reviewer'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(80), unique=True)
    country = db.Column(db.String(50))
    presentation = db.Column(db.Text)
    joined_date = db.Column(db.Date)
    reviews = db.relationship('Review', backref='reviewer', lazy='dynamic')
    upvotes = db.relationship('Review', secondary=upvotes, backref=db.backref('upvoter', lazy='dynamic'))

    def __init__(self, username, email, country, presentation, joined_date):
        self.username = username
        self.email = email
        self.country = country
        self.presentation = presentation
        self.joined_date = joined_date

    def __repr__(self):
        return '<Reviewer %r>' % self.joined_date


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    content = db.Column(db.Text)
    score = db.Column(db.Integer)
    language = db.Column(db.String(50))
    reviewer_id = db.Column(db.Integer, db.ForeignKey('reviewer.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))


    def __init__(self, title, content, score, language, reviewer, book):
        self.title = title
        self.content = content
        self.score = score
        self.language = language
        self.reviewer_id = reviewer.id
        self.book_id = book.id

    def __repr__(self):
        return '<Review %r>' % self.title


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

    def __repr__(self):
        return '<Book %r>' % self.id


class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Author %r>' % self.id

def test():
    reviewer = Reviewer('n0rp3r_the_critic', 'pelle.nordfors@gmail.com', 'Sweden', 'hi everyone!', datetime.date.today())
    db.session.add(reviewer)
    db.session.commit()

    author = Author('Vladimir Nabokov')
    #db.session.add(author)
    #db.session.commit()

    book = Book('Lolita', '1955', 'English')
    book.authors.append(author)
    db.session.add(book)
    db.session.commit()

    review = Review('Awesome!', 'blabla', 9, 'Swedish', reviewer, book)
    db.session.add(review)
    db.session.commit()


    print Reviewer.query.all()
    print Author.query.all()
    print Book.query.all()
    print Review.query.all()

    return ''




def init_db():
    print "Initializing database"
    db.drop_all()
    db.create_all()


