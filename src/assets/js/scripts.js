function setIsLoading(type) {
	if (type === true || type === 'loading') {
		$('.block-loading').addClass('is-loading');
	} else {
		$('.block-loading').removeClass('is-loading');
	}
}
var _mainMenuName;

function recentProduct() {
	$('#recent-products').on('click', function (e) {
		var pdtCd = localStorage.getItem('pdt');

		if (pdtCd == null) {
			return false;
		} else {
			location.href = '/product/' + pdtCd;
		}
	})
}

function initMenu(xmlData) {
	createTopMenu(xmlData);
	createMainMenu(xmlData);
	createDropdownMenu(xmlData);
	createSubPagesNav(xmlData);
	createSideMenu(xmlData);
	createSideMenuFooter(xmlData);
	createFooterNav(xmlData);
	createFooterInfo(xmlData);
}


function createMobileMenu(callbackFn) {
	createMobileTopMenu();
	createMobileMainMenu();
	callbackFn();
}

function createFooterNav(xmlData) {
	setIsLoading(true);

	var _footerNav = document.getElementById("footer-nav");
	var _ul = _footerNav.getElementsByClassName("lis-wrapper")[0];

	var _footerNavMenu = xmlData.getElementsByTagName("footer-nav")[0];
	var _sideItems;

	if (_footerNavMenu) {
		_sideItems = _footerNavMenu.children;

		for (var i = 0; i < _sideItems.length; i++) {
			var _label = _sideItems[i].children[0];
			var _url = _sideItems[i].children[1];
			var _target = _sideItems[i].children[2];
			var _popup = _sideItems[i].children[2];

			var _li = document.createElement("li");
			_li.setAttribute("class", "col-lg-auto");

			var _anchor = document.createElement("a");

			_anchor.setAttribute("href", _url.textContent);
			_anchor.innerHTML = _label.textContent;
			_anchor.setAttribute("target", _target.textContent);

			if (_popup.tagName == 'popup') {
				_anchor.setAttribute("data-popup", _popup.textContent);
				_anchor.classList.add("open-popup-btn");
				_anchor.removeAttribute("target");
			}

			_li.appendChild(_anchor);
			_ul.appendChild(_li);
		}
	}

	setIsLoading(false);
}

function createFooterInfo(xmlData) {
	setIsLoading(true);

	var _footerInfo = document.getElementById("footer-info");
	var _table = _footerInfo.getElementsByClassName("contacts")[0];
	var _tbody = _table.children[0];


	var _footerInfoMenu = xmlData.getElementsByTagName("footer-info")[0];
	var _sideItems;

	if (_footerInfoMenu) {
		_sideItems = _footerInfoMenu.children;

		for (var i = 0; i < _sideItems.length; i++) {
			var _label = _sideItems[i].children[0];
			var _value = _sideItems[i].children[1];

			var _tr = document.createElement("tr");

			var _tdLabel = document.createElement("td");
			_tdLabel.innerHTML = _label.textContent;
			_tr.appendChild(_tdLabel);

			var _tdValue = document.createElement("td");
			_tdValue.innerHTML = _value.textContent;
			_tr.appendChild(_tdValue);

			_tbody.appendChild(_tr);

		}
	}

	setIsLoading(false);
}

function createSideMenu(xmlData) {
	setIsLoading(true);

	var _sidebarMenu = document.getElementById("sidebar-menu");
	var _ul = _sidebarMenu.children[0];

	var _sideMenu = xmlData.getElementsByTagName("side-menu")[0];
	var _sideItems;

	if (_sideMenu) {
		_sideItems = _sideMenu.children;

		for (var i = 0; i < _sideItems.length; i++) {
			var _eid = _sideItems[i].getElementsByTagName("eid")[0];
			var _label = _sideItems[i].children[0];
			var _url = _sideItems[i].children[1];
			var _noIcon = _sideItems[i].getElementsByTagName("no-icon");


			var _li = document.createElement("li");

			var _anchor = document.createElement("a");

			_anchor.setAttribute("href", _url.textContent);
			_li.setAttribute("id", _eid.textContent);

			if (_noIcon.length == 0) {
				_anchor.innerHTML = '<div class="icon"> <svg width="30" height="20" viewBox="0 0 30 20"> <path class="shape"/> </svg> </div>';
			}

			if (_label.textContent.length > 0) {
				var _span = document.createElement("span");
				_span.innerHTML = _label.textContent;
				_anchor.appendChild(_span);
			}

			// if (i == _sideItems.length - 1) {
			// 	var _img = document.createElement("img");
			// 	_img.setAttribute("src", "/img/Logo.svg");
			// 	_anchor.appendChild(_img);	
			// }

			_li.appendChild(_anchor);
			_ul.appendChild(_li);


		}

	}

	setIsLoading(false);
}

