


@app.route("/classes/", methods=["GET", "POST"])
@app.route("/classes/<periods>", methods=["GET", "POST"])
def classes(pds=None):
    teachers = get_teachers()
    teacher = ""
    periods = []
    for teach in teachers:
    	if teach[0][1] == session['last_name']:
            periods = teach[1]
            teacher = session['last_name']
            print periods
            break
    return render_template("classes.html", teacher=teacher, periods=periods)
