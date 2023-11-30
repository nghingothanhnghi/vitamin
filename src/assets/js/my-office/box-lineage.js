




var horizontal_spacing = 10;
var border_radius = 30;
var line_height = 100;
var line_color = "#00CEEA";
var line_width = 3;
var line_dashed_space = 6;
var node_spacing = 20;

var point_size = 8;

var point_style = '';
var child_point_style = '';
var parent_point_style = '';

point_style += 'position: absolute;';
point_style += 'z-index: 0;';
point_style += 'left: 50%; transform: translateX(-50%);';
point_style += 'border-radius: 50%;';
point_style += 'width:' + point_size + 'px;';
point_style += 'height:' + point_size + 'px;';

child_point_style += point_style;
child_point_style += 'background: #F3F4FB;';
child_point_style += 'border: 1px solid #585858;';
child_point_style += 'top: -' + point_size*3/4 + 'px;';

parent_point_style += point_style;
parent_point_style += 'background: #585858;';
parent_point_style += 'bottom: -' + point_size*3/4 + 'px;';


var node_width = 120;
var node_width_mobile = 110;

var chart_padding_top = 50;
var chart_padding_right = 50;
var chart_padding_bottom = 50;
var chart_padding_left = 50;






var test_id = "";
var users = [];
var order = 0;


var chart;
var chart_wrapper;



var max_level = 2;

var delay_load = 2500;
var delay_draw_nodes = 1500;
var delay_init_data = 500;

var total_delay = delay_load + delay_draw_nodes + delay_init_data;
var interval = total_delay / 100;

var isDone_box = false;

function adjustParental () {
	for (var i=0; i<users.length; i++) {
	   var id = users[i].id;      
	   if (countSub(id) > 0) {
		  users[i].parental = "parentable";
	   }   
	}
 }


function drawChart(test_id, boxs, member, lv) {	
	isDone_box = false
	max_level = lv;
	users = boxs;
	test_id = member.id;

	setTimeout(function () {

		reOrderUsers();
		reOrderUsersPath();

		setTimeout(function () {
			adjustParental();
			var main_user = getUserById(test_id);
			chart_wrapper = document.querySelector(".chart-container .chart-wrapper");	
			createNode(main_user, chart_wrapper);

			drawNodes(main_user, main_user.level);

			setTimeout(function () {
				updateChartWrapper(test_id);
				var children_doms = getDomsByParentId(test_id);
				if (children_doms.length > 0) {
					drawParentNodeLine(chart_wrapper, test_id);
				}				
				drawLines(chart_wrapper);
				isDone_box = true
			}, delay_draw_nodes);

		}, delay_init_data);


	}, delay_load);
}


function drawViewBoxLine(id) {
	var ele = document.getElementById('box-loading')
	setTimeout(() => {
		var chart_wrapper_line = document.querySelector(".chart-container .chart-wrapper");		
		drawParentNodeLine(chart_wrapper_line, id);
		drawLines(chart_wrapper_line);
		ele.classList.add('hidden-box');
	}, 100);
}





function removeUsers(arr_users, users) {
	for (var i = 0; i < arr_users.length; i++) {
		removeUser(arr_users[i], users);
	}
}


function removeUser(user, users) {
	for (var i = 0; i < users.length; i++) {
		var id = users[i].id;
		if (user.id == id) {
			users.splice(i, 1);
		}
	}
}







function getLastUpperDom() {
	var upper_nodes = document.querySelectorAll(".upper-node");
	return upper_nodes[upper_nodes.length - 1];
}








function drawNodes(parent_user, start_level) {

	var max_level = getMaxLevel();
	var parent_user_id = parent_user.id;
	if (start_level <= max_level) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].r_id == parent_user_id) {
				createNode(users[i], chart_wrapper);
				drawNodes(users[i], start_level + 1);
			}
		}
	}
}