function createSideMenuFooter(xmlData) {
	setIsLoading(true);

	var _footerHelper = document.getElementById("footer-helper");
	var _lisWrapper = _footerHelper.getElementsByClassName("lis-wrapper")[0];


	var _sideMenu = xmlData.getElementsByTagName("side-menu")[0];
	var _sideItems;

	if (_sideMenu) {
		_sideItems = _sideMenu.children;
		for (var i = 0; i < _sideItems.length; i++) {
			if (i < 5) {
				var _label = _sideItems[i].getElementsByTagName("label")[0];
				var _url = _sideItems[i].getElementsByTagName("url")[0];

				var _li = document.createElement("li");
				_li.setAttribute("class", "col");

				var _anchor = document.createElement("a");
				_anchor.setAttribute("href", _url.textContent);
				_anchor.innerHTML = '<div class="icon"> <svg width="30" height="20" viewBox="0 0 30 20"> <path class="shape" fill="white"/> </svg> </div>';

				var _span = document.createElement("span");
				_span.innerHTML = _label.textContent;

				_anchor.appendChild(_span);

				_li.appendChild(_anchor);

				_lisWrapper.appendChild(_li);
			}

		}
	}

	setIsLoading(false);
}


function createTopMenu(xmlData) {
	setIsLoading(true);

	var _urlArrays = window.location.href.split("/");
	if (_urlArrays != null && _urlArrays.length > 0) {
		for (var i = 0; i < _urlArrays.length; i++) {
			if (_urlArrays[i].includes("?")) {
				_urlArrays[i] = _urlArrays[i].substring(0, _urlArrays[i].indexOf("?"));
			}
		}
	}

	var _topMenuActiveDone = false;

	var _topMenu = document.getElementById("top-menu");

	var _leftNav = _topMenu.getElementsByClassName("left-nav")[0];
	var _leftNavXML = xmlData.getElementsByTagName("left-nav")[0];

	if (_leftNavXML) {

		var _leftItems = _leftNavXML.getElementsByTagName("item");
		for (var i = 0; i < _leftItems.length; i++) {
			var _eid = _leftItems[i].getElementsByTagName("eid")[0];

			if (!isLogined() && _eid.textContent == eidMyOffice) {
				continue;
			}

			var _path = _leftItems[i].getElementsByTagName("path")[0].textContent;
			var _label = _leftItems[i].getElementsByTagName("label")[0].textContent;
			var _url = _leftItems[i].getElementsByTagName("url")[0].textContent;

			var _li = document.createElement("li");
			_li.setAttribute("class", "menu-item col-auto");
			_li.setAttribute("id", _eid.textContent);

			var _anchor = document.createElement("a");
			_anchor.setAttribute("href", _url);
			_anchor.innerHTML = _label;

			_li.appendChild(_anchor);
			_leftNav.appendChild(_li);


			/*--- Add Active Class Here ----*/
			if (_urlArrays.includes(_path) == true) {
				_li.classList.add("active");
				_topMenuActiveDone = true;

				_mainMenuName = _path + "-main-menu";
			}
		}

		if (!_topMenuActiveDone) {
			var _li = _leftNav.getElementsByTagName("li");
			if (_li.length > 1) {
				_li[1].classList.add("active");
				_topMenuActiveDone = true;
			}
		}
	}

	var _rightNav = _topMenu.getElementsByClassName("right-nav")[0];
	var _rightNavXML = xmlData.getElementsByTagName("right-nav")[0];

	if (_rightNavXML) {
		var _rightItems = _rightNavXML.getElementsByTagName("item");

		for (var i = 0; i < _rightItems.length; i++) {
			var _eid = _rightItems[i].getElementsByTagName("eid")[0];

			if (_eid.textContent == eidSignUp && isLogined()) {
				continue;
			}

			if ((_eid.textContent == eidPayment || _eid.textContent == eidModify) && !isLogined()) {
				continue;
			}

			var _path = _rightItems[i].getElementsByTagName("path")[0];
			var _label = _rightItems[i].getElementsByTagName("label")[0];
			var _url = _rightItems[i].getElementsByTagName("url")[0];

			var _li = document.createElement("li");
			_li.setAttribute("class", "col-auto menu-item " + _path.textContent);
			_li.setAttribute("id", _eid.textContent);

			var _anchor = document.createElement("a");
			_anchor.setAttribute("href", _url.textContent);

			var _span = document.createElement("span");
			_span.innerHTML = _label.textContent;

			if (_eid.textContent == eidLogin && isLogined()) {
				_span.innerHTML = _rightItems[i].getElementsByTagName("label-logined")[0].textContent;
				_anchor.setAttribute("href", _rightItems[i].getElementsByTagName("url-logined")[0].textContent);
			}

			// _anchor.innerHTML = '<svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path class="shape" fill="white"></path></svg>';

			_anchor.appendChild(_span);

			_li.appendChild(_anchor);

			_rightNav.appendChild(_li);
		}

	}

	setIsLoading(false);
}

