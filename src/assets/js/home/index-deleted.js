



var oldScrollY = 0;
var newScrollY = 0;
var _distance;


var _container_1 = document.getElementsByClassName("container-1")[0];
var _section_3 = document.getElementsByClassName("section-03")[0];
var _section_4 = document.getElementsByClassName("section-04")[0];
var _section_5 = document.getElementsByClassName("section-05")[0];
var _section_6 = document.getElementsByClassName("section-06")[0];


var _decor_4 = _container_1.getElementsByClassName("decor_4")[0];

var s1_mockups = _container_1.getElementsByClassName("mockups")[0];


var firstMouseX = 0;
var oldMouseX = 0;
var newMouseX = 0;






var lFollowX = 0,
x = 0,
friction = 1 / 30;

function moveBackground() {
	x += (lFollowX - x) * friction;		

	if (s1_mockups) {
		var _mockup_1 = _container_1.getElementsByClassName("mockup-1")[0];
		var _mockup_2 = _container_1.getElementsByClassName("mockup-2")[0];
		var _mockup_3 = _container_1.getElementsByClassName("mockup-3")[0];
		var _mockup_4 = _container_1.getElementsByClassName("mockup-4")[0];
		var _mockup_5 = _container_1.getElementsByClassName("mockup-5")[0];
		var _mockup_6 = _container_1.getElementsByClassName("mockup-6")[0];
		
		animateElement(_mockup_1, x, 1);
		animateElement(_mockup_2, x, 1.1);
		animateElement(_mockup_3, x, 1);
		animateElement(_mockup_4, x, 1);
		animateElement(_mockup_5, x, 1.1);
		animateElement(_mockup_6, x, 0.95);
		
		animateElement(_decor_4, x, 0.2);	

	}	
	
	var _image_1 = _section_5.getElementsByClassName("image-1")[0];
	var _image_2 = _section_5.getElementsByClassName("image-2")[0];
	var _image_3 = _section_5.getElementsByClassName("image-3")[0];
	var _image_4 = _section_5.getElementsByClassName("image-4")[0];
	var _image_5 = _section_5.getElementsByClassName("image-5")[0];
	var _image_6 = _section_5.getElementsByClassName("image-6")[0];
	var _image_7 = _section_5.getElementsByClassName("image-7")[0];

	
	animateElement(_image_1, x, 1);
	animateElement(_image_2, x, 1.1);
	animateElement(_image_3, x, 0.9);
	animateElement(_image_4, x, 1);
	animateElement(_image_5, x, 1.2);
	animateElement(_image_6, x, 1);
	animateElement(_image_7, x, 1.1);
	
	window.requestAnimationFrame(moveBackground);
}


$(window).on('mousemove', function(e) {			
	/*
	if (_mockup_6.classList.contains("animate__animated") == false) {
		var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
		lFollowX = (20 * lMouseX) / 100*7.5;
	}
	*/
	
	var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
	lFollowX = (20 * lMouseX) / 100*5;
	
});

moveBackground();

















var s4_phone_val = 0;
var s4_phone_acm = 0;
var scroll_friction = 1 / 15;


var s4_phone = _section_4.getElementsByClassName("phone-wrapper")[0];
var s4_desktop = _section_4.getElementsByClassName("desktop-wrapper")[0];

/*

$(window).on('scroll', function(e) {
	var scrollPosition = $(this).scrollTop();
	
	s4_phone_val = getVal(s4_phone, scrollPosition, 2);
	s4_desktop_val = getVal(s4_desktop, scrollPosition, 2);	
	
});


function getVal(el, scrollPos, ratio) {
	var scroll_lMouseX = scrollPos - $(el).offset().top;	
	
	if (scroll_lMouseX > 50) scroll_lMouseX = 50;
	if (scroll_lMouseX < -50) scroll_lMouseX = -50;	

	return (20 * scroll_lMouseX) / 100*ratio;	
}



function moveS4Images() {
	s4_phone_acm += (s4_phone_val - s4_phone_acm) * scroll_friction;
	
	animateElementY(s4_phone, s4_phone_acm, 3);
	animateElementY(s4_desktop, s4_phone_acm, -3);

	window.requestAnimationFrame(moveS4Images);
}

moveS4Images();

*/
















function animateElementY (el, value, ratio) {	
	vx = value*ratio*0;
	vy = value*ratio*-0.6;
	
	translate = 'translateX(' + vx + 'px) translateY(' + vy +'px)';
	
	$(el).css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});		
}






