var c = document.getElementById("chart");
var ctx = c.getContext("2d");
var b = document.getElementById("go");
var u = document.getElementById("undo");

var blockX = 1;
var blockY = 1;
var lastMouseX;
var lastMouseY;
var isMouseDown=0;
var lines=[];
var desks=[];
var rect = c.getBoundingClientRect();

function magFifty(x){
    if(x>=0){
        return Math.max(x,50);
    }else{
        return Math.min(x,-50);
    }
}

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
	    ctx.moveTo(lastMouseX+(i*magFifty(delX/blockX)), lastMouseY);
	    ctx.lineTo(lastMouseX+(i*magFifty(delX/blockX)), lastMouseY+magFifty(delY/blockY)*blockY);
	    ctx.stroke();
	}
	for(var i=0; i<=blockY; i++){
	    ctx.beginPath();
	    ctx.moveTo(lastMouseX, lastMouseY+(i*magFifty(delY/blockY)));
	    ctx.lineTo(lastMouseX+magFifty(delX/blockX)*blockX, lastMouseY+(i*magFifty(delY/blockY)));
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
    var deskX = magFifty((event.clientX - rect.left - lastMouseX)/blockX);
    var deskY = magFifty((event.clientY - rect.top - lastMouseY)/blockY);
    if(!isOverlap([lastMouseX,lastMouseY,lastMouseX+deskX*blockX,lastMouseY+deskY*blockY])){
        for(var i=0; i<=blockX; i++){
	    lines.push({x1:lastMouseX+i*deskX, y1:lastMouseY, x2:lastMouseX+i*deskX, y2:lastMouseY+deskY*blockY});
        }
        for(var i=0; i<=blockY; i++){
	    lines.push({x1:lastMouseX, y1:lastMouseY+i*deskY, x2:lastMouseX+deskX*blockX, y2:lastMouseY+i*deskY});
        }
        for(var i=0; i<blockX; i++){
            for(var j=0; j<blockY; j++){
                desks.push([lastMouseX+i*deskX,lastMouseY+j*deskY,lastMouseX+deskX*(i+1),lastMouseY+deskY*(j+1)]);
            }
        }
    }else{
        alert("Error! Cannot place overlapping desks.");
    }
}

function isOverlap(newD){
    for(var i=0; i<desks.length; i++){
        if(((desks[i][3]>newD[1])==(desks[i][1]<newD[3]))&&((desks[i][4]>newD[2])==(desks[i][2]<newD[4]))) return true;
    }
    return false;
}
    
var set = function set(){
    blockY = parseInt(prompt("Enter the number of rows in the block of desks:",blockY));
    blockX = parseInt(prompt("Enter the number of columns in the block of desks:",blockX));
}

c.addEventListener("mousedown",draw);
c.addEventListener("mouseup",add);
b.addEventListener("click",set);
u.addEventListener("click",function(){
    for(var i=0; i<=blockX+blockY+1; i++){
        lines.pop();
    }
    for(var i=0; i<blockX*blockY; i++){
        desks.pop();
    }
    redrawLines();
});
