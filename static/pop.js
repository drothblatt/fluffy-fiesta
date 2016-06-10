var c = document.getElementById("chart");
var ctx = c.getContext("2d");


var lines=[];
var desks=[];
var rect = c.getBoundingClientRect();

var students = ["David Rothblatt", "Max Fishelson", "Felipe Mansilla", "Mary McGreal", "Andrew Kratsios", \
		"Henry Filosa", "Kara Follosco", "Annie Sim", "Rahul Francis", "Michael Steele", "Aristides Hatzimemos", \
		"Annabelle Gary", "Alexis Kushner", "Max Schneider"];






function drawLines(){
    ctx.clearRect(0,0,c.width,c.height);

    // part here where i read csv and enter data into lines[]


    for(var i=0; i<lines.length; i++){
        ctx.beginPath();
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
        ctx.stroke();
    }
}

function populateDeskArray(){
    for(var i=0; i < desks.length; i++){
	desks[i].push( **boolean**);
    }

}

function checkDesk(){
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    for(var i=0; i < desks.length; i++){
	x1 = desks[i][0];
	x2 = desks[i][2];
	y1 = desks[i][1];
	y2 = desks[i][3];
	occupied = desks[i][4];
	
	if (mouseX > x1 && mouseX < x2) && (mouseY > y1 && mouseY < y2) && (!occupied) {
	    // do this if yes
	}

}

c.addEventListener("mousedown",draw);

