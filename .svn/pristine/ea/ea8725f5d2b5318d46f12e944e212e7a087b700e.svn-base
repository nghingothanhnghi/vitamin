


setInterval(function() { 	
	var _notices = document.getElementById("notices");
	if (_notices) {
		var _lis = _notices.getElementsByClassName("articles")[0].children[0].children;
		
		var _index = -1;
		
		for (var i=0; i<_lis.length; i++) {
			if (_lis[i].classList.contains("active")) {
				_index = i;
			}
		}
		
		_lis[_index].classList.remove("active");
		
		var _nextIndex = _index + 1;
		if (_nextIndex > (_lis.length - 1)) {
			_nextIndex = 0;
		}
		_lis[_nextIndex].classList.add("active");
	}
	
	
}, 5000);


