function animateElement (el, value, ratio) {	
	vx = value*ratio;
	vy = value*-0.6*ratio;
	
	translate = 'translateX(' + vx + 'px) translateY(' + vy +'px)';
	
	$(el).css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});	
	
}






















/* Decor 1 Declacration */

var _decor_1 = _container_1.getElementsByClassName("decor_1")[0];
var _decor_1_img = _decor_1.getElementsByTagName("IMG")[0];

var d1_OriginX = _decor_1.offsetLeft;

var d1_maxDistance = 40;

var d1_MinX = _decor_1.offsetLeft - d1_maxDistance;

var d1_OldPositionX = _decor_1.offsetLeft;
var d1_NewPositionX; 




/* Decor 2 Declacration */

var _decor_2 = _container_1.getElementsByClassName("decor_2")[0];
var _decor_2_img = _decor_2.getElementsByTagName("IMG")[0];

var d2_OriginX = _decor_2.offsetLeft;
var d2_OriginY = _decor_2.offsetTop;

var d2_maxDistance = 120;

var d2_MaxX = _decor_2.offsetLeft + d2_maxDistance;
var d2_MaxY = _decor_2.offsetTop + d2_maxDistance;
var d2_ratio, d2_deg;

var d2_OldPositionY = _decor_2.offsetTop;
var d2_NewPositionY; 



/* Decor 3 Declacration */

var _decor_3 = _container_1.getElementsByClassName("decor_3")[0];
var _decor_3_img = _decor_3.getElementsByTagName("IMG")[0];

var d3_OriginY = _decor_3.offsetTop;

var d3_maxDistance = 90;

var d3_MaxY = _decor_3.offsetTop + d3_maxDistance;
var d3_ratio;

var d3_OldPositionY = _decor_3.offsetTop;
var d3_NewPositionY; 

















/* Decor 5 Declacration */

var _decor_5 = _container_1.getElementsByClassName("decor_5")[0];
var _decor_5_img = _decor_5.getElementsByTagName("IMG")[0];

var d5_OriginX = _decor_5.offsetLeft;

var d5_maxDistance = 100;

var d5_MinX = _decor_5.offsetLeft - d5_maxDistance;
var d5_ratio;

var d5_OldPositionX = _decor_5.offsetLeft;
var d5_NewPositionX; 




/* Decor 6 Declacration */

var _decor_6 = _container_1.getElementsByClassName("decor_6")[0];
var _decor_6_img = _decor_6.getElementsByTagName("IMG")[0];

var d6_OriginY = _decor_6.offsetTop;

var d6_MaxY = _decor_6.offsetTop + 100;
var d6_ratio;

var d6_OldPositionY = _decor_6.offsetTop;
var d6_NewPositionY; 



/* Decor 7 Declacration */

var _decor_7 = _container_1.getElementsByClassName("decor_7")[0];
var _decor_7_img = _decor_7.getElementsByTagName("IMG")[0];

var d7_OriginY = _decor_7.offsetTop;

var d7_maxDistance = 100;

var d7_MaxY = _decor_7.offsetTop + d7_maxDistance;
var d7_ratio;

var d7_OldPositionY = _decor_7.offsetTop;
var d7_NewPositionY; 



/* Decor 8 Declacration */

var _decor_8 = _container_1.getElementsByClassName("decor_8")[0];
var _decor_8_img = _decor_8.getElementsByTagName("IMG")[0];

var d8_deg;














/* Section 3 - Portfolio - Decor 1 Declacration */

var s3_decor_1 = _section_3.getElementsByClassName("decor_1")[0];
var s3_decor_1_img = s3_decor_1.getElementsByTagName("IMG")[0];

var s3_d1_OriginX = s3_decor_1.offsetLeft;
var s3_d1_OriginY = s3_decor_1.offsetTop;

var s3_d1_MaxX = s3_decor_1.offsetLeft + 100;
var s3_d1_MaxY = s3_decor_1.offsetTop + 150;

var s3_d1_OldPositionX = s3_decor_1.offsetLeft;
var s3_d1_OldPositionY = s3_decor_1.offsetTop;


var s3_d1_NewPositionX; 
var s3_d1_NewPositionY; 








/* Section 3 - Portfolio - Decor 2 Declacration */

var s3_decor_2 = _section_3.getElementsByClassName("decor_2")[0];
var s3_decor_2_img = s3_decor_2.getElementsByTagName("IMG")[0];

var s3_d2_OriginX = s3_decor_2.offsetLeft;
var s3_d2_OriginY = s3_decor_2.offsetTop;

var s3_d2_MaxX = s3_decor_2.offsetLeft + 100;
var s3_d2_MaxY = s3_decor_2.offsetTop + 100;

