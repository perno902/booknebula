from flask import Flask, render_template, redirect, request, abort
from flask_login import login_user, logout_user, current_user, LoginManager, login_required
import urllib
from uuid import uuid4
import requests
import requests.auth
import json
import base64
import os

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = "Vverysecret8238923787"

# Local database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///DATABASE.db'

# Openshift:
#app.config['PROPAGATE_EXCEPTIONS'] = True
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.environ["OPENSHIFT_DATA_DIR"], 'database.db')
#app.config['SQLALCHEMY_ECHO'] = True

login_manager = LoginManager()
login_manager.init_app(app)

import database_helper
import database_testdata

CLIENT_ID = "205573445883-9dl8ahcka67d4m7e21anb692do487odk.apps.googleusercontent.com"
CLIENT_SECRET = "uaidYPHuy99kGHDwoz_CNd63"

# Openshift:
#REDIRECT_URI = "http://booknebula-perno902.openshift.ida.liu.se/oauth2callback"
# Local:
REDIRECT_URI = "http://127.0.0.1:5000/oauth2callback"

# Code to avoid caching
@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@login_manager.user_loader
def load_user(userid):
    return database_helper.get_user_by_id(userid)

@app.route("/")
def init():
    doc = request.args.get('doc')
    signed_in = current_user.is_authenticated()
    if signed_in:
        admin = database_helper.is_admin(current_user.id)
    else:
        admin = False

    if doc is None:
        url_auth = make_authorization_url()
        return render_template("index.html", URL_AUTH=url_auth, SIGNED_IN=signed_in, ADMIN=admin)

    if doc == "home":
        admin = database_helper.get_user('booknebula@gmail.com')
        if admin is not None:
            admin_id = admin.id
        else:
            admin_id = "0"

        return render_template("home.html", ADMIN_ID=admin_id)

    id_arg = request.args.get('id')
    try:
        id_arg = int(id_arg)
    except:
        pass

    if doc == "profile":
        if signed_in:
            own = ((id_arg == 'signedIn') or (id_arg == current_user.id))
        else:
            own = False
        return render_template("profile.html", SIGNED_IN=signed_in, OWN_PROFILE=own)

    elif doc == "review":
        if signed_in:
            own = database_helper.is_own_review(current_user.id, id_arg)
        else:
            own = False
        return render_template("review.html", SIGNED_IN=signed_in, OWN_REVIEW=own, ADMIN=admin)

    elif doc == "title":
        return render_template("title.html", SIGNED_IN=signed_in, ADMIN=admin)
    elif doc == "author":
        return render_template("author.html", ADMIN=admin)
    else:
        abort(404)


def make_authorization_url():
    state = str(uuid4())
    database_helper.add_valid_state(state)

    params = {"client_id": CLIENT_ID,
              "response_type": "code",
              "state": state,
              "redirect_uri": REDIRECT_URI,
              "scope": "openid email"}
    url = "https://accounts.google.com/o/oauth2/auth?" + urllib.urlencode(params)
    return url


@app.route("/oauth2callback")
def login():
    error = request.args.get('error, ''')
    if error:
        return "Error:" + error

    state = request.args.get('state', '')
    if not database_helper.is_valid_state(state):
        abort(401)
    database_helper.delete_state(state)
    code = request.args.get('code', '')
    id_token, access_token = get_tokens(code)

    email = id_token['email']
    user = database_helper.get_user(email)

    if user is None:
        database_helper.add_user(email)
        user = database_helper.get_user(email)
        login_user(user)
        return redirect("/#/profile/signedIn")
    else:
        login_user(user)
        return redirect("/")


def get_tokens(code):
    client_auth = requests.auth.HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET)
    post_data = {'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code'}
    response = requests.post('https://www.googleapis.com/oauth2/v3/token', auth=client_auth, data=post_data)
    token_json = response.json()
    ascii_str = token_json['id_token'].split('.')[1].encode('ascii')
    padded = ascii_str + '=' * (4 - len(ascii_str) % 4)
    return json.loads(base64.urlsafe_b64decode(padded)), token_json['access_token']


@app.route('/logout')
def logout():
    if request.method == "GET":
        if current_user.is_authenticated():
            logout_user()
        return redirect("/")