function createMainMenu(xmlData) {
	setIsLoading(true);

	var pathname = window.location.pathname;
	if (pathname.startsWith('/shopping-mall')) {
		_mainMenuName = 'shopping-mall-main-menu';
	} else if (pathname.startsWith('/my-office')) {
		_mainMenuName = 'my-office-main-menu';
	} else {
		_mainMenuName = 'home-main-menu';
	}

	var _mainMenuXML = xmlData.getElementsByTagName(_mainMenuName)[0];

	if (_mainMenuXML) {
		var _items = _mainMenuXML.getElementsByTagName("item");

		var _mainMenuRow = document.getElementById("main-menu").children[0];

		for (var i = 0; i < _items.length; i++) {
			var _path = _items[i].getElementsByTagName("path")[0];
			var _label = _items[i].getElementsByTagName("label")[0];
			var _url = _items[i].getElementsByTagName("url")[0];

			var _li = document.createElement("li");
			_li.setAttribute("class", "menu-item col " + _path.textContent);

			var _anchor = document.createElement("a");
			_anchor.setAttribute("href", _url.textContent);

			var _span = document.createElement("span");
			_span.innerHTML = _label.textContent;


			_anchor.innerHTML = '<svg width="35" height="35" viewBox="0 0 35 35" fill="none"><path class="solid-part"></path><path class="color-part"></path>	</svg>';

			_anchor.appendChild(_span);
			_li.appendChild(_anchor);
			_mainMenuRow.appendChild(_li);
		}
	}

	setIsLoading(false);
}




function createDropdownMenu(xmlData) {
	setIsLoading(true);

	var _mainMenuXML = xmlData.getElementsByTagName(_mainMenuName)[0];

	if (_mainMenuXML) {
		var _items = _mainMenuXML.getElementsByTagName("item");

		var _dropdownMenuRow = document.getElementById("dropdown-menu").children[0].children[0];

		for (var i = 0; i < _items.length; i++) {
			var _path = _items[i].getElementsByTagName("path")[0];

			var _li = document.createElement("li");
			_li.setAttribute("class", "menu-item col " + _path.textContent);

			var _ul = document.createElement("ul");

			var _subItems = _items[i].getElementsByTagName("sub-item");

			if (_subItems.length > 0) {
				for (var j = 0; j < _subItems.length; j++) {
					var _subLabel = _subItems[j].getElementsByTagName("label")[0];
					var _subUrl = _subItems[j].getElementsByTagName("url")[0];

					var _subLi = document.createElement("li");
					var _subAnchor = document.createElement("a");

					_subAnchor.innerHTML = _subLabel.textContent;
					_subAnchor.setAttribute("href", _subUrl.textContent);

					_subLi.appendChild(_subAnchor);

					var _childItems = _subItems[j].getElementsByTagName("child-item");
					if (_childItems.length > 0) {
						var _childUl = document.createElement("ul");
						for (var k = 0; k < _childItems.length; k++) {
							var _childLabel = _childItems[k].getElementsByTagName("label")[0];
							var _childUrl = _childItems[k].getElementsByTagName("url")[0];

							var _childLi = document.createElement("li");
							var _childAnchor = document.createElement("a");

							_childAnchor.innerHTML = _childLabel.textContent;
							_childAnchor.setAttribute("href", _childUrl.textContent);

							_childLi.appendChild(_childAnchor);
							_childUl.appendChild(_childLi);
						}
						_subLi.appendChild(_childUl);
					}

					_ul.appendChild(_subLi);
				}
				_li.appendChild(_ul);
			}

			_dropdownMenuRow.appendChild(_li);
		}
	}

	setIsLoading(false);
}

function createSubPagesNav(xmlData) {
	setIsLoading(true);

	var _url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	var _urlArrays = window.location.href.split("/");
	var _urlFolderPath = _urlArrays[(_urlArrays.length - 2)];



	var body = document.getElementsByTagName("body")[0];
	if (body.classList.contains("single-post")) {
		_urlFolderPath = _urlArrays[(_urlArrays.length - 3)];
	}



	var _mainMenuXML = xmlData.getElementsByTagName(_mainMenuName)[0];

	var _mainMenuRow = document.getElementById("main-menu");
	var _mainMenuLis = _mainMenuRow.getElementsByClassName("menu-item");

	if (_mainMenuXML) {
		var _items = _mainMenuXML.getElementsByTagName("item");

		for (var i = 0; i < _items.length; i++) {
			var _path = _items[i].children[0].textContent;
			var _label = _items[i].children[1].textContent;
			var _url = _items[i].children[2].textContent;


			if (_path == _urlFolderPath) {

				for (var j = 0; j < _mainMenuLis.length; j++) {
					var _itemUrl = _mainMenuLis[j].children[0].getAttribute("href");


					if (_itemUrl == _url) {
						_mainMenuLis[j].classList.add("active");

					}
				}


				var _subItems = _items[i].getElementsByTagName("sub-item");


				if (_subItems.length > 0) {
					createSubPagesNavSection();
					createSubPageItems(_subItems);
					assignSubPageMobileBar(_label);
					initSubPageClick();
				}
			}
		}
	}

	setIsLoading(false);
}

