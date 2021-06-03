 //Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.getElementById('stats-container').appendChild(stats.domElement);

/* ----------------- Glitcher ------------------*/
var arrayElements;
var glitchArray = [];

function initAllGlitch(){
	arrayElements = document.querySelectorAll(".random");
	for(let i=0; i<arrayElements.length; i++){
		let selector = arrayElements[i];
		let randLetterNumber = 2 + Math.floor(Math.random() * 2);
		let randGlitchTime = 200 + Math.floor(Math.random() * 200);
		let randGlitchPauseTime = 5000 + Math.floor(Math.random() * 10000);
		let glitch = new Glitch(selector, i, randLetterNumber, randGlitchTime, 150, randGlitchPauseTime);
		glitch.init();
		glitchArray.push(glitch);
	}
}

function update(){
	for(let i=0; i<glitchArray.length; i++){
		let glitch = glitchArray[i];
		glitch.glitch();
	}
}
initAllGlitch();
update();

window.addEventListener("load", function() {
     var blink = document.getElementById('blink');
     setInterval(function() {
         blink.style.display = (blink.style.display == 'none' ? '' : 'none');
     }, 650);
 }, false);

