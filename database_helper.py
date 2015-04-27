import models
import datetime

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

    reviews = list_to_dict(models.Review.query.filter_by(reviewerId=id).all())
    data_dict['reviews'] = get_reviews_data(reviews)

    noOfReviews = get_review_count(reviews)
    data_dict['noOfReviews'] = noOfReviews
    data_dict['grade'] = get_grade(noOfReviews)
    data_dict['upvotes'] = get_upvotes_count(reviews)

    return data_dict

def get_review_count(reviews):
    return len(reviews)

def get_grade(count):
    if (count <= 10):
        return "Beginning reader"
    elif (count <= 20):
        return "Intermediate reader"
    elif (count <= 40):
        return "Avid reader"
    else:
        return "Senior bookworm"

def get_upvotes_count(reviews):
    count = 0
    for review in reviews:
        count += review['upvotes']
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
        add_review_data(review)
    return reviews

def add_review_data(review):
    reviewer = row_to_dict(models.User.query.filter_by(id=review['reviewerId']).first())
    review['reviewer'] = reviewer['userName']
    review['reviewerId'] = reviewer['id']
    review['upvotes'] = models.User.query.filter(models.User.upvoted_review.any(id=review['id'])).count()
    book = row_to_dict(models.Book.query.filter_by(id=review['bookId']).first())
    review['bookTitle'] = book['title']
    review['year'] = book['year']

def get_review_data(id):
    review = row_to_dict(models.Review.query.filter_by(id=id).first())
    add_review_data(review)
    return review


def get_author_data(id):
    data = row_to_dict(models.Author.query.filter_by(id=id).first())
    data['books'] = list_to_dict(models.Book.query.filter(models.Book.author.any(id=id)).all())
    return data


def submit_review(data, user_id):
    user = models.User.query.filter_by(id=user_id).first()
    book = models.Book.query.filter_by(id=data['bookId']).first()
    review = models.Review(data['revTitle'], data['content'], data['score'], data['language'], str(datetime.date.today()), user, book)
    models.db.session.add(review)
    models.db.session.commit()

def upvote(user_id, review_id):
    user = models.User.query.filter_by(id=user_id).first()
    review = models.Review.query.filter_by(id=review_id).first()
    review.upvoters.append(user)
    models.db.session.commit()
    return models.User.query.filter(models.User.upvoted_review.any(id=review_id)).count()

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

