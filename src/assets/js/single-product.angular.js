function addEventListenerForTabContent() {
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
