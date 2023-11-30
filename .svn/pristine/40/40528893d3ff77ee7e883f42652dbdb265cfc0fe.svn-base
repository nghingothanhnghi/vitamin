const STR_MENU = "MENU";

const programKind = {
	topLeft: "ml",
	topRight: "mr",
	sideMenu: "mb",
	footerMenu: "mf",
	homeMenu: "mh",
	shopMenu: "ms",
	officeMenu: "mo",
}
const mainUrl = {
	shopping: "/shopping-mall",
	hone: "/",
	office: "/my-office",
}
const url = "/get-menu";

const loadMenu = function() {
	let menus = JSON.parse(sessionStorage.getItem(STR_MENU));
	if (isNotNullAndNotEmpty(menus)) {
		renderMenu(menus);
	} else {
		setIsLoading(true);
		$.ajax({
			url: url,
			data: {},
			dataType: "json",
			contentType: 'application/json',
			success: function(res) {
				sessionStorage.setItem(STR_MENU, JSON.stringify(res))
				
				renderMenu(res);
				
				setIsLoading(false);
			}
		});
	}
}

const renderMenu = function(data) {
	setIsLoading(true);
	loadTopMenu(data);
	loadSideBar(data);
	loadFooter(data);
	setTimeout(function() {
		setIsLoading(false);
	}, 500);
}





