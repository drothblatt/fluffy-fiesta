var c = document.getElementById("chart");
var ctx = c.getContext("2d");
var b = document.getElementById("go");

var blockX = 1;
var blockY = 1;
var lastMouseX;
var lastMouseY;
var isMouseDown=0;
var lines=[];
var desks=[];
var rect = c.getBoundingClientRect();

function redrawLines(delX, delY){
    ctx.clearRect(0,0,c.width,c.height);

    for(var i=0; i<lines.length; i++){
        ctx.beginPath();
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
        ctx.stroke();
    }

    if(isMouseDown){
	for(var i=0; i<=blockX; i++){
	    ctx.beginPath();
	    ctx.moveTo(lastMouseX+(i*delX/blockX), lastMouseY);
	    ctx.lineTo(lastMouseX+(i*delX/blockX), lastMouseY+delY);
	    ctx.stroke();
	}
	for(var i=0; i<=blockY; i++){
	    ctx.beginPath();
	    ctx.moveTo(lastMouseX, lastMouseY+(i*delY/blockY));
	    ctx.lineTo(lastMouseX+delX, lastMouseY+(i*delY/blockY));
	    ctx.stroke();
	}
    }
}

var draw = function draw(){
    lastMouseX = event.clientX - rect.left;
    lastMouseY = event.clientY - rect.top;
    isMouseDown = 1;
    
    c.addEventListener("mousemove",function(){
	redrawLines(event.clientX - rect.left - lastMouseX,event.clientY - rect.top - lastMouseY);
	if(!isMouseDown){c.removeEventListener("mousemove",arguments.callee);}
    });
    
    
}

var add = function add(){
    isMouseDown = 0;
    for(var i=0; i<=blockX; i++){
	lines.push({x1:lastMouseX+(i*(event.clientX - rect.left - lastMouseX)/blockX), y1:lastMouseY, x2:lastMouseX+(i*(event.clientX - rect.left - lastMouseX)/blockX), y2:lastMouseY+(event.clientY - rect.top - lastMouseY)});
    }
    for(var i=0; i<=blockY; i++){
	lines.push({x1:lastMouseX, y1:lastMouseY+(i*(event.clientY - rect.top - lastMouseY)/blockY), x2:lastMouseX+(event.clientX - rect.left - lastMouseX), y2:lastMouseY+(i*(event.clientY - rect.top - lastMouseY)/blockY)});
    }
}
    
var set = function set(){
    blockY = parseInt(prompt("Enter the number of rows in the block of desks:",blockY));
    blockX = parseInt(prompt("Enter the number of columns in the block of desks:",blockX));
}

c.addEventListener("mousedown",draw);
c.addEventListener("mouseup",add);
b.addEventListener("click",set);
   