function createSubPageItems(_subItems) {
	setIsLoading(true);

	var _fullUrl = window.location.href;

	var _urlArrays = window.location.href.split("/");
	var _urlFolderPath = _urlArrays[(_urlArrays.length - 2)];

	var _postFolderPath = "";
	var body = document.getElementsByTagName("body")[0];

	if (body.classList.contains("single-post")) {
		_postFolderPath = _urlArrays[(_urlArrays.length - 2)];
	}

	var _subpagesNav = document.getElementById("subpages-nav");
	var _lisWrapper = _subpagesNav.getElementsByClassName("lis-wrapper")[0];

	for (var i = 0; i < _subItems.length; i++) {
		var _label = _subItems[i].children[0].textContent;
		var _url = _subItems[i].children[1].textContent;

		var _urlArrays = _url.split("/");
		var _urlFolderPath = _urlArrays[(_urlArrays.length - 1)];
		_urlFolderPath = _urlFolderPath.split(".")[0];

		var _li = document.createElement("li");
		_li.setAttribute("class", "col-lg-auto col-6");

		var _anchor = document.createElement("a");
		_anchor.setAttribute("href", _url);
		_anchor.innerHTML = _label;

		if (_fullUrl.includes(_url)) {
			_li.classList.add("active");
		}

		if (_urlFolderPath == _postFolderPath) {
			_li.classList.add("active");
		}

		_li.appendChild(_anchor);
		_lisWrapper.appendChild(_li);

		if (hasChild(_subItems[i])) {
			createChildPageItems(_li, _subItems[i]);
		}
	}

	setIsLoading(false);
}

function assignSubPageMobileBar(_mainLabel) {
	setIsLoading(true);

	var _subpagesNav = document.getElementById("subpages-nav");
	var _subNavItems = _subpagesNav.getElementsByClassName("lis-wrapper")[0].children;
	var _mobileBar = _subpagesNav.getElementsByClassName("mobile-dropdown-bar")[0];
	var _spans = _mobileBar.getElementsByTagName("span");

	var _currentLabel = "";

	for (var i = 0; i < _subNavItems.length; i++) {
		if (_subNavItems[i].classList.contains("active")) {
			_currentLabel = _subNavItems[i].children[0].innerHTML;
		}
	}

	_spans[0].innerHTML = _mainLabel;
	_spans[1].innerHTML = _currentLabel;

	setIsLoading(false);
}

function createChildPageItems(_subLi, _subItem) {
	setIsLoading(true);

	var _fullUrl = window.location.href;

	var _childItems = _subItem.getElementsByTagName("child-item");

	var isExist = false;

	for (var i = 0; i < _childItems.length; i++) {
		var _url = _childItems[i].children[1].textContent;
		if (_fullUrl.includes(_url)) {
			isExist = true;
		}
	}

	if (isExist == true) {
		_subLi.classList.add("active");

		var _subpagesNav = document.getElementById("subpages-nav");

		var _container = document.createElement("div");
		_container.setAttribute("class", "container child-container");
		_container.innerHTML = '<ul class="row lis-wrapper"> </ul>';

		var _lisWrapper = _container.getElementsByClassName("lis-wrapper")[0];

		for (var i = 0; i < _childItems.length; i++) {
			var _label = _childItems[i].children[0].textContent;
			var _url = _childItems[i].children[1].textContent;

			var _li = document.createElement("li");
			_li.setAttribute("class", "col-sm-auto col");

			if (_fullUrl.includes(_url)) {
				_li.classList.add("active");
			}

			var _anchor = document.createElement("a");
			_anchor.setAttribute("href", _url);
			_anchor.innerHTML = _label;

			_li.appendChild(_anchor);
			_lisWrapper.appendChild(_li);
		}

		_subpagesNav.appendChild(_container);
	}

	setIsLoading(false);
}


function hasChild(_subItem) {
	var _childItems = _subItem.getElementsByTagName("child-item");
	if (_childItems.length > 0) {
		return true;
	}
	else {
		return false;
	}
}

function initSubPageClick() {
	//	var subPagesNav = document.getElementById("subpages-nav");
	//	var _navWrapper = subPagesNav.getElementsByClassName("nav-wrapper")[0];

	$('#subpages-nav .btn-open-sub').on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		var subPagesNav = document.getElementById("subpages-nav");
		var _navWrapper = subPagesNav.getElementsByClassName("nav-wrapper")[0];
		var subPagesNav = this.closest("#subpages-nav");
		var _navWrapper = subPagesNav.getElementsByClassName("nav-wrapper")[0];
		this.classList.toggle("opened");
		$(_navWrapper).slideToggle();
	});
}

$('#subpages-nav .btn-open-sub').on('click', function (e) {
	var subPagesNav = this.closest("#subpages-nav");
	var _navWrapper = subPagesNav.getElementsByClassName("nav-wrapper")[0];

	e.stopPropagation();
	e.preventDefault();
	this.classList.toggle("opened");
	$(_navWrapper).slideToggle();
});


function setActiveSubPage(_mainLabel) {
	var _subpagesNav = document.getElementById("subpages-nav");
	var _mobileBar = _subpagesNav.getElementsByClassName("mobile-dropdown-bar")[0];
	var _spans = _mobileBar.getElementsByTagName("span");

	var _currentLabel;

	var _url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

	if (_subpagesNav) {
		var _navWrapper = _subpagesNav.getElementsByClassName("nav-wrapper")[0];
		var _pageNavItems = _navWrapper.getElementsByTagName("li");

		for (var i = 0; i < _pageNavItems.length; i++) {
			var _label = _pageNavItems[i].children[0].innerHTML;
			var _anchorUrl = _pageNavItems[i].children[0].getAttribute("href");
			_anchorUrl = _anchorUrl.substring(_anchorUrl.lastIndexOf('/') + 1);

			if (_url.startsWith(_anchorUrl)) {
				_pageNavItems[i].classList.add("active");
				_currentLabel = _label;
			}
		}
	}

	_spans[0].innerHTML = _mainLabel;
	_spans[1].innerHTML = _currentLabel;
}

