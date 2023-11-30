function addEventListenerClickCheckCodition() {
    $("#terms-n-condition .infos li").on("click", function (e) {
        var _input = this.getElementsByTagName("input")[0];
        var _lis = this.parentElement.children;

        if (_input.getAttribute("id") == "checkAll") {
            if (_input.checked == true) {
                checkAll(_lis);
            } else {
                uncheckAll(_lis);
            }
        } else {
            toggleCheckAllInput(_lis);
        }
    });
}

function checkAll(_lis) {
    for (var i = 0; i < _lis.length; i++) {
        var _input = _lis[i].getElementsByTagName("input")[0];
        _input.checked = true;
    }
}

function uncheckAll(_lis) {
    for (var i = 0; i < _lis.length; i++) {
        var _input = _lis[i].getElementsByTagName("input")[0];
        _input.checked = false;
    }
}

function toggleCheckAllInput(_lis) {
    let count = 0;
    let totalConditions = 3;
    let checkAllIndex = 0;
    let _input;
    for (var i = 0; i < _lis.length; i++) {
        _input = _lis[i].getElementsByTagName("input")[0];
        if (_input.getAttribute("id") === "checkAll") {
            checkAllIndex = i;
        } else if (_input.checked === true) {
            count++;
        }
    }
    _input = _lis[checkAllIndex].getElementsByTagName("input")[0];
    if (totalConditions !== count) {
        _input.checked = false;
    } else {
        _input.checked = true;
    }
}

function addEventListenerClickTabContent() {
    var _productContent = document.getElementById("product-content");

    var _tabsNav = document.getElementById("tabs-nav");
    var _tabsNavLis = _tabsNav.getElementsByTagName("li");
    var _tabContents = _productContent.getElementsByClassName("tab-content");

    $("#product-content #tabs-nav li").on("click", function (e) {
        e.preventDefault();
        if (this.classList.contains("active") == false) {
            for (var i = 0; i < _tabsNavLis.length; i++) {
                _tabsNavLis[i].classList.remove("active");
            }

            for (var i = 0; i < _tabContents.length; i++) {
                $(_tabContents[i]).slideUp(500);
            }

            this.classList.add("active");
            var _index = this.getAttribute("data-index");

            for (var i = 0; i < _tabContents.length; i++) {
                if (_tabContents[i].getAttribute("data-index") == _index) {
                    $(_tabContents[i]).slideDown(500);
                }
            }
        }
    });
}

function addEventListenerClickButtonSearch() {
    $(".search-product .btn-search-open").on("click", function (e) {
        var search_product = this.closest(".search-product");
        search_product.classList.remove("closed");
        search_product.classList.add("opened");
        var _width = window.innerWidth;

        if (search_product.getAttribute("location") != "local") {
            var main_nav = document.querySelector("#main-nav");
            main_nav.style.opacity = "0";
            var logo = document.querySelector("#logo");
            
            if (_width <= 575) {
                logo.style.transform = "translateX(-30%)";
                logo.style.opacity = "0";
            }
        } else {
            if (_width <= 575) {
                var main_heading = this.closest(".main-heading");
                var title = main_heading.querySelector(".title");
                title.style.opacity = "0";
            }
        }
    });

    $(".search-product .btn-search-close").on("click", function (e) {
        var search_product = this.closest(".search-product");
        search_product.classList.remove("opened");
        search_product.classList.add("closed");
        var _width = window.innerWidth;

        if (search_product.getAttribute("location") != "local") {
            var main_nav = document.querySelector("#main-nav");
            main_nav.style.opacity = "1";
            var logo = document.querySelector("#logo");
            
            if (_width <= 575) {
                logo.style.transform = "translateX(0)";
                logo.style.opacity = "1";
            }
        } else {
            if (_width <= 575) {
                var main_heading = this.closest(".main-heading");
                var title = main_heading.querySelector(".title");
                title.style.opacity = "1";
            }

        }
    });
}

function clickBtnSearchClose() {
    $(".search-product .btn-search-close").click();
}

function addEventListenerClickBusinessInfo() {
    var regis_form = document.querySelector(".regis-form");

    var _tabsNav = regis_form.querySelector(".tabs-nav");
    var _tabsNavLis = _tabsNav.getElementsByTagName("li");
    var _tabContents = regis_form.getElementsByClassName("tab-content");

    $(".regis-form .tabs-nav li").on("click", function (e) {
        e.preventDefault();
        if (this.classList.contains("active") == false) {
            for (var i = 0; i < _tabsNavLis.length; i++) {
                _tabsNavLis[i].classList.remove("active");
            }

            for (var i = 0; i < _tabContents.length; i++) {
                $(_tabContents[i]).slideUp(500);
            }

            this.classList.add("active");
            var _index = this.getAttribute("data-index");

            for (var i = 0; i < _tabContents.length; i++) {
                if (_tabContents[i].getAttribute("data-tab") == _index) {
                    $(_tabContents[i]).slideDown(500);
                }
            }
        }
    });
}

function addEventListenerClickADOCondition() {
    $(".w-checkbox label").on("click", function (e) {
        e.preventDefault();
        var checkbox = this.closest(".w-checkbox");
        var input = checkbox.getElementsByTagName("input")[0];

        if (input.getAttribute("id") === "agreementCheckAll") {
            if (input.checked) {
                uncheckAllAgreementADO();
            } else {
                checkAllAgreementADO();
            }
        } else {
            if (input.checked === true) {
                input.checked = false;
                checkbox.classList.remove("checked");
            } else {
                input.checked = true;
                checkbox.classList.add("checked");
            }
            toggleCheckAllADO();
        }
    });
}

function checkAllAgreementADO() {
    const checkboxs = $(".w-checkbox");
    for (const checkbox of checkboxs) {
        const input = checkbox.getElementsByTagName("input")[0];
        input.checked = true;
        checkbox.classList.add("checked");
    }
}

function uncheckAllAgreementADO() {
    const checkboxs = $(".w-checkbox");
    for (const checkbox of checkboxs) {
        const input = checkbox.getElementsByTagName("input")[0];
        input.checked = false;
        checkbox.classList.remove("checked");
    }
}

function toggleCheckAllADO() {
    let count = 0;
    let totalConditions = 3;
    let checkAllIndex = 0;
    let _input;
    let _checkboxs = $(".w-checkbox");

    for (let i = 0; i < _checkboxs.length; i++) {
        const checkbox = _checkboxs[i];
        _input = checkbox.getElementsByTagName("input")[0];

        if (_input.getAttribute("id") === "agreementCheckAll") {
            checkAllIndex = i;
        } else if (_input.checked === true) {
            count++;
        }
    }

    const _checkbox = _checkboxs[checkAllIndex];
    _input = _checkbox.getElementsByTagName("input")[0];
    if (totalConditions !== count) {
        _input.checked = false;
        _checkbox.classList.remove("checked");
    } else {
        _input.checked = true;
        _checkbox.classList.add("checked");
    }
}
const myOffcanvas = document.getElementById(id)
myOffcanvas.addEventListener('hidden.bs.offcanvas', event => {
  // do something...
})