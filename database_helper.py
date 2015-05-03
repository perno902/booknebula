import models
import datetime
from sqlalchemy import func

# ----- Help functions -----

def get_user(email):
    user = models.User.query.filter_by(email=email).first()
    return user


def get_user_by_id(id):
    user = models.User.query.filter_by(id=id).first()
    return user


def add_user(email):
    user = models.User('', email, '', '', '')
    models.db.session.add(user)
    models.db.session.commit()


def get_user_data(id):
    data = row_to_dict(models.User.query.filter_by(id=id).first())

    reviews = list_to_dict(models.Review.query.filter_by(reviewerId=id).all())
    data['reviews'] = get_reviews_data(reviews)

    noOfReviews = get_review_count(reviews)
    data['noOfReviews'] = noOfReviews
    data['grade'] = get_grade(noOfReviews)
    data['upvotes'] = get_upvotes_count(reviews)

    return data


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


def update_avg_score(id):
    reviews = list_to_dict(models.Review.query.filter_by(bookId=id))
    count = 0
    sum = 0
    for review in reviews:
        sum += review['score']
        count += 1
    if count > 0:
        avg = float(sum)/float(count)
    else:
        avg = 0
    book = models.Book.query.filter_by(id=id).first()
    book.avgScore = avg
    models.db.session.add(book)
    models.db.session.commit()


def get_reviews_data(reviews):
    for review in reviews:
        additional_review_data(review)
    return reviews


def additional_review_data(review):
    reviewer = models.User.query.filter_by(id=review['reviewerId']).first()
    review['reviewer'] = reviewer.userName
    review['reviewerId'] = reviewer.id

    review['upvotes'] = models.User.query.filter(models.User.upvoted_review.any(id=review['id'])).count()

    book = models.Book.query.filter_by(id=review['bookId']).first()
    review['bookTitle'] = book.title
    review['year'] = book.year


def get_review_data(id):
    review = row_to_dict(models.Review.query.filter_by(id=id).first())
    additional_review_data(review)
    return review


def get_author_data(id):
    data = row_to_dict(models.Author.query.filter_by(id=id).first())
    data['books'] = list_to_dict(models.Book.query.filter(models.Book.author.any(id=id)).all())
    return data


def submit_review(book_id, review_title, content, score, language, user_id):
    user = models.User.query.filter_by(id=user_id).first()
    book = models.Book.query.filter_by(id=book_id).first()
    review = models.Review(review_title, content, score, language, str(datetime.date.today()), user, book)
    models.db.session.add(review)
    models.db.session.commit()
    update_avg_score(book.id)


def upvote(user_id, review_id):
    user = models.User.query.filter_by(id=user_id).first()
    review = models.Review.query.filter_by(id=review_id).first()
    review.upvoters.append(user)
    models.db.session.commit()
    return models.User.query.filter(models.User.upvoted_review.any(id=review_id)).count()


def has_upvoted(user_id, review_id):
    count = models.User.query.filter_by(id=user_id).filter(models.User.upvoted_review.any(id=review_id)).count()
    return count > 0


def is_own_review(user_id, review_id):
    count = models.Review.query.filter_by(id=review_id, reviewerId=user_id).count()
    return count > 0


def has_reviewed(user_id, book_id):
    count = models.Review.query.filter_by(bookId=book_id, reviewerId=user_id).count()
    return count > 0


def submit_user_data(id, name, country, email, presentation):
    user = models.User.query.filter_by(id=id).first()
    user.userName = name
    user.country = country
    user.email = email
    user.presentation = presentation
    models.db.session.commit()


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