function createNode(user, chart_wrapper) {

	var id = user.id;
	var r_id = user.r_id;
	var level = user.level;
	var path = user.path;
	var name = user.name;
	var parental = user.parental;
	var rankColor = user.rankColor;
	
	var rankColorName = (rankColor)?rankColor:'#000000'
	if(rankColor == null || rankColor == undefined){
		rankColor = '#fff'
	}

	var top;
	var left;

	var index = getPathIndex(path);
	var parent_element = getDomById(r_id);

	if (level == 0) {
		top = chart_padding_top;
		left = chart_padding_left;
	} else {
		top = parseInt(parent_element.style.top) + parent_element.offsetHeight + line_height;
	}

	var movable = 0;


	if (index == 0) {
		if (parent_element) {
			left = parseInt(parent_element.style.left);

			var doms = getDomsByLevel(level);
			var doms_of_parent = getDomsByParentId(r_id);
			removeDomsinDoms(doms_of_parent, doms);
			var max_x = identifyLeftEdge(doms);

			if (left < max_x) {
				left = max_x + node_spacing * 2;
			}

			if (left > max_x) {
				movable = left - max_x - node_spacing * 2;
			}
		}
	}
	else {
		var prev_path = getPreviousPath(path);
		var prev_user = getUserByPath(prev_path);
		var prevElement = getDomById(prev_user.id);
		if (!prevElement) {
			left = 0;
		} else {			
			left = parseInt(prevElement.style.left) + node_width + node_spacing;
		}
		
	}


	var html = '';
	
	var node_class = parental + ' ';
	var node_w = 0;
	var node_style = '';

	if (level == 0) {
		node_class += 'level-0';
	}
	if (level == 1) {
		node_class += 'level-1';
	}
	if (level == 2) {
		node_class += 'level-2';
	}
	if (level > 2) {
		node_class += 'level-x';
	}

	if (user.status == '0') {
		node_class += ' deleted-user';
	}

	

	var _width = window.innerWidth;
	if (_width > 575) {
		node_w = node_width;
	} else {
		node_w = node_width_mobile;
	}

	node_style += 'position: absolute;';
	node_style += 'top: ' + top + 'px;';
	node_style += 'left: ' + left + 'px;';
	node_style += 'width: ' + node_w + 'px;';
	node_style += 'min-height: ' + node_w + 'px;';
	node_style += 'background-image: linear-gradient(' + rankColor + ', ' + rankColor + ');';

	html += '<div class="node ' + node_class + '" id="' + id + '" index="' + index + '" level="' + level + '" parent="' + r_id + '" movable="' + movable + '" style="' + node_style + '">';
	if (level ==0) {
		if (parental != "azoic") {
			html += '	<div class="parent-point" style="' + parent_point_style + '">';
			html += '	</div>';
		}
	} 
	else {
		html += '	<div class="child-point" style="' + child_point_style + '">';
		html += '	</div>';
		if (parental != "azoic") {
			html += '	<div class="parent-point" style="' + parent_point_style + '">';
			html += '	</div>';
		}
	}
	html += '	<div class="info-wrapper">';
	html += '		<div class="info">';		
	html += '			<div class="name name-box-find" id="'+id+'"><a class="name"  style = "color:' + rankColorName + ';">' + name + '</a></div>';
	html += '			<div class="id"><a class="id"  href="/my-office/member-management/member-infor-inquiry?userid='+id+'" target="_blank">' + id + '</a></div>';
	html += '			<div class="joint-date">' + user.regDate + '</div>';
	html += '			<div class="max-rank">' + user.cntName + '</div>';
	html += '			<div class="pv">' + user.parentName + '</div>';
	html += '			<div class="last-purchased-date">' + user.pv + '</div>';
	// html += '			<div class="active-status">' + user.bbmiddleName + '</div>';
	// html += '			<div class="star-status">' + user.bbfamilyName + '</div>';
	html += '		</div>';
	html += '	</div>';



	html += '</div>';

	$(chart_wrapper).append(html);

	// if (parent_element) {
	// 	moveBranchFromDom(parent_element);
	// }

	var user_dom = getDomById(id);
	if (user_dom) {
		updateParentDomLeft(user_dom);
	}
}





function moveBranchFromDom(parent_dom) {
	var offset_move = (node_width + node_spacing) / 2;
	var doms = getDomsByParentId(parent_dom.getAttribute("id"));
	var movable;

	if (doms.length > 0) {
		movable = parseInt(doms[0].getAttribute("movable"));
	}

	if (doms.length > 1) {
		if (movable > 0) {
			for (var i = 0; i < doms.length; i++) {
				if (i == 0) {
					doms[i].setAttribute("movable", (movable - offset_move));
				}
				doms[i].style.left = (parseInt(doms[i].style.left) - offset_move) + "px";
				moveBranchFromDom(doms[i]);
			}
		}
	}
}










