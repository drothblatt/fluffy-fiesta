# What is contained within session: (note letter casing)
# session['first_name'] - FIRST NAME
# session['last_name'] - LAST NAME
# session['email'] - email@whatever.domain

from oauth2client import client
from flask import session, redirect, Flask, request, flash, render_template, url_for, Markup
import uuid
import httplib2
from apiclient.discovery import build
from urllib2 import Request, urlopen, URLError
import json
import utils

app = Flask(__name__)
app.secret_key = str(uuid.uuid4())
# Set to false when deployed for reals
app.debug = True

# PATH of client_secret file. Change accordingly
CLIENT_SECRET = 'client_secret_608463589291-1f9sf60q3ae6vd6vrhu8u9ls7p40qnqj.apps.googleusercontent.com.json'

# Checks if a user is still logged in and session(access token) hasn't expired.
# Run this at the beginning of each page method and log user out if it returns False
# Look at index() as an example
def valid_user():
    if 'credentials' not in session:
        return False
    credentials = client.OAuth2Credentials.from_json(session['credentials'])
    if credentials.access_token_expired:
        return False
    return True

# Default page, which is also classes page. Lists all the classes of the teacher
@app.route("/", methods=["GET","POST"])
def index():
    if not valid_user():
        session.clear()
        return redirect(url_for('oauth2callback'))
    # Change this to whatever it is for classes, just here as an example
    #return '' + session['first_name'] + ' ' + session['last_name'] + ' ' + session['email']
    return redirect(url_for("classes"))

@app.route("/makeTemplate/<string:period>", methods=["GET","POST"])
@app.route("/makeTemplate", methods=["GET", "POST"])
def makeTemplate(period='0'):
    if not valid_user():
        session.clear()
        return redirect(url_for('oauth2callback'))
    if request.method=="POST":
        if 'lines' in request.form and 'desks' in request.form:
            fn = session['first_name'].upper()
            ln = session['last_name'].upper()
            n = [fn, ln]
            lines = request.form['lines']
            desks = request.form['desks']
            utils.add_teacher_period_data(n, str(period), 'LINES', lines)
            utils.add_teacher_period_data(n, str(period), 'DESKS', desks)
            print lines + "\n\n" + desks + "\n" + fn + " , " + ln
            return redirect("/popTemplate/%s" % period)
        return redirect(url_for("classes"))
    return render_template("makeTemplate.html", PERIOD=period)


@app.route("/popTemplate/<string:period>", methods=["GET","POST"])
def popTemplate(period='0'):
  print "period: " + period
  teacher_last =  session['last_name'].upper()
  teacher_first = session['first_name'].upper()
  students = utils.get_teacher_classes([teacher_first, teacher_last])[period]
  lines = utils.get_period_data(teacher_last, period, 'LINES')
  desks = utils.get_period_data(teacher_last, period, 'DESKS')
  return render_template("popTemplate.html", PERIOD=period, lines=lines,desks=desks, students=students)

@app.route("/classes/", methods=["GET", "POST"])
@app.route("/classes/<periods>", methods=["GET", "POST"])
def classes(pds=None):
    teachers = utils.get_teachers()
    teacher = ""
    periods = []
    for teach in teachers:
    	if teach[0][1] == session['last_name']:
            periods = teach[1]
            teacher = session['last_name']
            print periods
            break
    return render_template("classes.html", teacher=teacher, periods=periods)


# Call back for Google Oauth login. Authenticates and then stores user in session.
@app.route("/oauth2callback", methods=["GET","POST"])
def oauth2callback():
    flow = client.flow_from_clientsecrets(
        CLIENT_SECRET,
        scope = 'profile email',
        redirect_uri=url_for('oauth2callback', _external = True))
    auth_uri = flow.step1_get_authorize_url()
    if 'code' not in request.args:
        return redirect(auth_uri)
    auth_code = request.args.get('code')
    credentials = flow.step2_exchange(auth_code)
    session['credentials'] = credentials.to_json()
    credentials = client.OAuth2Credentials.from_json(session['credentials'])
    if credentials.access_token_expired:
        return redirect(url_for('oauth2callback'))
    access_token = client.OAuth2Credentials.get_access_token(credentials)[0]
    session['access_token'] = access_token
    headers = {'Authorization': 'OAuth '+access_token}
    req = Request('https://www.googleapis.com/oauth2/v1/userinfo',
                  None, headers)
    try:
        res = urlopen(req)
    except URLError, e:
        if e.code == 401:
            # Unauthorized - bad token
            session.pop('credentials', None)
            return redirect(url_for('oauth2callback'))
    user_info = json.loads(res.read())
    session['first_name'] = user_info['given_name'].upper()
    session['last_name'] = user_info['family_name'].upper()
    session['email'] = user_info['email']
    if 'hd' not in user_info or user_info['hd'] != 'stuy.edu':
        credentials.revoke(httplib2.Http())
        session.clear()
        return "Only stuy.edu emails allowed"
    if not utils.teacher_exists([session['first_name'], session['last_name']]):
        credentials.revoke(httplib2.Http())
        session.clear()
        return "You are not a teacher!"
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run()