const loadTopMenu = function(data) {
	let pid;
	let kind;
	let defaultKind;
	let defaultPid;
	
	if (isNotNullAndNotEmpty(data)) {
		createMobileTopMenu();
		
		const eLeftMenu = $("#top-menu .top-menu-wrapper .left-nav");
		const eRightMenu = $("#top-menu .top-menu-wrapper .right-nav");

		const eLeftMobileMenu = $("#mobile-menu #mobile-top-menu .left-nav");
		const eRightMobileMenu = $("#mobile-menu #mobile-top-menu .right-nav");

		let item;
		let html = "";
		let activeClass = "";
		let path = window.location.pathname;
		
		let d;
		

	
		for (let i = 0; i < data.length; i++) {
			item = data[i];
			activeClass = "";
			
			d = _mapSvgIcons.get(item.prgId);	
			if (isNullOrEmpty(d)) {
				d = {};
			}
			

			if (item.prgKind === programKind.topLeft) {
				if(item.loginYn ==='N'&& isLogined()) {					
					continue;
				}
				if(item.loginYn ==='Y'&& !isLogined()) {					
					continue;
				}
				
				if (isNotNullAndNotEmpty(path) && isNotNullAndNotEmpty(item.linkInfo)) {
					if (path.startsWith(mainUrl.office) || path.startsWith(mainUrl.shopping)) {
						if (path.startsWith(mainUrl.office) && item.linkInfo === mainUrl.office) {
							kind = programKind.officeMenu;
							activeClass = " active";
						} else if (path.startsWith(mainUrl.shopping) && item.linkInfo === mainUrl.shopping) {
							kind = programKind.shopMenu;
							activeClass = " active";
						}
					} else {
						if (item.linkInfo === mainUrl.hone) {
							kind = programKind.homeMenu;
							activeClass = " active";
						}
					}
				}
				
				if (activeClass === " active") {
					pid = item.prgId;
				}
				
				html  = "<li class='menu-item col-auto" + activeClass + "' id='" + item.prgId + "'>";
				html += "	<a href='" + toString(item.linkInfo) + "'>";
				
				if (item.prgId == "ml.Home") {
					html += "	<svg width='12' height='16' viewBox='0 0 12 16' fill=''>";
					html += "		<path class='shape' d='" + toString(d.soild) + "' fill='white'></path>";
					html += "	</svg>";
				}	
				html += "		<span>" + item.prgName + "</span>";
				html += "	</a>";
				html += "</li>";
				
				eLeftMenu.append(html);
				eLeftMobileMenu.append(html.replaceAll("col-auto", "col"));
				
				if (!item.linkInfo.startsWith(mainUrl.shopping) && !item.linkInfo.startsWith(mainUrl.office)) {
					defaultKind = programKind.homeMenu;
					defaultPid = item.prgId;
				}
			} 
			

			if (item.prgKind === programKind.topRight) {
				if(item.loginYn ==='N'&& isLogined()) {					
					continue;
				}
				if(item.loginYn ==='Y'&& !isLogined()) {					
					continue;
				}

				if (isNotNullAndNotEmpty(path) && isNotNullAndNotEmpty(item.linkInfo)) {
					if (path.startsWith(mainUrl.office) || path.startsWith(mainUrl.shopping)) {
						if (path.startsWith(mainUrl.office) && item.linkInfo === mainUrl.office) {
							kind = programKind.officeMenu;
							activeClass = " active";
						} else if (path.startsWith(mainUrl.shopping) && item.linkInfo === mainUrl.shopping) {
							kind = programKind.shopMenu;
							activeClass = " active";
						} else if (path.startsWith(mainUrl.office) && item.linkInfo.startsWith(mainUrl.office)) {
							kind = programKind.officeMenu;
							activeClass = " active";
						}
					} else {
						if (item.linkInfo === mainUrl.hone) {
							kind = programKind.homeMenu;
							activeClass = " active";
						}
					}
				}
				if (activeClass === " active") {
					pid = item.prgId;
				}


				if (item.prgId == "mr.Myoffice") {
					var _url = window.location.href;
					if (_url.includes("/my-office/")) {
						html  = "<li class='col-auto menu-item active" + toString(item.icon) + "' id='" + item.prgId + "'>";
						html += "	<a href='" + toString(item.linkInfo) + "'>";
					}
					else {
						html  = "<li class='col-auto menu-item deactive" + toString(item.icon) + "' id='" + item.prgId + "'>";
						html += "	<a href='" + toString(item.linkInfo) + "'>";
					}
				}
				else {
					html  = "<li class='col-auto menu-item " + toString(item.icon) + "' id='" + item.prgId + "'>";
					html += "	<a href='" + toString(item.linkInfo) + "'>";
				}

				
				
				
				if (item.prgId == "mr.Login") {
					html += "	<svg width='10' height='16' viewBox='0 0 10 16' fill='none'>";
					html += "		<path d='" + toString(d.soild) + "'></path>";
					html += "	</svg>";
				}				
				
				if (item.prgId == "mr.Logout") {
					html += "	<svg width='10' height='16' viewBox='0 0 10 16' fill='none'>";
					html += "		<path d='" + toString(d.soild) + "'></path>";
					html += "	</svg>";
				}
				
				if (item.prgId == "mr.Mem.Info") {
					html += "	<svg width='14' height='16' viewBox='0 0 14 16' fill='none'>";
					html += "		<path d='" + toString(d.soild) + "'></path>";
					html += "	</svg>";
				}
				
				if (item.prgId == "mr.Mem.Regist") {
					html += "	<svg width='18' height='16' viewBox='0 0 18 16' fill='none'>";
					html += "		<path d='" + toString(d.soild) + "'></path>";
					html += "	</svg>";
				}
				
				if (item.prgId == "mr.Myoffice") {
					html += "	<svg width='10' height='16' viewBox='0 0 10 16' fill='none'>";
					html += "		<path d='" + toString(d.soild) + "'></path>";
					html += "	</svg>";
				}
				

				
				html += "		<span>" + item.prgName + "</span>";
				html += "	</a>";
				html += "</li>";
				eRightMenu.append(html);
				eRightMobileMenu.append(html.replaceAll("col-auto", "col"))
			}
		}
	}
	
	if (isNullOrEmpty(kind) && isNullOrEmpty(pid)) {
		kind = defaultKind;
		pid = defaultPid;
	}
	
	loadMainMenu(data, kind, pid);
}