function updateParentDomLeft(child_dom) {

	var parent_dom = getDomById(child_dom.getAttribute("parent"));
	if (parent_dom) {

		var parent_id = parent_dom.getAttribute("id");
		var parent_left = parseInt(parent_dom.style.left);
		var children_doms = getDomsByParentId(parent_id);



		var children_left = parseInt(children_doms[0].style.left);

		var start_x = parseInt(children_doms[0].style.left);
		var end_x = parseInt(children_doms[children_doms.length - 1].style.left) + node_width;
		var offset_left = (end_x - start_x - node_width) / 2;

		var new_left = children_left + offset_left;

		if (parent_left < new_left) {
			
			let level = child_dom.getAttribute("level");
			
			for(let i = parseInt(level) - 1; i>=0; i--){
				var parent_node = getDomsByLevel(i);
				var chil_node = getDomsByParentId(parent_node[parent_node.length - 1].getAttribute("id"));
				if(chil_node.length >= 2){
					if(parseInt(parent_node[parent_node.length - 1].style.left) > parseInt(chil_node[0].style.left)){
						var newStart_x = parseInt(chil_node[0].style.left);
						var newEnd_x = parseInt(chil_node[chil_node.length - 1].style.left) + node_width;
						var newOffset_left = (newEnd_x - newStart_x - node_width) / 2;
						var renew_left = parseInt(chil_node[0].style.left) + newOffset_left;

						parent_node[parent_node.length - 1].style.left = renew_left + "px";
						continue;
					}else{
						var newStart_x = parseInt(chil_node[0].style.left);
						var newEnd_x = parseInt(chil_node[chil_node.length - 1].style.left) + node_width;
						var newOffset_left = (newEnd_x - newStart_x - node_width) / 2;
						var renew_left = parseInt(chil_node[0].style.left) + newOffset_left;

						parent_node[parent_node.length - 1].style.left = renew_left + "px";
					}
				}else{
					if((parseInt(parent_node[parent_node.length - 1].style.left) < parseInt(chil_node[0].style.left)) && chil_node.length == 1){

						parent_node[parent_node.length - 1].style.left = parseInt(chil_node[0].style.left) + "px";
					}else{
						parent_node[parent_node.length - 1].style.left = new_left + "px";
					}
					
				}
			}

		}


		parent_dom.setAttribute("movable", offset_left);

		var index = child_dom.getAttribute("index");
		if (index == "0") {
			var movable = parseInt(child_dom.getAttribute("movable"));
			if (movable == 0) {
				parent_dom.setAttribute("movable", 0);
			}
		}
	}
}








function identifyLeftEdge(doms) {
	var max_left = 0 + chart_padding_left;
	if (doms.length > 0) {
		last_dom = doms.pop();
		max_left = parseInt(last_dom.style.left) + node_width + node_spacing;
	}
	return max_left;
}

















function removeDomsinDoms(doms_1, doms_2) {
	for (var i = 0; i < doms_1.length; i++) {
		removeDominDoms(doms_1[i], doms_2);
	}
}

function removeDominDoms(dom, doms) {
	var id = dom.getAttribute("id");
	var index = -1;
	for (var i = 0; i < doms.length; i++) {
		var _id = doms[i].getAttribute("id");
		if (_id == id) {
			index = i;
		}
	}
	doms.splice(index, 1);
}







function getPathIndex(path) {
	var words = path.split('-');
	var last_word = words[words.length - 1];
	var index = parseInt(last_word);
	return index;
}



function getPreviousPath(path) {
	var words = path.split('-');
	var last_word = words[words.length - 1];
	var index = parseInt(last_word) - 1;
	words[words.length - 1] = index.toString();

	var str = '';
	for (var i = 0; i < words.length; i++) {
		if (i == 0) {
			str += words[i];
		} else {
			str += '-' + words[i];
		}
	}
	return str;
}









function reOrderUsers() {
	var temp_users = [];
	var max_level = getMaxLevel();
	for (var j = 0; j <= max_level; j++) {
		var arr = getUsersByLevel(j);
		for (var i = 0; i < arr.length; i++) {
			temp_users.push(arr[i]);
		}
	}
	users = temp_users;
}



function reOrderUsersPath() {
	for (var i = 0; i < users.length; i++) {
		reOrderPath(users[i].id);
	}
}



function reOrderPath(parent_user_id) {
	var arr = getSubs(parent_user_id);
	var parent_user = getUserById(parent_user_id);
	var path = parent_user.path;
	for (var i = 0; i < arr.length; i++) {
		arr[i].path = path + "-" + i;
	}
}