function createSubPagesNavSection() {
	var _main = document.getElementsByTagName("main")[0];

	var _section = document.createElement("section");
	_section.setAttribute("id", "subpages-nav");

	var _container = document.createElement("div");
	_container.setAttribute("class", "container sub-container");

	var _mobileBar = document.createElement("div");
	_mobileBar.setAttribute("class", "mobile-dropdown-bar row");
	_mobileBar.innerHTML = '<div class="labels col"> <span></span> <svg width="24" height="24" viewBox="0 0 24 24"> <path d="M8 20L16 12L8 4" fill="none" stroke="white" stroke-miterlimit="10"/> </svg> <span></span> </div> <div class="btn-open-sub col-auto"> <svg class="svg-symbol" width="30" height="30" viewBox="0 0 40 40"> <path d="M8 19.5H32" stroke="white"/> <path d="M20.5 8V32" stroke="white"/> </svg> </div>';

	var _colorfulBorder = document.createElement("div");
	_colorfulBorder.setAttribute("class", "colorful-border");
	_colorfulBorder.innerHTML = '<div></div><div></div><div></div><div></div>';

	var _navWrapper = document.createElement("div");
	_navWrapper.setAttribute("class", "nav-wrapper");
	_navWrapper.innerHTML = '<ul class="row lis-wrapper"> </ul>';

	_container.appendChild(_mobileBar);
	_container.appendChild(_colorfulBorder);
	_container.appendChild(_navWrapper);

	_section.appendChild(_container);

	_main.prepend(_section);
}

function createMobileTopMenu() {
	var _mobileTopMenu = document.getElementById("mobile-top-menu");
	var _desktopTopMenu = document.getElementById("top-menu");

	_mobileTopMenu.children[0].innerHTML = _desktopTopMenu.children[0].innerHTML;

	var _rightNav = _mobileTopMenu.getElementsByClassName("right-nav")[0];
	_rightNav.children[0].remove();

	var _allMenuItems = _mobileTopMenu.getElementsByClassName("menu-item");

	for (var i = 0; i < _allMenuItems.length; i++) {
		_allMenuItems[i].classList.remove("col-auto");
		_allMenuItems[i].classList.add("col");
	}
}



function createMobileMainMenu() {
	var _mobileMainMenu = document.getElementById("mobile-main-menu");
	var _desktopMainMenu = document.getElementById("main-menu");
	var _lisWrapper = _mobileMainMenu.getElementsByClassName("lis-wrapper")[0];

	var _dropdownMenuRow = document.getElementById("dropdown-menu").children[0].children[0];
	var _dropdownItems = _dropdownMenuRow.children;

	if (_desktopMainMenu) {
		_lisWrapper.innerHTML = _desktopMainMenu.children[0].innerHTML;
		_lisWrapper.children[0].remove();
	}


	var _lis = _lisWrapper.children;

	for (var i = 0; i < _lis.length; i++) {
		_lis[i].classList.remove("col");

		var _anchor = _lis[i].children[0];
		_anchor.classList.add("level-1");
		_anchor.children[0].classList.add("svg-icon");

		var _btnOpenSub = document.createElement("DIV");
		_btnOpenSub.classList.add("btn-open-sub");
		_btnOpenSub.innerHTML = '<svg class="svg-symbol" width="30" height="30" viewBox="0 0 40 40"> <path d="M8 19.5H32" stroke="black"/> <path d="M20.5 8V32" stroke="black"/> </svg>';

		_anchor.appendChild(_btnOpenSub);

		var _ul = document.createElement("ul");
		_ul.setAttribute("class", "sub-menu row closed");

		for (var j = 1; j < _dropdownItems.length; j++) {
			if (i == (j - 1)) {
				_ul.innerHTML = _dropdownItems[j].children[0].innerHTML;
			}
		}
		_lis[i].appendChild(_ul);
	}


	for (var i = 0; i < _lis.length; i++) {
		var _subLis = _lis[i].getElementsByClassName("sub-menu")[0].children;
		if (_subLis.length > 0) {
			for (var j = 0; j < _subLis.length; j++) {
				_subLis[j].classList.add("col-6");
			}
		}
	}

}

function addActiveClass() {
	var _fullUrl = window.location.href;

	var _url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	var _urlArrays = window.location.href.split("/");

	var _urlFolderPath = _urlArrays[(_urlArrays.length - 2)];




	/* Add active for Desktop Menu Items */

	var _mainDesktopMenu = document.getElementById("main-menu");
	var _menuItems = _mainDesktopMenu.getElementsByClassName("menu-item");

	for (var i = 1; i < _menuItems.length; i++) {
		var _anchorUrl = _menuItems[i].children[0].getAttribute("href");
		var _anchorUrlArrays = _anchorUrl.split("/");
		var _folder = _anchorUrlArrays[(_anchorUrlArrays.length - 2)];

		if (_anchorUrl == _fullUrl) {
			_menuItems[i].classList.add("active");
		}
	}




	/* Add active for Mobile Main Menu Items */
	var _mainMobileMenu = document.getElementById("mobile-main-menu");
	var _mobileMenuItems = _mainMobileMenu.getElementsByClassName("menu-item");

	for (var i = 0; i < _mobileMenuItems.length; i++) {
		var _anchorUrl = _mobileMenuItems[i].children[0].getAttribute("href");
		_anchorUrl = _anchorUrl.substring(_anchorUrl.lastIndexOf('/') + 1);
		if (_url == _anchorUrl) {
			_mobileMenuItems[i].classList.add("active");
		}
	}

}



