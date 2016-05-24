var ctx = document.getElementById("chart").getContext("2d");

var lastMouseX;
var lastMouseY;
var isMouseDown;

var dot = function dot(){
    var rect = c.getBoundingClientRect();
    var newMouseX = event.clientX - rect.left;
    var newMouseY = event.clientY - rect.top;
    ctx.beginPath();
    if(numDots){
	ctx.beginPath();
	ctx.moveTo(lastMouseX,lastMouseY);
	ctx.lineTo(newMouseX, newMouseY);
	ctx.closePath();
	ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(newMouseX,newMouseY,5,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    numDots = numDots+1;
    lastMouseX = newMouseX;
    lastMouseY = newMouseY;
}

c.addEventListener("click",dot);
b.addEventListener("click",clr);
