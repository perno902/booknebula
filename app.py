from flask import Flask, render_template, redirect, request, session, abort
from flask_login import UserMixin, login_user, logout_user, current_user, LoginManager, login_required
from flask_sqlalchemy import SQLAlchemy
import urllib
from uuid import uuid4
import requests
import requests.auth
import json
import base64
import database_helper
import database_testdata

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = "Vverysecret8238923787"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///DATABASE.db'


login_manager = LoginManager()
login_manager.init_app(app)

CLIENT_ID = "205573445883-9dl8ahcka67d4m7e21anb692do487odk.apps.googleusercontent.com"
CLIENT_SECRET = "uaidYPHuy99kGHDwoz_CNd63"
REDIRECT_URI = "http://127.0.0.1:5000/oauth2callback"

valid_states = set()

@login_manager.user_loader
def load_user(userid):
    return database_helper.get_user_by_id(userid)

@app.route("/")
def init():
    url_auth = make_authorization_url()
    signed_in = current_user.is_authenticated()
    return render_template("index.html", URL_AUTH=url_auth, SIGNED_IN=signed_in)


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
    print email
    user = database_helper.get_user(email)
    if user is None:
        user = database_helper.User('', email, '', '', '')
        database_helper.add_user(user)
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
    print current_user.email + " has signed out"
    logout_user()
    return redirect("/")

@app.route('/userData', methods=["GET"])
def get_user_data():
    id = request.args.get('id')
    own = False
    if current_user.is_authenticated():
        if str(current_user.id) == id:
            own = True
        elif id == "signedIn":
            own = True
            id = current_user.id
    data = database_helper.get_user_data(id)
    data['own'] = own
    return json.dumps({'data': data})

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
    return json.dumps({'data': data})

@app.route('/author', methods=["GET"])
def get_author_data():
    id = request.args.get('id')
    data = database_helper.get_author_data(id)
    return json.dumps({'data': data})

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
        try:
            user_id = current_user.id
        except:
            abort(403)
        data = json.loads(request.data)
        database_helper.submit_review(data, user_id)
        return ''

@app.route('/upvote', methods=["POST"])
@login_required
def upvote():
    if request.method == "POST":
        try:
            user_id = current_user.id
        except:
            abort(403)
        review_id = json.loads(request.data)['id']
        data = database_helper.upvote(user_id, review_id)
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