function checkMainPath(_urlArrays, _string) {
	var check = false;
	for (var i = 0; i < _urlArrays.length; i++) {
		if (_urlArrays[i] == _string) {
			check = true;
		}
	}
	return check;
}

function initClicks() {
	var mobileMainMenu = document.getElementById("mobile-main-menu");
	var _subMenus = mobileMainMenu.getElementsByClassName("sub-menu");



	var _btns = mobileMainMenu.getElementsByClassName("btn-open-sub");

	for (var i = 0; i < _btns.length; i++) {
		_btns[i].setAttribute("data-index", i);
	}



	$('#mobile-main-menu .btn-open-sub').on('click', function (e) {

		e.preventDefault();

		var _subMenu = this.parentElement.nextElementSibling;

		var index = this.getAttribute("data-index");
		var state = false;
		if (this.classList.contains("opened")) {
			state = true;
		}

		if (_subMenus.length > 0) {
			let _haveSubMenu = false;
			let _href;
			let _name;
			let _a;
			const _lis = _subMenus[index].children;

			for (let i = 0; i < _lis.length; i++) {
				_a = _lis[i].getElementsByTagName("a")[0];

				_href = _a.getAttribute("href");
				_name = _a.textContent;

				if (isNotNullAndNotEmpty(_href) && isNotNullAndNotEmpty(_name)) {
					_haveSubMenu = true;
				}
			}

			if (!_haveSubMenu) {
				return;
			}
		}

		for (var i = 0; i < _subMenus.length; i++) {
			if (_subMenus[i].classList.contains("closed") == false) {
				$(_subMenus[i]).slideToggle();
				_subMenus[i].classList.toggle("closed");
				_btns[i].classList.toggle("opened");
			}
		}

		if (state == false) {
			$(_subMenu).slideToggle();
			_subMenu.classList.toggle("closed");
			this.classList.toggle("opened");
		}

	});
}

jQuery(document).ready(function ($) {
	var mobileMenu = document.getElementById("mobile-menu");
	$('#mobile-toggle').on('click', function (e) {
		e.preventDefault();
		$(mobileMenu).slideToggle(500);
		mobileMenu.classList.toggle("closed");
		this.classList.toggle("opened");
	});
});


jQuery(document).ready(function ($) {

	$('#footer-nav .btn-open-sub').on('click', function (e) {
		e.preventDefault();
		this.classList.toggle("opened");

		var footerNav = document.getElementById("#footer-nav");
		if (footerNav) {
			var _navWrapper = footerNav.getElementsByClassName("lis-wrapper")[0];
			$(_navWrapper).slideToggle();
		}
	});

});


jQuery(document).ready(function ($) {
	$('#toggle-dropdown').on('click', function (e) {
		e.preventDefault();

		var dropdownMenu = document.getElementById("dropdown-menu");

		if (dropdownMenu.classList.contains("closed")) {
			$(dropdownMenu).slideDown();
			dropdownMenu.classList.remove("closed");
		}
		else {
			$(dropdownMenu).slideUp();
			dropdownMenu.classList.add("closed");
		}
	});
});



jQuery(document).ready(function ($) {
	$('#search-toggle').on('click', function (e) {
		e.preventDefault();
		var _colSearch = this.previousElementSibling;
		_colSearch.style.zIndex = "100000000";
		_colSearch.style.width = "100%";
		_colSearch.style.right = "0";
		_colSearch.style.opacity = "1";

		this.style.opacity = "0";

		var col_remaining = this.closest(".col-remaining");
		var col_cart = col_remaining.getElementsByClassName("col-cart")[0];
		col_cart.style.opacity = "0";
	});

	$('#search-close').on('click', function (e) {
		e.preventDefault();
		var _colSearch = this.parentElement.parentElement;
		_colSearch.style.width = "0";
		_colSearch.style.right = "-50%";
		_colSearch.style.opacity = "0";
		setTimeout(function () {
			_colSearch.style.zIndex = "99999999";
		}, 100);

		var search_toggle = document.getElementById("search-toggle");
		search_toggle.style.opacity = "1";

		var col_remaining = this.closest(".col-remaining");
		var col_cart = col_remaining.getElementsByClassName("col-cart")[0];
		col_cart.style.opacity = "1";
	});
});

/* Animation for Mobile Menu Toggle */

jQuery(document).ready(function ($) {
	var _mobileToggle = document.getElementById("mobile-toggle");
	if (_mobileToggle) {
		for (var i = 0; i < 3; i++) {
			var _div = document.createElement("DIV");
			_mobileToggle.children[0].appendChild(_div);
		}
	}
	$('.cross_hamburger_menu').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('cross_hamburger_menu--toggled');
	});
});


