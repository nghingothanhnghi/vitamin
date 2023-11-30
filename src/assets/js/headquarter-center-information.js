





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
			$(".chart-map input").val("");
			
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
			} else {
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
			
			var id = this.getAttribute("id");
			
			removeAllActiveLis(lis);
			removeAllActiveCenter(paths);
			
			var color, centerName;
			
			this.classList.add("active");
			
			for (var i=0; i<lis.length; i++) {
				centerName = lis[i].getAttribute("data-name");
				if (id == centerName) {
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
				showCenters(lisCenter, id);
			}
		}
	});
	
});





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

function searchCenter() {
	const key = $(".chart-map input").val();
	const lis = $(".center-list .lis-wrapper li");
	const active = $(".chart-map .lis-map .active").attr("data-name");
	
	let name = "";
	let location = "";
	let phone = "";
	
	let arr;
	let temp;
	let li;
	let classes = [];
	
	let flag;
	
	$(".center-list .lis-wrapper li").hide(500);
	
	for (let i = 0; i < lis.length; i++) {
		li = lis[i];
		classes = $(li).attr("class").split(/\s+/);
		
		if (!(active === "all")) {
			if (!classes.includes(active)) continue;
		}

		arr = $(li).children();	
		
		name = $(arr[0]).text().trim();
		temp = $(arr[1]).children();
		location = $(temp[1]).text().trim();
		temp = $(arr[2]).children();
		phone = $(temp[1]).text().trim();
		
		flag = false;
		if (name.includes(key)) {
			flag = true;
		} else if (location.includes(key)) {
			flag = true;
		} else if (phone.includes(key)) {
			flag = true;
		} else if ((name + " " + location + " " + phone + "").includes(key)) {
			flag = true;
		}
		
		if (flag) {
			$(li).show(500);
		}
	}
}

$(document).ready(function() {
	$(".chart-map #search-submit").on("click", function() {
		searchCenter();
	});
	
	$(".chart-map input").on("keyup", function(e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			searchCenter();
		}
	});
})