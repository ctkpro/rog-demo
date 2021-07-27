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

let title_box = new fabric.Rect({
  left: 0,
  top: 0,
  fill: 'rgba(0,0,0,0.6)',
  width: 200,
  height: 30
})
let title_box_border = new fabric.Rect({
  left:0,
  top:0,
  fill: 'rgba(255,255,255,0.6)',
  width: 202,
  height: 32
})

let title = new fabric.Text('This is a book',{
  fontFamily: 'Teko',
  fontSize: 30,
  fontWeight: 300,
  left: 0,
  top: 0,
  strokeWidth: 0,
  fill: 'rgba(255,255,255,0.6)',
});
let read_more_box = new fabric.Rect({
  left: 0,
  top: 0,
  fill: 'red',
  width: 200,
  height: 30
});
let read_more = new fabric.Text('MORE',{
  fontFamily: 'Teko',
  fontSize: 30,
  fontWeight: 300,
  left: 0,
  top: 0,
  strokeWidth: 0,
  fill: 'white',
})



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


// fetch("/js/map_world.json")
//   .then(response => response.json())
//   .then(json => {
//     for (let i = 1; i < json.length; i++) {
//       let polygon = new fabric.Polygon([
//         json[i].points[0],
//         json[i].points[1],
//         json[i].points[2]
//         ], {
//           left: json[i].left/2,
//           top: json[i].top/2,
//           fill: json[i].fill,
//           scaleX: 0.5,
//           scaleY: 0.5,
//           opacity: 0.6,
//           holder:json[i].fill,
//           role: 'none'
  
//         }
//       )
//       canvas.add(polygon);
//     }
//   });
fabric.loadSVGFromURL('js/map_world.svg', function(objects, options) { 
  // var dollars = fabric.util.groupSVGElements(objects, options);
  // canvas.add(dollars); 
  // canvas.calcOffset();
  // canvas.renderAll();

  for (let i = 1; i < objects.length; i++) {
    let polygon = new fabric.Polygon([
      objects[i].points[0],
      objects[i].points[1],
      objects[i].points[2]
      ], {
        left: objects[i].left/2,
        top: objects[i].top/2,
        fill: objects[i].fill,
        scaleX: 0.5,
        scaleY: 0.5,
        opacity: 0.6,
        holder:objects[i].fill,
        role: 'none'

      }
    )
    canvas.add(polygon);
  }
});
const citivas = {
  castitas:{
    img: '../js/castitas.jpg',
    link:''
  },
  moderatio:{
    img: '../js/castitas.jpg',
    link:''
  },
  liberalitas:{
    img: '../js/castitas.jpg',
    link:''
  },
  industria:{
    img: '../js/castitas.jpg',
    link:''
  },
  patience:{
    img: '../js/castitas.jpg',
    link:''
  },
  gratia:{
    img: '../js/castitas.jpg',
    link:''
  },
  humility:{
    img: '../js/castitas.jpg',
    link:''
  }
}
fabric.loadSVGFromURL('js/map_seven_sign.svg', function(objects, options) {
  for (let i = 0; i < objects.length; i++) {
    let polygon = new fabric.Polygon([
      objects[i].points[0],
      objects[i].points[1],
      objects[i].points[2]
      ], {
        left: objects[i].left/2,
        top: objects[i].top/2,
        fill: objects[i].fill,
        scaleX: 0.5,
        scaleY: 0.5,
        holder:objects[i].fill,
        id: objects[i].id,
        role: 'main',
        img: citivas[ objects[i].id ].img,
        link: citivas[ objects[i].id ].link
      }
    )
      setTimeout(() => {
        canvas.add(polygon);
      }, 200);
  }

});


function setZoom(zoom,x,y){
  let newZoom = canvas.getZoom() + zoom;
  if(newZoom > 2){
    newZoom = 2;
  }else if(newZoom < 0.8){
    newZoom = 0.8;
  }
  canvas.zoomToPoint({x:x, y:y}, newZoom);
}

canvas.on('mouse:wheel', (e) => {
  if(e.e.ctrlKey){
    const deltaY = e.e.deltaY
    const newZoom = -1 * (deltaY / 10);
    setZoom(newZoom, e.e.offsetX, e.e.offsetY)
  }
})
let btnScaleUp = document.querySelector('.scale-up');
let btnScalepDown = document.querySelector('.scale-down');
btnScaleUp.addEventListener('click',function(e){
  setZoom(0.2, canvas.width/2, canvas.height/2);
})
btnScalepDown.addEventListener('click',function(e){
  setZoom(-0.2, canvas.width/2, canvas.height/2);
})


const dragInfo = {
  isDragging: false,
  lastX: 0,
  lastY: 0
}
let img;
canvas.on('mouse:down', function(opt){
  this.isDragging = true;
  this.selection = false;
  this.lastX = opt.e.clientX;
  this.lastY = opt.e.clientY;
  
  console.log(opt.target);
  

})
const moveLimit = 280;
canvas.on('mouse:move', function(opt){
  if (this.isDragging) {
    // console.log(this.viewportTransform);
    let vpt = this.viewportTransform;

    if(vpt[4] > moveLimit ){
      vpt[4] = moveLimit ;
    }else if(vpt[4] < -moveLimit * vpt[0] ** 2){
      vpt[4] = -moveLimit * vpt[0] **2;
    }else{
      vpt[4] += opt.e.clientX - this.lastX;
    }

    if(vpt[5] > moveLimit){
      vpt[5] = moveLimit;
    }else if(vpt[5] < -moveLimit * vpt[0] ** 2){
      vpt[5] = -moveLimit * vpt[0] ** 2;
    }else{
      vpt[5] += opt.e.clientY - this.lastY;
    }
    this.requestRenderAll();
    this.lastX = opt.e.clientX;
    this.lastY = opt.e.clientY;
  
  }
})

canvas.on('mouse:up', function(opt) {
  this.isDragging = false;
  this.selection = true;
  this.forEachObject(function (object){
    object.setCoords();
  });
})

canvas.on('mouse:over', function(e) {
  if(e.target.role !=  'none'){
    e.target.set('fill', 'red');

    let x = e.target.left < 1000 ? e.target.left + 100 : e.target.left - 220;
    let y = e.target.top - 10;
    title_box_border.set({left:x-1, top:y-1});
    title_box.set({left:x, top:y});
    title.set({text:e.target.id, left:x+5, top:y});
    read_more_box.set({left:x, top:y+240});
    read_more.set({left:x+5, top:y+240});
    canvas.add(title_box_border, title_box, title, read_more_box, read_more);

    fabric.Image.fromURL(e.target.img, function(oImg) {
      img = oImg;
      oImg.set({left:x, top:y+40,width:200,height:190});
      canvas.add(oImg);
    });
    // console.log(t);
  }
  canvas.renderAll();
})

canvas.on('mouse:out', function(e) {
  if(e.target.role !=  'none'){

    e.target.set('fill', e.target.holder);

    canvas.remove(title_box,title_box_border,title,img, read_more_box, read_more);

    canvas.renderAll();
  }
});