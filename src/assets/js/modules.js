





jQuery(document).ready(function($) {
	const draggableWrapper = document.querySelector('.draggable-items-wrapper');
	
	if (draggableWrapper) {
		let isDown = false;
		let startX;
		let scrollLeft;
	
		var start_movement = 0;
		var end_movement = 0;
	
	
		draggableWrapper.addEventListener('mousedown', (e) => {
			e.stopPropagation();
			isDown = true;
			draggableWrapper.classList.add('active');
			startX = e.pageX - draggableWrapper.offsetLeft;
			scrollLeft = draggableWrapper.scrollLeft;
	
			start_movement = e.pageX;
		});
	
	
		draggableWrapper.addEventListener('mouseleave', () => {
			isDown = false;
			draggableWrapper.classList.remove('active');
		});
	
	
		draggableWrapper.addEventListener('mouseup', (e) => {
			isDown = false;
			draggableWrapper.classList.remove('active');
			end_movement = e.pageX;
		});
	
	
		draggableWrapper.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - draggableWrapper.offsetLeft;
			const walk = (x - startX) * 1;
			draggableWrapper.scrollLeft = scrollLeft - walk;
		});
	
	
		$('.draggable-items-wrapper a').on('click', function(e) {
			e.preventDefault();
			var movement = end_movement - start_movement;
			if ((movement < 5) && (movement > -5)) {
				window.location.href = this.getAttribute("href");
			}
		});
	}
	

});










$('.tel input').keydown(function() {
	if (this.value.length > 3) {
		var nextInput = $(this).next().next();
		nextInput.focus();
	}
});




$('#checkout .credit-card .card-number input').keydown(function() {
	var nextInput = $(this).next().next();
	if (this.value.length > 3) {
		nextInput.focus();
	}
});


$('#checkout .credit-card .validity .input-2-digits').keydown(function() {
	if (this.value.length > 1) {
		var nextInput = $(this).next().next();
		nextInput.focus();
	}
});

$('#down-payment .credit-card .card-number input').keydown(function() {
	var nextInput = $(this).next().next();
	if (this.value.length > 3) {
		nextInput.focus();
	}
});


$('#down-payment .credit-card .validity .input-2-digits').keydown(function() {
	if (this.value.length > 1) {
		var nextInput = $(this).next().next();
		nextInput.focus();
	}
});

jQuery(document).ready(function($) {
	$('.module-tabs .tabs-nav li').on('click', function(e) {

		var tabsNav = this.closest(".tabs-nav");
		var lis = tabsNav.getElementsByTagName("li");

		for (var i = 0; i < lis.length; i++) {
			lis[i].classList.remove("active");
		}

		this.classList.add("active");





		var tabIndex = this.getAttribute("data-tab");

		var moduleTabs = this.closest(".module-tabs");
		var tabContents = moduleTabs.getElementsByClassName("tab-content");

		for (var i = 0; i < tabContents.length; i++) {
			tabContents[i].classList.remove("active");
		}

		for (var i = 0; i < tabContents.length; i++) {
			var index = tabContents[i].getAttribute("data-tab");
			if (tabIndex == index) {
				tabContents[i].classList.add("active");
			}
		}

	});
});

jQuery(document).ready(function($) {
	$('.popup.sponsorship-notice .filters-list .option').on('click', function(e) {

		var year = this.getAttribute("data-year");

		var popup_body = this.closest(".popup-body");

		var allstats = popup_body.getElementsByClassName("stats");

		for (var i = 0; i < allstats.length; i++) {
			allstats[i].classList.remove("active");
		}

		for (var i = 0; i < allstats.length; i++) {
			var stat_year = allstats[i].getAttribute("data-year");
			if (year == stat_year) {
				allstats[i].classList.add("active");
			}
		}

	});
});

jQuery(document).ready(function($) {
	$('#down-payment .recipient-list .radios-group input').on('click', function(e) {

		var value = this.getAttribute("value");

		var downPayment = document.getElementById("down-payment");
		var recipient = downPayment.getElementsByClassName("recipient")[0];
		var tables = recipient.getElementsByTagName("table");

		for (var i = 0; i < tables.length; i++) {
			var dataOption = tables[i].getAttribute("data-option");
			if (dataOption) {
				if (dataOption == value) {
					tables[i].style.display = "table";
				}
				else {
					tables[i].style.display = "none";
				}
			}
		}

	});
});






