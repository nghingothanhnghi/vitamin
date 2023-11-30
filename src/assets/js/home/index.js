











var oldScrollY = 0;
var newScrollY = 0;
var _distance;





var st_product_sets = document.getElementById("st-product-sets");
var _elements = st_product_sets.querySelectorAll(".element");

var s4_1 = st_product_sets.querySelector(".circle-green-stripes");
var s4_1_val = 0;
var s4_1_acm = 0;


var s4_2 = st_product_sets.querySelector(".triangle-orange");
var s4_2_val = 0;
var s4_2_acm = 0;


var s4_3 = st_product_sets.querySelector(".wave-green");
var s4_3_val = 0;
var s4_3_acm = 0;


var s4_5 = st_product_sets.querySelector(".rhombus-border");
var s4_5_val = 0;
var s4_5_acm = 0;





var scroll_friction = 1 / 15;




$(window).on('scroll', function(e) {
	var scrollPosition = $(this).scrollTop();	
	s4_1_val = getVal(s4_1, scrollPosition, 2);	
	s4_2_val = getVal(s4_2, scrollPosition, 2);	
	s4_3_val = getVal(s4_3, scrollPosition, 2);	
	s4_5_val = getVal(s4_5, scrollPosition, 2);	
});


function getVal(el, scrollPos, ratio) {
	var scroll_lMouseX = scrollPos - $(el).offset().top;	
	if (scroll_lMouseX > 200) scroll_lMouseX = 200;
	if (scroll_lMouseX < -200) scroll_lMouseX = -200;	

	return (20 * scroll_lMouseX) / 100*ratio;	
}



function moveS4Images() {
	
	s4_1_acm += (s4_1_val - s4_1_acm) * scroll_friction;	
	animateElementYR(s4_1, s4_1_acm, 2);
	
	s4_2_acm += (s4_2_val - s4_2_acm) * scroll_friction;	
	animateElementYR(s4_2, s4_2_acm, 2);
	
	s4_3_acm += (s4_3_val - s4_3_acm) * scroll_friction;	
	animateElementYR(s4_3, s4_3_acm, 2);	

	s4_5_acm += (s4_5_val - s4_5_acm) * scroll_friction;	
	animateElementYR(s4_5, s4_5_acm, 2);
	
	
	window.requestAnimationFrame(moveS4Images);
}

moveS4Images();














function animateElementX (el, value, ratio) {	
	vx = value*ratio;	
	translate = 'translateX(' + vx + 'px)';
	
	$(el).css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});		
}





function animateElementYR (el, value, ratio) {	
	vx = value*ratio*0;
	vy = value*ratio;
	deg = value*ratio;
	
	translate = 'translateX(' + vx + 'px) translateY(' + vy +'px)';
	translate += ' rotate(' + deg + 'deg)';
	
	$(el).css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});		
}






function animateElement (el, value, ratio) {	
	vx = value*ratio;
	vy = value*-0.6*ratio;
	
	translate = 'translateX(' + vx + 'px) translateY(' + vy +'px) rotate(360deg)';
	translate += " rotate(360deg)";
	
	$(el).css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
		
	});	
	
}

















