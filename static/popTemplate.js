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



function getInfo(){
    
    var linesstring = "104,117,104,494;197,117,197,494;290,117,290,494;104,117,290,117;104,179.83333333333334,290,179.83333333333334;104,242.66666666666669,290,242.66666666666669;104,305.5,290,305.5;104,368.33333333333337,290,368.33333333333337;104,431.1666666666667,290,431.1666666666667;104,494,290,494;396,242,396,493;485,242,485,493;574,242,574,493;396,242,574,242;396,304.75,574,304.75;396,367.5,574,367.5;396,430.25,574,430.25;396,493,574,493;652,120,652,495;750,120,750,495;848,120,848,495;652,120,848,120;652,182.5,848,182.5;652,245,848,245;652,307.5,848,307.5;652,370,848,370;652,432.5,848,432.5;652,495,848,495"; 
   
    var desksstring = "104,117,197,179.83333333333334,-1;104,179.83333333333334,197,242.66666666666669,-1;104,242.66666666666669,197,305.5,-1;104,305.5,197,368.33333333333337,-1;104,368.33333333333337,197,431.1666666666667,-1;104,431.1666666666667,197,494,-1;197,117,290,179.83333333333334,-1;197,179.83333333333334,290,242.66666666666669,-1;197,242.66666666666669,290,305.5,-1;197,305.5,290,368.33333333333337,-1;197,368.33333333333337,290,431.1666666666667,-1;197,431.1666666666667,290,494,-1;396,242,485,304.75,-1;396,304.75,485,367.5,-1;396,367.5,485,430.25,-1;396,430.25,485,493,-1;485,242,574,304.75,-1;485,304.75,574,367.5,-1;485,367.5,574,430.25,-1;485,430.25,574,493,-1;652,120,750,182.5,-1;652,182.5,750,245,-1;652,245,750,307.5,-1;652,307.5,750,370,-1;652,370,750,432.5,-1;652,432.5,750,495,-1;750,120,848,182.5,-1;750,182.5,848,245,-1;750,245,848,307.5,-1;750,307.5,848,370,-1;750,370,848,432.5,-1;750,432.5,848,495,-1";

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
        
        var img = document.createElement("IMG");
        img.setAttribute("src", "../static/demoimages/" + s.substr(s.indexOf(" ")+1) + s.substr(0, s.indexOf(",")) + ".jpg" );
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
            ctx.font = "15pt Calibri";
            var studentName = students[i];
            ctx.fillStyle = "#00ff00";
            ctx.fillText(studentName,desks[i][0],desks[i][1]+62,desks[i][2]-desks[i][0],desks[i][3]-desks[i][1]);
        }
    }
    
    if(isMouseDown!=-1){
        ctx.drawImage(studentImgs[desks[isMouseDown][4]],
                      event.clientX - rect.left - (desks[isMouseDown][2]-desks[isMouseDown][0])/2,
                      event.clientY - rect.top - (desks[isMouseDown][3]-desks[isMouseDown][1])/2,
                      desks[isMouseDown][2]-desks[isMouseDown][0],
                      desks[isMouseDown][3]-desks[isMouseDown][1]);
        ctx.font = "15pt Calibri";
        var studentName = students[i];
        ctx.fillStyle = "#00ff00";
        ctx.fillText(studentName,
                    event.clientX - rect.left - (desks[isMouseDown][2]-desks[isMouseDown][0])/2 + 10,
                    event.clientY - rect.top - (desks[isMouseDown][3]-desks[isMouseDown][1])/2 + 10,
                    desks[isMouseDown][2]-desks[isMouseDown][0] + 10,
                    desks[isMouseDown][3]-desks[isMouseDown][1] + 10);
        
       
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
    setDesks();
    getStudentImgs();
    drawLines();
});