const loadMainMenu = function(data, kind, pid) {
	if (isNullOrEmpty(kind)) return;
	if (isNullOrEmpty(pid)) return;
	
	if (isNotNullAndNotEmpty(data)) {
		const mainMenu = $("#main-menu ul");
		const mainMobileMenu = $("#mobile-menu #mobile-main-menu .lis-wrapper");
		
		let item;
		let html;
		let d;
		for (let i = 0; i < data.length; i++) {
			item = data[i];
			if (item.prgKind === kind && item.menuLv == 1) {
				activeClass = "";
				
				d = _mapSvgIcons.get(toString(item.prgId));
				  
				if (isNullOrEmpty(d)) {
					d = {};
				}
				
				html  = "<li style='cursor: pointer' class='menu-item col " + toString(item.icon) + "' id='" +  updateDotToUnderscore(item.prgId) + "'>";
				html += "	<a href='" + toString(item.linkInfo) + "'>";
				html += "		<svg width='35' height='35' viewBox='0 0 35 35' fill='none'>";
				html += "			<path class='solid-part' d='" + toString(d.soild) + "'></path>";
				html += "			<path class='color-part' d='" + toString(d.color) + "'></path>";
				html += "		</svg>";
				//html += "		<div class='icon'><img src=''><img src=''></div>;
				html += "		<span>" + toString(item.prgName) + "</span>";
				html += "	</a>";
				html += "</li>";
				mainMenu.append(html);
				
				html  = "<li class='menu-item " + toString(item.icon) + "' id='" + updateDotToUnderscore(toString(item.prgId)) + "'>";
				html += "	<a href='" + toString(item.linkInfo) + "' class='level-1'>";
				html += "		<svg width='35' height='35' viewBox='0 0 35 35' fill='none' class='svg-icon'>";
				html += "			<path class='solid-part' d='" + toString(d.soild) + "'></path>";
				html += "			<path class='color-part' d='" + toString(d.color) + "'></path>";
				html += "		</svg>";
				html += "		<span>" + toString(item.prgName) + "</span>";
				html += "		<div class='btn-open-sub' data-index='" + i + "'>";
				html += "			<svg class='svg-symbol' width='30' height='30' viewBox='0 0 40 40'> <path d='M8 19.5H32' stroke='black'></path> <path d='M20.5 8V32' stroke='black'></path> </svg>";
				html += "		</div>";
				html += "	</a>";
				html += "</li>";
				mainMobileMenu.append(html);
			}
		}
	}
	
	loadDropdownMenu(data, kind);
}

const loadDropdownMenu = function(data, kind) {
	if (isNullOrEmpty(kind)) return;
	let subMenu = [];
	let html = "";
	let item;

	// render menu level 2
	if (isNotNullAndNotEmpty(data)) {
		let isNewCol = true;
		for (let i = 0; i < data.length; i++) {
			item = data[i];
			if (item.prgKind === kind && item.menuLv > 1 && item.menuYn == "Y") {
				if (item.menuLv == "3") {
					subMenu.push(item);
					if (i < data.length - 1) {
						if (item.icon != data[i + 1].icon) {
							html += "</ul></li>";
							isNewCol = true;
						}
					} else if (i == data.length) {
						html += "</ul></li>";
						isNewCol = true;
					}
					continue;
				}
				if (isNewCol) {
					html += "<li class='menu-item col " + toString(item.icon) + "' id='" + toString(item.icon) + "'><ul>";
					isNewCol = false;
				}
				
				var original_label_parts = toString(item.prgName).split('<br>');
				var _label = "";
				for (let i=0; i<original_label_parts.length; i++) {
					_label += "<span>" + original_label_parts[i];
					_label += "</span>";					
				}
				
				html += "<li id='" + updateDotToUnderscore(toString(item.prgId)) + "'>";
				html += "	<a href='" + toString(item.linkInfo) + "'>" + _label /*toString(item.prgName)*/ + "</a>";
				html += "</li>";
				
				if (i < data.length - 1) {
					if (item.icon != data[i + 1].icon) {
						html += "</ul></li>";
						isNewCol = true;
					}
				} else if (i == data.length) {
					html += "</ul></li>";
					isNewCol = true;
				}
			}
		}
		$("#dropdown-menu ul").append(html);
		
		// render page nav
		loadPageNav(data, kind);
	}
	
	// render menu level 3
	if (isNotNullAndNotEmpty(subMenu)) {
		let ul;
		for (let i = 0; i < subMenu.length; i++) {
			item = subMenu[i];
			ul = $("#" + toString(item.pid) + " ul");
			if (ul.length === 0) {
				$("#" + toString(item.pid)).append("<ul></ul>");
			}
			html  = "<li id='" + toString(item.prgId) + "'>";
			html += "	<a href='" + toString(item.linkInfo) + "'>" + toString(item.prgName) + "</a>";
			html += "</li>";
			$("#" + updateDotToUnderscore(toString(item.pid)) + " ul").append(html);
		}
	}
	
	renderDropdownMenuMobile();
}

