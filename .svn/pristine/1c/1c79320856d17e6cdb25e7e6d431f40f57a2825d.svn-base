









jQuery(document).ready(function($) {
	var _allProducts = document.getElementById("all-products");
	if (isNullOrEmpty(_allProducts)) {
		return;
	}
	var _results = _allProducts.getElementsByClassName("results")[0];
	
	var _tabs = _results.getElementsByClassName("tab");
	var _products = _results.getElementsByClassName("product");
	
	var _width = window.innerWidth;
	var _activeCate = "";
	
	
	$('#all-products .tabs li').on('click', function(e) {
		e.preventDefault();		
		
		var _cate = this.getAttribute("data-cate");
		var _index = -1;
		if (_tabs.length > 0 ) {
			for (var i=0; i<_tabs.length; i++) {
				if (_tabs[i].classList.contains("active")) {
					_activeCate = _tabs[i].getAttribute("data-cate");
					_index = i;
				}
			}
			
			if (_cate != _activeCate) {
				_tabs[_index].classList.remove("active");
				this.classList.add("active");			
				filterCate(_products, _cate);			
			}
			
			if (_width < 991) {
				var _heading = _allProducts.getElementsByClassName("heading")[0];
				var _mobileDropdownBar = _heading.getElementsByClassName("mobile-dropdown-bar")[0];	
				var	_tabsWrapper = _allProducts.getElementsByClassName("tabs-wrapper")[0];
				
				_mobileDropdownBar.children[0].innerHTML = this.innerHTML;
				_mobileDropdownBar.children[1].classList.toggle("opened");
				$(_tabsWrapper).slideToggle();
			}
		}
	});	
});

function activeCate($e){
	var _allProducts = document.getElementById("all-products");
	var _results = _allProducts.getElementsByClassName("results")[0];
	
	var _tabs = _results.getElementsByClassName("tab");
	var _products = _results.getElementsByClassName("product");
	
	var _width = window.innerWidth;
	var _activeCate = "";

	var _cate = $e.getAttribute("data-cate");
	var _index = -1;
	if (_tabs.length > 0 ) {
		for (var i=0; i<_tabs.length; i++) {
			if (_tabs[i].classList.contains("active")) {
				_activeCate = _tabs[i].getAttribute("data-cate");
				_index = i;
			}
		}
		
		if (_cate != _activeCate) {
			_tabs[_index].classList.remove("active");
			$e.classList.add("active");			
			filterCate(_products, _cate);			
		}
		
		if (_width < 991) {
			var _heading = _allProducts.getElementsByClassName("heading")[0];
			var _mobileDropdownBar = _heading.getElementsByClassName("mobile-dropdown-bar")[0];	
			var	_tabsWrapper = _allProducts.getElementsByClassName("tabs-wrapper")[0];
			
			_mobileDropdownBar.children[0].innerHTML = $e.innerHTML;
			_mobileDropdownBar.children[1].classList.toggle("opened");
			$(_tabsWrapper).slideToggle();
		}
	}
}

function filterCate (_products, _cate) {
	hideAllProducts (_products);
	
	for (var i=0; i<_products.length; i++) {
		if (_cate == "all") {
			$(_products[i]).slideDown(500);
			setTimeout (function() { 
				updateMargin(_products);
			}, 300);
		} 
		else { 			
			setTimeout (function() { 
				displayCateProducts(_products, _cate);
				setTimeout (function() { 					
					updateMargin(_products);
				}, 100);
			}, 500);
			
		}
	}
}

function hideAllProducts (_products) {
	for (var i=0; i<_products.length; i++) {
		$(_products[i]).slideUp(500);
	}
}

function displayCateProducts (_products, _cate) {
	for (var i=0; i<_products.length; i++) {
		if (_products[i].classList.contains(_cate)) {
			$(_products[i]).slideDown(500);	
		}
	}
}


function updateMargin (_products) {
	console.clear()
	var _width = window.innerWidth;
	
	var _newArray = [];
	
	if (_width > 991) {
		for (var i=0; i<_products.length; i++) {
			if (_products[i].style.display != "none") {
				_newArray.push(_products[i]);
			}
		}
		
		console.clear();
		
		if (_newArray.length > 0) {
			for (var i=0; i<_newArray.length; i++) {
				var index = i + 1;
				if (index%4 == 0) {
					_newArray[i].style.marginRight = "0px";
				} else {
					_newArray[i].style.marginRight = "20px";
				}
				
			}
		}
	}
}




function getProductName (product) {
	var _name = product.getElementsByClassName("name")[0];
	return _name;
}











jQuery(document).ready(function($) {	
	var _allProducts = document.getElementById("all-products");		
	var _heading, _mobileDropdownBar, _tabsWrapper;
	if (_allProducts) {		
		_heading = _allProducts.getElementsByClassName("heading")[0];
		if (_heading) {
			_mobileDropdownBar = _heading.getElementsByClassName("mobile-dropdown-bar")[0];
			_tabsWrapper = _allProducts.getElementsByClassName("tabs-wrapper")[0];
			
			$('#all-products .mobile-dropdown-bar .btn-open-sub').on('click', function(e) {		
				e.stopPropagation();
				e.preventDefault();	
				this.classList.toggle("opened");
				$(_tabsWrapper).slideToggle();
			});	
		}
				
	}	
});

















// jQuery(document).ready(function($) {
// 	var products = document.getElementsByClassName("product");
	
// 	for (var i=0; i<products.length; i++) {
// 		for (var j=0; j<4; j++) {
// 			var _span = document.createElement("span");
// 			_span.setAttribute("class", "span-border");
// 			products[i].insertBefore(_span, products[i].firstChild);
// 		}	
// 	}	
// });






// $(".product").mouseenter(function() {
// 	spans = this.getElementsByClassName("span-border");
	
// 	if (spans.length == 4) {
// 		spans[0].style.animation = "animateYIn .4s";	
// 		spans[0].style.animationFillMode = "forwards";
		
// 		spans[1].style.animation = "animateXIn .4s";	
// 		spans[1].style.animationFillMode = "forwards";
		
// 		spans[2].style.animation = "animateYIn .4s";	
// 		spans[2].style.animationFillMode = "forwards";
		
// 		spans[3].style.animation = "animateXIn .4s";
// 		spans[3].style.animationFillMode = "forwards";
// 	}	
// });


// $(".product").mouseleave(function() {
// 	spans = this.getElementsByClassName("span-border");
	
// 	if (spans.length == 4) {
// 		spans[0].style.animation = "animateYOut .4s";	
// 		spans[0].style.animationFillMode = "forwards";
		
// 		spans[1].style.animation = "animateXOut .4s";	
// 		spans[1].style.animationFillMode = "forwards";
		
// 		spans[2].style.animation = "animateYOut .4s";	
// 		spans[2].style.animationFillMode = "forwards";
		
// 		spans[3].style.animation = "animateXOut .4s";
// 		spans[3].style.animationFillMode = "forwards";
// 	}	
// });





