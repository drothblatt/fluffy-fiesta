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
 * flask
 * httplib2
 * apiclient
 * urllib2
 * pymongo

####Google OAuth
OAuth 2.0 credentials need to be acquired from the Google Developers Console. Then put the client_secrets.json file which can be acquired from Google Developers Console needs to be put in the main directory. Afterwards, change the "CLIENT_SECRET" string in app.py to the filename of the client_secrets file.

####MongoDB and Databasing
An instance of the MongoDB server needs to be running. Connection to the server is found in utils.py. Also, place the student roster csv in the "static/" directory. Edit the CSV headings and filename in "utils.py" to match the student roster.
