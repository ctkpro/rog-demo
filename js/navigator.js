jQuery(document).ready(function(){
	// function navigate(evt, cityName) {
	// 	let i, tabcontent, tablinks;
	  
	// 	tabcontent = document.getElementsByClassName("tabcontent");
	// 	for (i = 0; i < tabcontent.length; i++) {
	// 	  tabcontent[i].style.display = "none";
	// 	}
	  
	// 	tablinks = document.getElementsByClassName("tablinks");
	// 	for (i = 0; i < tablinks.length; i++) {
	// 	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	// 	}
	  
	// 	document.getElementById(cityName).style.display = "block";
	// 	evt.currentTarget.className += " active";
	// }

	tablinks = document.querySelectorAll('.tablinks');
	tabcontent = document.querySelectorAll(".tabcontent");

	tablinks.forEach(ele => {
		ele.addEventListener("click",function(){
			tablinks.forEach(element =>{
				element.className = element.className.replace(" active", "");
			})
			this.className += " active";
			
			let target = this.dataset.target;
			console.log(target);
			tabcontent.forEach(element =>{
				element.style.display = "none";
			})
			document.getElementById(target).style.display = "flex";
		})
	});
	tablinks[1].click();
});
 