const renderDropdownMenuMobile = function() {
	let li;
	let id;
	let ul;
	
	const lis = $("#dropdown-menu .container>ul>li");
	const temp = $("#dropdown-menu .container>ul").html();
	const width = $(window).width();

	for (let i = 0; i < lis.length; i++) {
		li = lis[i];
		if ($(li).hasClass("col-auto")) {
			continue;
		}
		id = $(li).attr("id");
		if (isNullOrEmpty(id)) {
			continue;
		}
		ul = $(li).children();
		$(ul).addClass("sub-menu row closed");
		$(ul).css("display", "none");

//		set class by width
		if (width < 768) {
			$(ul).children().addClass("col-6");
		} else {
			$(ul).children().addClass("col-4");
		}

		$("#mobile-main-menu .container .lis-wrapper li." + updateDotToUnderscore(id)).append(ul);
	}
	$("#dropdown-menu .container>ul").html(temp);
	initClicks();
	renderSubPageMobileBar();
}

const renderSubPageMobileBar = function() {
	const mainLabel = $("#main-menu li.active a span").text();
	const subLabel = $("#subpages-nav>.container.sub-container>.nav-wrapper>.lis-wrapper>li.active a").text();
	const spans = $("#subpages-nav .mobile-dropdown-bar.row .labels span");
	$(spans[0]).text(mainLabel);
	$(spans[1]).text(subLabel);
	initSubPageClick();
}

