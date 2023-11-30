





jQuery(document).ready(function($) {	
	var _lisMap = document.getElementsByClassName("lis-map")[0];
	if (_lisMap) {
		var _lis = _lisMap.children;
		for (var i=0; i<_lis.length; i++) {
			var _name = _lis[i].getAttribute("data-name");
			_lis[i].classList.add(_name);
		}
	}	
});





jQuery(document).ready(function($) {	
	
	$('#headquarter-center-information .lis-map li').on('click', function(e) {

		if (this.classList.contains("active") == false) {	

			var _section = this.closest(".section-content");
			var centerList = _section.getElementsByClassName("center-list")[0];
			var lisCenter = centerList.getElementsByTagName("li");
					
			var chartMap = this.closest(".chart-map");		
			var map = chartMap.getElementsByClassName("map")[0];
			var paths = map.getElementsByTagName("path");			
			var lis = chartMap.getElementsByClassName("lis-map")[0].children;
			var _start = map.getElementsByClassName("start")[0];
			var _end = map.getElementsByClassName("end")[0];	

			_start.setAttribute("stop-color", "#FFF");
			_end.setAttribute("stop-color", "#FFF");

			var centerName = this.getAttribute("data-name");	
			var color = getBgColorHex(this.children[0]);	
			
			removeAllActiveLis(lis);
			removeAllActiveCenter(paths);
			
			this.classList.add("active");
			
			for (var i=0; i<paths.length; i++) {
				var id = paths[i].getAttribute("id");
				if (id == centerName) {
					paths[i].classList.add("active");
					paths[i].style.fill = "url(#fill_gradient)";
					_start.setAttribute("stop-color", color);
					_end.setAttribute("stop-color", color);
				}			
			}
			
			hideAllCenters(lisCenter);		

			
			
			if (centerName == "all") {
				showAllCenters(lisCenter);
			}
			else {
				showCenters(lisCenter, centerName);
			}
		}
	});
	
});








jQuery(document).ready(function($) {	
	
	$('#headquarter-center-information .map path').on('click', function(e) {

		if (this.classList.contains("active") == false) {	

			var _section = this.closest(".section-content");
			var centerList = _section.getElementsByClassName("center-list")[0];
			var lisCenter = centerList.getElementsByTagName("li");
			
			var chartMap = this.closest(".chart-map");			
			var map = chartMap.getElementsByClassName("map")[0];
			var paths = map.getElementsByTagName("path");			
			var _start = map.getElementsByClassName("start")[0];
			var _end = map.getElementsByClassName("end")[0];
			
			_start.setAttribute("stop-color", "#FFF");
			_end.setAttribute("stop-color", "#FFF");
			
			var lis = chartMap.getElementsByClassName("lis-map")[0].children;			
	
			removeAllActiveLis(lis);
			removeAllActiveCenter(paths);
			
			var color;
			var centerName = this.getAttribute("id");;
			
			this.classList.add("active");
			
			for (var i=0; i<lis.length; i++) {	
				if (lis[i].getAttribute("data-name") == centerName) {
					lis[i].classList.add("active");					
					color = getBgColorHex(lis[i].children[0]);
				}				
			}
			
			
			this.style.fill = "url(#fill_gradient)";
			_start.setAttribute("stop-color", color);
			_end.setAttribute("stop-color", color);
			
			hideAllCenters(lisCenter);	
			
			if (centerName == "all") {
				showAllCenters(lisCenter);
			}
			else {
				showCenters(lisCenter, centerName);
			}
		}
	});
	
});




function hideAllCenters (lis) {
	for (var i=0; i<lis.length; i++) {
		$(lis[i]).hide(500);
	}
}



function showCenters (lis, name) {
	for (var i=0; i<lis.length; i++) {
		if (lis[i].classList.contains(name)) {
			$(lis[i]).show(500);
		}
	}
}



function showAllCenters (lis) {
	for (var i=0; i<lis.length; i++) {
		$(lis[i]).show(500);
	}	
}








function removeAllActiveLis (lis) {
	for (var i=0; i<lis.length; i++) {
		if (lis[i].classList.contains("active")) {
			lis[i].classList.remove("active");
		}			
	}	
}



function removeAllActiveCenter (paths) {
	for (var i=0; i<paths.length; i++) {
		if (paths[i].classList.contains("active")) {
			paths[i].classList.remove("active");
			paths[i].style.fill = "#FFF";
		}			
	}	
}



function getBgColorHex(elem){
    var color = $(elem).css('background-color')
    var hex;
    if(color.indexOf('#')>-1){
        //for IE
        hex = color;
    } else {
        var rgb = color.match(/\d+/g);
        hex = '#'+ ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
    }
    return hex;
}











jQuery(document).ready(function($) {	
	
	$('.faq-categories li').on('click', function(e) {
		var _faqCategories = this.parentElement;
		var _faqToggles = _faqCategories.nextElementSibling.children;

		if (this.classList.contains("active") == false) {
			var _categoryName = this.getAttribute("data-category");
			disableAllFaqToggles(_faqToggles);
			enableFaqToggles(_faqToggles, _categoryName);
			removeAllActiveFaqCategories(_faqCategories);
			this.classList.add("active");
		}	
		
	});
	
});


function disableAllFaqToggles (_faqToggles) {
	for (var i=0; i<_faqToggles.length; i++) {		
		$(_faqToggles[i]).slideUp(500);
		_faqToggles[i].classList.remove("active");	
	}
}

function enableFaqToggles (_faqToggles, _categoryName) {	
	for (var i=0; i<_faqToggles.length; i++) {	
		if (_faqToggles[i].classList.contains(_categoryName)) {
			$(_faqToggles[i]).slideDown(500);
			_faqToggles[i].classList.add("active");	
		}		
	}
}


function removeAllActiveFaqCategories (_faqCategories) {
	var cates = _faqCategories.children;
	for (var i=0; i<cates.length; i++) {
		cates[i].classList.remove("active");
	}
}






jQuery(document).ready(function($) {	
	
	Opened();
	
});

function Opened(e){

	if(e != null && e != '' && e != undefined) {
		var info = e.closest(".info");
		var content = info.getElementsByClassName("info-content")[0];	
		info.classList.toggle("opened");		
		e.classList.toggle("expanded");	
		$(content).slideToggle();	
	}
}

function activeTileFag(pCodeCd) {
	$('#list .active').removeClass('active');

	if(pCodeCd.length == 0){
		$("#list #boardCateAll").addClass('active');
	}else{
		$("#list #"+pCodeCd).addClass('active');	
	}
}






















