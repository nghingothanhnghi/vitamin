







$('.tel input').keypress(function() {	
	if (this.value.length >= 3) {
		var nextInput = $(this).next().next();
		nextInput.focus();
	}  
});





jQuery(document).ready(function($) {	
	var memberInquiryByPosition = document.getElementById("member-information-inquiry");
	if (memberInquiryByPosition) {
		
		var monthlyPerformance = 
		memberInquiryByPosition.getElementsByClassName("monthly-performance")[0];
		
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
	
});



jQuery(document).ready(function($) {	
	var affiliateMemberAnalysis = document.getElementById("affiliate-member-analysis");
	if (affiliateMemberAnalysis) {
		
		var positionChart = affiliateMemberAnalysis.getElementsByClassName("position-chart")[0];
		
		var valueRow = positionChart.getElementsByClassName("value-row")[0];
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
	
});

function initBar (value, bar, max) {
	var x = convertToIntValue(value.innerHTML);
	var _height = x/max * 150; 
	bar.style.height = _height + "px";
}






jQuery(document).ready(function($) {	

	$('#box-lineage .box-graph .name[href="#"]').on('click', function(e) {			
		e.preventDefault();	
		
	});
});


function drawChartBar(selector) {
	if (isNullOrEmpty(selector) || typeof selector !== 'string') return;
	
	if (typeof selector === 'string' && !(selector.startsWith('.') || selector.startsWith('#'))) {
		selector = '#' + selector;
	}
	
	const affiliateMemberAnalysis = $(selector);
	if (affiliateMemberAnalysis) {
		const valueRow = $(selector + ' .value-row');
		const lis = $(valueRow).children();

		var max = 0;

		for (var i = 0; i < lis.length; i++) {
			var value = lis[i].children[0];
			var x = convertToIntValue(value.innerHTML);
			if (max <= x) {
				max = x;
			}
		}
		
		for (var i = 0; i < lis.length; i++) {
			var value = lis[i].children[0];
			var bar = lis[i].children[1];
			initBar (value, bar, max);
		}
	}	
}