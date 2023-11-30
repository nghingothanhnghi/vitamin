





jQuery(window).ready(function() {
	
	addMobileHeading(); 
});



function addMobileHeading () {
	var cart_table = document.getElementsByClassName("cart-table")[0];
	var thead = cart_table.getElementsByTagName("thead")[0];
	var tbody = cart_table.getElementsByTagName("tbody")[0];
	
	var product_label = thead.children[0].children[1].innerHTML;
	var unit_price_label = thead.children[0].children[2].innerHTML;
	var total_price_label = thead.children[0].children[3].innerHTML;
	var quantity_label = thead.children[0].children[4].innerHTML;
	
	var rows = tbody.children;
	
	for (var i=0; i<rows.length; i++) {
		
		var _td_product = rows[i].children[1];
		var _td_unit_price = rows[i].children[2];
		var _td_total_price = rows[i].children[3];
		var _td_quantity = rows[i].children[4];
		
		/*
		var span_1 = document.createElement("span");
		span_1.classList.add("td-mobile-heading");
		span_1.innerHTML = product_label;
		_td_product.insertBefore(span_1, _td_product.firstChild);
		*/
				
		var span_2 = document.createElement("span");
		span_2.classList.add("td-mobile-heading");
		span_2.innerHTML = unit_price_label;
		_td_unit_price.insertBefore(span_2, _td_unit_price.firstChild);
		
		
		
		var span_3 = document.createElement("span");
		span_3.classList.add("td-mobile-heading");
		span_3.innerHTML = total_price_label;
		_td_total_price.insertBefore(span_3, _td_total_price.firstChild);
		
		/*
		var span_4 = document.createElement("span");
		span_4.classList.add("td-mobile-heading");
		span_4.innerHTML = quantity_label;	
		_td_quantity.insertBefore(span_4, _td_quantity.firstChild);
	*/		
		
		
		
		
		
	}
}












jQuery(window).resize(function() {
	
	var width = window.innerWidth;			
	if (width <= 991) {
		createMobileTable();
	}
	else {		
		deleteMobileTable();	
	}
});



jQuery(document).ready(function($) {
	
	var width = window.innerWidth;		
	if (width <= 991) {
		createMobileTable();
	}
	else {		
		deleteMobileTable();	
	}
});





function createMobileTable () {
	var cartTotalTable = document.getElementsByClassName("cart-total-table")[0];
	
	var mobileCartTotalTable = document.getElementsByClassName("mobile-cart-total-table")[0];
	if(mobileCartTotalTable){
		
	} 
	else {
		var oldTHeadRows = cartTotalTable.children[0].children[0].children;
		var oldTBodyRows = cartTotalTable.children[1].children[0].children;
		
		mobileCartTotalTable = document.createElement("TABLE");	
		mobileCartTotalTable.setAttribute("class", "mobile-cart-total-table");
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

		cartTotalTable.parentNode.appendChild(mobileCartTotalTable);
	}	
	
}


function deleteMobileTable () {
	var mobileCartTotalTable = document.getElementsByClassName("mobile-cart-total-table")[0];
	if(mobileCartTotalTable){
		mobileCartTotalTable.remove();
	}
	
}