const loadPageNav = function(items, kind) {
	let _path = window.location.pathname;
	let _urlArrays = window.location.href.split("/");	
	let _urlFolderPath = _urlArrays[(_urlArrays.length - 2)];	
	if (_urlArrays.length == 6) {
		_urlFolderPath = _urlArrays[(_urlArrays.length - 2)];
	} else if (_urlArrays.length == 7) {
		_urlFolderPath = _urlArrays[(_urlArrays.length - 3)];
	}
	let body = document.getElementsByTagName("body")[0];
	if (body.classList.contains("single-post")) {
		_urlFolderPath = _urlArrays[(_urlArrays.length - 3)];
	} else if (body.classList.contains("single-post-4")) {
		_urlFolderPath = _urlArrays[(_urlArrays.length - 4)];
	}
	const lis = $("#main-menu ul li");
	let li;
	let classes = [];
	let icon = "";
	if (isNotNullAndNotEmpty(lis)) {
		for (let i = 0; i < lis.length; i++) {
			li = lis[i];
			classes = $(li).attr('class').split(/\s+/);
			if (classes.includes(_urlFolderPath)) {
				$(li).addClass("active");
				icon = _urlFolderPath;
				pid = $(li).attr("id");
				break;
			}
		}
	}
	if (isNotNullAndNotEmpty(items)) {
		let pageNav = [];
		let pageSubNav = [];
		let mapSub = new Map();
		let temp = [];
		let item;
		let activeId;
		let pid;
		for (let i = 0; i < items.length; i++) {
			item = items[i];
			if (_path == item.linkInfo && kind == item.prgKind) {
				activeId = item.prgId;
			}
			if (item.icon === icon && isNotNullAndNotEmpty(item.linkInfo) && isNotNullAndNotEmpty(item.prgNameVn)) {
				if (item.menuLv == "2") {
					pageNav.push(item);
				} else if (item.menuLv == "3") {
					pid = item.pid;
					pageSubNav = mapSub.get(pid);
					if (isNullOrEmpty(pageSubNav)) {
						pageSubNav = [];
					}
					pageSubNav.push(item);
					mapSub.set(pid, pageSubNav);
				}
			}
			if (toString(item.linkInfo).includes("/" + _urlFolderPath + "/") && item.menuLv == "2" && item.menuYn == "N") {
				temp.push(item);
			}
		}
		if (isNullOrEmpty(pageNav)) {
			pageNav = temp;
		}
		renderPageNav(pageNav, mapSub, activeId);
	}
}

const renderPageNav = function(items, mapSubItems = new Map(), activeId = "") {
	let tempActiveId = activeId.substring(0, activeId.lastIndexOf("."));
	let subActiveId = activeId;
	let subItems = [];
	let isActive = false;
	let href;
	let pathname = window.location.pathname;
	const width = $(window).width();
	if (mapSubItems.size > 0) {
		for (let [key] of mapSubItems.entries()) {
			if (tempActiveId == key) {
				activeId = key;
				subItems = mapSubItems.get(key);
				break;
			}
			/* 
			if (activeId = key) {
				activeId = key;
				subItems = mapSubItems.get(key);
				break;
			}
			*/
		}
	}
	if (isNotNullAndNotEmpty(items)) {
		hasChild = false;
		if (isNotNullAndNotEmpty(subItems)) {
			hasChild = true;
		}
		createPageNavSection(hasChild);
		let html = "";
		let activeClass = "";
		for (let i = 0; i < items.length; i++) {
			activeClass = "";
			if (items[i].prgId == activeId) {
				activeClass = " active";
				isActive = true;
			}
			if (width < 768) {
				html += "<li class='col-lg-auto col-6" + toString(activeClass) + "'>";
			} else {
				html += "<li class='col-lg-auto col-4" + toString(activeClass) + "'>";
			}
			html += "		<a href='" + toString(items[i].linkInfo) + "'>" + toString(items[i].prgName) + "</a>";
			html += "	</li>";
		}
		$("#subpages-nav .sub-container .nav-wrapper .lis-wrapper").html(html);
		
		if (!isActive) {
			const items = $("#subpages-nav .sub-container .nav-wrapper .lis-wrapper li a");
			if (isNotNullAndNotEmpty(items)) {
				for (let i = 0; i < items.length; i++) {
					href = $(items[i]).attr("href");
					if (isNotNullAndNotEmpty(href) && pathname.startsWith(href)) {
						$(items[i]).parent().addClass("active");
					}
				}
			}
		}
		
		if (isNotNullAndNotEmpty(subItems)) {
			html = "";
			isActive = false;
			for (let i = 0; i < subItems.length; i++) {
				activeClass = "";
				if (subItems[i].prgId == subActiveId) {
					activeClass = " active";
					isActive = true;
				}
				html += "<li class='col-sm-auto col" + toString(activeClass) + "'>";
				html += "	<a href='" + toString(subItems[i].linkInfo) + "'>" + toString(subItems[i].prgName) + "</a>";
				html += "</li>";
			}
			$("#subpages-nav .child-container .lis-wrapper").html(html);
			
			if (!isActive) {
				const items = $("#subpages-nav .child-container .lis-wrapper li a");
				if (isNotNullAndNotEmpty(items)) {
					for (let i = 0; i < items.length; i++) {
						href = $(items[i]).attr("href");
						if (isNotNullAndNotEmpty(href) && pathname.startsWith(href)) {
							$(items[i]).parent().addClass("active");
						}
					}
				}
			}
		}
		
//		hide menu when not login
		if (!isLogined()) {
			var path = location.pathname;
			var arrTemp = path.split("/");
			var endPath = arrTemp[arrTemp.length - 1];
			var arrHiddenUrl = ["member-regis-1", "member-regis-2", "member-regis-3", "member-regis-4", "member-regist"];
			
			if (arrHiddenUrl.includes(endPath)) {
				$("#main-menu-wrapper").css("display", "none");	
				$("#subpages-nav").css("display", "none");	
				$('#main-menu').css("display","none");
			}
		}
	}
}

