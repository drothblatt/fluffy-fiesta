var c = document.getElementById("chart");
var ctx = c.getContext("2d");


var lines=[];
var desks=[];
var rect = c.getBoundingClientRect();
var isMouseDown = -1;
var studentImgs=[];

var students = ["Filosa, Henry", "Fishelson, Max", "Follosco, Kara",  "Francis, Rahul", "Gary, Annabelle", "Hatzimemos, Aristides", \
	    	"Kratsios, Andrew", "Kushner, Alexis", "Mansilla, Felipe", "McGreal, Mary", \
	    	"Rothblatt, David", "Schneider, Max", "Sim, Annie", "Steele, Michael" ]; // will recieve roster alphabetically
// in future, students will be a 2D array with each item having student name, osis, and id (and maybe img)

function readlinesCSV(){
    var linesFile = "lines.csv";
    var file = new File(linesFile);
    
    file.open("r"); // open file with read access
    while (!file.eof) {
        var str = file.readln();
        var coors = str.split(","); // this is an array
    	// read each line of text
    	lines.push({x1:coors[0], y1:coors[2], 
    	            x2:coors[1], y2:coors[3]
    	            });
    }
    file.close();
}


function readDesksCSV(){
    var desksFile = "desk.csv";
    var file = new File(desksFile);
    
    file.open("r"); // open file with read access
    while (!file.eof) {
        var str = file.readln();
        var coors = str.split(","); // this is an array
        console.log(coors);
    	// read each line of text
    	desks.push( [coors[0], coors[1], coors[2], coors[3], coors[4] ] );
    }
    file.close();
}





function getStudentImgs(){
    for(var i=0; i<students.length; i++){
        //set img var here
        s = students[i];
        file = "static/demoimages/" + s.substr(s.indexOf(" ")) + s.substr(0, s.indexOf(",") + ".jpg"); // in future, this should be an osis like Brooks' page
        Image img = Image.FromFile(file);
        studentImgs.push(img);
    }
    
}


		
function setDesks(){ //(boolean randomize_list){ // assigns each student a desk until no more desks
    /*
	var students_temp = students;	
	if (randomize_list) {
	    for (var i=0; i < students.length; i++){
	        students_temp[i] = students_temp[Math.floor(Math.random() * students.length) ];
	}
	*/
	
    int i = 0;
    for (var i=0; i < students.length; i++){
        if i == desks.length {
            console.log("not enough desks for all students."); // this needs to be soemwhere other than just console though
            break;
        }
        desks[i][4] = i;
    }

}

function drawLines(){
    ctx.clearRect(0,0,c.width,c.height);

    // part here where i read csv and enter data into lines[]


    for(var i=0; i<lines.length; i++){
        ctx.beginPath();
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
        ctx.stroke();
    }
    
    for(var i=0; i<desks.length; i++){
        if(desks[i][4]!=-1 && i!=isMouseDown){
            ctx.drawImage(stundentImgs[desks[i][4]],desks[i][0],desks[i][1],desks[i][2]-desks[i][0],desks[i][3]-desks[i][1]);
        }
    }
    
    if(isMouseDown!=-1){
        ctx.drawImage(stundentImgs[desks[i][4]],
                      event.clientX - rect.left - (desks[i][2]-desks[i][0])/2,
                      event.clientY - rect.top - (desks[i][3]-desks[i][1])/2,
                      desks[i][2]-desks[i][0],
                      desks[i][3]-desks[i][1]);
    }
}

function getDesk(mouseX,mouseY){
    for(var i=0; i < desks.length; i++){
	    x1 = desks[i][0];
	    x2 = desks[i][2];
	    y1 = desks[i][1];
	    y2 = desks[i][3];
	
	    if ((mouseX > x1 && mouseX < x2) && (mouseY > y1 && mouseY < y2)) {
	        return i;
	    }
    }
    return -1;
}

var draw = function draw(){
    isMouseDown = getDesk(event.clientX - rect.left,event.clientY - rect.top);
    
    if(isMouseDown!=-1){
        c.addEventListener("mousemove",function(){
	        drawLines();
	        if(isMouseDown!=-1){c.removeEventListener("mousemove",arguments.callee);}
    });
    
    
}

var swap = function swap(){
    var newDesk = getDesk(event.clientX - rect.left,event.clientY - rect.top);
    if(newDesk!=-1){
        var tmp = desk[newDesk][4];
        desk[newDesk][4] = desk[isMouseDown][4];
        desk[isMouseDown][4] = tmp;
    }
    isMouseDown = -1;
    drawLines();
}

c.addEventListener("mousedown",draw);
c.addEventListener("mouseup",swap);
