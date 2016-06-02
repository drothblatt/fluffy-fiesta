DEVLOG:
========
Meeting 1 with client(Mr. Holmes):
-----------
Needs:
- The layout must have the students' pictures with their names

   - Teacher view must have the pictures

   - Student view cannot have pictures

- There should be the option of viewing the seating chart from the TEACHER'S POV and the STUDENT'S POV (from the door)

- The must be an option to drag and drop students' names in order to switch their position in the classroom


Wants:


- The option of randomizing the seating chart for the first day of class

- Add student's preferred name/nickname without having to go into the roster and changing it manually


To Do:


- Ask Mr. Brooks how the roster files are set up (the ones he gets from the school, in order to be able to replicate it)

- Figure out the order of implementation, and present the layout by next meeting (TBD)

Week before 2nd client meeting:
----------
What was done:
 - The fundamental drag and drop functionality was made using interactjs.
 - Basic template drawing was completed.

What to improve:
 - Drag and drop more smoothly, preferably without interactjs
 - Template drawing and saving

2nd Client meeting:
------------
Showed Mr Holmes the basic function of the program .

What to improve from client meeting:
 - Make drawing templates better and more smoother and have ability to populate students

Use Google oauth with stuy.edu domain

After Client meeting to June 1st
--------------

Two ideas for making templating easier:
 - Drag and draw large rectangle which populates itself with as many desks as possible and then "snaps to grid"
 - Have grid of desks(rectangles) and create template by clicking/mouse down on desks that want to be drawn for the classroom
 - Second idea was liked better by the group

Back end and authentication:
 - Started Google authentication and integration with flask.
 - Need to start creating and populating databases

Thursday, June 2nd, Class time
--------------

Make template first

Populate template