var s3_d2_OldPositionX = s3_decor_2.offsetLeft;
var s3_d2_OldPositionY = s3_decor_2.offsetTop;


var s3_d2_NewPositionX; 
var s3_d2_NewPositionY; 





/* Section 3 - Portfolio - Decor 3 Declacration */

var s3_decor_3 = _section_3.getElementsByClassName("decor_3")[0];
var s3_decor_3_img = s3_decor_3.getElementsByTagName("IMG")[0];

var s3_d3_OriginX = s3_decor_3.offsetLeft;
var s3_d3_OriginY = s3_decor_3.offsetTop;

var s3_d3_MaxX = s3_decor_3.offsetLeft + 50;
var s3_d3_MaxY = s3_decor_3.offsetTop + 150;

var s3_d3_OldPositionX = s3_decor_3.offsetLeft;
var s3_d3_OldPositionY = s3_decor_3.offsetTop;


var s3_d3_NewPositionX; 
var s3_d3_NewPositionY; 



/* Section 3 - Portfolio - Decor 4 Declacration */

var s3_decor_4 = _section_3.getElementsByClassName("decor_4")[0];
var s3_decor_4_img = s3_decor_4.getElementsByTagName("IMG")[0];

var s3_d4_OriginX = s3_decor_4.offsetLeft;
var s3_d4_OriginY = s3_decor_4.offsetTop;

var s3_d4_MaxX = s3_decor_4.offsetLeft + 40;
var s3_d4_MaxY = s3_decor_4.offsetTop + 40;

var s3_d4_OldPositionX = s3_decor_4.offsetLeft;
var s3_d4_OldPositionY = s3_decor_4.offsetTop;


var s3_d4_NewPositionX; 
var s3_d4_NewPositionY; 













/* Section 4 - Portfolio - Decor 1 Declacration */

var s4_decor_1 = _section_4.getElementsByClassName("decor_1")[0];
var s4_decor_1_img = s4_decor_1.getElementsByTagName("IMG")[0];

var s4_d1_OriginX = s4_decor_1.offsetLeft;
var s4_d1_OriginY = s4_decor_1.offsetTop;

var s4_d1_MaxX = s4_decor_1.offsetLeft + 100;
var s4_d1_MaxY = s4_decor_1.offsetTop + 150;

var s4_d1_OldPositionX = s4_decor_1.offsetLeft;
var s4_d1_OldPositionY = s4_decor_1.offsetTop;


var s4_d1_NewPositionX; 
var s4_d1_NewPositionY; 








/* Section 4 - Portfolio - Decor 2 Declacration */

var s4_decor_2 = _section_4.getElementsByClassName("decor_2")[0];
var s4_decor_2_img = s4_decor_2.getElementsByTagName("IMG")[0];

var s4_d2_OriginX = s4_decor_2.offsetLeft;
var s4_d2_OriginY = s4_decor_2.offsetTop;

var s4_d2_MaxX = s4_decor_2.offsetLeft + 100;
var s4_d2_MaxY = s4_decor_2.offsetTop + 100;

var s4_d2_OldPositionX = s4_decor_2.offsetLeft;
var s4_d2_OldPositionY = s4_decor_2.offsetTop;


var s4_d2_NewPositionX; 
var s4_d2_NewPositionY; 





/* Section 4 - Portfolio - Decor 3 Declacration */

var s4_decor_3 = _section_4.getElementsByClassName("decor_3")[0];
var s4_decor_3_img = s4_decor_3.getElementsByTagName("IMG")[0];

var s4_d3_OriginX = s4_decor_3.offsetLeft;
var s4_d3_OriginY = s4_decor_3.offsetTop;

var s4_d3_MaxX = s4_decor_3.offsetLeft + 50;
var s4_d3_MaxY = s4_decor_3.offsetTop + 150;

var s4_d3_OldPositionX = s4_decor_3.offsetLeft;
var s4_d3_OldPositionY = s4_decor_3.offsetTop;


var s4_d3_NewPositionX; 
var s4_d3_NewPositionY; 



/* Section 4 - Portfolio - Decor 4 Declacration */

var s4_decor_4 = _section_4.getElementsByClassName("decor-shape")[0];
var s4_decor_4_img = s4_decor_4.getElementsByTagName("IMG")[0];

var s4_d4_OriginX = s4_decor_4.offsetLeft;
var s4_d4_OriginY = s4_decor_4.offsetTop;

var s4_d4_MaxX = s4_decor_4.offsetLeft + 60;
var s4_d4_MaxY = s4_decor_4.offsetTop + 100;

