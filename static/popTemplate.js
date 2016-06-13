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
    linesstring = "71,71,127,492;165,165,127,492;259,259,127,492;71,259,127,127;71,259,187.83333333333334,187.83333333333334;71,259,248.66666666666669,248.66666666666669;71,259,309.5,309.5;71,259,370.33333333333337,370.33333333333337;71,259,431.1666666666667,431.1666666666667;71,259,492,492;345,345,247,490;425.5,425.5,247,490;506,506,247,490;345,506,247,247;345,506,307.75,307.75;345,506,368.5,368.5;345,506,429.25,429.25;345,506,490,490;590,590,120,488;688,688,120,488;786,786,120,488;590,786,120,120;590,786,181.33333333333334,181.33333333333334;590,786,242.66666666666669,242.66666666666669;590,786,304,304;590,786,365.33333333333337,365.33333333333337;590,786,426.6666666666667,426.6666666666667;590,786,488,488";

    desksstring = "71,127,165,187.83333333333334,-1;71,187.83333333333334,165,248.66666666666669,-1;71,248.66666666666669,165,309.5,-1;71,309.5,165,370.33333333333337,-1;71,370.33333333333337,165,431.1666666666667,-1;71,431.1666666666667,165,492,-1;165,127,259,187.83333333333334,-1;165,187.83333333333334,259,248.66666666666669,-1;165,248.66666666666669,259,309.5,-1;165,309.5,259,370.33333333333337,-1;165,370.33333333333337,259,431.1666666666667,-1;165,431.1666666666667,259,492,-1;345,247,425.5,307.75,-1;345,307.75,425.5,368.5,-1;345,368.5,425.5,429.25,-1;345,429.25,425.5,490,-1;425.5,247,506,307.75,-1;425.5,307.75,506,368.5,-1;425.5,368.5,506,429.25,-1;425.5,429.25,506,490,-1;590,120,688,181.33333333333334,-1;590,181.33333333333334,688,242.66666666666669,-1;590,242.66666666666669,688,304,-1;590,304,688,365.33333333333337,-1;590,365.33333333333337,688,426.6666666666667,-1;590,426.6666666666667,688,488,-1;688,120,786,181.33333333333334,-1;688,181.33333333333334,786,242.66666666666669,-1;688,242.66666666666669,786,304,-1;688,304,786,365.33333333333337,-1;688,365.33333333333337,786,426.6666666666667,-1;688,426.6666666666667,786,488,-1";

    desksstring = desksstring.split(";");
    for (var i=0; i < desksstring.length; i++){
	desksstring[i].split(",");
	for (var j = 0; j < desksstring[i].length; j++){
	    var strNum = desksstring[i][j];
	    if (strNum.indexOf(".") != -1){
		desksstring[i][j] = float(strNum);
	    } else{
		desksstring[i][j] = int(strNum);
	    };
    }; 
    desks = desksstring;
    print desks;

   
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
