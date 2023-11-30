










jQuery(document).ready(function($) {	
	$('#cart .remove').on('click', function(e) {	
		e.preventDefault();	
		var tr = this.closest('tr');
		tr.remove();
		updateCartTotal(getTotalAmount(), getTotalPV());
	});	
	
	
	$('#cart-details .plus').on('click', function(e) {	
		e.preventDefault();			
		var tr = this.closest('tr');
		updateCartDetailsRow(tr, 1);
		updateCartTotal(getTotalAmount(), getTotalPV());
	});		
	
		
	$('#cart-details .minus').on('click', function(e) {	
		e.preventDefault();			
		var tr = this.closest('tr');
		updateCartDetailsRow(tr, -1);
		updateCartTotal(getTotalAmount(), getTotalPV());
	});	
});







function updateCartDetailsRow (tr, x) {	
	var quantityValue = tr.getElementsByClassName("quantity-value")[0];
	var quantity = parseInt(quantityValue.innerHTML);
	
	var amountValue = tr.getElementsByClassName("amount-value")[0];
	var amount = convertToIntValue(amountValue.innerHTML);
	
	var pvValue = tr.getElementsByClassName("pv-value")[0];
	var pv = convertToIntValue(pvValue.innerHTML);
	
	var amountPerUnit = amount/quantity;
	var pvPerUnit = pv/quantity;
	
	var newQuantity = quantity + x;
	
	if (newQuantity < 1) {
		newQuantity = 1;
	}

	quantityValue.innerHTML = newQuantity;		
	amountValue.innerHTML = convertToIntString(amountPerUnit*newQuantity);	
	pvValue.innerHTML = convertToIntString(pvPerUnit*newQuantity);	
	
}









function getTotalAmount () {
	var _cartDetails = document.getElementById("cart-details");
	var _table = _cartDetails.getElementsByTagName("table")[0];
	
	var _trs = _table.children[1].children;	
	var _totalAmount = 0;
	
	for (var i=0; i<_trs.length; i++) {
		var _amountValue = _trs[i].getElementsByClassName("amount-value")[0];
		var _amount = convertToIntValue(_amountValue.innerHTML);
		_totalAmount = _totalAmount + _amount;
	}	
	return _totalAmount;	
}


function getTotalPV () {
	var _cartDetails = document.getElementById("cart-details");
	var _table = _cartDetails.getElementsByTagName("table")[0];
	
	var _trs = _table.children[1].children;
	
	var _totalPV = 0;
	
	for (var i=0; i<_trs.length; i++) {
		var _pvValue = _trs[i].getElementsByClassName("pv-value")[0];
		var _pv = convertToIntValue(_pvValue.innerHTML);
		_totalPV = _totalPV + _pv;
	}
	
	return _totalPV;	
}






function updateCartTotal (_totalAmount, _totalPV) {
	var _cartTotal = document.getElementById("cart-total");
	var _table = _cartTotal.getElementsByTagName("table")[0];
	
	var totalOrderAmount = _cartTotal.getElementsByClassName("totalOrderAmount")[0];
	var totalPV = _cartTotal.getElementsByClassName("totalPV")[0];
	var totalProductAmount = _cartTotal.getElementsByClassName("totalProductAmount")[0];
	var shippingFee = _cartTotal.getElementsByClassName("shippingFee")[0];
	var totalPayment = _cartTotal.getElementsByClassName("totalPayment")[0];
	
	var span_1 = totalOrderAmount.getElementsByClassName("value")[0].children[0];
	var span_2 = totalPV.getElementsByClassName("value")[0].children[0];
	var span_3 = totalProductAmount.getElementsByClassName("value")[0].children[0];
	var span_4 = shippingFee.getElementsByClassName("value")[0].children[0];
	var span_5 = totalPayment.getElementsByClassName("value")[0].children[0];	
	
	span_1.innerHTML = convertToIntString(_totalAmount);
	span_2.innerHTML = convertToIntString(_totalPV);
	span_3.innerHTML = convertToIntString(_totalAmount);

	var _shippingFee = convertToIntValue(span_4.innerHTML);
	span_5.innerHTML = convertToIntString(_totalAmount + _shippingFee);	
}





function convertToIntValue (_string) {
	return parseInt(_string.replace(/,/g, ''), 10);
}

function convertToIntString (_value) {
	return _value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}