var s4_d4_OldPositionX = s4_decor_4.offsetLeft;
var s4_d4_OldPositionY = s4_decor_4.offsetTop;


var s4_d4_NewPositionX; 
var s4_d4_NewPositionY; 












/* Section 5 - Decor 1 Declacration */

var s5_decor_1 = _section_5.getElementsByClassName("decor_1")[0];
var s5_decor_1_img = s5_decor_1.getElementsByTagName("IMG")[0];

var s5_d1_OriginX = s5_decor_1.offsetLeft;
var s5_d1_OriginY = s5_decor_1.offsetTop;

var s5_d1_MaxX = s5_decor_1.offsetLeft + 70;
var s5_d1_MaxY = s5_decor_1.offsetTop + 70;

var s5_d1_OldPositionX = s5_decor_1.offsetLeft;
var s5_d1_OldPositionY = s5_decor_1.offsetTop;

var s5_d1_NewPositionX; 
var s5_d1_NewPositionY; 




/* Section 5 - Decor 2 Declacration */

var s5_decor_2 = _section_5.getElementsByClassName("decor_2")[0];
var s5_decor_2_img = s5_decor_2.getElementsByTagName("IMG")[0];

var s5_d2_OriginX = s5_decor_2.offsetLeft;
var s5_d2_OriginY = s5_decor_2.offsetTop;

var s5_d2_MaxX = s5_decor_2.offsetLeft + 80;
var s5_d2_MaxY = s5_decor_2.offsetTop + 80;

var s5_d2_OldPositionX = s5_decor_2.offsetLeft;
var s5_d2_OldPositionY = s5_decor_2.offsetTop;

var s5_d2_NewPositionX; 
var s5_d2_NewPositionY; 



/* Section 5 - Decor 3 Declacration */

var s5_decor_3 = _section_5.getElementsByClassName("decor_3")[0];
var s5_decor_3_img = s5_decor_3.getElementsByTagName("IMG")[0];

var s5_d3_OriginX = s5_decor_3.offsetLeft;
var s5_d3_OriginY = s5_decor_3.offsetTop;

var s5_d3_MaxX = s5_decor_3.offsetLeft + 100;
var s5_d3_MaxY = s5_decor_3.offsetTop + 100;

var s5_d3_OldPositionX = s5_decor_3.offsetLeft;
var s5_d3_OldPositionY = s5_decor_3.offsetTop;

var s5_d3_NewPositionX; 
var s5_d3_NewPositionY; 







