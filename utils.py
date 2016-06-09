import pymongo
import csv
from pymongo import MongoClient

# Name of the Student Roster CSV file. Change Accordingly
ROSTER_FILE = 'static/roster.csv'

# The headings in the csv file. Also change accordingly
STUDENT_LASTNAME = "LAST_NAME"
STUDENT_FIRSTNAME = "FIRST_NAME"
STUDENT_ID = "OSIS"
TEACHER_NAME = "TEACHER"
STUDENT_CLASS_PERIOD = "PERIOD"

connection = MongoClient()
db = connection['database']

# Is called when a new teacher is added to the database.
#   teacher - Array of ['lastname', 'firstname']
#   periods - Dictionary of {'period#':[Array_of_Students_OSIS]}
def addTeacher(teacher, periods):
    entry = {'name':teacher, 'pds':periods}
    db.teachers.insert(entry)

# Checks if a teacher exists in the database given:
#   teacher - ['lastname', 'firstname']
def teacherExists(teacher):
    people = db.teachers.find({'name':teacher})
    for doc in people:
        return True
    return False

def getStudents():
	reader = csv.DictReader(open(ROSTER_FILE))
	students = {}
	for row in reader:
		OSIS = row['OSIS']
		if OSIS not in students:
			student = {'LAST_NAME':row['LAST_NAME'].upper(), 'FIRST_NAME':row['FIRST_NAME'].upper(), 'TEACHERS':{}}
			students[OSIS] = student
		students[OSIS]['TEACHERS'][row['TEACHER'].upper()] = row['PERIOD'].upper()
	return students

# Adds all the students to the database
def addStudents():
    students = getStudents()
    print "Running"
    for key in students:
        student = students[key]
        student['OSIS'] = key
        print student
        db.students.insert(student)

def findStudentName(first_name,last_name):
    return db.students.find({'FIRST_NAME':first_name.upper(), 'LAST_NAME':last_name.upper()})[0]

def findStudentOSIS(OSIS):
    num = str(OSIS)
    return db.students.find({"OSIS":num})[0]
