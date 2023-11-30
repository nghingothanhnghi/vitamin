


var body = document.getElementsByTagName("body")[0];


var user_info = document.getElementById("user-info");
var user_name = user_info.getAttribute("data-username");
var user_rank = user_info.getAttribute("data-rank");

var currentdate = new Date(); 

var _day = convertToZeroDecimal(currentdate.getDate());
var _month = convertToZeroDecimal(currentdate.getMonth()+1);
var _year = convertToZeroDecimal(currentdate.getFullYear());

var _hours = convertToZeroDecimal(currentdate.getHours());
var _mins = convertToZeroDecimal(currentdate.getMinutes());

/*
var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth())  + "-" 
                + currentdate.getFullYear() + ", "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();	
*/

var datetime = _day + "-" + _month  + "-" + _year + ", "  
                + _hours + ":" + _mins;				




				
				
				
				
				
				

/*----- Post Comment -------*/


jQuery(document).ready(function($) {	
	
});






$("body").on("click", ".post-comment .reply-btn", function(){
	var li = this.closest("li");
	var comment = this.closest(".comment");
	var name = comment.getElementsByClassName("name")[0].innerHTML;
	var id = comment.getAttribute("id");
	
	var postComment = this.closest(".post-comment");
	var composing = postComment.getElementsByClassName("composing")[0];
	var counter = composing.getElementsByClassName("counter")[0];	
	var warning = composing.getElementsByClassName("warning")[0];
	
	if (!li.classList.contains("level-1")) {
		composing.setAttribute("data-comment-id", id);	
	}	
	
	var _textarea = composing.getElementsByTagName("textarea")[0];	
	
	_textarea.value = name + " ";
	_textarea.focus();
	
	counter.innerHTML = (400 - _textarea.value.length);
	warning.style.display = "none";
});








$(".composing textarea").on('change keyup paste', function() {
    var composing = this.closest(".composing");
	var counter = composing.getElementsByClassName("counter")[0];	
	counter.innerHTML = (400 - this.value.length);
});









$("body").on("click", ".composing .submit-btn", function() {
	
	var postComment = this.closest(".post-comment");
	var comments = postComment.getElementsByClassName("comments")[0];
	
	var composing = this.closest(".composing");
	var _textarea = composing.getElementsByTagName("textarea")[0];
	var warning = composing.getElementsByClassName("warning")[0];
	var counter = composing.getElementsByClassName("counter")[0];
	
	var dataCommentId = composing.getAttribute("data-comment-id");	
	
	var li = document.createElement("li");
	assignComment(li, _textarea.value);	
	
	var comment = postComment.getElementsByClassName("comment");	
	
	if (_textarea.value.length >= 10) {
		warning.style.display = "none";
		
		if (dataCommentId == "0") {
			li.classList.add("level-1");
			comments.appendChild(li);
			
		}
		else {
			for (var i=0; i<comment.length; i++) {
				if (comment[i].getAttribute("id") == dataCommentId) {
					var sub_comments = comment[i].closest("ul");
					sub_comments.appendChild(li);
				}
			}
		}
		
		_textarea.value = "";
		composing.setAttribute("data-comment-id", "0");
		updateCommentsQuantity(postComment);
		counter.innerHTML = "0";			
	}	
	else {
		warning.style.display = "block";
	}
	
});




function updateCommentsQuantity (postComment) {
	var quantity = postComment.getElementsByClassName("quantity")[0];
	var comment = postComment.getElementsByClassName("comment");
	quantity.innerHTML = comment.length;
}







