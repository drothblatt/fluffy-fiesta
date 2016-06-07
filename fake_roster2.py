import csv

FILE_NAME = 'roster.csv'

#Returns a list of every student's name in alphabetical order

def names():
	reader = csv.DictReader(open(FILE_NAME))
	students = []
	for row in reader:
		name = row['LAST_NAME'] + ', ' + row['FIRST_NAME']
		students.append(name)
	return students

print names()