const loadSideBar = function(data) {
	let html = "";
	let footHtml = "";
	
	let item;
	let d;
	
	if (isNotNullAndNotEmpty(data)) {
		for (let i = 0; i < data.length; i++) {
			item = data[i];
			if (item.prgKind === programKind.sideMenu) {
				if(item.loginYn ==='N'&& isLogined()) {					
					continue;
				}
				if(item.loginYn ==='Y'&& !isLogined()) {					
					continue;
				}
				
				d = _mapSvgIcons.get(toString(item.prgId));
				  
				if (isNullOrEmpty(d)) {
					d = {};
				}
				
				html += "<li id='" + toString(data[i].prgId).replaceAll(".", "_") + "'>";
				html += "	<a href='" + toString(data[i].linkInfo) + "'>";
				html += "		<div class='icon'>";
				html += "			<svg width='25' height='20' viewBox='0 0 25 20'> <path class='shape' d='" + toString(d.soild) + "'></path> </svg>";
				html += "		</div>";
				html += "		<div class='label'>" + toString(data[i].prgName) + "</div>";
				html += "	</a>";
				html += "</li>";
				
				footHtml += "<li id='" + toString(data[i].prgId).replaceAll(".", "_") + "' class='col'>";
				footHtml += "	<a href='" + toString(data[i].linkInfo) + "'>";
				footHtml += "		<div class='icon'>";
				footHtml += "			<svg width='25' height='20' viewBox='0 0 25 20'> <path class='shape' d='" + toString(d.soild) + "'></path> </svg>";
				footHtml += "		</div>";
				footHtml += "		<div class='label'>" + toString(data[i].prgName) + "</div>";
				footHtml += "	</a>";
				footHtml += "</li>";
			}
		}
	}
	
	// back to top
	html += "<li>";
	html += "	<a href='javascript:backToTop();'>";
	html += "		<div class='icon'>";
	html += "			<svg width='25' height='20' 0 0 25 20> ";
	html += "				<path d='M22 15.375L12.5 5.75L3 15.375L2 14.375L12.5 4L23 14.375L22 15.375Z' fill='white' /> "
	html += "			</svg>";
	html += "		</div>";
	html += "		<span>TOP</div>";
	html += "	</a>";
	html += "</li>";
	
	$("#sidebar-menu ul").html(html);
	$("#footer-helper ul").html(footHtml);
}

