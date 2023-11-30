











var oldScrollY = 0;
var newScrollY = 0;
var _distance;






/*----- Section 4 | Product Sets -----*/

var st_product_sets = document.getElementById("st-product-sets");

var _elements = st_product_sets.querySelectorAll(".element");

var s4_1 = st_product_sets.querySelector(".circle-green-stripes");
var s4_2 = st_product_sets.querySelector(".triangle-orange");
var s4_3 = st_product_sets.querySelector(".wave-green");
var s4_4 = st_product_sets.querySelector(".circle-orange");
var s4_5 = st_product_sets.querySelector(".rhombus-border");



var s4_1_OriginX = s4_1.offsetLeft;
var s4_1_OriginY = s4_1.offsetTop;

var s4_1_MaxX = s4_1.offsetLeft + 100;
var s4_1_MaxY = s4_1.offsetTop + 150;

var s4_1_OldPositionX = s4_1.offsetLeft;
var s4_1_OldPositionY = s4_1.offsetTop;


var s4_1_NewPositionX; 
var s4_1_NewPositionY; 












window.addEventListener("scroll", (event) => {
	
	let scroll = this.scrollY;
	newScrollY = scroll;
	
	
	
	if (newScrollY != oldScrollY) {
		_distance = newScrollY - oldScrollY;
		oldScrollY = newScrollY;		
		
		
		
		
		/*---- Section 4 | Element 1 ----*/				
		
		s4_1_NewPositionX = s4_1_OldPositionX + _distance/2; 			
		s4_1_NewPositionY = s4_1_OldPositionY + _distance; 		
		var s4_1_deg = -360;
		
		
		if (s4_1_NewPositionX > s4_1_MaxX) {
			s4_1_NewPositionX = s4_1_MaxX;	
			s4_1_deg = 360;
		}
		else if (s4_1_NewPositionX < s4_1_OriginX) {
			s4_1_NewPositionX = s4_1_OriginX;
			s4_1_deg = -360;
		}
		
		s4_1.style.left = s4_1_NewPositionX + "px";	
		s4_1_OldPositionX = s4_1_NewPositionX;
		
		
		if (s4_1_NewPositionY > s4_1_MaxY) { 
			s4_1_NewPositionY = s4_1_MaxY;	
			s4_1_deg = 360;
		}
		else if (s4_1_NewPositionY < s4_1_OriginY) {
			s4_1_NewPositionY = s4_1_OriginY;
			s4_1_deg = -360;
		}
		
		s4_1.style.top = s4_1_NewPositionY  + "px";	
		s4_1_OldPositionY = s4_1_NewPositionY;
		
		s4_1.style.transform = "rotateY("+ s4_1_deg + "deg)";
		
		
		/*---- End Animation ----*/
		
		
		
		
		
	}
	
	
	
});




function getValueOpacity (_distance, min, max) {
	var _ratio = _distance/window.screen.height; 
	var _opacity;
	
	/* 
		- Usually from 0 - 0.1 
		- Negative if scroll up
		- Positive if scroll down
	*/	
	
	if (_ratio < 0) _opacity = 1 - (1 - _ratio*(-10));	 
	else _opacity = 1 - _ratio*(-10);	
	
	if (_opacity < min) _opacity = min;		
	if (_opacity > max) _opacity = max;
	
	return _opacity;
}


function getValueScale (_distance, min, max) {
	var _ratio = _distance/window.screen.height; 
	var _scale;
	
	if (_ratio < 0) _scale = 2 - _ratio*(-10);	 
	else _scale = 1 - _ratio*10;	
	
	if (_scale < min) _scale = min;		
	if (_scale > max) _scale = max;		
	
	return _scale;
}















