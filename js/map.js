// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// let cw = canvas.width = window.innerWidth,
//   cx = cw / 2;
// let ch = canvas.height = window.innerHeight,
//   cy = ch / 2;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight

// let m = {x:0,y:0};//mouse coords on mouse down
// let last_m = {x:0,y:0}//mouse coords on dragging

// let d = {x:0,y:0};// distance while dragging
// let D = {x:0,y:0};// distance on mouse up


// let dragging = false;


// function drawGrid(){
// 	ctx.beginPath();
// 	for (let i = 0; i < ch; i+=20) {
// 		ctx.moveTo(0,i);
// 		ctx.lineTo(cw,i);
// 		ctx.stroke();
// 	}
// 	for (let i = 0; i < cw; i+=20) {
// 		ctx.moveTo(i,0);
// 		ctx.lineTo(i,ch);
// 		ctx.stroke();
// 	}
// }
// drawGrid();

// function drawCircle(){
// 	ctx.fillStyle = 'red';
// 	ctx.beginPath();
// 	ctx.arc(200, 100, '50', 0, 2*Math.PI);
// 	ctx.fill();
// }
// drawCircle();

// //events
// canvas.addEventListener("mousedown",(evt)=>{
//   dragging = true;
//   //the mouse position
//   m = oMousePos(canvas, evt);
// })

// canvas.addEventListener("mouseup",(evt)=>{
//   dragging = false;
//   last_m = oMousePos(canvas, evt);
//   d.x = last_m.x - m.x;
//   d.y = last_m.y - m.y;
//   // the total dragged distance on mouse up
//   D.x += d.x;
//   D.y += d.y;
// })


// canvas.addEventListener("mousemove",(evt)=>{
  
//   if(dragging){
    
//     last_m = oMousePos(canvas, evt);
    
//     d.x = last_m.x - m.x + D.x;
//     d.y = last_m.y - m.y + D.y;
    
//     ctx.clearRect(-cw,0, 2*cw,ch);
    
//     ctx.save();
    
//     ctx.translate(d.x, d.y);

// 	drawGrid();
//     drawCircle();
    
//     ctx.restore();

//   }
                              
// })
// let last_r = 1;
// canvas.addEventListener("mousewheel",(e)=>{
// 	let delta = Math.max(-1, Math.min(1, e.wheelDelta) );
// 	last_m = oMousePos(canvas, e);
// 	let scaleRate = delta < 0 ? 1.05 * last_r : last_r/1.05;
// 	// last_r = scaleRate;
// 	ctx.clearRect(-cw,0, 2*cw,ch);

// 	ctx.save();

// 	// ctx.translate(last_m.x*(1 - scaleRate), last_m.y*(1 - scaleRate));
// 	ctx.scale(scaleRate, scaleRate);
// 	drawGrid();
// 	drawCircle();
// 	ctx.restore();
// })

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

var canvas = new fabric.Canvas('canvas', {
  height: window.innerHeight * 0.9,
  width: window.innerWidth * 0.9,
  backgroundColor: 'rgb(0,0,0)',
  selectionColor: 'blue',
  selectionLineWidth: 2
});

fabric.Object.prototype.selectable = false;



let rect = new fabric.Rect({
  left: 10,
  top: 10,
  fill: 'red',
  width: 20,
  height: 20
});


function drawGrid() {
  canvas.clear()
  const longer = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
  let vLine
  let hLine

  d = 40;
  const lineDef = {
    fill: '#aaa',
    stroke: 'rgba(250, 250, 250, 0.2)',
    strokeWidth: 1,
    selectable: false
  }
  for (let i = -1000/d; i * d <= 2*1000; i++) {

    // vLine = new fabric.Line([ i * d, -canvas.height, i * d, 2*canvas.height], lineDef);
    // hLine = new fabric.Line([-canvas.width, i * d, 2*canvas.width, i * d], lineDef);
    vLine = new fabric.Line([ i * d, -1000, i * d, 2*1000], lineDef);
    hLine = new fabric.Line([-1000, i * d, 2*1000, i * d], lineDef);
    
    if (i % 5 === 0) {
      vLine.stroke = 'rgba(250,250,250, 0.7)' 
      hLine.stroke = 'rgba(250,250,250, 0.7)'
    }
    canvas.add(vLine, hLine)
  }
}
drawGrid();
canvas.add(rect);

let particles = [];
fabric.loadSVGFromURL('js/map_set.svg', function(objects, options) { 
  // var dollars = fabric.util.groupSVGElements(objects, options);
  // particles = objects;
  // canvas.add(dollars); 
  // canvas.calcOffset();
  // canvas.renderAll();
  console.log(objects);
  for (let i = 1; i < objects.length; i++) {
    let polygon = new fabric.Polygon([
      objects[i].points[0],
      objects[i].points[1],
      objects[i].points[2]
      ], {
        left: objects[i].left/2.5,
        top: objects[i].top/2.5,
        fill: objects[i].fill,
        scaleX: 0.4,
        scaleY: 0.4,
      }
    )
    canvas.add(polygon);
  }

  // let polygon = new fabric.Polygon([
  //   objects[1].points[0],
  //   objects[1].points[1],
  //   objects[1].points[2]
  //   ], {
  //     left: 10,
  //     top: 10,
  //     fill: "blue"
  //   }
  // )
  // canvas.add(polygon);

}); 


function setZoom(zoom,x,y){
  let newZoom = canvas.getZoom() + zoom;
  canvas.zoomToPoint({x:x, y:y}, newZoom);
}

canvas.on('mouse:wheel', (e) => {
  const deltaY = e.e.deltaY
  const newZoom = deltaY / 100;
  setZoom(newZoom, e.e.offsetX, e.e.offsetY)
})

const dragInfo = {
  isDragging: false,
  lastX: 0,
  lastY: 0
}
canvas.on('mouse:down', (e) => {
  dragInfo.isDragging = true;
  canvas.selection = false;
  dragInfo.lastX = e.e.clientX;
  dragInfo.lastY = e.e.clientY;
  
})

canvas.on('mouse:move', (e) => {
  if (dragInfo.isDragging) {

    canvas.viewportTransform[4] += e.e.clientX - dragInfo.lastX;
    canvas.viewportTransform[5] += e.e.clientY - dragInfo.lastY;
    canvas.requestRenderAll();
    dragInfo.lastX = e.e.clientX;
    dragInfo.lastY = e.e.clientY;
  }
})

canvas.on('mouse:up', function(opt) {
  dragInfo.isDragging = false;
  dragInfo.selection = true;
})