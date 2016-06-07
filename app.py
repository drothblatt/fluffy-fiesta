from flask import Flask, request, render_template, flash
import utils
app = Flask(__name__)

@app.route("/")
@app.route("/login")
def login():
	return render_template("login.html")

@app.route("/classes", methods=['GET', 'POST'])
def classes():
	return render_template("classes.html")

if __name__ == "__main__":
	app.debug = True
	app.run("0.0.0.0", 8000)