function getDomsByLevel(level) {
	var all_nodes = document.querySelectorAll(".node");
	var doms = [];
	for (var i = 0; i < all_nodes.length; i++) {
		var node_level = all_nodes[i].getAttribute("level");
		if (node_level == level) {
			doms.push(all_nodes[i]);
		}
	}
	return doms;
}


function getDomsByParentId(parent_id) {
	var all_nodes = document.querySelectorAll(".node");
	var doms = [];
	for (var i = 0; i < all_nodes.length; i++) {
		var parent = all_nodes[i].getAttribute("parent");
		if (parent_id == parent) {
			doms.push(all_nodes[i]);
		}
	}
	return doms;
}




function getDomById(id) {
	var node;
	var nodes = document.querySelectorAll(".node");
	if (nodes.length > 0) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].getAttribute("id") == id) {
				node = nodes[i];
			}
		}
	}
	return node;
}








function getUserByPath(path) {
	var user;
	for (var i = 0; i < users.length; i++) {
		if (path == users[i].path) {
			user = users[i];
		}
	}
	return user;
}







function getUserLevel(user_id) {
	var level = -1;
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == user_id) {
			level = users[i].level;
		}
	}
	return level;
}




function getUsersByLevel(level) {
	var arr = [];
	for (var i = 0; i < users.length; i++) {
		if (users[i].level == level) {
			arr.push(users[i]);
		}
	}
	return arr;
}




function getParentUserById(id) {
	var user;
	var this_user = getUserById(id);
	var r_id = this_user.r_id;
	for (var i = 0; i < users.length; i++) {
		if (r_id == users[i].id) {
			user = users[i];
		}
	}
	return user;
}



function getUserById(id) {
	var user;
	for (var i = 0; i < users.length; i++) {
		if (id == users[i].id) {
			user = users[i];
		}
	}
	return user;
}





function getSubs(id) {
	var arr = [];
	for (var i = 0; i < users.length; i++) {
		if (users[i].r_id == id) {
			arr.push(users[i]);
		}
	}
	return arr;
}



function countSub(user_id) {
	var result = 0;
	for (var i = 0; i < users.length; i++) {
		var r_id = users[i].r_id;
		if (r_id == user_id) {
			result++;
		}
	}
	return result;
}





function getMaxLevel() {
	var max_level = 0;
	for (var i = 0; i < users.length; i++) {
		var level = parseInt(users[i].level);
		if (level >= max_level) {
			max_level = level;
		}
	}
	return max_level;
}





























/*---- Draw Chart Lines ----*/


