





jQuery(document).ready(function($) {	
	$('#shipping-information .shipping-radio .radios-group input').on('click', 
	function(e) {	
		
		var value = this.getAttribute("value");		
		var tbody = this.closest("tbody");		
		var trs = tbody.getElementsByTagName("tr");
		
		if (value == "1") {
			/*-- Get the information of current user --*/
			
		}
		
		if (value == "2") {			
			for (var i=1; i<trs.length; i++) {
				
				var inputs = trs[i].getElementsByTagName("input");				
				for (var j=0; j<inputs.length; j++) {
					inputs[j].setAttribute("value", "");
				}
				
				var textareas = trs[i].getElementsByTagName("textarea");
				for (var j=0; j<textareas.length; j++) {
					textareas[j].value = "";
				}
			}
			
		}
		
		if (value == "3") {
			/*-- Get the information from popup - Center List --*/
			
		}
	});	
	
});






jQuery(document).ready(function($) {	
	
	
	$('#make-a-payment .payment-method-radios li input').on('click', function(e) {			

		var officeForm = this.closest(".office-form");
		var formCards = officeForm.getElementsByClassName("form-card");
		
		var value = this.getAttribute("value");

		for (var i=0; i<formCards.length; i++) {
			
			if (formCards[i].getAttribute("data-method") == value) {				
				if (formCards[i].classList.contains("active") == false) {
					for (var j=0; j<formCards.length; j++) {
						$(formCards[j]).slideUp(500);
						formCards[j].classList.remove("active");	
					}
					formCards[i].classList.add("active");	
					$(formCards[i]).slideDown(500);
				}
			}
					
		}
		
	});
	

	
	$('#make-a-payment .cards-selection li').on('click', function(e) {	
		
		var formCard = this.closest(".form-card");
		
		var cardTypes = formCard.getElementsByClassName("card-type");
		var wCards = formCard.getElementsByClassName("w-card");
		
		var value = this.getAttribute("data-index");
		
		if (this.classList.contains("active") == false) {
			for (var i=0; i<cardTypes.length; i++) {
				if (cardTypes[i].getAttribute("data-card") == value) {
					cardTypes[i].classList.add("active");	
					$(cardTypes[i]).slideDown(500);
				} else {
					cardTypes[i].classList.remove("active");
					$(cardTypes[i]).slideUp(500);
				}
					
			}	
			
			for (var i=0; i<wCards.length; i++) {
				wCards[i].classList.remove("active");					
			}			
			
			this.classList.add("active");
		}
		
		
		
 
		
	});
	





});


/*

jQuery(document).ready(function($) {	
	var _productContent = document.getElementById("checkout-tabs");
	

	var _tabsNav = document.getElementById("tabs-nav");

	var _tabsNavLis = _tabsNav.getElementsByTagName("li");
	var _tabContents = _productContent.getElementsByClassName("tab-content");	
	
	$('#checkout-tabs #tabs-nav li').on('click', function(e) {			
		e.preventDefault();	
		if (this.classList.contains("active-card") == false) {

			for (var i=0; i<_tabsNavLis.length; i++) {
				_tabsNavLis[i].classList.remove("active-card");
			}
			
			for (var i=0; i<_tabContents.length; i++) {
				$(_tabContents[i]).slideUp(500);
			}
			
			this.classList.add("active-card");
			var _index = this.getAttribute("data-index");
			
			for (var i=0; i<_tabContents.length; i++) {
				if (_tabContents[i].getAttribute("data-index") == _index) {
					$(_tabContents[i]).slideDown(500);
				}
			}
		
		}
		
	});





		
	var _productContent_5 = document.getElementById("checkout-tabs-5");

	var _tabsNav_5 = document.getElementById("tabs-nav-5");

	var _tabsNavLis_5 = _tabsNav_5.getElementsByTagName("li");
	var _tabContents_5 = _productContent_5.getElementsByClassName("tab-content-5");	
	
	$('#checkout-tabs-5 #tabs-nav-5 li').on('click', function(e) {			
		e.preventDefault();	
		if (this.classList.contains("active-card") == false) {

			for (var i=0; i<_tabsNavLis_5.length; i++) {
				_tabsNavLis_5[i].classList.remove("active-card");
			}
			
			for (var i=0; i<_tabContents_5.length; i++) {
				$(_tabContents_5[i]).slideUp(500);
			}
			
			this.classList.add("active-card");
			var _index = this.getAttribute("data-index-5");
			
			for (var i=0; i<_tabContents_5.length; i++) {
				if (_tabContents_5[i].getAttribute("data-index-5") == _index) {
					$(_tabContents_5[i]).slideDown(500);
				}
			}
		
		}
});







	
	// var _productContent_5 = document.getElementById("checkout-tabs-5");
	// var _tabsNav_5 = document.getElementById("tabs-nav-5");
	// var _tabsNavLis_5 = _tabsNav_5.getElementsByTagName("li");
	// var _tabContents_5 = _productContent_5.getElementsByClassName("tab-content-5");	
	
	// $('#checkout-tabs-5 #tabs-nav-5 li').on('click', function(e) {			
	// 	e.preventDefault();	
	// 	if (this.classList.contains("active") == false) {
	// 		for (var i=0; i<_tabsNavLis_5.length; i++) {
	// 			_tabsNavLis_5[i].classList.remove("active");
	// 		}
			
	// 		for (var i=0; i<_tabContents_5.length; i++) {
	// 			$(_tabContents_5[i]).slideUp(500);
	// 		}
			
	// 		this.classList.add("active");
	// 		var _index = this.getAttribute("data-index-5");
			
	// 		for (var i=0; i<_tabContents_5.length; i++) {
	// 			if (_tabContents_5[i].getAttribute("data-index-5") == _index) {
	// 				$(_tabContents_5[i]).slideDown(500);
	// 			}
	// 		}			
	// 	}
		
	// });

});

*/







