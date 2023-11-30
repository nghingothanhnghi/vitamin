const STR_CODE = "CODE";
const STR_RANK = "RANK";
const COM_ID = "CELLRA";
const STR_SM_CONFIG = "SM_CONFIG";
const STR_SM_WOWNET_PG = "STR_SM_WOWNET_PG";
const STR_SM_WOWNET = "SM_WOWNET";
var WOWNET_URL = "";

function getWownetUrl(callback) {
  $.ajax({
    url: "/system/getWownetUrl",
    type: "GET",
    success: function (data) {
      WOWNET_URL = data;
      if (isNotNullAndNotEmpty(callback) && typeof callback === "function") {
        callback();
      }
    },
  });
}

function setComma(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;
  n += "";
  while (reg.test(n)) {
    n = n.replace(reg, "$1" + "," + "$2");
  }
  return n;
}

function createMainMenuFromDB() {
  $.ajax({
    url: "/shopping-mall/pdtCateForMenu",
    type: "GET",
    success: function (data) {
      var subMenu = "";

      for (var i = 0; i < data.length; i++) {
        if (data[i].lv == "1") {
          var txt = "";
          txt += '<li class="menu-item col _' + data[i].cateCd + '">';
          txt += '	<a href="/shopping-mall/categories/' + data[i].cateCd + '">';
          txt +=
            '		<svg width="35" height="35" viewBox="0 0 35 35" fill="none"><path class="solid-part"></path><path class="color-part"></path></svg>';
          txt += "		<span>" + data[i].cateName + "</span>";
          txt += "	</a>";
          txt += "</li>";

          $("#main-menu ul").append(txt);
        } else {
          if (subMenu == "") {
            subMenu += '<li class="menu-item col">';
            subMenu += "	<ul>";
          }

          subMenu += "<li>";
          subMenu +=
            '	<a href="/shopping-mall/categories/' +
            data[i].cateCd +
            '" >' +
            data[i].cateName +
            "</a>";

          if (
            i < data.length - 1 &&
            data[i].lv == "2" &&
            data[i + 1].lv == "3"
          ) {
            subMenu += "<ul>";
          } else if (
            (i == data.length - 1 && data[i].lv == "3") ||
            (data[i].lv == "3" && data[i + 1].lv == "2")
          ) {
            subMenu += "</ul>";
          }

          subMenu += "</li>";

          if (
            (i == data.length - 1 &&
              (data[i].lv == "2" || data[i].lv == "3")) ||
            ((data[i].lv == "2" || data[i].lv == "3") && data[i + 1].lv == "1")
          ) {
            subMenu += "</ul></li>";

            $("#dropdown-menu>div>ul").append(subMenu);

            subMenu = "";
          }
        }
      }
    },
  });
}

// function initializeProductSpan(){
// 	var products = document.getElementsByClassName("product");

// 	for (var i=0; i<products.length; i++) {
// 		//--binhnv -- 2022.03.22
// 		var spans = products[i].getElementsByClassName("span-border");
// 		if(spans.length == 4){
// 			continue;
// 		}
// 		//--binhnv -- 2022.03.22

// 		for (var j=0; j<4; j++) {
// 			var _span = document.createElement("span");
// 			_span.setAttribute("class", "span-border");
// 			products[i].insertBefore(_span, products[i].firstChild);
// 		}
// 	}
// 	$(".product").on("mouseenter", productMouseenter);
// 	$(".product").on("mouseleave", productMouseleave);
// }

// $(".product").mouseenter(function() {
// 	spans = this.getElementsByClassName("span-border");

// 	if (spans.length == 4) {
// 		spans[0].style.animation = "animateYIn .4s";
// 		spans[0].style.animationFillMode = "forwards";

// 		spans[1].style.animation = "animateXIn .4s";
// 		spans[1].style.animationFillMode = "forwards";

// 		spans[2].style.animation = "animateYIn .4s";
// 		spans[2].style.animationFillMode = "forwards";

// 		spans[3].style.animation = "animateXIn .4s";
// 		spans[3].style.animationFillMode = "forwards";
// 	}
// });

// $(".product").mouseleave(function() {
// 	spans = this.getElementsByClassName("span-border");

// 	if (spans.length == 4) {
// 		spans[0].style.animation = "animateYOut .4s";
// 		spans[0].style.animationFillMode = "forwards";