function drawParentNodeLine(chart_wrapper, id) {

	var main_node = document.getElementById(id);
	var children_doms = getDomsByParentId(id);

	var canvas_wrapper = document.createElement("div");
	canvas_wrapper.setAttribute("class", "canvas-wrapper");

	if(!main_node){
		return;
	}


	var canvas_width = main_node.offsetWidth;
	var canvas_height;
	var canvas_top = (parseInt(main_node.style.top) + main_node.offsetHeight) + point_size*3/4;
	var canvas_left = parseInt(main_node.style.left);

	if(children_doms[0]){
		canvas_height = parseInt(children_doms[0].style.top) - canvas_top - border_radius;
	}

	var has_mid = false;
	var has_left = false;
	var has_right = false;

	var left_class = id + "-node-left";
	var right_class = id + "-node-right";

	if (children_doms.length > 0) {
		for (var i = 0; i < children_doms.length; i++) {
			var dom_left = parseInt(children_doms[i].style.left);
			var main_left = parseInt(main_node.style.left);
			if (dom_left == main_left) {
				has_mid = true;
				canvas_wrapper.classList.add("has-mid");
			}
			if (dom_left < main_left) {
				has_left = true;
				children_doms[i].classList.add(left_class);
			}
			if (dom_left > main_left) {
				has_right = true;
				children_doms[i].classList.add(right_class);
			}
		}
	}


	var node_lefts = document.getElementsByClassName(left_class);
	var node_rights = document.getElementsByClassName(right_class);

	var first_left, last_right;

	if (node_lefts.length > 0) {
		first_left = node_lefts[0];

		var x1 = parseInt(first_left.style.left) + first_left.offsetWidth / 2 + border_radius;
		var x2 = parseInt(main_node.style.left) + main_node.offsetWidth / 2 - border_radius;
		var y = parseInt(first_left.style.top) - border_radius - line_width / 2;

		drawChildrenHorizontalLine(x1, x2, y, chart_wrapper);
	}

	if (node_rights.length > 0) {
		last_right = node_rights[node_rights.length - 1];
		var x1 = parseInt(main_node.style.left) + main_node.offsetWidth / 2 + border_radius;
		var x2 = parseInt(last_right.style.left) + last_right.offsetWidth / 2 - border_radius;
		var y = parseInt(last_right.style.top) - border_radius - line_width / 2;

		drawChildrenHorizontalLine(x1, x2, y, chart_wrapper);
	}






	var style = '';
	style += 'position: absolute;';
	style += 'height: ' + canvas_height + 'px;';
	style += 'width: ' + canvas_width + 'px;';
	style += 'top: ' + canvas_top + 'px;';
	style += 'left: ' + canvas_left + 'px;';

	canvas_wrapper.setAttribute("style", style);
	chart_wrapper.appendChild(canvas_wrapper);

	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", canvas_width);
	canvas.setAttribute("height", canvas_height);
	canvas_wrapper.appendChild(canvas);

	var ctx = canvas.getContext("2d");
	// ctx.strokeStyle = line_color;
	ctx.beginPath();
	ctx.setLineDash([line_width, line_dashed_space]);

	if (children_doms.length == 1) {
		// ctx.moveTo(canvas_width / 2, 0);
		// ctx.lineTo(canvas_width / 2, canvas_height);
		// ctx.stroke();
	}
	if (children_doms.length > 1) {
		ctx.moveTo(canvas_width / 2, 0);

		if (has_mid == true) {
			ctx.lineTo(canvas_width / 2, canvas_height);
		} else {
			ctx.lineTo(canvas_width / 2, canvas_height - border_radius);
		}

		if (has_left == true) {
			var x1 = canvas_width / 2 - border_radius;
			var y1 = canvas_height;
			var x2 = canvas_width / 2;
			var y2 = canvas_height - border_radius;
			var x_curve = x2;
			var y_curve = canvas_height - border_radius / 5;;

			ctx.moveTo(x1, y1);
			ctx.quadraticCurveTo(
				x_curve, y_curve,
				x2, y2
			);
		}
		if (has_right == true) {
			var x1 = canvas_width / 2 + border_radius;
			var y1 = canvas_height;
			var x2 = canvas_width / 2;
			var y2 = canvas_height - border_radius;
			var x_curve = x2;
			var y_curve = canvas_height - border_radius / 5;;

			ctx.moveTo(x1, y1);
			ctx.quadraticCurveTo(
				x_curve, y_curve,
				x2, y2
			);
		}
		ctx.stroke();
	}
}


function drawChildrenHorizontalLine(x1, x2, y, chart_wrapper) {
	let canvas_wrapper = document.createElement("div");
	canvas_wrapper.setAttribute("class", "canvas-wrapper horizontal-line");

	let wrapper_width = x2 - x1;
	let wrapper_height = line_width;

	let wrapper_style = '';
	wrapper_style += 'position: absolute;';
	wrapper_style += 'height: ' + wrapper_height + 'px;';
	wrapper_style += 'width: ' + wrapper_width + 'px;';
	wrapper_style += 'top: ' + y + 'px;';
	wrapper_style += 'left: ' + x1 + 'px;';

	canvas_wrapper.setAttribute("style", wrapper_style);
	chart_wrapper.appendChild(canvas_wrapper);
}





function drawLines(chart_wrapper) {
	var chart_container = chart_wrapper.closest(".chart-container");
	var mode = chart_container.getAttribute("mode");
	
	var doms = document.querySelectorAll(".node");
	for (var i = 0; i < doms.length; i++) {
		var id = doms[i].getAttribute("id");
		var children_doms = getDomsByParentId(id);
		if (children_doms.length > 0) {			
			if (mode == "non-smooth") {
				drawParentNodeLine(chart_wrapper, id);
				drawChildrenLines(children_doms, doms[i], chart_wrapper);
			} 
			drawChildrenLines(children_doms, doms[i], chart_wrapper);
		}		
	}
}








function drawChildrenLines(children_doms, parent_dom, chart_wrapper) {
	var chart_container = chart_wrapper.closest(".chart-container");
	var mode = chart_container.getAttribute("mode");
	if (mode == "non-smooth") {
		for (var i = 0; i < children_doms.length; i++) {
			drawChildLineNonSmooth(children_doms[i], parent_dom, chart_wrapper);
		}
	} else {
		for (var i = 0; i < children_doms.length; i++) {
			drawChildLine(children_doms[i], parent_dom, chart_wrapper);
		}
	}	
}





