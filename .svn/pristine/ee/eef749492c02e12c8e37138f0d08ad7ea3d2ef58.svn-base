






jQuery(window).ready(function() {	
	addMobileHeading(); 

});



function addMobileHeading () {
	var cart_info_table = document.getElementsByClassName("cart-info-table")[0];
	var thead = cart_info_table.getElementsByTagName("thead")[0];
	var tbody = cart_info_table.getElementsByTagName("tbody")[0];
	
	var rows = tbody.children;	
	var ths = thead.children[0].children;
	
	for (var i=0; i<rows.length; i++) {
		addContentSpan(rows[i]);
	}	
	
	for (var i=0; i<rows.length; i++) {
		addLabelSpan(rows[i].children, ths);
	}
	
}



function addLabelSpan (tds, ths) {
	for (var i=0; i<tds.length; i++) {	
		var _span = document.createElement("span");
		_span.classList.add("td-mobile-left-span");
		_span.innerHTML = ths[i].innerHTML;	
		
		//tds[i].prepend(_span);
		tds[i].insertBefore(_span, tds[i].firstChild);
	}	
}




function addContentSpan (tr) {	
	for (var i=0; i<tr.children.length; i++) {
		var _span = document.createElement("span");
		_span.innerHTML = tr.children[i].innerHTML;
		tr.children[i].innerHTML = "";
		tr.children[i].appendChild(_span);
	}
}







jQuery(document).ready(function($) {

	var _table_4 = document.getElementById("table-4");
	
	var _optionsX = _table_4.getElementsByClassName("option-x");
	var _options3 = _table_4.getElementsByClassName("option-3");
	
	var _radio_selects = _table_4.getElementsByClassName("radio-select");
	var current_index = "";
	
	for (var i=0; i<_radio_selects.length; i++) {
		if (_radio_selects[i].children[0].checked == true) {
			current_index = i+1;
		}
	}



	$('#table-4 .radio-select').on('click', function(e) {	
		e.stopPropagation();
		
		var new_index = this.children[0].getAttribute("value");

		if (current_index != new_index) {
			if (new_index == "3") {
				displayOptions(_options3);
				hideOptions(_optionsX);
			}
			else {
				displayOptions(_optionsX);
				hideOptions(_options3);
			}
			
			current_index = new_index;
		}	

	});

});



jQuery(document).ready(function($) {

	var _table_6 = document.getElementById("table-6");
	
	var _options1 = _table_6.getElementsByClassName("option-1");
	var _options2 = _table_6.getElementsByClassName("option-2");
	var _options3 = _table_6.getElementsByClassName("option-3");
	var _options4 = _table_6.getElementsByClassName("option-4");
	
	var _radio_selects = _table_6.getElementsByClassName("radio-select");
	var current_index = "";
	
	for (var i=0; i<_radio_selects.length; i++) {
		if (_radio_selects[i].children[0].checked == true) {
			current_index = i+1;
		}
	}

	$('#table-6 .radio-select').on('click', function(e) {	
		e.stopPropagation();
		
		var new_index = this.children[0].getAttribute("value");

		if (current_index != new_index) {
			if (new_index == "1") {
				displayOptions(_options1);
				hideOptions(_options2);
				hideOptions(_options3);
				hideOptions(_options4);
			}
			if (new_index == "2") {
				displayOptions(_options2);
				hideOptions(_options1);
				hideOptions(_options3);
				hideOptions(_options4);
			}
			if (new_index == "3") {
				displayOptions(_options3);
				hideOptions(_options1);
				hideOptions(_options2);
				hideOptions(_options4);
			}
			if (new_index == "4") {
				displayOptions(_options4);
				hideOptions(_options1);
				hideOptions(_options2);
				hideOptions(_options3);
			}
			
			current_index = new_index;
		}	

	});

});



function hideOptions (_options) {
	var width = window.innerWidth;		
	for (var i=0; i<_options.length; i++) {
		_options[i].style.display = "none";
	}
}


function displayOptions (_options) {
	var width = window.innerWidth;		
	for (var i=0; i<_options.length; i++) {
		_options[i].style.display = "table-row";
	}
}






jQuery(document).ready(function($) {	
	createAllTable();
});




function createAllTable () {
	var _horizontalTable = document.getElementsByClassName("horizontal-table");
	for (var i=0; i<_horizontalTable.length; i++) {
		if (_horizontalTable[i]) {
			createMobileHorizontalTable(_horizontalTable[i]);
		}		
	}
}





function createMobileHorizontalTable (_table) {
	
	var mobileCartTotalTable = document.getElementsByClassName("mobile-cart-total-table")[0];
	if(mobileCartTotalTable) {
		
	} 
	else {
		var oldTHeadRows = _table.children[0].children[0].children;
		var oldTBodyRows = _table.children[1].children[0].children;
		
		mobileCartTotalTable = document.createElement("TABLE");	
		mobileCartTotalTable.setAttribute("class", "mobile-horizontal-table");
		var _tbody = document.createElement("tbody");
		mobileCartTotalTable.appendChild(_tbody);
		
		for (var i=0; i<oldTHeadRows.length; i++) {
			var _tr = document.createElement("tr");			

			var _tdLeft = document.createElement("td");
			_tdLeft.innerHTML = oldTHeadRows[i].innerHTML;
			_tr.appendChild(_tdLeft);
			
			var _tdRight = document.createElement("td");
			_tdRight.innerHTML = oldTBodyRows[i].innerHTML;
			_tr.appendChild(_tdRight);

			_tbody.appendChild(_tr);
		}	

		_table.parentNode.appendChild(mobileCartTotalTable);
	}	
	
}



