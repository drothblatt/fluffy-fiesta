from flask import Flask, request, render_template, flash
import utils
app = Flask(__name__)

@app.route("/")
@app.route("/home")
@app.route("/home/")
def home():
    if 'username' in session:
        return render_template("profile.html") # teacher profile page with info & list of classes to select
    return render_template("login.html") # login page, user must be logged in first
            
@app.route("/login")
@app.route("/login/")
def login():
    if 'username' in session:
        msg = "You are already logged in as" + username + "." + "\n" + "Log Out? <a href='/logout'> </a> " 
        return render_template("profile.html", msg=msg)
    return render_template("login.html")




def login():
	return render_template("login.html")

@app.route("/classes", methods=['GET', 'POST'])
def classes():
	return render_template("classes.html")

if __name__ == "__main__":
	app.debug = True
	app.run("0.0.0.0", 8000)
