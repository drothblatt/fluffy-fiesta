var c = document.getElementById("chart");
var ctx = c.getContext("2d");
var p = document.getElementById("populate");

var lines=[];
var desks=[];
var rect = c.getBoundingClientRect();
var isMouseDown = -1;
var studentImgs=[];

var students = ["Filosa, Henry", "Fishelson, Max", "Follosco, Kara",  "Francis, Rahul", "Gary, Annabelle", "Hatzimemos, Aristides","Kratsios, Andrew", "Kushner, Alexis", "Mansilla, Felipe", "McGreal, Mary","Rothblatt, David", "Schneider, Max", "Sim, Annie", "Steele, Michael" ]; // will recieve roster alphabetically
// in future, students will be a 2D array with each item having student name, osis, and id (and maybe img)


/* DELETE
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

*/



function getInfo(){
    
    
    var linesstring = "97,97,95,535;206,206,95,535;315,315,95,535;97,315,95,95;97,315,168.33333333333331,168.33333333333331;97,315,241.66666666666666,241.66666666666666;97,315,315,315;97,315,388.3333333333333,388.3333333333333;97,315,461.66666666666663,461.66666666666663;97,315,535,535;672,672,103,542;778.5,778.5,103,542;885,885,103,542;672,885,103,103;672,885,176.16666666666669,176.16666666666669;672,885,249.33333333333334,249.33333333333334;672,885,322.5,322.5;672,885,395.6666666666667,395.6666666666667;672,885,468.83333333333337,468.83333333333337;672,885,542,542;403,403,243,541;493.5,493.5,243,541;584,584,243,541;403,584,243,243;403,584,317.5,317.5;403,584,392,392;403,584,466.5,466.5;403,584,541,541";

    var desksstring = "97,95,206,168.33333333333331,-1;97,168.33333333333331,206,241.66666666666666,-1;97,241.66666666666666,206,315,-1;97,315,206,388.3333333333333,-1;97,388.3333333333333,206,461.66666666666663,-1;97,461.66666666666663,206,535,-1;206,95,315,168.33333333333331,-1;206,168.33333333333331,315,241.66666666666666,-1;206,241.66666666666666,315,315,-1;206,315,315,388.3333333333333,-1;206,388.3333333333333,315,461.66666666666663,-1;206,461.66666666666663,315,535,-1;672,103,778.5,176.16666666666669,-1;672,176.16666666666669,778.5,249.33333333333334,-1;672,249.33333333333334,778.5,322.5,-1;672,322.5,778.5,395.6666666666667,-1;672,395.6666666666667,778.5,468.83333333333337,-1;672,468.83333333333337,778.5,542,-1;778.5,103,885,176.16666666666669,-1;778.5,176.16666666666669,885,249.33333333333334,-1;778.5,249.33333333333334,885,322.5,-1;778.5,322.5,885,395.6666666666667,-1;778.5,395.6666666666667,885,468.83333333333337,-1;778.5,468.83333333333337,885,542,-1;403,243,493.5,317.5,-1;403,317.5,493.5,392,-1;403,392,493.5,466.5,-1;403,466.5,493.5,541,-1;493.5,243,584,317.5,-1;493.5,317.5,584,392,-1;493.5,392,584,466.5,-1;493.5,466.5,584,541,-1";

    linesstring = linesstring.split(";");
    
    console.log(linesstring);
    
    for (var i=0; i< linesstring.length; i++){
    	linesstring[i] = linesstring[i].split(",");
        for (var j = 0; j < linesstring[i].length; j++){
	        linesstring[i][j] = parseFloat(linesstring[i][j]);
        }
        lines.push({ x1: linesstring[i][0], 
                    y1: linesstring[i][1],
                    x2: linesstring[i][2],
                    y2: linesstring[i][3] });
    }
    console.log(lines);



    desksstring = desksstring.split(";");
    for (var i=0; i < desksstring.length; i++){
	    desksstring[i] = desksstring[i].split(",");
	    for (var j = 0; j < desksstring[i].length; j++){
	        desksstring[i][j] = parseFloat(desksstring[i][j]);
	    }
	    desks.push([desksstring[i][0],desksstring[i][1],desksstring[i][2],desksstring[i][3],desksstring[i][4]]);
    }
    console.log(desks);

   
}





function getStudentImgs(){
    for(var i=0; i<students.length; i++){
        //set img var here
        var s = students[i];
        
        var img = new Image();
	    img.src = "static/demoimages/" + s.substr(s.indexOf(" ")) + s.substr(0, s.indexOf(",") + ".jpg");
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

    for (var i=0; i < students.length; i++){
        if (i == desks.length) {
            alert("Not enough desks for students. you should probably go back to make more desks");
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
            ctx.drawImage(studentImgs[desks[i][4]],desks[i][0],desks[i][1],desks[i][2]-desks[i][0],desks[i][3]-desks[i][1]);
        }
    }
    
    if(isMouseDown!=-1){
        ctx.drawImage(studentImgs[desks[i][4]],
                      event.clientX - rect.left - (desks[i][2]-desks[i][0])/2,
                      event.clientY - rect.top - (desks[i][3]-desks[i][1])/2,
                      desks[i][2]-desks[i][0],
                      desks[i][3]-desks[i][1]);
    }
}

function getDesk(mouseX,mouseY){
    for(var i=0; i < desks.length; i++){
	    var x1 = desks[i][0];
	    var x2 = desks[i][2];
	    var y1 = desks[i][1];
	    var y2 = desks[i][3];
	
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
	        if(isMouseDown==-1){c.removeEventListener("mousemove",arguments.callee);}
        });
    }
}

var swap = function swap(){
    var newDesk = getDesk(event.clientX - rect.left,event.clientY - rect.top);
    if(newDesk!=-1){
        var tmp = desks[newDesk][4];
        desks[newDesk][4] = desks[isMouseDown][4];
        desks[isMouseDown][4] = tmp;
    }
    isMouseDown = -1;
    drawLines();
}

c.addEventListener("mousedown",draw);
c.addEventListener("mouseup",swap);
p.addEventListener("click",function(){
    getInfo();
    console.log("yo");
    drawLines();
    setDesks();
});