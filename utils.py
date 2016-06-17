# TEACHER DATABASE KEYS
# NAME - ['FIRSTNAME', 'LASTNAME']
# CLASSES - Dictionary of all the periods(period numbers are strings)
#   PERIOD - Dictionary of a bunch of data for that period
#       STUDENTS - Array of all students in that period. Each student is ['OSIS', 'FIRSTNAME', 'LASTNAME']
#       Whatever other keys were added through the add_teacher_period_data() function
#
# NOTE: ALL KEYS ARE UPPERCASE STRINGS
# NOTE: ANY OTHER FUNCTIONS NEEDED CAN BE MADE USING:
#           add_teacher_period_data() - Adds or edits data for a certain teacher's period
#           get_period_data() - Gets certain data queried for that teacher's period
#           teacher_exists() - Returns whether a certain teacher exists
#           get_teachers() - Returns all teachers and periods in a list
#       See function header comments for more details and usage
#       Some extra methods that won't probably have any use are:
#           find_student_name() - Finds a student by Name
#           find_student_osis() - Finds a student by OSIS
#       See function header comments for more details and usage

import pymongo
import csv
from pymongo import MongoClient

# Name of the Student Roster CSV file. Change Accordingly
ROSTER_FILE = 'roster.csv'
# Name of the file with authorized teachers
# Should be one teacher per line, with firstname and lastname separated by a space
AUTHORIZED_TEACHERS = 'authorized_teachers'

# The headings in the csv file. Also change accordingly
# If Teacher firstname is not in the csv, put as NONE
STUDENT_LASTNAME = "LAST_NAME"
STUDENT_FIRSTNAME = "FIRST_NAME"
STUDENT_ID = "OSIS"
TEACHER_NAME = "TEACHER"
STUDENT_CLASS_PERIOD = "PERIOD"
TEACHER_FIRSTNAME = "NONE"

connection = MongoClient()
db = connection['database']

# Sets up a fresh new database
def setup_database():
    db.teachers.drop()
    db.students.drop()
    add_students()
    add_teachers()

# returns array of [Teacher Firstname, Teacher Lastname]
def get_teachers_for_database():
    auth_teacher_file = open(AUTHORIZED_TEACHERS, "r")
    auth_teacher = auth_teacher_file.read().splitlines()
    auth_teacher_file.close()
    teachers = []
    for t in auth_teacher:
        teacher = t.upper().split()
        teachers.append(teacher)
    return teachers

# Adds all the teachers and their classes to the database
def add_teachers():
    teachers = get_teachers_for_database()
    for i in teachers:
        teacher = {}
        teacher['NAME'] = i
        classes = get_teacher_classes(i)
        teacher['CLASSES']={}
        for period in classes:
            teacher['CLASSES'][period] = {}
            teacher['CLASSES'][period]['STUDENTS'] = classes[period]
        db.teachers.insert(teacher)

# Updates or adds data for a certain period of a teacher
# key is the key used to access the data
# data is the data to be added or updated
# teacher - ['FIRSTNAME', 'LASTNAME']
# period - '#'
# key - 'KEY'
# data - data
def add_teacher_period_data(teacher, period, key, data):
    teachers = db.teachers.find({'NAME':teacher})
    k = key.upper()
    for i in teachers:
        update = i['CLASSES']
        update[period][k] = data
        #print update
        a = db.teachers.update_one({'NAME':teacher}, {'$set' : {'CLASSES':update}})
        #print a.matched_count

# Returns data for a specific period
# teacher - ['FIRSTNAME', 'LASTNAME']
# period - '#'
# key - key used to access the data
# Returns the data requested
def get_period_data(teacher, period, key):
    teachers = db.teachers.find({'NAME':teacher})
    k = key.upper()
    for i in teachers:
        data = i['CLASSES'][period][k]
        return data

# Returns a list of all teachers
# Each teacher contains a list of ['FIRSTNAME', 'LASTNAME']
# And a list of all their periods, ['2', '3', '4']
# Example:
#   [[['DAVID', 'HOLMES'], ['3', '4', '5']], [['PETER', 'BROOKS'], ['4', '6']]]
def get_teachers():
    teachers = db.teachers.find()
    data = []
    for i in teachers:
        teacher = []
        teacher.append(i['NAME'])
        periods = []
        for x in i['CLASSES']:
            periods.append(x)
        teacher.append(periods)
        data.append(teacher)
    return data

# Checks if a teacher exists in the database given:
#   teacher - ['FIRSTNAME', 'LASTNAME']
def teacher_exists(teacher):
    people = db.teachers.find({'NAME':teacher})
    for doc in people:
        return True
    return False

# Takes parameter of teacher ['FIRSTNAME', 'LASTNAME']
# Return dictionary of periods, with all students in that period
# Each student is ['OSIS', 'FIRSTNAME', 'LASTNAME']
def get_teacher_classes(teacher):
    l_name = teacher[-1]
    students = db.students.find()
    t_periods = {}
    for s in students:
        if l_name in s['TEACHERS']:
            period = s['TEACHERS'][l_name][0]
            student = []
            student.append(s['OSIS'])
            student.append(s['FIRST_NAME'])
            student.append(s['LAST_NAME'])
            if period not in t_periods:
                t_periods[period] = []
            t_periods[period].append(student)
    return t_periods

# Reads all students from csv.
# Returns a dictionary of students
# Intended for use by only function addStudents()
def get_students():
    reader = csv.DictReader(open(ROSTER_FILE))
    students = {}
    for row in reader:
        OSIS = row[STUDENT_ID]
        print OSIS
        if OSIS not in students:
            student = {'LAST_NAME':row[STUDENT_LASTNAME].upper(), 'FIRST_NAME':row[STUDENT_FIRSTNAME].upper(), 'TEACHERS':{}}
            students[OSIS] = student
        t_data = []
        print row[STUDENT_FIRSTNAME] + ' ' + row[STUDENT_CLASS_PERIOD]
        t_data.append(row[STUDENT_CLASS_PERIOD])
        if TEACHER_FIRSTNAME != 'NONE':
            t_data.append(row[TEACHER_FIRSTNAME])
        students[OSIS]['TEACHERS'][row[TEACHER_NAME].upper()] = t_data
    return students

# Adds all the students to the students collection in the database
# Each document is formatted:
# 'LAST_NAME' : LASTNAME
# 'FIRST_NAME' : FIRSTNAME
# 'OSIS' : osis#
# 'TEACHERS' : { TEACHERNAME:Period, TEACHERNAME2:Period}
# For example: 'TEACHERS' : { 'BROWN' : '3' , 'HOLMES' : '4'}
def add_students():
    students = get_students()
    #print "Running"
    for key in students:
        student = students[key]
        student['OSIS'] = key
        print student
        db.students.insert(student)

# Finds and returns a student by name
def find_student_name(first_name,last_name):
    return db.students.find({'FIRST_NAME':first_name.upper(), 'LAST_NAME':last_name.upper()})[0]

# Finds and returns a student by OSIS
def find_student_osis(OSIS):
    num = str(OSIS)
    return db.students.find({"OSIS":num})[0]
