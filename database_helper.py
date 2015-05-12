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
    user = models.User(email, email, '', '', str(datetime.date.today()), False)
    models.db.session.add(user)
    models.db.session.commit()

def is_admin(id):
    user = models.User.query.filter_by(id=id).first()
    return user.isAdmin

def get_user_data(id):
    data = row_to_dict(models.User.query.filter_by(id=id).first())
    reviews = list_to_dict(models.Review.query.filter_by(reviewerId=id).all())
    data['reviews'] = get_reviews_data(reviews)

    noOfReviews = get_review_count(reviews)
    data['noOfReviews'] = noOfReviews
    data['grade'] = get_grade(noOfReviews)
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
    print reviews
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


def add_author(name, country, birth_year):
    author = models.Author(name, country, birth_year)
    models.db.session.add(author)
    models.db.session.commit()
    return author.id


def update_author(author_id, name, country, birth_year):
    author = models.Author.query.filter_by(id=author_id).first()
    author.name = name
    author.country = country
    author.birthYear = birth_year
    models.db.session.commit()



def submit_review(book_id, review_title, content, score, language, user_id):
    user = models.User.query.filter_by(id=user_id).first()
    book = models.Book.query.filter_by(id=book_id).first()
    review = models.Review(review_title, content, score, language, str(datetime.date.today()), user, book)
    models.db.session.add(review)
    models.db.session.commit()
    update_avg_score(book.id)

def update_review(review_id, book_id, review_title, content, score, language):
    review = models.Review.query.filter_by(id=review_id).first()
    review.revTitle = review_title
    review.content = content
    review.score = score
    review.language = language
    review.date = str(datetime.date.today())

    models.db.session.add(review)
    models.db.session.commit()

    book = models.Book.query.filter_by(id=book_id).first()
    update_avg_score(book.id)


def delete_review(review_id):
    review = models.Review.query.filter_by(id=review_id).first()
    book = models.Book.query.filter_by(id=review.bookId).first()
    book_id = book.id
    models.db.session.delete(review)
    models.db.session.commit()
    update_avg_score(book.id)
    return book_id


def upvote(user_id, review_id):
    user = models.User.query.filter_by(id=user_id).first()
    review = models.Review.query.filter_by(id=review_id).first()
    review.upvoters.append(user)
    models.db.session.commit()

    update_upvotes(review_id)
    data = {}
    data['upvotes'] = models.User.query.filter(models.User.upvoted_review.any(id=review_id)).count()
    data['hasUpvoted'] = True
    return data


def un_upvote(user_id, review_id):
    user = models.User.query.filter_by(id=user_id).first()
    review = models.Review.query.filter_by(id=review_id).first()
    review.upvoters.remove(user)
    models.db.session.commit()

    update_upvotes(review_id)
    data = {}
    data['upvotes'] = models.User.query.filter(models.User.upvoted_review.any(id=review_id)).count()
    data['hasUpvoted'] = False
    return data


def update_upvotes(review_id):
    review = models.Review.query.filter_by(id=review_id).first()
    user = models.User.query.filter_by(id=review.reviewerId).first()
    reviews = models.Review.query.filter_by(reviewerId=user.id).all()
    count = 0
    for review in reviews:
        count += models.User.query.filter(models.User.upvoted_review.any(id=review.id)).count()
    user.noOfUpvotes = count
    models.db.session.add(user)
    models.db.session.commit()



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


def get_toplist():
    reviewers = list_to_dict(models.User.query.order_by(models.User.noOfUpvotes.desc()).limit(5))
    books = list_to_dict(models.Book.query.order_by(models.Book.avgScore.desc()).limit(5))
    data = {}
    data['reviewers'] = reviewers
    data['books'] = books
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