@app.route('/userData', methods=["GET"])
def get_user_data():
    if request.method == "GET":
        id = request.args.get('id')

        if id == "signedIn":
            if current_user.is_authenticated():
                id = current_user.id
            else:
                abort(404)
        data = database_helper.get_user_data(id)
        if data is not None:
            return json.dumps({'data': data})
        else:
            abort(404)



@app.route('/userData', methods=["POST"])
@login_required
def submit_user_data():
    if request.method == "POST":
        data = json.loads(request.data)

        if is_valid_data(data, ['name', 'country', 'email', 'presentation']):
            name = data['name']
            country = data['country']
            email = data['email']
            presentation = data['presentation']
            id = current_user.id

            database_helper.submit_user_data(id, name, country, email, presentation)
            return ''
        else:
            abort(400)


@app.route('/search', methods=["GET"])
def get_search_results():
    if request.method == "GET":
        query = request.args.get('query')
        if query is None:
            abort(400)
        data = database_helper.get_search_results(query)
        return json.dumps({'data': data})


@app.route('/title', methods=["GET"])
def get_title_data():
    if request.method == "GET":
        id = request.args.get('id')
        data = database_helper.get_title_data(id)
        if data is None:
            abort(404)

        has_reviewed = True
        user_id = None
        if current_user.is_authenticated():
            user_id = current_user.id
            has_reviewed = database_helper.has_reviewed(user_id, id)
        data['hasReviewed'] = has_reviewed
        data['user'] = user_id
        return json.dumps({'data': data})


@app.route('/title', methods=["POST"])
@login_required
def submit_title_data():
    if request.method == "POST":
        if database_helper.is_admin(current_user.id):
            data = json.loads(request.data)

            if is_valid_data(data, ['bookId', 'title', 'year', 'plot', 'language', 'authors']):
                book_id = data['bookId']
                title = data['title']
                year = data['year']
                plot = data['plot']
                language = data['language']
                authors = data['authors']

                if book_id == 'new':
                    book_id = database_helper.add_book(title, year, plot, language, authors)
                else:
                    database_helper.update_book(book_id, title, year, plot, language, authors)
                return json.dumps({'bookId': book_id})
            else:
                abort(400)
        else:
            abort(401)


@app.route('/author', methods=["GET"])
def get_author_data():
    if request.method == "GET":
        id = request.args.get('id')
        data = database_helper.get_author_data(id)
        if data is None:
            abort(404)
        else:
            return json.dumps({'data': data})


@app.route('/author', methods=["POST"])
@login_required
def submit_author_data():
    if request.method == "POST":
        if database_helper.is_admin(current_user.id):
            data = json.loads(request.data)

            if is_valid_data(data, ['authorId', 'name', 'country', 'birthYear']):
                author_id = data['authorId']
                name = data['name']
                country = data['country']
                birth_year = data['birthYear']
                if author_id == 'new':
                    author_id = database_helper.add_author(name, country, birth_year)
                else:
                    database_helper.update_author(author_id, name, country, birth_year)
                return json.dumps({'authorId': author_id})
            else:
                abort(400)
        else:
            abort(401)


@app.route('/authorList', methods=["GET"])
def get_author_list():
    if request.method == "GET":
        data = database_helper.get_author_list()
        return json.dumps({'data': data})


@app.route('/review', methods=["GET"])
def get_review():
    if request.method == "GET":
        edit = (request.args.get('edit') == 'edit')
        review_id = request.args.get('id')

        signed_in = current_user.is_authenticated()
        if signed_in and edit:
            if not (database_helper.is_own_review(current_user.id, review_id) or database_helper.is_admin(current_user.id)):
                abort(404)

        data = database_helper.get_review_data(review_id)
        if data is None:
            abort(404)

        data['signedIn'] = signed_in

        if signed_in:
            data['hasUpvoted'] = database_helper.has_upvoted(current_user.id, review_id)
            data['own'] = database_helper.is_own_review(current_user.id, review_id)
        return json.dumps({'data': data})


