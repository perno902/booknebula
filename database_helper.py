import app
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import declarative_base
import models
import datetime




# ----- Test -----

def test():
    models.User.query.delete()
    models.Book.query.delete()
    models.Review.query.delete()
    models.Author.query.delete()


    user = models.User('n0rp3r_the_critic', 'pelle.nordfors@gmail.com', 'Sweden', 'hi everyone!', str(datetime.date.today()))
    models.db.session.add(user)
    models.db.session.commit()

    author = models.Author('Vladimir Nabokov')

    book = models.Book('Lolita', '1955', 'A man marries his landlady so he can take advantage of her daughter.', 'English')
    book.written_by.append(author)
    models.db.session.add(author)
    models.db.session.commit()

    review = models.Review('Awesome!', 'blabla', 9, 'Swedish', str(datetime.date.today()), user, book)
    models.db.session.add(review)
    models.db.session.commit()


    print list_to_dict(models.User.query.all())
    print list_to_dict(models.Author.query.all())
    print list_to_dict(models.Book.query.all())
    print list_to_dict(models.Review.query.all())

    return ''

# ----- Help functions -----

def get_user(email):
    user = models.User.query.filter_by(email=email).first()
    return user

def get_user_by_id(id):
    user = models.User.query.filter_by(id=id).first()
    return user

def add_user(user):
    models.db.session.add(user)
    models.db.session.commit()

def get_user_data(id):
    profile_data = models.User.query.filter_by(id=id).first()
    data_dict = row_to_dict(profile_data)

    noOfReviews = get_review_count(id)
    data_dict['noOfReviews'] = noOfReviews
    data_dict['grade'] = get_grade(noOfReviews)
    data_dict['upvotes'] = get_upvotes_count(id)

    reviews = list_to_dict(models.Review.query.filter_by(reviewerId=id).all())
    data_dict['reviews'] = get_reviews_data(reviews)

    return data_dict

def get_review_count(id):
    count = models.Review.query.filter_by(reviewerId=id).count()
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
    count = models.Review.query.filter(models.Review.upvoter.any(id=id)).count()
    return count

def get_search_results(query):
    books = models.Book.query.filter(models.Book.title.contains(query))
    authors = models.Author.query.filter(models.Author.name.contains(query))
    users = models.User.query.filter(models.User.userName.contains(query))

    data = {}
    data['query'] = query
    data['books'] = list_to_dict(books)
    data['authors'] = list_to_dict(authors)
    data['reviewers'] = list_to_dict(users)

    return data

def get_title_data(id):
    data = row_to_dict(models.Book.query.filter_by(id=id).first())
    data['authors'] = list_to_dict(models.Author.query.filter(models.Author.books.any(id=id)).all())
    reviews = list_to_dict(models.Review.query.filter_by(bookId=id).all())
    data['reviews'] = get_reviews_data(reviews)

    return data

def get_reviews_data(reviews):
    for review in reviews:
        id = review['reviewerId']
        reviewer = row_to_dict(models.User.query.filter_by(id=id).first())
        review['reviewer'] = reviewer['userName']
        review['reviewerId'] = reviewer['id']
        review['upvotes'] = models.User.query.filter(models.User.upvoted_review.any(id=id)).count()
        book = row_to_dict(models.Book.query.filter_by(id=review['bookId']).first())
        review['bookTitle'] = book['title']
        review['year'] = book['year']
    return reviews

def get_author_data(id):
    data = row_to_dict(models.Author.query.filter_by(id=id).first())
    books = models.Book.query.filter_by(id=models.Author.books)
    data['books'] = list_to_dict(books)
    return data

def list_to_dict(list):
    res = []
    for e in list:
        res.append(row_to_dict(e))
    return res

def row_to_dict(obj):
    if not (obj is None):
        d = dict(obj.__dict__)
        try:
            d.pop('_sa_instance_state')
        except:
            pass
        return d

# ----- Init function -----

def init_db():
    print "Initializing database"
    models.db.drop_all()
    models.db.create_all()