// jQuery(document).ready(function($) {	
// 	var _checkoutContent = document.getElementById("checkout-tabs-5");

// 	var _tabsNav = document.getElementById("tabs-nav");
// 	var _tabsNavLis = _tabsNav.getElementsByTagName("li");
// 	var _tabContents = _checkoutContent.getElementsByClassName("tab-content");	
	
// 	$('#checkout-tabs #tabs-nav li').on('click', function(e) {			
// 		e.preventDefault();	
// 		if (this.classList.contains("active") == false) {
// 			for (var i=0; i<_tabsNavLis.length; i++) {
// 				_tabsNavLis[i].classList.remove("active");
// 			}
			
// 			for (var i=0; i<_tabContents.length; i++) {
// 				$(_tabContents[i]).slideUp(500);
// 			}
			
// 			this.classList.add("active");
// 			var _index = this.getAttribute("data-index");
			
// 			for (var i=0; i<_tabContents.length; i++) {
// 				if (_tabContents[i].getAttribute("data-index") == _index) {
// 					$(_tabContents[i]).slideDown(500);
// 				}
// 			}			
// 		}
		
// 	});
	
// });



















jQuery(document).ready(function($) {	

	$('.down-pay-table .down-pay-check').on('click', function(e) {
		updateDownPayCheckbox(this);
	});	
	
	$('.down-pay-mobile-table .down-pay-check').on('click', function(e) {
		updateMobileDownPayCheckbox(this);
	});	
	
});


function updateDownPayCheckbox (checkBox) {		
	
	var table = checkBox.closest("table");
	var _boxes = table.getElementsByClassName("down-pay-check");
	
	var tfoot = table.getElementsByTagName("tfoot")[0];
	var _span = tfoot.getElementsByTagName("span")[0];
	
	var total = 0;
	
	for (var i=0; i<_boxes.length; i++) {
		if (_boxes[i].checked) {	
			var _valueTd = _boxes[i].parentElement.previousElementSibling;
			var _value = convertToIntValue(_valueTd.innerHTML);
			total = total + _value;
			
		}		
	}
	
	_span.innerHTML = convertToIntString(total);
}




function updateMobileDownPayCheckbox (checkBox) {		
	
	var table = checkBox.closest("table");
	var _boxes = table.getElementsByClassName("down-pay-check");
	
	var tfoot = table.getElementsByTagName("tfoot")[0];
	var _span = tfoot.getElementsByTagName("span")[0];
	
	var total = 0;
	
	for (var i=0; i<_boxes.length; i++) {
		if (_boxes[i].checked) {	
			var _tbody = _boxes[i].closest("tbody");
			var lastTr = _tbody.children[_tbody.children.length - 1];
			var _valueTd = lastTr.children[1];
			var _value = convertToIntValue(_valueTd.innerHTML);
			total = total + _value;
			
		}		
	}
	
	_span.innerHTML = convertToIntString(total);
}


