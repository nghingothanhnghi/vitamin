
jQuery(document).ready(function($) {	
	var _productContent = document.getElementById("product-content");

	var _tabsNav = document.getElementById("tabs-nav");
	var _tabsNavLis = _tabsNav.getElementsByTagName("li");
	var _tabContents = _productContent.getElementsByClassName("tab-content");	
	
	$('#product-content #tabs-nav li').on('click', function(e) {			
		e.preventDefault();	
		if (this.classList.contains("active") == false) {
			for (var i=0; i<_tabsNavLis.length; i++) {
				_tabsNavLis[i].classList.remove("active");
			}
			
			for (var i=0; i<_tabContents.length; i++) {
				$(_tabContents[i]).slideUp(500);
			}
			
			this.classList.add("active");
			var _index = this.getAttribute("data-index");
			
			for (var i=0; i<_tabContents.length; i++) {
				if (_tabContents[i].getAttribute("data-index") == _index) {
					$(_tabContents[i]).slideDown(500);
				}
			}			
		}
		
	});
	
});

jQuery(document).ready(function($) {	
	
	var _productInfo = document.getElementById("product-info");
	var _calculating = _productInfo.getElementsByClassName("calculating")[0];
	
	var _value = _calculating.getElementsByClassName("value")[0];
	var _initValue = parseInt(_value.children[0].innerHTML);
	var _total;
	
	
	$('#product-info #minus').on('click', function(e) {			
		e.preventDefault();	
		var _input = this.nextElementSibling;
		var _number = parseInt(_input.children[0].innerHTML) - 1;
		if (_number <= 1) {
			_number = 1;
		}
		_input.children[0].innerHTML = _number;
		
		_value.children[1].innerHTML = setComma(_number*_initValue);
		
	});
	
	
	$('#product-info #plus').on('click', function(e) {			
		e.preventDefault();	
		var _input = this.previousElementSibling;
		var _number = parseInt(_input.children[0].innerHTML) + 1;
		_input.children[0].innerHTML = _number;	
		
		_value.children[1].innerHTML = setComma(_number*_initValue);
	});
	
});


setInterval(function() { 	
	var product_gallery = document.getElementById("product-gallery");
	if (product_gallery) {

		var lis = product_gallery.getElementsByTagName("li");		
		var imgs = product_gallery.getElementsByClassName("img-wrapper");
		
		
		var index = -1;
		
		for (var i=0; i<lis.length; i++) {
			if (lis[i].classList.contains("active")) {
				index = i;
			}
		}
		
		if(index != -1) {
			lis[index].classList.remove("active");
			imgs[index].classList.remove("active");
			
			var nextIndex = index + 1;
			if (nextIndex > (lis.length - 1)) {
				nextIndex = 0;
			}
			
			lis[nextIndex].classList.add("active");
			imgs[nextIndex].classList.add("active");
		}
	}
	
	
}, 5000);

/* Function*/
function imageClick(){

	var _listImgsNew = [];
	
	var _productGallery = document.getElementById("product-gallery");
	var _featured = _productGallery.getElementsByClassName("featured")[0];
	var _featuredSrc = _featured.children[0].getAttribute("src");
	
	var _listImgs = _productGallery.getElementsByClassName("list")[0];

	if(null != _listImgs && "" != _listImgs && 'undefined' != _listImgs) {
		_listImgsNew = _listImgs.children;
	};
	
	$('#product-gallery .list li').on('click', function(e) {			
		e.preventDefault();	
		_imgSrc = this.children[0].getAttribute("src");
		if (this.classList.contains("active") == false) {
			_featured.children[0].setAttribute("src", _imgSrc);
			for (var i=0; i<_listImgs.length; i++) {
				_listImgs[i].classList.remove("active");
			}
			this.classList.add("active");
		}		
	});
}