function assignComment (li, value) {		
	
	var comment = document.createElement("div");
	comment.setAttribute("class", "row comment " + user_rank);	
	
	
	/*--- Avatar ---*/	
	
	var avatar = document.createElement("div");
	avatar.setAttribute("class", "avatar col-auto");
	avatar.innerHTML = '<img src="/wellzyme/assets/img/icons/user-avatar.svg">';
	
	
	
	/*--- Info ---*/
	
	var info = document.createElement("div");
	info.setAttribute("class", "info col");
	
	var row_1 = document.createElement("div");
	row_1.setAttribute("class", "row");
	
	var span_name = document.createElement("span");
	span_name.setAttribute("class", "col name");
	span_name.innerHTML = user_name;
	
	var span_date = document.createElement("span");
	span_date.setAttribute("class", "col-auto date");
	span_date.innerHTML = datetime;
	
	row_1.appendChild(span_name);
	row_1.appendChild(span_date);	
	
	
	var row_2 = document.createElement("div");
	row_2.setAttribute("class", "row");
	
	var content = document.createElement("div");
	content.setAttribute("class", "content col");
	content.innerHTML = value;
	
	var reply = document.createElement("div");
	reply.setAttribute("class", "col-auto");
	reply.innerHTML = '<div class="reply-btn">답글</div>';
	
	row_2.appendChild(content);
	row_2.appendChild(reply);	
	
	info.appendChild(row_1);
	info.appendChild(row_2);
	
	
	comment.appendChild(avatar);
	comment.appendChild(info);
	
	li.appendChild(comment);
	
}















/*----- Lightbox for Gallery Post -------*/


var prevImgUrl = "";
var nextImgUrl = "";
var mainImgUrl = "";

var lightbox;
var lightboxImg;

if (body.classList.contains("gallery-post")) {
	var lightbox = document.getElementsByClassName("lightbox")[0];
	var lightboxImg = lightbox.getElementsByTagName("img")[0];
}



$('.gallery-post .post-content img').on('click', function(e) {
	e.stopPropagation();
	
	var mainImgUrl = this.getAttribute("src");	
	updateRelatedUrls(mainImgUrl);

	lightboxImg.setAttribute("src", mainImgUrl);
	lightbox.classList.add("active");
	
});




$('.gallery-post .lightbox img').on('click', function(e) {	
	e.stopPropagation();		
});	
	

$('.gallery-post .lightbox .nav').on('click', function(e) {	
	e.stopPropagation();	
	if (this.classList.contains("prev")) {
		navLightboxPrev(lightboxImg);		
	}
	if (this.classList.contains("next")) {
		navLightboxNext(lightboxImg);		
	}
	
});	






function navLightboxPrev (lightboxImg) {	
	if (prevImgUrl != "") {
		mainImgUrl = prevImgUrl;
		updateRelatedUrls(mainImgUrl);
		lightboxImg.setAttribute("src", mainImgUrl);
	}
}


function navLightboxNext (lightboxImg) {
	if (nextImgUrl != "") {
		mainImgUrl = nextImgUrl;
		updateRelatedUrls(mainImgUrl);
		lightboxImg.setAttribute("src", mainImgUrl);
	}
}


function updateRelatedUrls (mainImgUrl) {
	var postContent = document.getElementsByClassName("post-content")[0];
	var imgs = postContent.getElementsByTagName("img");
	for (var i=0; i<imgs.length; i++) {
		var url = imgs[i].getAttribute("src");
		if (mainImgUrl == url) {
			if ((i-1) < 0) {
				prevImgUrl = "";
			}
			else {
				prevImgUrl = imgs[i-1].getAttribute("src");
			}
			if ((i+1) >= imgs.length) {
				nextImgUrl = "";
			}
			else {
				nextImgUrl = imgs[i+1].getAttribute("src");
			}
		}
	}
}





document.addEventListener("click", closeLightbox);

function closeLightbox() {
	if (lightbox) {
		if (lightbox.classList.contains("active")) {
			lightbox.classList.remove("active");
		}
	}		
}



jQuery(document).ready(function($) {	
	
});


document.onkeyup = function(event) {
	/*--- Esc ---*/
	if (event.keyCode === 27) {
		closeLightbox();
	}
	
	/*--- Left ---*/
	if (event.keyCode === 37) {
		navLightboxPrev(lightboxImg);
	}
	
	/*--- Right ---*/
	if (event.keyCode === 39) {
		navLightboxNext(lightboxImg);
	}
}








































