jQuery(document).ready(function($) {
	$('input[class="input-10-digits"]').keypress(function() {
    	if (this.value.length >= 10) {
       	 return false;
   		}
	});


	$('input[class="input-6-digits"]').keypress(function() {
	    if (this.value.length >= 8) {
	        return false;
	    }
	});
	
	
	$('.input-4-digits').keypress(function() {
	    if (this.value.length >= 4) {
	        return false;
	    }
	});
	
	$('.input-2-digits').keypress(function() {
	    if (this.value.length >= 2) {
	        return false;
	    }
	});

});


/*

jQuery(document).ready(function($) {	

	var makeAPayment = document.getElementById("make-a-payment");
	
	if (makeAPayment) {
		var method_list = makeAPayment.getElementsByClassName("method-list")[0];
	
		var radios = method_list.getElementsByClassName("radios-group")[0].children;	
		for (var i=0; i<radios.length; i++) {
			var input = radios[i].getElementsByTagName("input")[0];
			if (input.checked) {			
				currentValue = input.getAttribute("value");
			}
		}
	}	
});

*/






jQuery(document).ready(function($) {	

	$('.method-list .radios-group li input').on('click', function(e) {

		var _section = this.closest("section");		
		var paymentMethods = _section.getElementsByClassName("payment-method");
		
		var value = this.getAttribute("value");
		
		if (this.checked == true) {
			for (var i=0; i<paymentMethods.length; i++) {
				paymentMethods[i].classList.remove("active-method");				
			}

			for (var i=0; i<paymentMethods.length; i++) {
				var dataMethod = paymentMethods[i].getAttribute("data-method");
				if (dataMethod == value) {
					paymentMethods[i].classList.add("active-method");	
				}
			}
		}		
	});	
	
});









jQuery(document).ready(function($) {	
	withTable();
	
	
});


function withTable(){
	var windowWidth = window.innerWidth;
	
	if (windowWidth > 992) {
		var mainMenu = document.getElementById("main-menu");
		var _firstItem = mainMenu.getElementsByClassName("menu-item")[0];
		var _width = _firstItem.getBoundingClientRect().width;
		
		
		var _firstColAdjustTables = document.getElementsByClassName("first-col-adjust");
		
	
		for (var i=0; i<_firstColAdjustTables.length; i++) {
			var _thead = _firstColAdjustTables[i].getElementsByTagName("thead")[0];
			var _tbody = _firstColAdjustTables[i].getElementsByTagName("tbody")[0];
			
			var _theadRows = _thead.getElementsByTagName("tr");
			var _tbodyRows = _tbody.getElementsByTagName("tr");
			
			for (var j=0; j<_theadRows.length; j++) {
				var _th1 = _theadRows[j].children[0];			
			}
			
			for (var j=0; j<_tbodyRows.length; j++) {
				var _td1 = _tbodyRows[j].children[0];
				_td1.style.width = _width + "px";
			}
		}
	}
}









jQuery(document).ready(function($) {	
	$('.payment-method .card-type li input').on('click', function(e) {	
		var value = this.getAttribute("value");
		
		var tbody = this.closest("tbody");
		var cardTypeTrs = tbody.getElementsByClassName("card-type-tr");
		
		for (var i=0; i<cardTypeTrs.length; i++) {
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


jQuery(document).ready(function($) {	

	var windowWidth = window.innerWidth;
	
	if (windowWidth > 992) {
		var mainMenu = document.getElementById("main-menu");
		var _firstItem = mainMenu.getElementsByClassName("menu-item")[0];
		var _width = _firstItem.getBoundingClientRect().width;
		
		
		var _firstColAdjustTables = document.getElementsByClassName("first-col-adjust");
		
	
		for (var i=0; i<_firstColAdjustTables.length; i++) {
			var _thead = _firstColAdjustTables[i].getElementsByTagName("thead")[0];
			var _tbody = _firstColAdjustTables[i].getElementsByTagName("tbody")[0];
			
			var _theadRows = _thead.getElementsByTagName("tr");
			var _tbodyRows = _tbody.getElementsByTagName("tr");
			
			for (var j=0; j<_theadRows.length; j++) {
				var _th1 = _theadRows[j].children[0];			
			}
			
			for (var j=0; j<_tbodyRows.length; j++) {
				var _td1 = _tbodyRows[j].children[0];
				_td1.style.width = _width + "px";
			}
		}
	}
	
	
});
