jQuery(document).ready(function($) {
	$('.payment-method.credit-card .card-type li input').on('click', function(e) {
		var value = this.getAttribute("value");

		var tbody = this.closest("tbody");
		var cardTypeTrs = tbody.getElementsByClassName("card-type-tr");

		for (var i = 0; i < cardTypeTrs.length; i++) {
			var _dataCard = cardTypeTrs[i].getAttribute("data-card");

			if (_dataCard == value) {
				cardTypeTrs[i].classList.add("active");
			}
			else {
				cardTypeTrs[i].classList.remove("active");
			}
		}

	});

});




/*------ Horizontal Chart --------*/

jQuery(document).ready(function($) {

	var hrCharts = document.getElementsByClassName("hr-chart");
	for (var i = 0; i < hrCharts.length; i++) {
		var valueRow = hrCharts[i].getElementsByClassName("value-row")[0];
		var lis = valueRow.getElementsByTagName("li");
		var max = 0;

		for (var j = 0; j < lis.length; j++) {
			var value = lis[j].children[0];
			var x = convertToIntValue(value.innerHTML);
			if (max <= x) {
				max = x;
			}
		}

		for (var j = 0; j < lis.length; j++) {
			var value = lis[j].children[0];
			var bar = lis[j].children[1];
			initBar(value, bar, max);
		}
	}

});



function initBar(value, bar, max) {
	var x = convertToIntValue(value.innerHTML);
	var _height = x / max * 150;
	bar.style.height = _height + "px";
}
/*--------- Calendar ---------*/

jQuery(document).ready(function($) {
	$('.calendar-table td').on('click', function(e) {

		var this_day = this.getAttribute("data-day");

		var calendar = this.closest(".calendar");
		var calendarSupportTable = calendar.getElementsByClassName("calendar-support-table")[0];

		var trs = calendarSupportTable.getElementsByTagName("tr");

		if (this_day) {
			if (calendarSupportTable.style.display != "none") {

				for (var i = 0; i < trs.length; i++) {
					trs[i].classList.remove("highlight");
				}

				for (var i = 0; i < trs.length; i++) {
					var data_day = trs[i].getAttribute("data-day");
					if (this_day == data_day) {
						scrollToElementCenterView(trs[i]);
						trs[i].classList.add("highlight");
					}
				}
			}
		}
		else {
			if (calendarSupportTable.style.display != "none") {
				for (var i = 0; i < trs.length; i++) {
					trs[i].classList.remove("highlight");
				}
			}
		}
	});
});

/*--------- Show Popup ---------*/


var currentFrameTop;
var currentFrameLeft;
var currentFrameBottom;
var currentFrameRight;

var currentFrame;

$(document).on("click", ".open-popup-btn", function() {
	var popupName = this.getAttribute("data-popup");
	var popups = document.getElementsByClassName("popup");

	for (var i = 0; i < popups.length; i++) {
		if (popups[i].classList.contains(popupName)) {
			popups[i].classList.add("opened");
			var body = document.querySelector("body");
			body.setAttribute("modal", "office-popup");
		}
	}
});







/*--------- Hide Popup ---------*/

jQuery(document).ready(function($) {
	$('.popup').on('click', function(e) {
		var _popupContent = this.getElementsByClassName("popup-content")[0];
		var _popRect = _popupContent.getBoundingClientRect();
		if ((e.clientX < _popRect.left) || (e.clientX > _popRect.right) || (e.clientX < _popRect.top)) {
			this.classList.remove("opened");
			var body = document.querySelector("body");
			body.setAttribute("modal", "");
		}
	});
});



jQuery(document).ready(function($) {
	$('.close-popup-btn').on('click', function(e) {
		var popup = this.closest(".popup");
		popup.classList.remove("opened");
		var body = document.querySelector("body");
		body.setAttribute("modal", "");
	});
});







/*------- Click Popup | Standard Name Browsing -------*/

jQuery(document).ready(function($) {
	$('.popup.name-browsing tbody tr').on('click', function(e) {

		var searchingResult = this.closest(".searching-result");
		var nameSelected = searchingResult.getElementsByClassName("name-selected")[0];
		var span = nameSelected.getElementsByTagName("span")[0];

		var name = this.children[0].innerHTML.split("(")[0];
		span.innerHTML = name;

		var popup = this.closest(".popup");
		popup.classList.remove("opened");
	});
});