function drawChildLineNonSmooth(dom, parent_dom, chart_wrapper) {

	var dom_center_x = parseInt(dom.style.left) + parseInt(dom.style.width) / 2;
	var parent_dom_center_x = parseInt(parent_dom.style.left) + parseInt(parent_dom.style.width) / 2;

	var distance = parent_dom_center_x - dom_center_x;

	var canvas_top;
	var canvas_left;
	var canvas_width;
	var canvas_height;
	var canvas_direction;

	var canvas_wrapper = document.createElement("div");
	canvas_wrapper.setAttribute("class", "canvas-wrapper");
	canvas_wrapper.setAttribute("from-child", dom.getAttribute("id"));
	canvas_wrapper.setAttribute("to-parent", parent_dom.getAttribute("id"));

	if (distance == 0) {
		canvas_direction = "mid";
		canvas_width = dom.offsetWidth;
		canvas_top = parseInt(parent_dom.style.top) + parent_dom.offsetHeight + border_radius + point_size*3/4;
		canvas_left = parseInt(dom.style.left);
		canvas_height = parseInt(dom.style.top) - canvas_top - point_size*3/4;	
		canvas_wrapper.classList.add("has-mid");			
	}
	else {
		canvas_width = border_radius;
		canvas_top = parseInt(dom.style.top) - border_radius;

		if (distance < 0) {
			canvas_direction = "rtl";
			canvas_left = parseInt(dom.style.left) + dom.offsetWidth / 2 - border_radius;
			if (canvas_left < (parent_dom_center_x + border_radius)) {
				canvas_width = dom_center_x - (parent_dom_center_x);
				canvas_left = parent_dom_center_x + border_radius;
				canvas_height = parseInt(dom.style.top) - canvas_top;
				dom.setAttribute("direct", "rtl");
			} 
		}

		if (distance > 0) {
			canvas_direction = "ltr";
			canvas_left = parseInt(dom.style.left) + dom.offsetWidth / 2;			
			if ((canvas_left + canvas_width) > (parent_dom_center_x - border_radius)) {
				canvas_width = parent_dom_center_x - dom_center_x;
				canvas_left = dom_center_x;
				dom.setAttribute("direct", "ltr");
			}			
		}
		canvas_height = parseInt(dom.style.top) - canvas_top - point_size*3/4;
	}


	
	canvas_wrapper.setAttribute("direction", canvas_direction);

	var style = '';
	style += 'position: absolute;';
	style += 'width: ' + canvas_width + 'px;';
	style += 'height: ' + canvas_height + 'px;';
	style += 'top: ' + canvas_top + 'px;';
	style += 'left: ' + canvas_left + 'px;';

	canvas_wrapper.setAttribute("style", style);
	chart_wrapper.appendChild(canvas_wrapper);

	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", canvas_width);
	canvas.setAttribute("height", canvas_height);
	canvas_wrapper.appendChild(canvas);

	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.setLineDash([line_width, line_dashed_space]);

	if (canvas_direction == "ltr") {
		ctx.moveTo(0, canvas_height);
		ctx.quadraticCurveTo(0, 0, canvas_width, 0);
	}
	else if (canvas_direction == "rtl")  {
		ctx.moveTo(canvas_width, canvas_height);
		ctx.quadraticCurveTo(canvas_width, 0, 0, 0);
	}		

	ctx.stroke();
}









