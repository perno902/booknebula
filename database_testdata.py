import models
import datetime
import database_helper

# ----- Init function -----

def init_db():
    models.db.drop_all()
    models.db.create_all()
    print "Database created"

# ----- Test -----

def test():

    models.User.query.delete()
    models.Book.query.delete()
    models.Review.query.delete()
    models.Author.query.delete()


    # Adding users

    user1 = models.User('admin', 'booknebula@gmail.com', 'Sweden', '', str(datetime.date.today()), True)
    models.db.session.add(user1)
    models.db.session.commit()

    user1 = models.User('Pelle Nordfors', 'pelle.nordfors@gmail.com', 'Sweden', 'hi everyone!', str(datetime.date.today()), False)
    models.db.session.add(user1)
    models.db.session.commit()

    user2 = models.User('mrs. Lovett', 'lovett@mail.com', 'England', '''A great fan of fiction. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua. ''',
                        str(datetime.date.today()), False)

    models.db.session.add(user2)
    models.db.session.commit()

    user3 = models.User('Elphaba Thropp', 'elphie@student.cragehall.com', 'Oz', 'I like books. Especially The Grimmerie!', str(datetime.date.today()), False)
    models.db.session.add(user3)
    models.db.session.commit()

    user4 = models.User('George Banks', 'geogrie@britishbanks.com', 'England', 'Hi! Mary Poppins in my favorite book!', str(datetime.date.today()), False)
    models.db.session.add(user4)
    models.db.session.commit()

    user5 = models.User('Magda Keller', 'maggan@gmail.com', 'Hungary', 'Umm... I rarely read at all.', str(datetime.date.today()), False)
    models.db.session.add(user5)
    models.db.session.commit()

    # Adding Lolita by Nabokov

    author = models.Author('Vladimir Nabokov', 'Russia', 1899)
    book = models.Book('Lolita', 1955, 'A man marries his landlady so he can take advantage of her daughter.', 'English')
    book.written_by.append(author)
    models.db.session.add(author)
    models.db.session.commit()

    review = models.Review('Awesome!', 'blabla', 9, 'Swedish', str(datetime.date.today()), user1, book)
    models.db.session.add(review)
    review = models.Review('This is filth!', 'blablabla', 2, 'English', str(datetime.date.today()), user2, book)
    models.db.session.add(review)
    models.db.session.commit()
    database_helper.update_avg_score(book.id)

    # Adding It by King

    author = models.Author('Stephen King', 'USA', 1947)
    book = models.Book('It', 1986,
                       'In 1960, seven outcast kids known as "The Loser Club" fight an evil demon.',
                       'English')
    book.written_by.append(author)
    models.db.session.add(author)
    models.db.session.commit()
    database_helper.update_avg_score(book.id)

    # Adding The Shining by King

    book = models.Book('The Shining', 1977,
                       'A recovering alcoholic and his family move into a haunted hotel as caretakers.',
                       'English')
    book.written_by.append(author)
    models.db.session.add(author)
    models.db.session.commit()
    database_helper.update_avg_score(book.id)
