var c = document.getElementById("chart");
var ctx = c.getContext("2d");


var lines=[];
var desks=[];
var rect = c.getBoundingClientRect();









function drawLines(){
    ctx.clearRect(0,0,c.width,c.height);

    for(var i=0; i<lines.length; i++){
        ctx.beginPath();
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
        ctx.stroke();
    }
}
