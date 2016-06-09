import csv

FILE_NAME = 'static/roster.csv'

#Returns a list of every student's name in alphabetical order

def names():
	reader = csv.DictReader(open(FILE_NAME))
	students = []
	for row in reader:
		name = row['LAST_NAME'] + ', ' + row['FIRST_NAME']
		students.append(name)
	return students

def getStudents():
	reader = csv.DictReader(open(FILE_NAME))
	students = {}
	for row in reader:
		OSIS = row['OSIS']
		if OSIS not in students:
			student = {'LAST_NAME':row['LAST_NAME'].upper(), 'FIRST_NAME':row['FIRST_NAME'].upper(), 'TEACHERS':{}}
			students[OSIS] = student
		students[OSIS]['TEACHERS'][row['TEACHER'].upper()] = row['PERIOD'].upper()
	return students

print getStudents()
