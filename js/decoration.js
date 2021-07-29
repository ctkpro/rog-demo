let u_section = document.querySelector('section.universe');

u_section.addEventListener("mousemove",function(e){
    showCoords(e);
})
function showCoords(e) {
    let x = e.clientX;
    let chart_text = document.querySelector('.chart text');
    chart_text.innerHTML = x;
}