function drawChildLine(dom, parent_dom, chart_wrapper) {

	var level = dom.getAttribute("level");

	var dom_center_x = parseInt(dom.style.left) + parseInt(dom.style.width) / 2;
	var parent_dom_center_x = parseInt(parent_dom.style.left) + parseInt(parent_dom.style.width) / 2;

	var distance = parent_dom_center_x - dom_center_x;

	var canvas_top;
	var canvas_left;
	var canvas_width;
	var canvas_height;
	var canvas_direction;


	var canvas_wrapper = document.createElement("div");
	canvas_wrapper.setAttribute("class", "canvas-wrapper");


	if (level == "1") {
		if (distance == 0) {
			canvas_direction = "mid";
			canvas_width = dom.offsetWidth;
			canvas_top = parseInt(parent_dom.style.top) + parent_dom.offsetHeight + (line_height + border_radius) * (1 / 3);
			canvas_left = parseInt(dom.style.left);
			canvas_height = parseInt(dom.style.top) - canvas_top - point_size*3/4;
			canvas_wrapper.classList.add("has-mid");
		}
		else {
			canvas_width = border_radius;
			canvas_top = parseInt(dom.style.top) - border_radius;

			if (distance > 0) {
				canvas_direction = "ltr";
				canvas_left = parseInt(dom.style.left) + dom.offsetWidth / 2;				
				if ((canvas_left + canvas_width) > parent_dom_center_x) {
					canvas_top = parseInt(parent_dom.style.top) + parent_dom.offsetHeight + (line_height + border_radius) * (1 / 3);
					canvas_width = parent_dom_center_x - dom_center_x;
					canvas_left = dom_center_x;
					dom.setAttribute("direct", "d-ltr");
				} 
				if ((canvas_left + canvas_width) < parent_dom_center_x && (canvas_left + canvas_width) > (parent_dom_center_x - border_radius)) {
					canvas_width = parent_dom_center_x - border_radius - dom_center_x;
					canvas_left = dom_center_x;
				}				
			}

			if (distance < 0) {
				canvas_direction = "rtl";
				canvas_left = parseInt(dom.style.left) + dom.offsetWidth / 2 - border_radius;

				if (dom_center_x < (parent_dom_center_x + border_radius)) {
					canvas_top = parseInt(parent_dom.style.top) + parent_dom.offsetHeight + (line_height + border_radius) * (1 / 3);
					canvas_left = parent_dom_center_x;
					canvas_width = dom_center_x - parent_dom_center_x;					
					dom.setAttribute("direct", "d-ltr");
				} 

				if (dom_center_x > (parent_dom_center_x + border_radius)) {
					if (dom_center_x < (parent_dom_center_x + border_radius*2)) {
						canvas_left = parent_dom_center_x + border_radius;
						canvas_width = dom_center_x - (parent_dom_center_x + border_radius);
					}										
				}
			}			
			canvas_height = parseInt(dom.style.top) - canvas_top - point_size;			
		}
	}
	
	if (level != "1") {
		canvas_top = parseInt(parent_dom.style.top) + parent_dom.offsetHeight + (point_size*3)/4;
		if (distance == 0) {
			canvas_direction = "mid";
			canvas_width = dom.offsetWidth;
			canvas_left = parseInt(dom.style.left);
			canvas_wrapper.classList.add("has-mid");
		}

		if (distance < 0) {
			canvas_direction = "rtl";
			canvas_width = distance * (-1);
			canvas_left = parent_dom_center_x;
		}

		if (distance > 0) {
			canvas_direction = "ltr";
			canvas_width = distance;
			canvas_left = dom_center_x;
		}

		canvas_height = parseInt(dom.style.top) - canvas_top - (point_size*3)/4;
	}



	
	canvas_wrapper.setAttribute("direction", canvas_direction);

	var style = '';
	style += 'position: absolute;';
	style += 'width: ' + canvas_width + 'px;';
	style += 'height: ' + canvas_height + 'px;';
	style += 'top: ' + canvas_top + 'px;';
	style += 'left: ' + canvas_left + 'px;';

	canvas_wrapper.setAttribute("style", style);
	chart_wrapper.appendChild(canvas_wrapper);

	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", canvas_width);
	canvas.setAttribute("height", canvas_height);
	canvas_wrapper.appendChild(canvas);

	var ctx = canvas.getContext("2d");
	// ctx.strokeStyle = line_color;
	ctx.beginPath();
	ctx.setLineDash([line_width, line_dashed_space]);

	if (level == "1") {
		var direct = dom.getAttribute("direct");
		if (direct == "d-ltr") {
			ctx.moveTo(0, canvas_height);
			ctx.bezierCurveTo(
				canvas_width * .2, canvas_height * .2,
				canvas_width * .8, canvas_height * .8,
				canvas_width, 0
			);
		} else if (direct == "d-rtl") {
			ctx.moveTo(0, 0);
			ctx.bezierCurveTo(
				canvas_width * .2, canvas_height * .8,
				canvas_width * .8, canvas_height * .2,
				canvas_width, canvas_height
			);
		} 
		else {
			if (canvas_direction == "ltr") {
				ctx.moveTo(0, canvas_height);
				ctx.quadraticCurveTo(0, 0, canvas_width, 0);
			}
			else if (canvas_direction == "rtl") {
				ctx.moveTo(canvas_width, canvas_height);
				ctx.quadraticCurveTo(canvas_width, 0, 0, 0);
			}	
		}				
	}
	else {
		if (canvas_direction == "ltr") {
			ctx.moveTo(0, canvas_height);
			ctx.bezierCurveTo(
				canvas_width * .2, canvas_height * .2,
				canvas_width * .8, canvas_height * .8,
				canvas_width, 0
			);
		}
		else if (canvas_direction == "rtl") {
			ctx.moveTo(0, 0);
			ctx.bezierCurveTo(
				canvas_width * .2, canvas_height * .8,
				canvas_width * .8, canvas_height * .2,
				canvas_width, canvas_height
			);
		}
	}

	ctx.stroke();

}




