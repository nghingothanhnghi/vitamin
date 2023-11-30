function addEventListenerForViewModeProduct() {
  $("#mobile-main-menu .btn-open-sub").unbind();

  $(".product-category .main-heading .view-modes .mode").bind(
    "click",
    function (e) {
      var view_modes = this.closest(".view-modes");
      var modes = view_modes.querySelectorAll(".mode");

      var product_category = this.closest(".product-category");
      var products_wrapper =
        product_category.querySelector(".products-wrapper");
      var products = products_wrapper.querySelectorAll(".product");

      if (this.classList.contains("active") == false) {
        for (var i = 0; i < modes.length; i++) {
          modes[i].classList.remove("active");
        }

        this.classList.add("active");

        products_wrapper.style.opacity = 0;
        hideAllProducts(products);

        if (this.classList.contains("grid")) {
          products_wrapper.classList.add("grid-wrapper");
          products_wrapper.classList.remove("list-wrapper");

          setTimeout(function () {
            products_wrapper.style.opacity = 1;
            showAllProducts(products);
          }, 300);
        }

        if (this.classList.contains("list")) {
          products_wrapper.classList.remove("grid-wrapper");
          products_wrapper.classList.add("list-wrapper");

          setTimeout(function () {
            products_wrapper.style.opacity = 1;
            showAllProducts(products);
          }, 300);
        }
      }
    }
  );
}

function hideAllProducts(products) {
  for (var i = 0; i < products.length; i++) {
    products[i].style.opacity = "0";
    products[i].style.transitionDelay = "0s";
  }
}

function showAllProducts(products) {
  var delay = 0;

  for (var i = 0; i < products.length; i++) {
    delay = delay + 0.1;
    products[i].style.transitionDelay = delay + "s";
    products[i].style.opacity = "1";
  }

  setTimeout(function () {
    for (var i = 0; i < products.length; i++) {
      products[i].style.transitionDelay = "0s";
    }
  }, delay);
}
