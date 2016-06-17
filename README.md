# fluffy-fiesta
SoftDev2 Final Project

### Developers
* Ishaq Bhuiyan
* Max Fishelson
* Felipe Mansilla
* David Rothblatt

### DEPLOYMENT
####Python Dependencies:
 * oauth2client
    * <code>pip install oauth2client</code>
 * flask
    * <code>pip install flask</code>
 * httplib2
    * <code>pip install httplib2</code>
 * apiclient
    * <code>pip install --upgrade google-api-python-client</code>
 * urllib2
    * <code>pip install urllib2</code>
 * pymongo
    * <code>pip install pymongo</code>

####Google OAuth
OAuth 2.0 credentials need to be acquired from the Google Developers Console. Then put the client_secrets.json file which can be acquired from Google Developers Console needs to be put in the main directory. Afterwards, change the "CLIENT_SECRET" string in app.py to the filename of the client_secrets file.
 1. In the Google Developers console, create a new project called seating chart.
 2. Set the application name and what to display to "Seating Chart"
 3. Then go to the Oauth page and create credentials.
 4. Set the javascript origins to whatever is the address of the host server (i.e. http://seatingchart.stuycs.org)
 5. Set the redirect uri to <server address>/oauth2callback (i.e. http://seatingchart.stuycs.org/oauth2callback)
 6. After creating the credentials, download the client_secrets json file and put it in the directory with app.py
 7. In app.py, change the variable CLIENT_SECRET to the name of the client secrets file.

####MongoDB and Databasing
An instance of the MongoDB server needs to be running. Connection to the server is found in utils.py. Also, place the student roster csv in the "static/" directory. Edit the CSV headings and filename in "utils.py" to match the student roster.

####Setup
  * <b>To be done for a first time setup and every time the student roster/authorized teachers list is changed</b>
  * In utils.py, set the ROSTER_FILE to the student roster filename(should be a csv), AUTHORIZED_TEACHERS to the file with the list of all the people allowed to use the application,
    and then set the STUDENT_LASTNAME, STUDENT_FIRSTNAME, STUDENT_ID, STUDENT_FIRSTNAME, TEACHER_NAME, STUDENT_CLASS_PERIOD, and TEACHER_FIRSTNAME to their respective headers in the
    csv file.
  * Ensure that an instance of MongoD is running
  * Then, opening up a python shell do:
     * <code>import utils</code>
     * <code> utils.setup_database()</code>
  * Run the flask application(contained within app.py).
     * <code>python app.py</code>

####File Structures
  * Student roster
    * The student roster file should be a csv, and have headings for student firstname, lastname, student id, teacher name(last name), class period, and optionally, teacher firstname.
  * authorized teachers
    * The authorized teachers file is a text file with each teacher on one line, formatted firstname lastname