// 		spans[1].style.animation = "animateXOut .4s";
// 		spans[1].style.animationFillMode = "forwards";

// 		spans[2].style.animation = "animateYOut .4s";
// 		spans[2].style.animationFillMode = "forwards";

// 		spans[3].style.animation = "animateXOut .4s";
// 		spans[3].style.animationFillMode = "forwards";
// 	}
// });

// function productMouseenter() {
// 	spans = this.getElementsByClassName("span-border");

// 	if (spans.length == 4) {
// 		spans[0].style.animation = "animateYIn .4s";
// 		spans[0].style.animationFillMode = "forwards";

// 		spans[1].style.animation = "animateXIn .4s";
// 		spans[1].style.animationFillMode = "forwards";

// 		spans[2].style.animation = "animateYIn .4s";
// 		spans[2].style.animationFillMode = "forwards";

// 		spans[3].style.animation = "animateXIn .4s";
// 		spans[3].style.animationFillMode = "forwards";
// 	}
// };

// function productMouseleave()  {
// 	spans = this.getElementsByClassName("span-border");

// 	if (spans.length == 4) {
// 		spans[0].style.animation = "animateYOut .4s";
// 		spans[0].style.animationFillMode = "forwards";

// 		spans[1].style.animation = "animateXOut .4s";
// 		spans[1].style.animationFillMode = "forwards";

// 		spans[2].style.animation = "animateYOut .4s";
// 		spans[2].style.animationFillMode = "forwards";

// 		spans[3].style.animation = "animateXOut .4s";
// 		spans[3].style.animationFillMode = "forwards";
// 	}
// };

/*
function loadCodes($e, kindCd, option) {
	$e.empty();
	$.ajax({
		url: '/code/' + kindCd,
		type: 'GET',
		success: function(data){
			for(var i = 0; i < data.length; i++){
				$e.append("<li class='" + option +"' value='"+ data[i].codeCd +"' >"+ data[i].codeName +"</li>");
			}
			
			selectOption();	
			
			$('#kindCd li').on('click', function() {
				var kindCd = $(this).attr("value");
				$('#kindCd2').val(kindCd);
				
			});
		}
	})
}
*/

function loadCodes($e, kindCd, onSuccess) {
  $e.empty();
  $.ajax({
    url: "/code/" + kindCd,
    type: "GET",
    success: function (data) {
      if (onSuccess !== undefined && onSuccess !== null) {
        onSuccess(data, $e);
        selectOption();
      } else {
        createDefaultDropdownSelect($e, data);
      }

      if (isNotNullAndNotEmpty(data)) {
        localStorage.setItem(STR_CODE + "_" + kindCd, JSON.stringify(data));
      }
    },
  });
}

function loadRank($e, onSuccess, $eSelected, selectedOption) {
  $e.empty();
  $.ajax({
    url: "/system/rank/load-all-rank",
    type: "GET",
    success: function (data) {
      if (isNotNullAndNotEmpty(onSuccess)) {
        onSuccess(data, $e);
        selectOption();
      } else {
        createDefaultDropdownSelect($e, data);
      }

      if (
        isNotNullAndNotEmpty($eSelected) &&
        isNotNullAndNotEmpty(selectedOption)
      ) {
        $eSelected.html(selectedOption);
        $eSelected.val(selectedOption).change();
      }
    },
  });
}

function createDefaultDropdownSelect($e, data) {
  for (var i = 0; i < data.length; i++) {
    $e.append(
      "<li class='option' value='" +
        data[i].codeCd +
        "'>" +
        data[i].codeName +
        "</li>"
    );
  }

  selectOption();

  $("#kindCd li").on("click", function () {
    var kindCd = $(this).attr("value");
    $("#kindCd2").val(kindCd);
  });
}

function loadBirthdayForSiteFindInfoLoginForm() {
  var currentYear = new Date().getFullYear();

  var html = "";
  for (var i = 0; i < 101; i++) {
    html += '<li class="option">' + (currentYear - i) + "년</li>";
  }
  $("#year-of-birth").html(html);

  html = "";
  for (var i = 1; i < 13; i++) {
    html += '<li class="option">';
    if (i < 10) {
      html += "0" + i;
    } else {
      html += i;
    }
    html += "월</li>";
  }
  $("#month-of-birth").html(html);

  html = "";
  for (var i = 1; i < 32; i++) {
    html += '<li class="option">';
    if (i < 10) {
      html += "0" + i;
    } else {
      html += i;
    }
    html += "일</li>";
  }
  $("#day-of-birth").html(html);
}