function updateChartWrapper(id) {

	updateMainNodePosition();

	var main_node = document.getElementById(id);
	var _left = parseInt(main_node.style.left);

	var nodes = document.querySelectorAll(".node");
	var max_x = 0;
	var max_y = 0;

	for (var i = 0; i < nodes.length; i++) {
		var x = parseInt(nodes[i].style.left) + nodes[i].offsetWidth;
		var y = parseInt(nodes[i].style.top) + nodes[i].offsetHeight;
		if (max_x < x) {
			max_x = x;
		}
		if (max_y < y) {
			max_y = y;
		}
	}

	var chart_container = document.querySelector(".chart-container");
	chart_container.style.height = max_y + chart_padding_bottom + "px";


	var chart_wrapper = document.querySelector(".chart-container .chart-wrapper");

	var new_width = max_x + chart_padding_right;
	if (new_width < chart_container.offsetWidth) {
		var distance = (chart_container.offsetWidth - new_width)/2;
		for (var i = 0; i < nodes.length; i++) {
			var new_left = parseInt(nodes[i].style.left) + distance;
			nodes[i].style.left = new_left + "px";
		}
		chart_wrapper.style.width = chart_container.offsetWidth + "px";
		chart_wrapper.style.height = chart_container.offsetWidth + "px";
	} 
	else {
		chart_wrapper.style.width = max_x + chart_padding_right + "px";
		chart_wrapper.style.height = max_y + chart_padding_bottom + "px";
	}

	

	var chart_module = chart_wrapper.closest(".chart-module");
	var _width = chart_module.offsetWidth;
	chart_container.scrollLeft = _left + (main_node.offsetWidth - _width)/2;
}



function updateMainNodePosition() {
	var main_node = document.querySelector(".level-0");	
	var main_id = main_node.getAttribute("id");

	var children_doms = getDomsByParentId(main_id);
	if (children_doms.length > 1) {
		var start_x = parseInt(children_doms[0].style.left);
		var end_x = parseInt(children_doms[children_doms.length-1].style.left) + children_doms[children_doms.length-1].offsetWidth;

		var center_x = start_x + (end_x - start_x)/2;
		main_node.style.left = (center_x - main_node.offsetWidth/2) + "px";
	}
	if (children_doms.length == 1) {
		main_node.style.left = children_doms[0].style.left;
	}
}






function draggableBox(){
	const draggableWrapper = document.querySelector('.chart-container');

	if (draggableWrapper) {
		let isDown = false;
		let startX;
		let scrollLeft;

		let startY;
        let scrollTop;

		var start_movement = 0;
		var end_movement = 0;

		draggableWrapper.addEventListener('mousedown', (e) => {

			draggableWrapper.style.cursor = "grab";

			e.stopPropagation();
			isDown = true;

			draggableWrapper.classList.add('active');
			startX = e.pageX - draggableWrapper.offsetLeft;
			scrollLeft = draggableWrapper.scrollLeft;

			startY = e.pageY - draggableWrapper.offsetTop;
			scrollTop = draggableWrapper.scrollTop;

			start_movement = e.pageX;
		});


		draggableWrapper.addEventListener('mouseleave', () => {
			isDown = false;
			draggableWrapper.classList.remove('active');
		});


		draggableWrapper.addEventListener('mouseup', (e) => {

			draggableWrapper.style.cursor = "auto";

			isDown = false;
			draggableWrapper.classList.remove('active');
			end_movement = e.pageX;
		});


		draggableWrapper.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - draggableWrapper.offsetLeft;
			const walk = (x - startX) * 1;
			draggableWrapper.scrollLeft = scrollLeft - walk;


			const y = e.pageY - draggableWrapper.offsetTop;
			const walkY = (y - startY) * 1;
        	draggableWrapper.scrollTop = scrollTop - walkY;
		});


		$('.draggable-items-wrapper a').on('click', function (e) {
			e.preventDefault();
			var movement = end_movement - start_movement;
			if ((movement < 5) && (movement > -5)) {
				window.location.href = this.getAttribute("href");
			}
		});
	}

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




