/* Back to Top */

jQuery(document).ready(function ($) {
	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		var body = $("html, body");
		body.stop().animate({ scrollTop: 0 }, 500, 'swing');
	});
});

jQuery(document).ready(function ($) {
	$('#footer-nav .sponsorship-notice a').on('click', function (e) {

	});
});


function createMainMenuFromDB() {
	$.ajax({
		url: "/shopping-mall/pdtCateForMenu",
		type: "GET",
		success: function (data) {
			var subMenu = '';

			for (var i = 0; i < data.length; i++) {
				if (data[i].lv == '1') {
					var txt = '';
					txt += '<li class="menu-item col _' + data[i].cateCd + '">';
					txt += '	<a href="/shopping-mall/categories/' + data[i].cateCd + '">';
					txt += '		<svg width="35" height="35" viewBox="0 0 35 35" fill="none"><path class="solid-part"></path><path class="color-part"></path></svg>';
					txt += '		<span>' + data[i].cateName + '</span>';
					txt += '	</a>';
					txt += '</li>';

					$('#main-menu ul').append(txt);
				} else {
					if (subMenu == '') {
						subMenu += '<li class="menu-item col">';
						subMenu += '	<ul>';
					}

					subMenu += '<li>';
					subMenu += '	<a href="/shopping-mall/categories/' + data[i].cateCd + '" >' + data[i].cateName + '</a>';

					if (i < data.length - 1 && data[i].lv == '2' && data[i + 1].lv == '3') {
						subMenu += '<ul>';
					} else if ((i == data.length - 1 && data[i].lv == '3') || (data[i].lv == '3' && data[i + 1].lv == '2')) {
						subMenu += '</ul>';
					}

					subMenu += '</li>';

					if ((i == data.length - 1 && (data[i].lv == '2' || data[i].lv == '3'))
						|| ((data[i].lv == '2' || data[i].lv == '3') && data[i + 1].lv == '1')) {
						subMenu += '</ul></li>';

						$('#dropdown-menu>div>ul').append(subMenu);

						subMenu = '';
					}
				}
			}
		}
	});
}

/*
jQuery(document).ready(function($) {	
	createMainMenuFromDB();
});
*/


function setComma(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n)) {
		n = n.replace(reg, '$1' + ',' + '$2');
	}
	return n;
}

function convertToIntValue(_string) {
	return parseInt(_string.replace(/,/g, ''), 10);
}

function convertToIntString(_value) {
	return _value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function scrollToElement(el) {
	var y = absolutePosition(el).top;
	// console.log(y);
	var body = $("html, body");
	body.stop().animate({ scrollTop: y }, 500, 'swing');
}


function scrollToElementCenterView(el) {
	var _top = absolutePosition(el).top;
	var y = _top - (window.innerHeight - absolutePosition(el).height) / 2;
	var body = $("html, body");
	body.stop().animate({ scrollTop: y }, 500, 'swing');
}


function absolutePosition(el) {
	var
		found,
		left = 0,
		top = 0,
		width = 0,
		height = 0,
		offsetBase = absolutePosition.offsetBase;

	if (!offsetBase && document.body) {
		offsetBase = absolutePosition.offsetBase = document.createElement('div');
		offsetBase.style.cssText = 'position:absolute;left:0;top:0';
		document.body.appendChild(offsetBase);
	}

	if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
		var boundingRect = el.getBoundingClientRect();
		var baseRect = offsetBase.getBoundingClientRect();
		found = true;
		left = boundingRect.left - baseRect.left;
		top = boundingRect.top - baseRect.top;
		width = boundingRect.right - boundingRect.left;
		height = boundingRect.bottom - boundingRect.top;
	}

	return {
		found: found,
		left: left,
		top: top,
		width: width,
		height: height,
		right: left + width,
		bottom: top + height
	};
}

function convertToZeroDecimal(str) {
	var _number = parseInt(str);
	if (_number < 10) {
		return "0" + _number;
	}
	else return _number.toString();
}








jQuery(document).ready(function ($) {

	$('.w-checkbox label').on('click', function (e) {
		e.preventDefault();
		var checkbox = this.closest(".w-checkbox");
		var input = checkbox.getElementsByTagName("input")[0];

		if (input.checked) {
			input.checked = false;
			checkbox.classList.remove("checked");
		} else {
			input.checked = true;
			checkbox.classList.add("checked");
		}

	});
});



jQuery(document).ready(function ($) {

	$('.searching-form .btn-show-advanced-search').on('click', function (e) {

		var searchingForm = this.closest(".searching-form");
		var advancedSearchItems = searchingForm.getElementsByClassName("advanced-search-items")[0];
		$(advancedSearchItems).slideToggle();

		var simpleSearch = this.closest(".simple-search-items");
		$(simpleSearch).slideToggle();

	});


	$('.searching-form .btn-hide').on('click', function (e) {
		var searchingForm = this.closest(".searching-form");
		var advancedSearchItems = searchingForm.getElementsByClassName("advanced-search-items")[0];
		$(advancedSearchItems).slideToggle();

		var simpleSearch = searchingForm.getElementsByClassName("simple-search-items")[0];
		$(simpleSearch).slideToggle();

	});
});







