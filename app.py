from flask import Flask, render_template, redirect, request, session, abort
from flask_login import UserMixin, login_user, logout_user, current_user
import urllib
from uuid import uuid4
import requests
import requests.auth
import json
import base64

user = None

app = Flask(__name__, static_url_path='/static')
app.secret_key = "Vverysecret8238923787"

CLIENT_ID = "205573445883-9dl8ahcka67d4m7e21anb692do487odk.apps.googleusercontent.com"
CLIENT_SECRET = "uaidYPHuy99kGHDwoz_CNd63"
REDIRECT_URI = "http://127.0.0.1:5000/oauth2callback"

class User(UserMixin):
    def __init__(self, userinfo):
        self.id = userinfo['id']
        self.name = userinfo['name']

@app.route("/")
def init():
    url_auth = make_authorization_url()
    print url_auth
    return render_template("index.html", URL_AUTH=url_auth)

def make_authorization_url():
    state = str(uuid4())
    session['state'] = state
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
    if state != session['state']:
        abort(403)

    code = request.args.get('code', '')
    print "Code:" + code

    id_token, access_token = get_tokens(code)

    return json.dumps(id_token)


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

if __name__ == "__main__":
    app.run(debug=True)