const loadFooter = function(data) {
	let html = "";
	if (isNotNullAndNotEmpty(data)) {
		let item;
		for (let i = 0; i < data.length; i++) {
			item = data[i];
			if (item.prgKind === programKind.footerMenu) {
				item = data[i];
				if(item.loginYn ==='N'&& isLogined()) {					
					continue;
				}
				if(item.loginYn ==='Y'&& !isLogined()) {					
					continue;
				}
				html += "<li  class='col-auto'>";
				if (item.popupYn == "Y" && isNotNullAndNotEmpty(item.popupName)) {
					html += "<a href='" + toString(item.linkInfo) + "'class='open-popup-btn' data-group='" + item.popupName + "'>" + toString(item.prgName) + "</a>";
				} else if (isNotNullAndNotEmpty(item.helpUrl)) {
					html += "<a href='" + toString(item.helpUrl) + "' target='_blank'>" + toString(item.prgName) + "</a>";
				} else {
					html += "<a href='" + toString(item.linkInfo) + "'>" + toString(item.prgName) + "</a>";
				}
				html += "</li>";
			}
			
		}
	}
	$("#footer-nav").html(html);
	
	$("#footer-nav .lis-wrapper a.open-popup-btn").on("click", function() {
		const popupName = $(this).attr("data-group");
		if (isNullOrEmpty(popupName)) return;
		$(".popup." + popupName).addClass("opened");
	});
	
	$('#footer-nav .btn-open-sub').on('click', function(e) {	
		e.preventDefault();	
		this.classList.toggle("opened");
		
		$("#footer-nav .lis-wrapper").slideToggle();
	});
}

const createPageNavSection = function(hasChild) {
	var _main = document.getElementsByTagName("main")[0];
	
	var _section = document.createElement("section");
	_section.setAttribute("id", "subpages-nav");
	
	var _container = document.createElement("div");
	_container.setAttribute("class", "container sub-container");
	
	var _mobileBar = document.createElement("div");
	_mobileBar.setAttribute("class", "mobile-dropdown-bar row");
	_mobileBar.innerHTML = '<div class="labels col"> <span></span> <svg width="24" height="24" viewBox="0 0 24 24"> <path d="M8 20L16 12L8 4" fill="none" stroke="white" stroke-miterlimit="10"/> </svg> <span></span> </div> <div class="btn-open-sub col-auto"> <svg class="svg-symbol" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M5 9L12 16L19 9" stroke="white" stroke-miterlimit="10"/> </svg> </div>';
	
	var _colorfulBorder =  document.createElement("div");
	_colorfulBorder.setAttribute("class", "colorful-border");
	_colorfulBorder.innerHTML = '<div></div><div></div><div></div><div></div>';
	
	var _navWrapper =  document.createElement("div");
	_navWrapper.setAttribute("class", "nav-wrapper");
	_navWrapper.innerHTML = '<ul class="row lis-wrapper"> </ul>';
	
	_container.appendChild(_mobileBar);
	_container.appendChild(_colorfulBorder);
	_container.appendChild(_navWrapper);
	
	_section.appendChild(_container);
	
	if (hasChild) {
		_container = document.createElement("div");
		_container.setAttribute("class", "container child-container");
		
		_navWrapper =  document.createElement("div");
		_navWrapper.setAttribute("class", "row lis-wrapper");
		_navWrapper.innerHTML = '<ul class="col-sm-auto col"> </ul>';
		
		_container.appendChild(_navWrapper);
		_section.appendChild(_container);
	}
	
	_main.prepend(_section);
}

function createMobileTopMenu () {
	var _mobileTopMenu = document.getElementById("mobile-top-menu");
	var _desktopTopMenu = document.getElementById("top-menu");	
	
	_mobileTopMenu.children[0].innerHTML = _desktopTopMenu.children[0].innerHTML;
	
	var _rightNav = _mobileTopMenu.getElementsByClassName("right-nav")[0];
	_rightNav.children[0].remove();
	
	var _allMenuItems = _mobileTopMenu.getElementsByClassName("menu-item");
	
	for (var i=0; i<_allMenuItems.length; i++) {
		_allMenuItems[i].classList.remove("col-auto");
		_allMenuItems[i].classList.add("col");
	}
}





const updateDotToUnderscore = function(value) {
	if (isNullOrEmpty(value)) return;
	
	return toString(value).replaceAll(".", "_");
}