/*------- Click Popup | Recent Address Browsing -------*/

jQuery(document).ready(function($) {
	closePopup();


	$('.popup').on('click', function(e) {
		var _popupContent = this.getElementsByClassName("popup-content")[0];
		/*
		if (!_popupContent.contains(e.target)){
			
			this.classList.remove("opened");
		}
		*/
	});
});

function closePopup() {
	$('.popup.recent-address-browsing .hr-table tbody tr').on('click', function(e) {

		/* Do something here */

		var popup = this.closest(".popup");
		popup.classList.remove("opened");
	});

	$('.popup.address-browsing .hr-table tbody tr').on('click', function(e) {

		var popup = this.closest(".popup");
		popup.classList.remove("opened");

	});

	$('.popup.name-browsing .hr-table tbody tr').on('click', function(e) {

		var popup = this.closest(".popup");
		popup.classList.remove("opened");

	});

	$('.popup.recommender-browsing .hr-table tbody tr').on('click', function(e) {

		var popup = this.closest(".popup");
		popup.classList.remove("opened");

	});
}

jQuery(document).ready(function($) {
	closePopupMobile();
});


function closePopupMobile() {

	$('.popup.recent-address-browsing .hr-mobile-table tbody').on('click', function(e) {

		/* Do something here */

		var popup = this.closest(".popup");
		popup.classList.remove("opened");
	});

}




/*------- Click Popup | Address Browsing -------*/


jQuery(document).ready(function($) {
	$('#terms-n-condition .row.btns a:first-child').on('click', function(e) {
		e.preventDefault();
		var _termConditions = this.closest("#terms-n-condition");
		var _lis = _termConditions.getElementsByTagName("li");
		var _url = this.getAttribute("href");

		if (validateTermsCondition(_lis) == true) {
			window.location.href = _url;
		}
	});
});








jQuery(document).ready(function($) {
	$('#terms-n-condition .infos li').on('click', function(e) {
		var _input = this.getElementsByTagName("input")[0];
		var _lis = this.parentElement.children;

		if (_input.getAttribute("id") == "checkAll") {
			if (_input.checked == true) {
				checkAll(_lis);
			}
			else {
				uncheckAll(_lis);
			}
		}
	});
});



function validateTermsCondition(_lis) {
	var result = true;
	for (var i = 0; i < _lis.length; i++) {
		var _input = _lis[i].getElementsByTagName("input")[0];
		if (_input.checked == false) {
			result = false;
		}
	}
	return result;
}


function checkAll(_lis) {
	for (var i = 0; i < _lis.length; i++) {
		var _input = _lis[i].getElementsByTagName("input")[0];
		_input.checked = true;
	}
}

function uncheckAll(_lis) {
	for (var i = 0; i < _lis.length; i++) {
		var _input = _lis[i].getElementsByTagName("input")[0];
		_input.checked = false;
	}
}













function selectOption() {
	$('.dropdown-select .option').on('click', function(e) {
		/*e.stopPropagation();*/
		
		var optionValue = this.innerHTML;

		var dropdownSelect = this.closest(".dropdown-select");
		var liOptions = dropdownSelect.getElementsByClassName("option");

		for (var i = 0; i < liOptions.length; i++) {
			liOptions[i].classList.remove("active");
		}
		this.classList.add("active");
	

		var _selected = this.parentNode.previousElementSibling;
		var _btn = _selected.children[1];
		_selected.children[0].innerHTML = optionValue;
		_btn.classList.toggle("opened");
		$(this.parentNode).slideUp(300);
		
		
		
		var pagination = this.parentElement.parentElement.parentElement.parentElement;
		
		if (pagination) {
			var results = this.closest(".results");
			if(null !== results) {
				var all_paginations = results.getElementsByClassName("pagination");
			
				for (var i=0; i<all_paginations.length; i++) {
					var dropdown_select = all_paginations[i].getElementsByClassName("dropdown-select")[0];
					var selectedDiv = dropdown_select.getElementsByClassName("selected")[0];
					selectedDiv.children[0].innerHTML = optionValue;
				}
			}
		}
	});
}





