from flask import Flask, render_template, redirect, request, session, abort
from flask_login import UserMixin, login_user, logout_user, current_user, LoginManager, login_required
import urllib
from uuid import uuid4
import requests
import requests.auth
import json
import base64
#import os


app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = "Vverysecret8238923787"
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
REDIRECT_URI = "http://127.0.0.1:5000/oauth2callback"

valid_states = set()

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
    add_valid_state(state)

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
    if not is_valid_state(state):
        abort(403)
    delete_state(state)
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
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route('/userData', methods=["GET"])
def get_user_data():
    id = request.args.get('id')
    if id == "signedIn":
            id = current_user.id
    data = database_helper.get_user_data(id)
    return json.dumps({'data': data})


@app.route('/userData', methods=["POST"])
@login_required
def submit_user_data():
    if request.method == "POST":
        data = json.loads(request.data)
        name = data['userName']
        country = data['country']
        email = data['email']
        presentation = data['presentation']
        id = current_user.id

        database_helper.submit_user_data(id, name, country, email, presentation)
        return ''


@app.route('/search', methods=["GET"])
def get_search_results():
    query = request.args.get('query')
    if query is None:
        abort(400)
    data = database_helper.get_search_results(query)
    return json.dumps({'data': data})


@app.route('/title', methods=["GET"])
def get_title_data():
    id = request.args.get('id')
    data = database_helper.get_title_data(id)
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
    if database_helper.is_admin(current_user.id):
        data = json.loads(request.data)
        book_id = data['bookId']
        title = data['title']
        year = data['year']
        plot = data['plot']
        language = data['language']

        if book_id == 'new':
            book_id = database_helper.add_book(title, year, plot, language)
        else:
            database_helper.update_book(book_id, title, year, plot, language)
        return json.dumps({'bookId': book_id})
    else:
        abort(403)


@app.route('/author', methods=["GET"])
def get_author_data():
    id = request.args.get('id')
    data = database_helper.get_author_data(id)
    return json.dumps({'data': data})


@app.route('/author', methods=["POST"])
@login_required
def submit_author_data():
    if database_helper.is_admin(current_user.id):
        data = json.loads(request.data)
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
        abort(403)



@app.route('/review', methods=["GET"])
def get_review():
    if request.method == "GET":
        review_id = request.args.get('id')
        data = database_helper.get_review_data(review_id)

        signed_in = current_user.is_authenticated()
        data['signedIn'] = signed_in

        if signed_in:
            data['hasUpvoted'] = database_helper.has_upvoted(current_user.id, review_id)
            data['own'] = database_helper.is_own_review(current_user.id, review_id)
        return json.dumps({'data': data})


@app.route('/review', methods=["POST"])
@login_required
def submit_review():
    if request.method == "POST":
        user_id = current_user.id
        data = json.loads(request.data)
        review_id = data['reviewId']
        book_id = data['bookId']
        review_title = data['revTitle']
        content = data['content']
        score = data['score']
        language = data['language']

        if review_id == "new":
            database_helper.submit_review(book_id, review_title, content, score, language, user_id)
        else:
            if database_helper.is_own_review(user_id, review_id) | database_helper.is_admin(user_id):
                database_helper.update_review(review_id, book_id, review_title, content, score, language)
            else:
                abort(403)
        return json.dumps({'bookId': book_id})


@app.route('/deleteReview', methods=["POST"])
@login_required
def delete_review():
    if request.method == "POST":
        data = json.loads(request.data)
        review_id = data['id']
        user_id = current_user.id
        if database_helper.is_own_review(user_id, review_id) | database_helper.is_admin(user_id):
            book_id = database_helper.delete_review(review_id)
            return json.dumps({'bookId': book_id})
        else:
            abort(403)


@app.route('/upvote', methods=["POST"])
@login_required
def upvote():
    if request.method == "POST":
        user_id = current_user.id
        review_id = json.loads(request.data)['id']
        data = database_helper.upvote(user_id, review_id)
        return json.dumps({'data': data})


@app.route('/unUpvote', methods=["POST"])
@login_required
def un_upvote():
    if request.method == "POST":
        user_id = current_user.id
        review_id = json.loads(request.data)['id']
        data = database_helper.un_upvote(user_id, review_id)
        return json.dumps({'data': data})


@app.route('/toplist', methods=["GET"])
def get_toplist():
    data = database_helper.get_toplist()
    return json.dumps({'data': data})


def add_valid_state(state):
    valid_states.add(state)


def is_valid_state(state):
    if state in valid_states:
        return True
    return False


def delete_state(state):
    valid_states.remove(state)

    # ---- Test routes ----

@app.route("/dbinit")
def dbinit():
    database_testdata.init_db()
    database_testdata.test()
    return ''

if __name__ == "__main__":
    app.run(debug=True)


