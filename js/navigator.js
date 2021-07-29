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
				// element.className = element.className.replace(" deactive", "");
				// element.className += " deactive";
			})
			// this.className = this.className.replace(" deactive", "");
			this.className += " active";
			
			let target = this.dataset.target;
			console.log(target);
			tabcontent.forEach(element =>{
				element.style.display = "none";
			})
			document.getElementById(target).style.display = "flex";
		});
		// ele.addEventListener('mouseover',function(){
		// 	tablinks.forEach(element =>{
		// 		if( element.classList.contains('active') ){
		// 			element.querySelector(".tooltip").style.animationName = "hide-tooltip";
		// 			element.querySelector(".tooltip").style.animationDuration = "1s";
		// 		};
		// 	})
		// })
	});
	tablinks[1].click();
});
 