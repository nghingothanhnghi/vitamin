


jQuery(document).ready(function($) {
	$("#faqs .tabs li").on('click', function(e) {		
		var tabs_nav = document.querySelector("#tabs-nav");
		var tabs_content = document.querySelector("#tabs-content");
		
		var nav_lis = tabs_nav.querySelectorAll("li");
		var faqs_contents = tabs_content.querySelectorAll(".faqs-content");		
		
		if (this.classList.contains("active") == false) {
			for (var i=0; i<faqs_contents.length; i++) {
				$(faqs_contents[i]).slideUp(500);
			}
			
			var li_index = this.getAttribute("data-index");
			
			for (var i=0; i<faqs_contents.length; i++) {
				var content_index = faqs_contents[i].getAttribute("data-index");
				if (li_index == content_index) {
					$(faqs_contents[i]).slideDown(500);
				}
			}
			
			for (var i=0; i<nav_lis.length; i++) {
				nav_lis[i].classList.remove("active");
			}
			
			this.classList.add("active");
		}
	});		

});







jQuery(document).ready(function($) {
	$("#help-center .faqs-content .btn-expand").on('click', function(e) {		
		var info = this.closest(".info");
		var content = info.getElementsByClassName("info-content")[0];	
		info.classList.toggle("opened");		
		this.classList.toggle("expanded");	
		$(content).slideToggle();				
	});		

});

