function validationFindMember(type) {
  var msg = "";

  if (type == 2) {
    if (msg == "") {
      msg = getMessageOfInvalidString("logid", "회원번호");
    }
  }

  if (msg == "") {
    msg = getMessageOfInvalidString("username", "회원명");
  }

  if (msg == "") {
    msg = getMessageOfInvalidString("phone", "휴대폰");
  }

  return msg;
}

function getMessageOfInvalidString(objectId, objectName) {
  var value = $("#" + objectId).val();
  if (value != undefined && (value == null || value == "")) {
    return objectName + " 입력해주세요";
  }

  return "";
}

function loadCurrentDay($e, $e1) {
  const date = new Date();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  $e.val(year + "년 " + month + "월 " + day + "일");
  $e1.val(year + month + day);
}

function loadBanks($e, optionName, $e1) {
  $.ajax({
    url: "/system/search/BANK",
    type: "GET",

    success: function (data) {
      drawBankOption($e, data, optionName, $e1);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function loadYearOfBirthday($e) {
  const date = new Date();
  const year = date.getFullYear();
  for (var i = 0; i <= 100; i++) {
    $e.append("<li value='" + "'  class='option' >" + year - i + "</li>");
  }
}

function drawBankOption($e, data, optionName, $e1) {
  if (data) {
    if (optionName) {
      $e.append("<li value='' class='option'>" + optionName + "</li>");
    }
    var len = data.length;
    for (var i = 0; i < len; i++) {
      if (data[i].useYn == "Y") {
        $e.append(
          "<li value='" +
            data[i].bankCd +
            " " +
            data[i].sendCtCd +
            " " +
            data[i].bankName +
            "'  class='option' >" +
            data[i].bankCd +
            " " +
            data[i].bankName +
            "</li>"
        );
        // data-type='" + data[i].sendCtCd + "'
      }

      if (i == 0) {
        if ($e1) {
          $e1.val(data[i].bankCd);
        }
      }
    }

    selectOption();

    $("#bankTxt li").click(function () {
      const value = $(this).attr("value");
      $("#valueLi").val(value);
    });
  }
}

function loadCenters($e, optionName) {
  $.ajax({
    url: "/system/center/search/ALL",
    type: "GET",

    success: function (data) {
      //save on localStorage
      localStorage.setItem("centers", JSON.stringify(data));
      drawCenterOption($e, data, optionName);
    },
  });
}

function drawCenterOption($e, data, optionName) {
  var smUser = JSON.parse(localStorage.getItem("SmUser"));
  if (data) {
    $e.empty();
    if (optionName && null != smUser && smUser.cntCd == null) {
      $e.append("<li value='' class='option'>" + optionName + "</li>");
    }

    var len = data.length;
    for (var i = 0; i < len; i++) {
      if (data[i].workYn == "Y") {
        $e.append(
          "<li value='" +
            data[i].cntCd +
            "' class='option'>" +
            data[i].cntCd +
            " " +
            data[i].cntName +
            " </li>"
        );
      }
    }
    selectOption();

    $("#cntCdTxt li").click(function () {
      const value = $(this).attr("value");
      $("#cntCd").val(value);
    });
  }
}

function loadCountrys($e, optionValue, optionName, ctrcd) {
  $.ajax({
    url: "/system/search-country",
    type: "GET",

    success: function (data) {
      drawCtrOption($e, data, optionValue, optionName, ctrcd);
    },
  });
}

function drawCtrOption($e, data, optionValue, optionName, ctrcd) {
  if (data) {
    $e.empty();
    if (optionName) {
      $e.append(
        "<option value='" +
          optionValue +
          "' selected>" +
          optionName +
          "</option>"
      );
    }
    var len = data.length;
    for (var i = 0; i < len; i++) {
      if (data[i].ctrCd == ctrcd) {
        $e.append(
          "<li value='" +
            data[i].ctrCd +
            "' class='option'>" +
            data[i].ctrName +
            " </li>"
        );
        // $e.append("<option value='" + data[i].ctrCd + "' selected>" + data[i].ctrCd + " " + data[i].ctrName + "</option>");
      } else {
        $e.append(
          "<li value='" +
            data[i].ctrCd +
            " " +
            data[i].ctrName +
            "' class='option'>" +
            data[i].ctrName +
            " </li>"
        );
      }

      if (i == 0) {
        $("#ctrText").text(data[i].ctrName);
        $("#ctrCd").val(data[i].ctrCd.split(" ")[0]);
        $("#ctrName").val(data[i].ctrName);
      }
    }

    $("#ctrTxt li").click(function () {
      const value = $(this).attr("value");
      $("#ctrCd").val(value.split(" ")[0]);
      $("#ctrName").val(value.split(" ")[1]);
    });
  }
}

function isNotNullAndNotEmpty(value) {
  if (value !== undefined && value !== null) {
    if (value instanceof Array) {
      return value.length > 0;
    } else if (typeof value === "string") {
      return value.length > 0;
    }

    return true;
  }

  return false;
}

function isNullOrEmpty(value) {
  if (value === undefined || value === null) {
    return true;
  } else {
    if (value instanceof Array) {
      return value.length == 0;
    } else if (typeof value === "string") {
      return value.length == 0;
    }
  }

  return false;
}

function getStrDate($eYear, $eMonth, $eday) {
  if (
    isNotNullAndNotEmpty($eYear) &&
    isNotNullAndNotEmpty($eYear.length) &&
    $eYear.length > 0 &&
    isNotNullAndNotEmpty($eMonth) &&
    isNotNullAndNotEmpty($eMonth.length) &&
    $eMonth.length > 0 &&
    isNotNullAndNotEmpty($eday) &&
    isNotNullAndNotEmpty($eday.length) &&
    $eday.length > 0
  ) {
    var year = $eYear.text().trim().substring(0, 4);
    var month = $eMonth.text().trim().substring(0, 2);
    var day = $eday.text().trim().substring(0, 2);

    return year + "-" + month + "-" + day;
  }

  return "";
}

function toString(object) {
  if (object !== undefined && object !== null) {
    if (object instanceof String) {
      return object;
    } else {
      return object.toString();
    }
  }
  return "";
}

const encode_type = {
  date: 1,
  phone: 2,
  email: 3,
  address: 4,
};

function encode(value, type) {
  if (isNullOrEmpty(value) || typeof value !== "string") return "";

  if (type === encode_type.date) {
    return value.substring(0, 4) + "-**-**";
  } else if (type === encode_type.phone) {
    return value.substring(0, 8) + "*****";
  } else if (type === encode_type.email) {
    const temp = value.split("@");
    if (temp[0].length <= 4) {
      let first = "";
      for (let i = 0; i < temp[0].length; i++) {
        first += "*";
      }
      return first + "@" + temp[1];
    }
    return temp[0].substring(0, temp[0].length - 4) + "****" + "@" + temp[1];
  } else if (type === encode_type.address) {
    return "****";
  }

  return "";
}

function getDaysInMonth($e, month, year) {
  $e.empty();
  var date1 = new Date(year, month, 0).getDate();
  for (i = 1; i <= date1; i++) {
    if (i < 10) {
      $e.append($("<li value='0" + i + "'  class='option'>0" + i + "일</li>"));
    } else {
      $e.append($("<li value='" + i + "'  class='option'>" + i + "일</li>"));
    }
  }

  selectOption();

  $("#day li").click(function () {
    const value = $(this).attr("value");
    $("#dayy").val(value);
  });
}

function loadyear($e) {
  $e.empty();
  var year = new Date().getFullYear();
  for (i = year - 100; i <= year; i++) {
    $e.append($("<li value='" + i + "'  class='option'>" + i + "년</li>"));
  }
  selectOption();
}

var titlePay;
function searchTitlePay() {
  $.ajax({
    url: "/my-office/benefit-management/titlePay",
    type: "GET",
    dataType: "json",
    success: function (result) {
      titlePay = result;
    },
  });
}

const getClassNameAvatarByRankCd = function (rankCd) {
  let className = "general-member";

  if (isNullOrEmpty(rankCd)) return className;

  const COM_CD = "01";
  if (rankCd == COM_CD + "00") {
    className = "general-member";
  } else if (rankCd == COM_CD + "10") {
    className = "member";
  } else if (rankCd == COM_CD + "20") {
    className = "silver";
  } else if (rankCd == COM_CD + "25") {
    className = "ruby";
  } else if (rankCd == COM_CD + "30") {
    className = "sapphire";
  } else if (rankCd == COM_CD + "40") {
    className = "emerald";
  } else if (rankCd == COM_CD + "45") {
    className = "diamond";
  } else if (rankCd == COM_CD + "50") {
    className = "double-diamond";
  } else if (rankCd == COM_CD + "60") {
    className = "crown";
  }

  return className;
};

const downloadFile = function (url) {
  if (isNullOrEmpty(url)) return;

  const fileName = url.split("/").pop();
  var e = document.createElement("a");
  e.setAttribute("href", url);
  e.setAttribute("download", fileName);
  document.body.appendChild(e);
  e.click();
  e.remove();
};

const updateDownCnt = function (boardNo) {
  $.ajax({
    url: "/notice/update-down-cnt/" + boardNo,
    type: "GET",
  });
};

const updateSrc = function (e, urlWownet) {
  const children = $(e).children();
  if (children.length === 0) return;
  let temp;
  let url;
  for (let i = 0; i < children.length; i++) {
    temp = children[i];
    url = $(temp).attr("src");
    if (isNotNullAndNotEmpty(url)) {
      if ($(temp).prop("tagName") !== "IFRAME") {
        $(temp).attr("src", urlWownet + url);
      }
    }
    updateSrc(temp, urlWownet);
  }
};

function adjustPostContent(e, urlWownet) {
  const _width = $(".post-body").width();

  $(".post-body").css("opacity", "0");

  updateSrc(e, urlWownet);

  $(".post-body img").css("max-width", _width + "px");
  $(".post-body img").css("width", "auto");
  $(".post-body img").css("height", "auto");

  $(".post-body").css("opacity", "1");
}

const downAttachment = function (boardNo) {
  if (isNullOrEmpty(boardNo)) return;
  $(".block-loading").addClass("is-loading");
  $.ajax({
    url: "/notice/attachment/" + boardNo,
    type: "GET",
    success: function (data) {
      try {
        if (isNotNullAndNotEmpty(data)) {
          const date = new Date();
          const year = date.getFullYear();
          const month =
            date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1;
          const day =
            date.getDay() + 1 < 10 ? "0" + date.getDate() : date.getDate();
          const hours =
            date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          const minutes =
            date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes();
          const seconds =
            date.getSeconds() < 10
              ? "0" + date.getSeconds()
              : date.getSeconds();

          const zipName =
            "notice_" +
            boardNo +
            "_" +
            year +
            month +
            day +
            hours +
            minutes +
            seconds +
            ".zip";

          const zip = new JSZip();
          var file;
          var fileName;

          for (var i = 0; i < data.length; i++) {
            fileName = data[i].fileName;
            file = WOWNET_URL + "/" + data[i].filePath + "/" + data[i].fileName;
            zip.file(fileName, JSZipUtils.getBinaryContent(file));
          }

          zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, zipName);
          });

          updateDownCnt(boardNo);
        } else {
          swal("다운로드할 파일이 없습니다.", {
            icon: "warning",
          });
        }
      } catch (e) {
        swal("다운로드할 파일이 없습니다.", {
          icon: "error",
        });
      }

      $(".block-loading").removeClass("is-loading");
    },
    error: function (e) {
      swal("다운로드할 파일이 없습니다.", {
        icon: "error",
      });
      $(".block-loading").removeClass("is-loading");
    },
  });
};

const updatePathname = function (path) {
  if (isNullOrEmpty(path)) return;
  let pathname = window.location.pathname;
  pathname = pathname.substring(0, pathname.indexOf("?"));
  if (path === pathname) return;
  window.history.pushState("", "", path);
};

const insertParams = function (key, value) {
  if (isNullOrEmpty(key)) return;

  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  const pathname = window.location.pathname;
  const strSearch = location.search.substr(1);
  let temp = "?";
  if (isNullOrEmpty(strSearch)) {
    temp += key + "=" + value;
  } else {
    let kvp = strSearch.split("&");
    for (i = 0; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }
    let params = kvp.join("&");
    temp += params;
  }
  window.history.pushState("", "", pathname + temp);
};

const insertListParams = function (params) {
  if (isNullOrEmpty(params) && !(params instanceof Array)) return;

  const pathname = window.location.pathname;
  const strSearch = location.search.substr(1);

  let arr = [];
  let key;
  let value;
  let kvp = strSearch.split("&");

  for (let i = 0; i < params.length; i++) {
    key = encodeURIComponent(params[i].key);
    value = encodeURIComponent(params[i].value);

    if (isNullOrEmpty(key)) continue;

    if (isNullOrEmpty(strSearch)) {
      arr.push(key + "=" + value);
    } else {
      let j;
      for (j = 0; j < kvp.length; j++) {
        if (kvp[i].startsWith(key + "=")) {
          let pair = kvp[i].split("=");
          pair[1] = value;
          kvp[i] = pair.join("=");
          break;
        }
      }
      if (j >= kvp.length) {
        kvp[kvp.length] = [key, value].join("=");
      }
      arr = kvp;
    }
  }

  window.history.pushState("", "", pathname + "?" + arr.join("&"));
};

const getParamValue = function (key) {
  if (isNullOrEmpty(key)) return;

  const href = window.location.href;
  var url = new URL(href);
  return url.searchParams.get(key);
};

const LANG_KR = "kr";
const setThisYearLabel = function (selector, strYear, type = "") {
  if (isNullOrEmpty(selector)) return;
  if (isNullOrEmpty(strYear)) return;

  const now = new Date();
  const year = now.getFullYear();
  let text;

  if (type.toLowerCase() == LANG_KR) {
    text = year + strYear;
  }

  $(selector).text(text);
};

function createForm(frmId, fields, enctype, baseUrl) {
  var form;

  if ($("#" + frmId).length) {
    form = $("#" + frmId);
    $.each(fields, function (k, v) {
      $("input[name=" + k + "]").val(v);
    });
  } else {
    if (enctype)
      form = $(
        '<form method="POST" name="' +
          frmId +
          '" id="' +
          frmId +
          '" enctype="' +
          enctype +
          '"></form>'
      );
    else
      form = $(
        '<form method="POST" name="' + frmId + '" id="' + frmId + '"></form>'
      );
    $.each(fields, function (k, v) {
      $(form).append(
        '<input type="hidden" id="' +
          k +
          '" name="' +
          k +
          '" value="' +
          v +
          '" >'
      );
    });

    $(form).css("diaplay", "none");
    $(form).css("top", "-1200px");
    $(form).css("left", "-1200px");
  }

  $(form).attr("action", baseUrl);
  $("body").append(form);
  return form;
}

//get PV
function loadPayHeader() {
  $.ajax({
    url: "/system/wownet/findPayHeader",
    dataType: "json",
    contentType: "application/json",
    success: function (result) {
      localStorage.setItem("payHeaderMF", JSON.stringify(result));
      return JSON.stringify(result);
    },
  });
}

function getYnPayHeader(e, colName) {
  if (e != null) {
    if (e[colName] == "Y") {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

const downloadFileNotice = function (url) {
  axios({
    url: url,
    method: "GET",
    responseType: "blob",
  }).then(function (response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsLoading(false);
  });
};

const downloadAttachment = function (data, boardNo, urlWownet) {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDay() + 1 < 10 ? "0" + date.getDate() : date.getDate();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  const zipName =
    "notice_" +
    boardNo +
    "_" +
    year +
    month +
    day +
    hours +
    minutes +
    seconds +
    ".zip";

  const zip = new JSZip();
  var file;
  var fileName;

  for (var i = 0; i < data.length; i++) {
    fileName = data[i].fileName;
    file = urlWownet + "/" + data[i].filePath + "/" + data[i].fileName;
    zip.file(fileName, JSZipUtils.getBinaryContent(file));
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, zipName);
  });
};

// pop-boards

function hideAllPopup() {
  const boards = $("#pop-boards .pop-board");
  var board;
  var count = 0;

  for (var i = 0; i < boards.length; i++) {
    board = $(boards[i]);

    if (board.css("display") == "none") {
      count++;
    }
  }

  if (count == boards.length) {
    $("#pop-boards").remove();
  }
}

const handleOnHidePopup = function (boardNo) {
  if (isNullOrEmpty(boardNo)) return;
  setCookie("pop-board-" + boardNo, true, 1);
  $("#pop-boards #pop-board-" + boardNo).hide();
};
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function viewProductDetail(pdtCd) {
  const smConfig = JSON.parse(sessionStorage.getItem(STR_SM_WOWNET));
  if (isNotNullAndNotEmpty(smConfig)) {
    const yn = smConfig.lshowPdtYn;
    if (yn !== "Y" && !isLogined()) {
      showAlertLogin();
    } else {
      location.href = "/shopping-mall/product/" + pdtCd;
    }
  }
}