jQuery(document).ready(function($) {
	$('.dropdown-select .selected').on('click', function(e) {
		e.stopPropagation();
		//closeAllSelect();
		var _btn = this.children[1];
		_btn.classList.toggle("opened");
		$(this.nextElementSibling).slideToggle(300);


		var value = this.getElementsByTagName("span")[0].innerHTML;
		var optionsDiv = this.nextElementSibling;
		
		var options = optionsDiv.children;
		
		if (options.length > 0) {
			for (var i=0; i<options.length; i++) {
				var option_value = options[i].innerHTML;
				if (value == option_value) {					
					options[i].classList.add("active");
				}
			}
		}		

	});

});



 /*
         1. Lấy giá trị của selected
         2. Lấy danh sách option
         3. So sánh giá trị của selected và các giá trị trong danh sách option
         4. Nếu option nào có giá trị = giá trị của selected thì thêm class ACTIVE   
       */





document.addEventListener("click", closeAllSelect);

function closeAllSelect() {
	var dropdownSelects = document.getElementsByClassName("dropdown-select");
	for (i = 0; i < dropdownSelects.length; i++) {
		var options = dropdownSelects[i].getElementsByClassName("options")[0];
		var btn = dropdownSelects[i].getElementsByClassName("btn-open-sub ")[0];

		if (btn.classList.contains("opened")) {
			$(options).slideUp(300);
			btn.classList.remove("opened");
		}
	}
}


jQuery(document).ready(function($) {
	$('#down-payment .recipient-list .radios-group input').on('click', function(e) {

		var value = this.getAttribute("value");

		var downPayment = document.getElementById("down-payment");
		var recipient = downPayment.getElementsByClassName("recipient")[0];
		var tables = recipient.getElementsByTagName("table");

		for (var i = 0; i < tables.length; i++) {
			var dataOption = tables[i].getAttribute("data-option");
			if (dataOption) {
				if (dataOption == value) {
					tables[i].style.display = "table";
				}
				else {
					tables[i].style.display = "none";
				}
			}
		}

	});
});






jQuery(document).ready(function($) {
	$('.payment-method.credit-card .card-type li input').on('click', function(e) {
		var value = this.getAttribute("value");

		var tbody = this.closest("tbody");
		var cardTypeTrs = tbody.getElementsByClassName("card-type-tr");

		for (var i = 0; i < cardTypeTrs.length; i++) {
			var _dataCard = cardTypeTrs[i].getAttribute("data-card");

			if (_dataCard == value) {
				cardTypeTrs[i].classList.add("active");
			}
			else {
				cardTypeTrs[i].classList.remove("active");
			}
		}

	});

});


function selectorDraggableWrappers() {
	const draggableWrappers = document.querySelectorAll('.draggable-items-wrapper');
	
	if (draggableWrappers.length > 0) {
		for (var i=0; i<draggableWrappers.length; i++) {
			
			var draggableWrapper = draggableWrappers[i];
			
			if (draggableWrapper) {
				let isDown = false;
				let startX;
				let scrollLeft;
				
				var start_movement = 0;
				var end_movement = 0;	
				
				draggableWrapper.addEventListener('mousedown', (e) => {
					e.stopPropagation();
					isDown = true;
					draggableWrapper.classList.add('active');
					startX = e.pageX - draggableWrapper.offsetLeft;
					scrollLeft = draggableWrapper.scrollLeft;
					
					start_movement = e.pageX;
				});
				
				
				draggableWrapper.addEventListener('mouseleave', () => {
					isDown = false;
					draggableWrapper.classList.remove('active');
				});
				
				
				draggableWrapper.addEventListener('mouseup', (e) => {
					isDown = false;
					draggableWrapper.classList.remove('active');
					end_movement = e.pageX;
				});
				
				
				draggableWrapper.addEventListener('mousemove', (e) => {
					if (!isDown) return;
					e.preventDefault();
					const x = e.pageX - draggableWrapper.offsetLeft;
					const walk = (x - startX) * 1;
					draggableWrapper.scrollLeft = scrollLeft - walk;
				});
				
				
				$('.draggable-items-wrapper a').on('click', function(e) {
					e.preventDefault();
					var movement = end_movement - start_movement;
					if ((movement < 5) && (movement > -5)) {
						window.location.href = this.getAttribute("href");
					}
				});
			}	
		}
	}
}


