


jQuery(document).ready(function($) {
	var _productsWrappers = document.getElementsByClassName("products-wrapper");
	
	for (var i=0; i<_productsWrappers.length; i++) {
		createProductBorders(_productsWrappers[i]);
	}
	
	
});

function createProductBorders (_productsWrapper) {
	var products = _productsWrapper.children;
	for (var i=0; i<products.length; i++) {
		for (var j=0; j<4; j++) {
			var _span = document.createElement("span");
			products[i].insertBefore(_span, products[i].firstChild);
		}		
	}
}




$(".products-wrapper .product").mouseenter(function() {
	spans = this.getElementsByTagName("span");
	
	spans[0].style.animation = "animateYIn .4s";	
	spans[0].style.animationFillMode = "forwards";
	
	spans[1].style.animation = "animateXIn .4s";	
	spans[1].style.animationFillMode = "forwards";
	
	spans[2].style.animation = "animateYIn .4s";	
	spans[2].style.animationFillMode = "forwards";
	
	spans[3].style.animation = "animateXIn .4s";
	spans[3].style.animationFillMode = "forwards";
});


$(".products-wrapper .product").mouseleave(function() {
	spans = this.getElementsByTagName("span");
	
	spans[0].style.animation = "animateYOut .4s";	
	spans[0].style.animationFillMode = "forwards";
	
	spans[1].style.animation = "animateXOut .4s";	
	spans[1].style.animationFillMode = "forwards";
	
	spans[2].style.animation = "animateYOut .4s";	
	spans[2].style.animationFillMode = "forwards";
	
	spans[3].style.animation = "animateXOut .4s";
	spans[3].style.animationFillMode = "forwards";
});





