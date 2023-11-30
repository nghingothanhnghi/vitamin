function addEventListenerWAlert() {
  $(".w-alert-container").on("click", function (e) {
    this.classList.remove("show");
    hideAllAlerts();
  });

  $(".w-alert-container .w-alert").on("click", function (e) {
    e.stopPropagation();
  });
}

jQuery(document).ready(function ($) {
  $(".sample-content .group-btns .w-btn").on("click", function (e) {
    var value = this.getAttribute("value");

    var w_alert_container = document.querySelector(".w-alert-container");
    w_alert_container.classList.add("show");

    hideOtherAlerts(value);
    showAlert(value);
  });
});

function hideAllAlerts() {
  var w_alerts = document.querySelectorAll(".w-alert");
  for (var i = 0; i < w_alerts.length; i++) {
    var w_alert_container = document.querySelector(".w-alert-container");
    w_alert_container.classList.remove("show");
    w_alerts[i].classList.remove("show");
  }
}

function hideOtherAlerts(_name) {
  var w_alerts = document.querySelectorAll(".w-alert");
  for (var i = 0; i < w_alerts.length; i++) {
    if (w_alerts[i].classList.contains(_name) == false) {
      w_alerts[i].classList.remove("show");
    }
  }
}

function showAlert(_name) {
  var w_alerts = document.querySelectorAll(".w-alert");
  for (var i = 0; i < w_alerts.length; i++) {
    if (w_alerts[i].classList.contains(_name)) {
      var w_alert_container = document.querySelector(".w-alert-container");
      w_alert_container.classList.add("show");
      w_alerts[i].classList.add("show");
    }
  }
}

function hideAlert(_name) {
  var w_alerts = document.querySelectorAll(".w-alert");
  for (var i = 0; i < w_alerts.length; i++) {
    if (w_alerts[i].classList.contains(_name)) {
      var w_alert_container = document.querySelector(".w-alert-container");
      w_alert_container.classList.remove("show");
      w_alerts[i].classList.remove("show");
    }
  }
}
