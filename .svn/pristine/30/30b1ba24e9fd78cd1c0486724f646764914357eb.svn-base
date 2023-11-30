function addEventListenerForPaymentMethod() {
  $("#make-a-payment .payment-method-radios .select-checkout input").bind(
    "click",
    function (e) {
      var officeForm = this.closest(".office-form");
      var formCards = officeForm.getElementsByClassName("form-card");

      var value = this.getAttribute("value");

      $("input[name=PaymentMethodRadio]").removeAttr("checked");
      $(`input[name=PaymentMethodRadio][value=${value}]`).attr(
        "checked",
        "checked"
      );

      for (var i = 0; i < formCards.length; i++) {
        if (formCards[i].getAttribute("data-method") == value) {
          if (formCards[i].classList.contains("active") == false) {
            for (var j = 0; j < formCards.length; j++) {
              $(formCards[j]).slideUp(500);
              formCards[j].classList.remove("active");
            }
            formCards[i].classList.add("active");
            $(formCards[i]).slideDown(500);
          }
        }
      }
    }
  );

  $("#make-a-payment .cards-selection li").bind("click", function (e) {
    var formCard = this.closest(".form-card");

    var cardTypes = formCard.getElementsByClassName("card-type");
    var wCards = formCard.getElementsByClassName("w-card");

    var value = this.getAttribute("data-index");

    if (this.classList.contains("active") == false) {
      for (var i = 0; i < cardTypes.length; i++) {
        if (cardTypes[i].getAttribute("data-card") == value) {
          cardTypes[i].classList.add("active");
          $(cardTypes[i]).slideDown(500);
        } else {
          cardTypes[i].classList.remove("active");
          $(cardTypes[i]).slideUp(500);
        }
      }

      for (var i = 0; i < wCards.length; i++) {
        wCards[i].classList.remove("active");
      }

      this.classList.add("active");
    }
  });

  let _inputs = $(".payment-method-radios .select-checkout input[type=radio]");
  if (_inputs.length > 0) {
    $(_inputs[0]).click();
  }
}
