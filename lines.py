import csv

FILE_NAME = "lines.csv"

def writelines(lines):
	fieldnames = ['x1','y1','x2','y2']
	writer = csv.DictWriter(open(FILE_NAME,'w'), fieldnames=fieldnames)

	writer.writeheader()
	for l in lines:
		writer.writerow({'x1':l['x1'], 'x2': l['x2'], 'y1': ;['y1'], 'y2': l['y2']})

def main(lines):
	writelines(lines)