@app.route('/review', methods=["POST"])
@login_required
def submit_review():
    if request.method == "POST":
        data = json.loads(request.data)

        if is_valid_data(data, ['reviewId', 'bookId', 'revTitle', 'content', 'score', 'language']):
            review_id = data['reviewId']
            book_id = data['bookId']
            review_title = data['revTitle']
            content = data['content']
            score = data['score']
            language = data['language']

            user_id = current_user.id

            # If admin
            if database_helper.is_admin(user_id):
                if database_helper.is_own_review(user_id, review_id):
                    if database_helper.has_reviewed(user_id, book_id):
                        database_helper.update_review(user_id, review_id, book_id, review_title, content, score, language)
                    else:
                        database_helper.submit_review(book_id, review_title, content, score, language, user_id)
                else:
                    user_id = database_helper.get_review_writer(review_id)
                    database_helper.update_review(user_id, review_id, book_id, review_title, content, score, language)

            # If not admin
            else:
                if not database_helper.has_reviewed(user_id, book_id):
                    database_helper.submit_review(book_id, review_title, content, score, language, user_id)
                else:
                    if database_helper.is_own_review(user_id, review_id):
                        database_helper.update_review(user_id, review_id, book_id, review_title, content, score, language)
                    else:
                        abort(401)
            return json.dumps({'bookId': book_id})
        else:
            abort(400)


@app.route('/deleteReview', methods=["POST"])
@login_required
def delete_review():
    if request.method == "POST":
        data = json.loads(request.data)

        if is_valid_data(data, ['reviewId']):
            review_id = data['reviewId']
            user_id = current_user.id
            if database_helper.is_own_review(user_id, review_id) | database_helper.is_admin(user_id):
                book_id = database_helper.delete_review(review_id)
                return json.dumps({'bookId': book_id})
            else:
                abort(401)
        else:
            abort(400)



@app.route('/upvote', methods=["POST"])
@login_required
def upvote():
    if request.method == "POST":
        user_id = current_user.id
        data = json.loads(request.data)
        if is_valid_data(data, ['reviewId']):
            review_id = data['reviewId']
            data = database_helper.upvote(user_id, review_id)
            return json.dumps({'data': data})
        else:
            abort(400)


@app.route('/unUpvote', methods=["POST"])
@login_required
def un_upvote():
    if request.method == "POST":
        user_id = current_user.id
        data = json.loads(request.data)
        if is_valid_data(data, ['reviewId']):
            review_id = data['reviewId']
            data = database_helper.un_upvote(user_id, review_id)
            return json.dumps({'data': data})
        else:
            abort(400)


@app.route('/toplist', methods=["GET"])
def get_toplist():
    if request.method == "GET":
        data = database_helper.get_toplist()
        return json.dumps({'data': data})


def is_valid_data(data, key_list):
    for key in key_list:
        if not is_valid_value(data[key], key):
            return False
    return True


def is_valid_value(value, key):
    if value == None:
        return False
    elif key == 'revTitle' and not (type(value) is unicode and len(value) <= 50):
        return False
    elif key == 'content' and not (type(value) is unicode and len(value) <= 3000):
        return False
    elif key == 'bookId' and not (type(value) is unicode and 2 < len(value) <= 10):
        return False
    elif key == 'reviewId' and not (type(value) is unicode and 2 < len(value) <= 10):
        return False
    elif key == 'score' and not (type(value) is int and 0 < value <= 10):
        return False
    elif key == 'language' and not (type(value) is unicode and 0 < len(value) <= 50):
        return False
    elif key == 'name' and not (type(value) is unicode and 0 < len(value) <= 50):
        return False
    elif key == 'country' and not (type(value) is unicode and 0 < len(value) <= 50):
        return False
    elif key == 'email' and not (type(value) is unicode and 0 < len(value) <= 50):
        return False
    elif key == 'presentation' and not (type(value) is unicode and len(value) <= 1000):
        return False
    elif key == 'plot' and not (type(value) is unicode and len(value) <= 500):
        return False
    elif key == 'title' and not (type(value) is unicode and 0 < len(value) <= 80):
        return False
    elif key == 'year' and not (type(value) is int):
        return False
    elif key == 'authors':
        if type(value) is list:
            for author_id in value:
                if not (type(author_id) is unicode and 2 < len(author_id) <= 10):
                    return False
        else:
            return False
    elif key == 'authorId' and not (type(value) is unicode and 2 < len(value) <= 10):
        return False
    elif key == 'birthYear' and not (type(value) is int):
        return False
    return True


@app.errorhandler(400)
@app.errorhandler(401)
@app.errorhandler(404)
def page_not_found(error):
    return redirect("/#/error")


# For testing only
#@app.route("/dbinit")
#def dbinit():
#    database_testdata.init_db()
#    database_testdata.test()
#    return ''


if __name__ == "__main__":
    app.run(debug=True)

