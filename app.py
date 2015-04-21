from flask import Flask, render_template, redirect, request, session, abort
from flask_login import UserMixin, login_user, logout_user, current_user, LoginManager, login_required
import urllib
from uuid import uuid4
import requests
import requests.auth
import json
import base64

user = None

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = "Vverysecret8238923787"

login_manager = LoginManager()
login_manager.init_app(app)

CLIENT_ID = "205573445883-9dl8ahcka67d4m7e21anb692do487odk.apps.googleusercontent.com"
CLIENT_SECRET = "uaidYPHuy99kGHDwoz_CNd63"
REDIRECT_URI = "http://127.0.0.1:5000/oauth2callback"

valid_states = set()

# Storing user objects
users = {}

@login_manager.user_loader
def load_user(userid):
    return users.get(userid)


class User(UserMixin):
    def __init__(self, id_token):
        self.id = id_token['email']
        self.name = "n0rp3r_the_critic"

@app.route("/")
def init():
    url_auth = make_authorization_url()
    return render_template("index.html", URL_AUTH=url_auth)

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

    user = User(id_token)
    users[id_token['email']] = user
    login_user(user)

    print user.id + " is now signed in"

    return redirect('/')


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

    print current_user.id + " has signed out"

    logout_user()

    return redirect('/')

def add_valid_state(state):
    valid_states.add(state)

def is_valid_state(state):
    if state in valid_states:
        return True
    return False

def delete_state(state):
    valid_states.remove(state)


if __name__ == "__main__":
    app.run(debug=True)

