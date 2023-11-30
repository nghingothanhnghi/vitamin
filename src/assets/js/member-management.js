







$('.tel input').keypress(function() {	
	if (this.value.length >= 3) {
		var nextInput = $(this).next().next();
		nextInput.focus();
	}  
});





jQuery(document).ready(function($) {	
	checkRegistrationStep();
	drawChar();
});

function drawChar(){
	var memberInquiryByPosition = document.getElementById("member-information-inquiry");
	if (memberInquiryByPosition) {
		var monthlyPerformance = 
		memberInquiryByPosition.getElementsByClassName("monthly-performance")[0];
		
		if(null != monthlyPerformance && "" != monthlyPerformance && 'undefined' != monthlyPerformance) {
			var valueRow = monthlyPerformance.getElementsByClassName("value-row")[0];
			var lis = valueRow.getElementsByTagName("li");
	
			var max = 0;
	
			for (var i=0; i<lis.length; i++) {
				var value = lis[i].children[0];
				var x = convertToIntValue(value.innerHTML);
				if (max <= x) {
					max = x;
				}
			}
			
			
			for (var i=0; i<lis.length; i++) {
				var value = lis[i].children[0];
				var bar = lis[i].children[1];
				initBar (value, bar, max);
			}
		}
	}	
}


function initBar (value, bar, max) {
	var x = convertToIntValue(value.innerHTML);
	var _height = x/max * 150; 
	bar.style.height = _height + "px";
}

const STR_IS_DONE_STEP_1 = "is_done_step_1";
const STR_IS_DONE_STEP_2 = "is_done_step_2";
const STR_IS_DONE_STEP_3 = "is_done_step_3";
const STR_RID = "rId";

function checkRegistrationStep() {
	let data;
	let pageBody = $("#member-registration-4");

	if (pageBody.length == "1") {
		data = window.sessionStorage.getItem(STR_IS_DONE_STEP_3);
		
		if (!(data == "true")) {
			window.location.href = "/my-office/member-management/member-regis-1";
		}
	} 
	
	pageBody = $("#member-registration-3");
	if (pageBody.length == "1") {
		data = window.sessionStorage.getItem(STR_IS_DONE_STEP_2);
		
		if (!(data == "true")) {
			window.location.href = "/my-office/member-management/member-regis-1";
		}
	} 
	
	pageBody = $("#member-registration-2");
	if (pageBody.length == "1") {
		data = window.sessionStorage.getItem(STR_IS_DONE_STEP_1);
		
		if (!(data == "true")) {
			window.location.href = "/my-office/member-management/member-regis-1";
		}
	} 
}







jQuery(document).ready(function($) {	

	$("#member-registration-1 .agreement .btn-expand").on('click', function(e) {		
		var info = this.closest(".info");
		var content = info.getElementsByClassName("info-content")[0];	
		info.classList.toggle("opened");		
		this.classList.toggle("expanded");	
		$(content).slideToggle();				
	});	
	
	
	$("#member-registration-1 .info-check-all label").on('click', function(e) {	
		
		var agreement = this.closest(".agreement");
		var infos = agreement.getElementsByClassName("info");		
		
		var checkbox = this.closest(".w-checkbox");
		
		if (checkbox.classList.contains("checked")) {
			for (var i=0; i<infos.length; i++) {
				var input = infos[i].getElementsByTagName("input")[0];	
				var label = infos[i].getElementsByTagName("label")[0];
				
				if (input.checked == false) {	
					if (label.getAttribute("for") != "agreementCheckAll") {	
						$(label).click();
					}	
				}
			}
		} 
		else {
			for (var i=0; i<infos.length; i++) {
				var input = infos[i].getElementsByTagName("input")[0];	
				var label = infos[i].getElementsByTagName("label")[0];
				
				if (input.checked == true) {	
					if (label.getAttribute("for") != "agreementCheckAll") {	
						$(label).click();
					}	
				}
			}
		}
			
		
		
		
	});	

});