window.addEventListener("scroll", (event) => {
	
	let scroll = this.scrollY;
	newScrollY = scroll;
	
	
	
	if (newScrollY != oldScrollY) {
		_distance = newScrollY - oldScrollY;
		oldScrollY = newScrollY;		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/* Animation for Decor Element 1 */				
		
		d1_NewPositionX = d1_OldPositionX - _distance/2; 			
		
		if (d1_NewPositionX < d1_MinX) {
			d1_NewPositionX = d1_MinX;	
		}
		else if (d1_NewPositionX > d1_OriginX) {
			d1_NewPositionX = d1_OriginX;
		} 
		_decor_1.style.left = d1_NewPositionX  + "px";	
		
		d1_OldPositionX = d1_NewPositionX;
		
		
		
		/* Animation for Decor Element 2 */		
				
		d2_NewPositionY = d2_OldPositionY + _distance; 		
		
		d2_ratio = (d2_NewPositionY - d2_OldPositionY)/d2_maxDistance;
		d2_deg = d2_ratio*450;	
		
		
		if (d2_NewPositionY > d2_MaxY) {
			d2_NewPositionY = d2_MaxY;	
			d2_deg = 450;
		}
		else if (d2_NewPositionY < d2_OriginY) {
			d2_NewPositionY = d2_OriginY;
			d2_deg = -450;
		} 
		
		_decor_2_img.style.transform = "rotate("+ d2_deg +"deg)";			
		_decor_2.style.top = d2_NewPositionY  + "px";	
		
		d2_OldPositionY = d2_NewPositionY;
		
		
		
		
		
		
		
		
		/* Animation for Decor Element 3 */
		
		
		d3_NewPositionY = d3_OldPositionY + _distance; 		
		
		if (d3_NewPositionY > d3_MaxY) {
			d3_NewPositionY = d3_MaxY;	
		}
		else if (d3_NewPositionY < d3_OriginY) {
			d3_NewPositionY = d3_OriginY;
		}
		
		_decor_3.style.top = d3_NewPositionY  + "px";	
		d3_OldPositionY = d3_NewPositionY;		
		
		
		
		/* Animation for Decor Element 4 */
		
		
		/* Animation for Decor Element 5 */
		
		d5_NewPositionX = d5_OldPositionX - _distance/2; 			
		
		if (d5_NewPositionX < d5_MinX) {
			d5_NewPositionX = d5_MinX;	
		}
		else if (d5_NewPositionX > d5_OriginX) {
			d5_NewPositionX = d5_OriginX;
		} 		
		
		_decor_5.style.left = d5_NewPositionX  + "px";	
		
		d5_OldPositionX = d5_NewPositionX;		
		
		
		
		/* Animation for Decor Element 6 */
		
		d6_NewPositionY = d6_OldPositionY + _distance; 		
		
		if (d6_NewPositionY > d6_MaxY) {
			d6_NewPositionY = d6_MaxY;	
		}
		else if (d6_NewPositionY < d6_OriginY) {
			d6_NewPositionY = d6_OriginY;
		}
		
		_decor_6.style.top = d6_NewPositionY  + "px";	
		d6_OldPositionY = d6_NewPositionY;		
		
		
		
		/* Animation for Decor Element 7 */
		
		d7_NewPositionY = d7_OldPositionY + _distance/1.5; 		
		
		if (d7_NewPositionY > d7_MaxY) {
			d7_NewPositionY = d7_MaxY;	
			d8_deg = -30;
		}
		else if (d7_NewPositionY < d7_OriginY) {
			d7_NewPositionY = d7_OriginY;
			d8_deg = 0;
		}
		
		_decor_7.style.top = d7_NewPositionY  + "px";	
		d7_OldPositionY = d7_NewPositionY;
		
		_decor_8_img.style.transform = "rotate("+ d8_deg +"deg)";	
		
		
		
		
		
		/* Animation for Section 3 - Decor Element 1 */		
		
		
		s3_d1_NewPositionX = s3_d1_OldPositionX + _distance/2; 			
		s3_d1_NewPositionY = s3_d1_OldPositionY + _distance; 		
		var s3_d1_deg = -360;
		
		
		if (s3_d1_NewPositionX > s3_d1_MaxX) {
			s3_d1_NewPositionX = s3_d1_MaxX;	
			s3_d1_deg = 360;
		}
		else if (s3_d1_NewPositionX < s3_d1_OriginX) {
			s3_d1_NewPositionX = s3_d1_OriginX;
			s3_d1_deg = -360;
		}
		
		s3_decor_1.style.left = s3_d1_NewPositionX + "px";	
		s3_d1_OldPositionX = s3_d1_NewPositionX;
		
		
		if (s3_d1_NewPositionY > s3_d1_MaxY) { 
			s3_d1_NewPositionY = s3_d1_MaxY;	
			s3_d1_deg = 360;
		}
		else if (s3_d1_NewPositionY < s3_d1_OriginY) {
			s3_d1_NewPositionY = s3_d1_OriginY;
			s3_d1_deg = -360;
		}
		
		s3_decor_1.style.top = s3_d1_NewPositionY  + "px";	
		s3_d1_OldPositionY = s3_d1_NewPositionY;
		
		s3_decor_1_img.style.transform = "rotateY("+ s3_d1_deg + "deg)";
		
		
		/* End Animation */
		
		
		
		
		
		/* Animation for Section 3 - Decor Element 2 */
		
		
		s3_d2_NewPositionX = s3_d2_OldPositionX + _distance/2; 			
		s3_d2_NewPositionY = s3_d2_OldPositionY + _distance/2; 
		
		var s3_d2_opacity = getValueOpacity(_distance, 0.1, 1);
		var s3_d2_scale = getValueScale(_distance, 0.5, 1.5);
		
		if (s3_d2_NewPositionX > s3_d2_MaxX) {
			s3_d2_NewPositionX = s3_d2_MaxX;	
		}
		else if (s3_d2_NewPositionX < s3_d2_OriginX) {
			s3_d2_NewPositionX = s3_d2_OriginX;
		} 		
		
		s3_decor_2.style.left = s3_d2_NewPositionX + "px";	
		s3_d2_OldPositionX = s3_d2_NewPositionX;
		
		
		if (s3_d2_NewPositionY > s3_d2_MaxY) {
			s3_d2_NewPositionY = s3_d2_MaxY;
		}
		else if (s3_d2_NewPositionY < s3_d2_OriginY) {
			s3_d2_NewPositionY = s3_d2_OriginY;
		}
		
		s3_decor_2.style.top = s3_d2_NewPositionY  + "px";	
		s3_d2_OldPositionY = s3_d2_NewPositionY;
		
		
		s3_decor_2_img.style.opacity = s3_d2_opacity;
		s3_decor_2_img.style.transform = "scale("+ s3_d2_scale + ","+ s3_d2_scale + ")";
		
		
		
		
		
		
		
		/* Animation for Section 3 - Decor Element 3 */
		
		s3_d3_NewPositionX = s3_d3_OldPositionX + _distance/4; 			
		s3_d3_NewPositionY = s3_d3_OldPositionY + _distance*1.5; 
		
		var s3_d3_scale = getValueScale(_distance, 0.3, 1.2);
		
		if (s3_d3_NewPositionX > s3_d3_MaxX) {
			s3_d3_NewPositionX = s3_d3_MaxX;	
			s3_d3_scale = 1.2;
		}
		else if (s3_d3_NewPositionX < s3_d3_OriginX) {
			s3_d3_NewPositionX = s3_d3_OriginX;
			s3_d3_scale = 0.3;
		} 		
		
		s3_decor_3.style.left = s3_d3_NewPositionX + "px";	
		s3_d3_OldPositionX = s3_d3_NewPositionX;
		
		
		if (s3_d3_NewPositionY > s3_d3_MaxY) {
			s3_d3_NewPositionY = s3_d3_MaxY;
			s3_d3_scale = 1.2;
		}
		else if (s3_d3_NewPositionY < s3_d3_OriginY) {
			s3_d3_NewPositionY = s3_d3_OriginY;
			s3_d3_scale = 0.3;
		}
		
		s3_decor_3.style.top = s3_d3_NewPositionY  + "px";	
		s3_d3_OldPositionY = s3_d3_NewPositionY;		
		
		s3_decor_3_img.style.transform = "scale("+ s3_d3_scale + ","+ s3_d3_scale + ")";
		
		
		
		
		
		
		/* Animation for Section 3 - Decor Element 4 */
		
		s3_d4_NewPositionX = s3_d4_OldPositionX - _distance/2; 			
		s3_d4_NewPositionY = s3_d4_OldPositionY + _distance/2; 
		
		var s3_d4_deg = -360;
		
		
		
		/* Transform X */
		
		if (s3_d4_NewPositionX > s3_d4_MaxX) {
			s3_d4_NewPositionX = s3_d4_MaxX;	
			s3_d4_deg = 360;
		}
		else if (s3_d4_NewPositionX < s3_d4_OriginX) {
			s3_d4_NewPositionX = s3_d4_OriginX;
			s3_d4_deg = -360;
		} 		
		
		s3_decor_4.style.left = s3_d4_NewPositionX + "px";	
		s3_d4_OldPositionX = s3_d4_NewPositionX;
		
		
		/* Transform Y */
		
		if (s3_d4_NewPositionY > s3_d4_MaxY) {
			s3_d4_NewPositionY = s3_d4_MaxY;	
			s3_d4_deg = 360;
		}
		else if (s3_d4_NewPositionY < s3_d4_OriginY) {
			s3_d4_NewPositionY = s3_d4_OriginY;
			s3_d4_deg = -360;
		}
		
		s3_decor_4.style.top = s3_d4_NewPositionY  + "px";	
		s3_d4_OldPositionY = s3_d4_NewPositionY;
		
		
		/* Transform Flip */	
		
		s3_decor_4_img.style.transform = "rotateY("+ s3_d4_deg + "deg)";
		
		
		
		
		
		/* Animation for Section 4 */
		
	/* Animation for Section 4 - Decor Element 1 */		
		
		
		s4_d1_NewPositionX = s4_d1_OldPositionX + _distance/2; 			
		s4_d1_NewPositionY = s4_d1_OldPositionY + _distance; 		
		var s4_d1_deg = -180;
		
		
		if (s4_d1_NewPositionX > s4_d1_MaxX) {
			s4_d1_NewPositionX = s4_d1_MaxX;	
			s4_d1_deg = 180;
		}
		else if (s4_d1_NewPositionX < s4_d1_OriginX) {
			s4_d1_NewPositionX = s4_d1_OriginX;
			s4_d1_deg = -180;
		}
		
		s4_decor_1.style.left = s4_d1_NewPositionX + "px";	
		s4_d1_OldPositionX = s4_d1_NewPositionX;
		
		
		if (s4_d1_NewPositionY > s4_d1_MaxY) { 
			s4_d1_NewPositionY = s4_d1_MaxY;	
		}
		else if (s4_d1_NewPositionY < s4_d1_OriginY) {
			s4_d1_NewPositionY = s4_d1_OriginY;
		}
		
		s4_decor_1.style.top = s4_d1_NewPositionY  + "px";	
		s4_d1_OldPositionY = s4_d1_NewPositionY;
		
		s4_decor_1_img.style.transform = "rotate("+ s4_d1_deg*-1 + "deg)";
		
		
		/* End Animation */
		
		
		
		
		
		/* Animation for Section 4 - Decor Element 2 */
		
		
		s4_d2_NewPositionX = s4_d2_OldPositionX + _distance/2; 			
		s4_d2_NewPositionY = s4_d2_OldPositionY + _distance/2; 
		
		var s4_d2_opacity = getValueOpacity(_distance, 0.1, 1);
		var s4_d2_scale = getValueScale(_distance, 0.5, 1.5);
		
		if (s4_d2_NewPositionX > s4_d2_MaxX) {
			s4_d2_NewPositionX = s4_d2_MaxX;	
		}
		else if (s4_d2_NewPositionX < s4_d2_OriginX) {
			s4_d2_NewPositionX = s4_d2_OriginX;
		} 		
		
		s4_decor_2.style.left = s4_d2_NewPositionX + "px";	
		s4_d2_OldPositionX = s4_d2_NewPositionX;
		
		
		if (s4_d2_NewPositionY > s4_d2_MaxY) {
			s4_d2_NewPositionY = s4_d2_MaxY;
		}
		else if (s4_d2_NewPositionY < s4_d2_OriginY) {
			s4_d2_NewPositionY = s4_d2_OriginY;
		}
		
		s4_decor_2.style.top = s4_d2_NewPositionY  + "px";	
		s4_d2_OldPositionY = s4_d2_NewPositionY;
		
		
		s4_decor_2_img.style.opacity = s4_d2_opacity;
		s4_decor_2_img.style.transform = "scale("+ s4_d2_scale + ","+ s4_d2_scale + ")";
		
		
		
		
		
		
		
		/* Animation for Section 4 - Decor Element 3 */
		
		s4_d3_NewPositionX = s4_d3_OldPositionX + _distance/4; 			
		s4_d3_NewPositionY = s4_d3_OldPositionY + _distance*1.5; 
		
		var s4_d3_scale = getValueScale(_distance, 0.3, 1.2);
		
		if (s4_d3_NewPositionX > s4_d3_MaxX) {
			s4_d3_NewPositionX = s4_d3_MaxX;	
			s4_d3_scale = 1.2;
		}
		else if (s4_d3_NewPositionX < s4_d3_OriginX) {
			s4_d3_NewPositionX = s4_d3_OriginX;
			s4_d3_scale = 0.3;
		} 		
		
		s4_decor_3.style.left = s4_d3_NewPositionX + "px";	
		s4_d3_OldPositionX = s4_d3_NewPositionX;
		
		
		if (s4_d3_NewPositionY > s4_d3_MaxY) {
			s4_d3_NewPositionY = s4_d3_MaxY;
			s4_d3_scale = 1.2;
		}
		else if (s4_d3_NewPositionY < s4_d3_OriginY) {
			s4_d3_NewPositionY = s4_d3_OriginY;
			s4_d3_scale = 0.3;
		}
		
		s4_decor_3.style.top = s4_d3_NewPositionY  + "px";	
		s4_d3_OldPositionY = s4_d3_NewPositionY;		
		
		s4_decor_3_img.style.transform = "scale("+ s4_d3_scale + ","+ s4_d3_scale + ")";
		
		
		
		
		
		
		/* Animation for Section 4 - Decor Element 4 */
		
		s4_d4_NewPositionX = s4_d4_OldPositionX + _distance*2; 			
		s4_d4_NewPositionY = s4_d4_OldPositionY + _distance*3; 
		
		
		
		/* Transform X */
		
		if (s4_d4_NewPositionX > s4_d4_MaxX) {
			s4_d4_NewPositionX = s4_d4_MaxX;	
		}
		else if (s4_d4_NewPositionX < s4_d4_OriginX) {
			s4_d4_NewPositionX = s4_d4_OriginX;
		} 		
		
		s4_decor_4.style.left = s4_d4_NewPositionX + "px";	
		s4_d4_OldPositionX = s4_d4_NewPositionX;
		
		
		/* Transform Y */
		
		if (s4_d4_NewPositionY > s4_d4_MaxY) {
			s4_d4_NewPositionY = s4_d4_MaxY;
		}
		else if (s4_d4_NewPositionY < s4_d4_OriginY) {
			s4_d4_NewPositionY = s4_d4_OriginY;
		}
		
		s4_decor_4.style.top = s4_d4_NewPositionY  + "px";	
		s4_d4_OldPositionY = s4_d4_NewPositionY;
		
		
		/* Transform Flip */	

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/* Animation for Decor Element 7 */
		
		
		/* Animation for Section 5 - Decor Element 1 */
		
		s5_d1_NewPositionX = s5_d1_OldPositionX + _distance/2; 			
		s5_d1_NewPositionY = s5_d1_OldPositionY + _distance/2; 		
		
		
		/* Transform X */
		
		if (s5_d1_NewPositionX > s5_d1_MaxX) {
			s5_d1_NewPositionX = s5_d1_MaxX;	
		}
		else if (s5_d1_NewPositionX < s5_d1_OriginX) {
			s5_d1_NewPositionX = s5_d1_OriginX;
		} 		
		
		s5_decor_1.style.left = s5_d1_NewPositionX + "px";	
		s5_d1_OldPositionX = s5_d1_NewPositionX;
		
		
		/* Transform Y */
		
		if (s5_d1_NewPositionY > s5_d1_MaxY) {
			s5_d1_NewPositionY = s5_d1_MaxY;	
		}
		else if (s5_d1_NewPositionY < s5_d1_OriginY) {
			s5_d1_NewPositionY = s5_d1_OriginY;
		}
		
		s5_decor_1.style.top = s5_d1_NewPositionY  + "px";	
		s5_d1_OldPositionY = s5_d1_NewPositionY;
		
		
		
		
		
		
		
		
		
		
		/* Animation for Section 5 - Decor Element 2 */
		
		s5_d2_NewPositionX = s5_d2_OldPositionX + _distance/2; 			
		s5_d2_NewPositionY = s5_d2_OldPositionY + _distance/2; 
		
		var s5_d2_deg = -360;
		
		
		
		/* Transform X */
		
		if (s5_d2_NewPositionX > s5_d2_MaxX) {
			s5_d2_NewPositionX = s5_d2_MaxX;	
			s5_d2_deg = 360;
		}
		else if (s5_d2_NewPositionX < s5_d2_OriginX) {
			s5_d2_NewPositionX = s5_d2_OriginX;
			s5_d2_deg = -360;
		} 		
		
		s5_decor_2.style.left = s5_d2_NewPositionX + "px";	
		s5_d2_OldPositionX = s5_d2_NewPositionX;
		
		
		/* Transform Y */
		
		if (s5_d2_NewPositionY > s5_d2_MaxY) {
			s5_d2_NewPositionY = s5_d2_MaxY;	
			s5_d2_deg = 360;
			s5_d3_deg = -30;
		}
		else if (s5_d2_NewPositionY < s5_d2_OriginY) {
			s5_d2_NewPositionY = s5_d2_OriginY;
			s5_d2_deg = -360;
			s5_d3_deg = 0;
		}
		
		s5_decor_2.style.top = s5_d2_NewPositionY  + "px";	
		s5_d2_OldPositionY = s5_d2_NewPositionY;
		
		
		/* Transform Flip */	
		
		s5_decor_2_img.style.transform = "rotateY("+ s5_d2_deg + "deg)";
		
		
		
		
		
		
		/* Animation for Section 5 - Decor Element 3 */
		
		s5_d3_NewPositionX = s5_d3_OldPositionX + _distance/2; 			
		s5_d3_NewPositionY = s5_d3_OldPositionY + _distance/2; 
		
		var s5_d3_deg = _distance/window.innerWidth*90;
		
		
		
		/* Transform X */
		
		if (s5_d3_NewPositionX > s5_d3_MaxX) {
			s5_d3_NewPositionX = s5_d3_MaxX;	

		}
		else if (s5_d3_NewPositionX < s5_d3_OriginX) {
			s5_d3_NewPositionX = s5_d3_OriginX;

		} 		
		
		s5_decor_3.style.left = s5_d3_NewPositionX + "px";	
		s5_d3_OldPositionX = s5_d3_NewPositionX;
		
		
		/* Transform Y */
		
		if (s5_d3_NewPositionY > s5_d3_MaxY) {
			s5_d3_NewPositionY = s5_d3_MaxY;	
			s5_d3_deg = 90;
		}
		else if (s5_d3_NewPositionY < s5_d3_OriginY) {
			s5_d3_NewPositionY = s5_d3_OriginY;
			s5_d3_deg = 0;
		}
		
		s5_decor_3.style.top = s5_d3_NewPositionY  + "px";	
		s5_d3_OldPositionY = s5_d3_NewPositionY;
		
		
		/* Transform Flip */	
		
		s5_decor_3_img.style.transform = "rotate("+ s5_d3_deg + "deg)";
		
		
		
		
		

		
		
		
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