function modifyBackButton() {
	window.onpopstate = function () {
		var body = document.querySelector("body");
		var modal = body.getAttribute("modal");

		if (modal == "mobile-menu") {
			var mobileMenu = document.getElementById("mobile-menu");
			mobileMenu.classList.add("closed");
			var body = document.querySelector("body");
			body.setAttribute("modal", "");
		}

		if (modal == "office-popup") {
			var popups = document.getElementsByClassName("popup");
			for (var i = 0; i < popups.length; i++) {
				popups[i].classList.remove("opened");
				var body = document.querySelector("body");
				body.setAttribute("modal", "office-popup");
			}
		}
	};
	history.pushState({}, '');
}





function expandContent () {
	$('.intro-content .extend-btn').on('click', function (e) {
		var main_body = this.closest(".main-body");
		var extended_content = main_body.querySelector(".extend-content");
		this.classList.toggle("extended");
		$(extended_content).slideToggle(500);
	});
}











var oldScrollY = 0;
var newScrollY = 0;
var _distance;
var _elements;

var s4_1;
var s4_1_val = 0;
var s4_1_acm = 0;

var s4_2;
var s4_2_val = 0;
var s4_2_acm = 0;

var ps_wave;
var ps_wave_val = 0;
var ps_wave_acm = 0;
var ps_wave_max_y = 0;

var s4_5;
var s4_5_val = 0;
var s4_5_acm = 0;

var scroll_friction = 1 / 10;



/*
	Animation Types:
	-------------------
	- animateY
	- animateYR
	- animateX
	- animateXR
	- animateXY
	- animateXYR
*/





function handleDecorElements() {
	var elements = [];
	var els = document.querySelectorAll(".element");

	for (var i = 0; i < els.length; i++) {
		elements.push({
			dom: els[i],
			img: els[i].querySelector("img"),
			val: 0,
			acm: 0,
			v_limit: 0,
			h_limit: 0,
			ratio: getRatioValue(els[i]),
			animation_type: getAnimationType(els[i]),
		});
	}

	// console.log(elements);



	$(window).on("scroll", function (e) {
		var scroll_y = $(this).scrollTop();
		for (var i = 0; i < elements.length; i++) {
			var x = elements[i];
			x.val = getValX(x.dom, scroll_y, x.ratio);
		}
	});




	function animateElements () {
		for (var i = 0; i < elements.length; i++) {
			var x = elements[i];
			x.acm += (x.val - x.acm) * scroll_friction;
			if (x.dom.classList.contains("circle-green-stripes")) {
				// console.log(x.val);
			}
			animateElementY(x.dom, x.acm, 2);
		}
		window.requestAnimationFrame(animateElements);
	}

	animateElements();
	





	function getValX(el, scrollPos, ratio) {
		var scroll_lMouseX = scrollPos - $(el).offset().top;
		if (scroll_lMouseX > 200) scroll_lMouseX = 200;
		if (scroll_lMouseX < -200) scroll_lMouseX = -200;

		return ((20 * scroll_lMouseX) / 100) * ratio;
	}


	function getRatioValue (el) {
		var _ratio = 2;
		var str = el.getAttribute("ratio");
		if (str) {
			_ratio = parseInt(str);
		} 
		return _ratio;
	}

	function getAnimationType (el) {
		var animation_type = "animateY";
		var str = el.getAttribute("animation-type");
		if (str) {
			animation_type = str;
		} 
		return animation_type;
	}


	function animateElementX(el, value, ratio) {
		vx = value * ratio;
		translate = "translateX(" + vx + "px)";

		$(el).css({
			"-webit-transform": translate,
			"-moz-transform": translate,
			transform: translate,
		});
	}

	function animateElementY(el, value, ratio) {
		vx = value * ratio * 0;
		vy = value * ratio;
		deg = value * ratio;

		translate = "translateX(" + vx + "px) translateY(" + vy + "px)";

		$(el).css({
			"-webit-transform": translate,
			"-moz-transform": translate,
			transform: translate,
		});
	}

	function animateElementYR(el, value, ratio) {
		vx = value * ratio * 0;
		vy = value * ratio;
		deg = value * ratio;

		translate = "translateX(" + vx + "px) translateY(" + vy + "px)";
		translate += " rotate(" + deg + "deg)";

		$(el).css({
			"-webit-transform": translate,
			"-moz-transform": translate,
			transform: translate,
		});
	}

	function animateElement(el, value, ratio) {
		vx = value * ratio;
		vy = value * -0.6 * ratio;

		translate =
			"translateX(" + vx + "px) translateY(" + vy + "px) rotate(360deg)";
		translate += " rotate(360deg)";

		$(el).css({
			"-webit-transform": translate,
			"-moz-transform": translate,
			transform: translate,
		});
	}
}

function changeRecipt(value) {
	if (value == 'Y') {
		$('#cashRcptOpt1').css('display', 'block');
		$('#cashRcptOpt2').css('display', 'block');
		$('#cashRcptOpt3').css('display', 'block');
	} else {
		$('#cashRcptOpt1').css('display', 'none');
		$('#cashRcptOpt2').css('display', 'none');
		$('#cashRcptOpt3').css('display', 'none');
	}
}






