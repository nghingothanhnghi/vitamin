

function refreshSlider(slider) {
    updateSlider(slider);
    if (slider.classList.contains("pop-boards-slider")) {
        setTimeout(function () {
            let current_active = getCurrentActiveSlide(slider);
            let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
            transformSliderX(slider_wrapper, current_active);
            slider_wrapper.style.visibility = "visible";
        }, 1500);
    } else {
        let current_active = getCurrentActiveSlide(slider);
        let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
        transformSliderX(slider_wrapper, current_active);
        slider_wrapper.style.visibility = "visible";
    }
}

function resizeSlider(slider) {
    updateSlider(slider);
    if (slider.classList.contains("pop-boards-slider") == false) {
        let current_active = getCurrentActiveSlide(slider);
        let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
        transformSliderX(slider_wrapper, current_active);
        slider_wrapper.style.visibility = "visible";
    }
}

function assignSliderStatus(slider) {
    var _width = window.innerWidth;
    var data_under = slider.getAttribute("data-under");
    if (data_under) {
        if (_width < data_under) {
            slider.classList.remove("off");
            slider.classList.add("on");
        } else {
            slider.classList.add("off");
            slider.classList.remove("on");
        }
    } else {
        slider.classList.remove("off");
        slider.classList.add("on");
    }
}

function destroySlider(slider) {
    slider.classList.remove("created");

    var slider_wrapper = slider.querySelector(".slider-wrapper");
    slider_wrapper.style.width = "";
    slider_wrapper.style.transform = "";

    var slides = slider.querySelectorAll(".slide");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = "";
    }

    var slider_dots = slider.querySelector(".slider-dots");
    var slider_prev = slider.querySelector(".prev");
    var slider_next = slider.querySelector(".next");
    var slider_number = slider.querySelector(".slider-number");

    if (slider_dots) {
        slider_dots.remove();
    }

    if (slider_prev) {
        slider_prev.remove();
    }

    if (slider_next) {
        slider_next.remove();
    }

    if (slider_number) {
        slider_number.remove();
    }
}
// function getProductFeature() {
//     var _width = window.innerWidth;
//     let ftSliders = document.querySelectorAll('.featured-slider');

//     for (var i = 0; i < ftSliders.length; i++) {
//         destroySlider(ftSliders[i]);
//         assignSliderStatus(ftSliders[i]);
//     }


//     for (var i = 0; i < ftSliders.length; i++) {
//         if (ftSliders[i].classList.contains("on")) {
//             var slider_wrapper = ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//             slider_wrapper.setAttribute("id", "featured-slider-" + i + "-wrapper");
//             createSlider(ftSliders[i]);
//             ftSliders[i].classList.add("created");
//         }
//     }



//     if (_width <= 991) {
//         setTimeout(function () {
//             let ftSliders = document.querySelectorAll('.featured-slider');
//             for (var i = 0; i < ftSliders.length; i++) {
//                 if (ftSliders[i].classList.contains("on")) {
//                     var slider_wrapper = ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                     var _id = slider_wrapper.getAttribute("id");
//                     window['touch_' + i] = new touchSlider(_id);
//                 }
//             }
//         }, 1000);
//     }
//     else {
//         setTimeout(function () {
//             let ftSliders = document.querySelectorAll('.featured-slider');
//             for (var i = 0; i < ftSliders.length; i++) {
//                 if (ftSliders[i].classList.contains("on")) {
//                     slider_wrapper = ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                     sliderMouseHandle(slider_wrapper);
//                 }
//             }
//         }, 1000);
//     }


//     for (var i = 0; i < ftSliders.length; i++) {
//         if (ftSliders[i].classList.contains("on")) {
//             refreshSlider(ftSliders[i]);
//         }
//     }
// }

function initProductImageSlider(selector) {
    if (!selector) return;

    var _width = window.innerWidth;
    let ftSliders = document.querySelectorAll(selector);
    // let ftSliders = document.querySelectorAll(".featured-slider");

    for (var i = 0; i < ftSliders.length; i++) {
        destroySlider(ftSliders[i]);
        assignSliderStatus(ftSliders[i]);
    }

    for (var i = 0; i < ftSliders.length; i++) {
        if (ftSliders[i].classList.contains("on")) {
            var slider_wrapper =
                ftSliders[i].getElementsByClassName("slider-wrapper")[0];
            slider_wrapper.setAttribute("id", "featured-slider-" + i + "-wrapper");
            createSlider(ftSliders[i]);
            ftSliders[i].classList.add("created");
        }
    }

    if (_width <= 991) {
        setTimeout(function () {
            let ftSliders = document.querySelectorAll(".featured-slider");
            for (var i = 0; i < ftSliders.length; i++) {
                if (ftSliders[i].classList.contains("on")) {
                    var slider_wrapper =
                        ftSliders[i].getElementsByClassName("slider-wrapper")[0];
                    var _id = slider_wrapper.getAttribute("id");
                    window["touch_" + i] = new touchSlider(_id);
                }
            }
        }, 1000);
    } else {
        setTimeout(function () {
            let ftSliders = document.querySelectorAll(".featured-slider");
            for (var i = 0; i < ftSliders.length; i++) {
                if (ftSliders[i].classList.contains("on")) {
                    slider_wrapper =
                        ftSliders[i].getElementsByClassName("slider-wrapper")[0];
                    sliderMouseHandle(slider_wrapper);
                }
            }
        }, 1000);
    }

    for (var i = 0; i < ftSliders.length; i++) {
        if (ftSliders[i].classList.contains("on")) {
            refreshSlider(ftSliders[i]);
        }
    }
}

function getInfoBanner() {
    var _width = window.innerWidth;
    let ftSliders = document.querySelectorAll(".featured-slider");

    for (var i = 0; i < ftSliders.length; i++) {
        destroySlider(ftSliders[i]);
        assignSliderStatus(ftSliders[i]);
    }

    for (var i = 0; i < ftSliders.length; i++) {
        if (ftSliders[i].classList.contains("on")) {
            var slider_wrapper =
                ftSliders[i].getElementsByClassName("slider-wrapper")[0];
            slider_wrapper.setAttribute("id", "featured-slider-" + i + "-wrapper");
            createSlider(ftSliders[i]);
            ftSliders[i].classList.add("created");
        }
    }

    if (_width <= 991) {
        setTimeout(function () {
            let ftSliders = document.querySelectorAll(".featured-slider");
            for (var i = 0; i < ftSliders.length; i++) {
                if (ftSliders[i].classList.contains("on")) {
                    var slider_wrapper =
                        ftSliders[i].getElementsByClassName("slider-wrapper")[0];
                    var _id = slider_wrapper.getAttribute("id");
                    window["touch_" + i] = new touchSlider(_id);
                }
            }
        }, 1000);
    } else {
        setTimeout(function () {
            let ftSliders = document.querySelectorAll(".featured-slider");
            for (var i = 0; i < ftSliders.length; i++) {
                if (ftSliders[i].classList.contains("on")) {
                    slider_wrapper =
                        ftSliders[i].getElementsByClassName("slider-wrapper")[0];
                    sliderMouseHandle(slider_wrapper);
                }
            }
        }, 1000);
    }

    for (var i = 0; i < ftSliders.length; i++) {
        if (ftSliders[i].classList.contains("on")) {
            refreshSlider(ftSliders[i]);
        }
    }
}

function playPauseVideo() {
    var w_videos = document.querySelectorAll(".w-video");
    if (w_videos.length > 0) {
        for (var i = 0; i < w_videos.length; i++) {
            if (w_videos[i].classList.contains("slide-video") == false) {
                initializeWowVideo(w_videos[i]);
            }
        }
    }
}

function initializeWowVideo(w_video) {
    var thumbnail = w_video.querySelector(".thumbnail");
    var video = w_video.querySelector("video");

    var _play = w_video.querySelector(".play");
    var _pause = w_video.querySelector(".pause");

    if (_play) {
        _play.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            video.play();
        });
    }

    if (w_video.classList.contains("slide-video")) {
        if (w_video.classList.contains("onplay") == false) {
            video.play();
        }
    }

    w_video.addEventListener("click", function () {
        if (w_video.classList.contains("onplay") == false) {
            video.play();
        }
    });

    video.onplay = function (e) {
        video.setAttribute("controls", "");
        var _w_video = this.closest(".w-video");
        w_video.classList.remove("onpause");
        w_video.classList.add("onplay");
    };

    video.onended = function (e) {
        var _w_video = this.closest(".w-video");
        w_video.classList.remove("onplay");
        w_video.classList.remove("onpause");
    };
}

// jQuery(document).ready(function ($) {
//     var _width = window.innerWidth;
//     let ftSliders = document.querySelectorAll(".featured-slider");

//     for (var i = 0; i < ftSliders.length; i++) {
//         assignSliderStatus(ftSliders[i]);
//     }

//     for (var i = 0; i < ftSliders.length; i++) {
//         if (ftSliders[i].classList.contains("on")) {
//             var slider_wrapper =
//                 ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//             slider_wrapper.setAttribute("id", "featured-slider-" + i + "-wrapper");
//             createSlider(ftSliders[i]);
//             ftSliders[i].classList.add("created");
//         }
//     }

//     if (_width <= 991) {
//         setTimeout(function () {
//             let ftSliders = document.querySelectorAll(".featured-slider");
//             for (var i = 0; i < ftSliders.length; i++) {
//                 if (ftSliders[i].classList.contains("on")) {
//                     var slider_wrapper =
//                         ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                     var _id = slider_wrapper.getAttribute("id");
//                     window["touch_" + i] = new touchSlider(_id);
//                 }
//             }
//         }, 1000);
//     } else {
//         setTimeout(function () {
//             let ftSliders = document.querySelectorAll(".featured-slider");
//             for (var i = 0; i < ftSliders.length; i++) {
//                 if (ftSliders[i].classList.contains("on")) {
//                     slider_wrapper =
//                         ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                     sliderMouseHandle(slider_wrapper);
//                 }
//             }
//         }, 1000);
//     }

//     for (var i = 0; i < ftSliders.length; i++) {
//         if (ftSliders[i].classList.contains("on")) {
//             refreshSlider(ftSliders[i]);
//         }
//     }
// });

// $(window).resize(function () {
//     var _width = window.innerWidth;
//     let ftSliders = document.querySelectorAll(".featured-slider");

//     for (var i = 0; i < ftSliders.length; i++) {
//         assignSliderStatus(ftSliders[i]);
//     }

//     for (var i = 0; i < ftSliders.length; i++) {
//         if (ftSliders[i].classList.contains("on")) {
//             if (ftSliders[i].classList.contains("created")) {
//                 resizeSlider(ftSliders[i]);
//             } else {
//                 var slider_wrapper =
//                     ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                 slider_wrapper.setAttribute("id", "featured-slider-" + i + "-wrapper");
//                 createSlider(ftSliders[i]);
//                 ftSliders[i].classList.add("created");

//                 if (_width <= 991) {
//                     setTimeout(function () {
//                         if (ftSliders[i]) {
//                             var slider_wrapper =
//                                 ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                             var _id = slider_wrapper.getAttribute("id");
//                             window["touch_" + i] = new touchSlider(_id);
//                         }
//                     }, 1000);
//                 } else {
//                     setTimeout(function () {
//                         slider_wrapper =
//                             ftSliders[i].getElementsByClassName("slider-wrapper")[0];
//                         sliderMouseHandle(slider_wrapper);
//                     }, 1000);
//                 }

//                 refreshSlider(ftSliders[i]);
//             }
//         } else {
//             destroySlider(ftSliders[i]);
//         }
//     }
// });


function sliderMouseHandle(slider_wrapper) {
    let isDown = false;

    let startX = 0;
    let sLeft = 0;
    let index = 0;
    let curLeft = 0;
    let disX = 0;

    let posXDown = 0;
    let posXUp = 0;

    var slides = slider_wrapper.getElementsByClassName("slide");

    slider_wrapper.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        isDown = true;
        e.preventDefault();

        posXDown = e.pageX;

        startX = e.pageX;
        sLeft = slider_wrapper.style.transform
            ? -parseInt(/\d+/.exec(slider_wrapper.style.transform)[0])
            : 0;
        slider_wrapper.style.transition = "none";
    });

    slider_wrapper.addEventListener("mouseleave", () => {
        isDown = false;
    });

    slider_wrapper.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();

        disX = e.pageX - startX;
        curLeft = disX + sLeft;
        slider_wrapper.style.transform = "translateX(" + curLeft + "px)";
    });

    slider_wrapper.addEventListener("mouseup", (e) => {
        isDown = false;
        if (disX > 100) {
            if (index != 0) {
                index -= 1;
            }
        }
        if (disX < -100) {
            if (index < slides.length - 1) {
                index += 1;
            }
        }

        transformSliderX(slider_wrapper, index);

        if (e.which == 1) {
            posXUp = e.pageX;
            var dragging = posXUp - posXDown;

            var _anchors = slider_wrapper.getElementsByTagName("a");

            for (let i = 0; i < _anchors.length; i++) {
                _anchors[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dragging > -5 && dragging < 5) {
                        window.location.href = this.getAttribute("href");
                    }
                });
            }

            if (dragging > -5 && dragging < 5) {
                var w_videos = slider_wrapper.getElementsByClassName("w-video");
                if (w_videos.length > 0) {
                    for (var i = 0; i < w_videos.length; i++) {
                        if (isInsideAnchor(posXUp, w_videos[i])) {
                            pauseOtherVideos(w_videos, i);
                            initializeWowVideo(w_videos[i]);
                        }
                    }
                }
            }

            var featured_slider = slider_wrapper.closest(".featured-slider");

            if (dragging > -5 && dragging < 5) {
                if (featured_slider.classList.contains("product-gallery-slider")) {
                    var ft_slides = slider_wrapper.getElementsByClassName("slide");
                    if (ft_slides.length > 0) {
                        for (var i = 0; i < ft_slides.length; i++) {
                            if (isInsideAnchor(posXUp, ft_slides[i])) {
                                var img = ft_slides[i].querySelector("img");
                                var src = img.getAttribute("src");
                                initLightbox(src);
                            }
                        }
                    }
                }
            }


            /*----- PC Pop Boards Remove ------*/

            if (dragging > -50 && dragging < 50) {
                // Hidden With cookies
                var tempHiddenBtns = slider_wrapper.getElementsByClassName("hidden-pop-board");
                let lengthSlide = tempHiddenBtns.length;
                if (lengthSlide > 0) {
                    for (let i = 0; i < lengthSlide; i++) {
                        if (isInsideAnchor(posXUp, tempHiddenBtns[i])) {
                            for (var j = lengthSlide - 1; j >= 0; j--) {
                                var _slide = tempHiddenBtns[j].closest(".slide");
                                var boardNo = tempHiddenBtns[j].getAttribute("board-no");
                                handleOnHidePopup(boardNo);
                                removeSlide(_slide);
                            }
                        }
                    }
                }
                // Hidden With not cookies
                var tempNotCookiesHiddenBtns = slider_wrapper.getElementsByClassName("temporarily-hidden");
                var lengthNotCookies = tempNotCookiesHiddenBtns.length;
                if (lengthNotCookies > 0) {
                    for (let i = 0; i < lengthNotCookies; i++) {
                        if (isInsideAnchor(posXUp, tempNotCookiesHiddenBtns[i])) {
                            for (var j = lengthNotCookies - 1; j >= 0; j--) {
                                var _slide = tempNotCookiesHiddenBtns[j].closest(".slide");
                                removeSlide(_slide);
                            }
                        }
                    }
                }

            }

        }
    });
}

function touchSlider(id) {
    let _this = this;
    this.wrap = document.getElementById(id);
    this.slider = this.wrap.getElementsByClassName("slide");

    this.startX = 0;
    this.sLeft = 0;
    this.index = 0;
    this.curLeft = 0;
    this.disX = 0;

    this.posXDown = 0;
    this.posXUp = 0;

    this.wrap.addEventListener(
        "touchstart",
        function () {
            _this.fnStart();
        },
        false
    );
    this.wrap.parentElement.addEventListener(
        "touchmove",
        _this.fnMove.bind(this),
        false
    );
    this.wrap.parentElement.addEventListener(
        "touchend",
        _this.fnEnd.bind(this),
        false
    );
}

touchSlider.prototype.fnStart = function (e) {
    var _this = this;
    e = e || window.event;
    e.preventDefault();

    this.posXDown = e.changedTouches[0].pageX;

    this.startX = e.changedTouches[0].pageX;

    this.sLeft = this.wrap.style.transform
        ? -parseInt(/\d+/.exec(this.wrap.style.transform)[0])
        : 0;
    this.wrap.style.transition = "none";
};

touchSlider.prototype.fnMove = function (e) {
    e = e || window.event;
    this.disX = e.changedTouches[0].pageX - this.startX;
    this.curLeft = this.disX + this.sLeft;
    this.wrap.style.transform = "translateX(" + this.curLeft + "px)";
};

touchSlider.prototype.fnEnd = function (e) {
    if (this.disX > 100) {
        if (this.index != 0) {
            this.index -= 1;
        }
    }
    if (this.disX < -100) {
        if (this.index < this.slider.length - 1) {
            this.index += 1;
        }
    }

    transformSliderX(this.wrap, this.index);

    this.posXUp = e.changedTouches[0].pageX;
    var dragging = this.posXUp - this.posXDown;
    if (dragging > -5 && dragging < 5) {
        var anchors = this.wrap.getElementsByTagName("a");
        if (anchors.length > 0) {
            for (var i = 0; i < anchors.length; i++) {
                if (isInsideAnchor(this.posXUp, anchors[i])) {
                    window.location.href = anchors[i].getAttribute("href");
                }
            }
        }
    }

    if (dragging > -5 && dragging < 5) {
        var w_videos = this.wrap.getElementsByClassName("w-video");
        if (w_videos.length > 0) {
            for (var i = 0; i < w_videos.length; i++) {
                if (isInsideAnchor(this.posXUp, w_videos[i])) {
                    pauseOtherVideos(w_videos, i);
                    initializeWowVideo(w_videos[i]);
                }
            }
        }
    }

    if (dragging > -5 && dragging < 5) {
        var featured_slider = this.wrap.closest(".featured-slider");
        if (featured_slider.classList.contains("product-gallery-slider")) {
            var ft_slides = this.wrap.getElementsByClassName("slide");
            if (ft_slides.length > 0) {
                for (var i = 0; i < ft_slides.length; i++) {
                    if (isInsideAnchor(this.posXUp, ft_slides[i])) {
                        var img = ft_slides[i].querySelector("img");
                        var src = img.getAttribute("src");
                        initLightbox(src);
                    }
                }
            }
        }
    }



    /*----- Mobile Pop Boards Remove ------*/

    if (dragging > -50 && dragging < 50) {

        var tempHiddenBtns = this.wrap.getElementsByClassName("temporarily-hidden");
        let lengthSlide = tempHiddenBtns.length;
        if (lengthSlide > 0) {
            for (let i = 0; i < lengthSlide; i++) {
                if (isInsideAnchor(this.posXUp, tempHiddenBtns[i])) {
                    for (let j = lengthSlide - 1; j >= 0; j--) {
                        var _slide = tempHiddenBtns[j].closest(".slide");
                        removeSlide(_slide);
                    }
                }
            }
        }

        var tempCookiesHiddenBtns = this.wrap.getElementsByClassName("hidden-pop-board");
        let lengthSlideCookies = tempCookiesHiddenBtns.length;
        if (lengthSlideCookies > 0) {
            for (let i = 0; i < lengthSlideCookies; i++) {
                if (isInsideAnchor(this.posXUp, tempCookiesHiddenBtns[i])) {
                    for (let j = lengthSlideCookies - 1; j >= 0; j--) {
                        var _slide = tempCookiesHiddenBtns[j].closest(".slide");
                        var boardNo = tempCookiesHiddenBtns[j].getAttribute("board-no");
                        handleOnHidePopup(boardNo);
                        removeSlide(_slide);
                    }
                }
            }
        }

    }


    /*----- Mobile Pop Boards Remove ------*/

    if (dragging > -50 && dragging < 50) {
        var tempHiddenBtns = this.wrap.getElementsByClassName("hidden-pop-board");
        let lengthSlide = tempHiddenBtns.length;
        if (lengthSlide > 0) {
            for (var i = lengthSlide - 1; i >= 0; i--) {
                // if (isInsideAnchor(this.posXUp, tempHiddenBtns[i])) {
                var _slide = tempHiddenBtns[i].closest(".slide");
                var boardNo = tempHiddenBtns[i].getAttribute("board-no");
                handleOnHidePopup(boardNo);
                removeSlide(_slide);
                // }
            }
        }
    }
};

function removeSlide(slide) {
    var slider = slide.closest(".featured-slider");
    var slides = slider.getElementsByClassName("slide");
    var slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];    
    var slider_dots = slider.getElementsByClassName("slider-dots")[0];
    if (slider_dots) {
        var dots = slider_dots.getElementsByClassName('dot');
    }
    
    var current_index = getCurrentActiveSlide(slider);
    var next_active_index;
    if (slides.length == 1) {
        var popBoards = slide.closest("#pop-boards");
        popBoards.remove();
    } else {
        if (slider_dots) {
            dots[0].remove();
        }
        
        slide.remove();
        updateSlider(slider);
        //transformSliderX(slider_wrapper, 0);
        slider_wrapper.style.transition = "0.5s";
        slider_wrapper.style.transform = "translateX(0px)";
        if (slider_dots) {
            dots[0].classList.add("active");
        }        
        slides[0].classList.add("active");
        /*
        if (current_index == 0) {
          next_active_index = 0;
        }
        else {
          next_active_index = current_index - 1;
        }
    
        dots[getCurrentActiveSlide(slider)].remove();
        slide.remove();
    
    
        slides[next_active_index].classList.add("active");
        updateSlider(slider);
        transformSliderX(slider_wrapper, next_active_index);
        console.log(next_active_index);
    
        for (var i = 0; i < dots.length; i++) {
          dots[i].setAttribute("data-index-dot", i);
          dots[i].classList.remove("active");
        }
        dots[next_active_index].classList.add("active");
        */
    }
}

function transformSliderX(slider_wrapper, index) {
    var slider = slider_wrapper.closest(".featured-slider");

    var slides = slider.getElementsByClassName("slide");
    var dots = slider.getElementsByClassName("dot");
    var current_number = slider.querySelector(".current-number");

    if (slides.length > 1) {
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        if (slides[index] && slides[index].classList) {
            slides[index].classList.add("active");
        }
    }

    if (dots.length > 1) {
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        if (slides[index] && slides[index].classList) {
            dots[index].classList.add("active");
        }
    }

    if (slides.length > 1) {
        processTransformSlider(slider_wrapper, index);
    } else if (slider.classList.contains("pop-boards-slider")) {
        processTransformSlider(slider_wrapper, index);
    }

    if (current_number) {
        current_number.innerHTML = "0" + (index + 1);
    }
}

function processTransformSlider(slider_wrapper, index) {
    var slider_ref = slider_wrapper.closest(".slider-ref");
    var slider = slider_wrapper.closest(".featured-slider");

    var slides = slider.getElementsByClassName("slide");

    var _width = 0;

    if (slider_ref) {
        _width = slider_ref.clientWidth;
    } else {
        _width = window.innerWidth;
    }

    var total_width = 0;
    for (var i = 0; i < slides.length; i++) {
        total_width = total_width + getWidth(slides[i]);
    }

    if (total_width < _width) {
        total_width = _width;
    }



    var max_transform = total_width - _width;

    var transform_value = 0;
    if (slides.length > 1) {
        if (index != 0) {
            for (var i = 0; i < index; i++) {
                transform_value = transform_value + getWidth(slides[i]);
            }
            transform_value = transform_value - getDifferentSpace(slider, index);

            if (transform_value > max_transform) {
                transform_value = max_transform;
            }

            transform_value = transform_value * -1;
        }
    }
    slider_wrapper.style.transition = "0.5s";
    slider_wrapper.style.transform = "translateX(" + transform_value + "px)";
}

function getDifferentSpace(slider, index) {
    var slides = slider.getElementsByClassName("slide");
    var _width = window.innerWidth;
    var diff = 0;

    if (index != 0 && index != slides.length - 1) {
        if (slider.getAttribute("data-mode") == "center") {
            if (_width >= 992) {
                diff = (_width - getWidth(slides[index])) / 2;
            }
        }
    }
    return diff;
}

function createSlider(slider) {
    //var slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
    //var slides = slider_wrapper.children;

    if (slider.classList.contains("pop-boards-slider")) {
        setTimeout(function () {
            let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
            let slides = slider_wrapper.children;
            if (slides.length > 0) {
                if (slider.getAttribute("data-mode") == "center") {
                    if (slides.length > 1) {
                        slides[1].classList.add("active");
                    }
                } else {
                    slides[0].classList.add("active");
                }

                if (slider.getAttribute("data-dot") == "on") {
                    createSliderDots(slider);
                }

                if (slider.getAttribute("data-nav") == "on") {
                    createSliderNav(slider);
                }

                if (slider.getAttribute("data-autoplay") == "on") {
                    autoPlaySliderNav(slider);
                }

                for (var i = 0; i < slides.lenth; i++) {
                    slides[i].style.pointer = "none";
                }
            }
        }, 1500);
    } else {
        let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
        let slides = slider_wrapper.children;

        if (slides.length > 0) {
            if (slider.getAttribute("data-mode") == "center") {
                if (slides.length > 1) {
                    slides[1].classList.add("active");
                }
            } else {
                slides[0].classList.add("active");
            }

            if (slider.getAttribute("data-dot") == "on") {
                createSliderDots(slider);
            }

            if (slider.getAttribute("data-nav") == "on") {
                createSliderNav(slider);
            }

            if (slider.getAttribute("data-number") == "on") {
                createSliderNumber(slider);
            }

            if (slider.getAttribute("data-autoplay") == "on") {
                autoPlaySliderNav(slider);
            }

            for (var i = 0; i < slides.lenth; i++) {
                slides[i].style.pointer = "none";
            }
        }
    }
}

function updateSlider(slider) {
    if (slider.classList.contains("pop-boards-slider")) {
        setTimeout(function () {
            let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
            let slider_ref = slider_wrapper.closest(".slider-ref");
            let _width = 0;

            if (slider_ref) {
                _width = slider_ref.clientWidth;
            } else {
                _width = window.innerWidth;
            }

            let slides = slider.getElementsByClassName("slide");
            let num_display = getSliderDisplayNum(slider);
            let current_active = getCurrentActiveSlide(slider);

            for (var i = 0; i < slides.length; i++) {
                slides[i].style.width = _width / num_display + "px";
            }

            /*----- Update Slider Wrapper Size -----*/

            var total_width = 0;
            for (var i = 0; i < slides.length; i++) {
                total_width = total_width + getWidth(slides[i]);
            }

            if (total_width < _width) {
                total_width = _width;
            }

            slider_wrapper.style.width = total_width + "px";
        }, 1500);
    } else {
        let slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
        let slider_ref = slider_wrapper.closest(".slider-ref");
        let _width = 0;

        if (slider_ref) {
            _width = slider_ref.clientWidth;
        } else {
            _width = window.innerWidth;
        }

        let slides = slider.getElementsByClassName("slide");
        let num_display = getSliderDisplayNum(slider);

        /*----- Update Slide Size -----*/
        if (slider.getAttribute("data-mode") == "center") {
            if (_width >= 992) {
                if (slides.length == 1) {
                    slides[0].style.width = _width * +"px";
                } else {
                    for (var i = 0; i < slides.length; i++) {
                        if (num_display == 1) {
                            if (slides[i].clientWidth >= _width * 0.6) {
                                slides[i].style.width = _width * 0.6 + "px";
                            }
                        } else {
                            if (slides[i].clientWidth >= _width * (0.7 / num_display)) {
                                slides[i].style.width = _width * (0.7 / num_display) + "px";
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < slides.length; i++) {
                    slides[i].style.width = _width + "px";
                }
            }
        } else {
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.width = _width / num_display + "px";
            }
        }

        /*----- Update Slider Wrapper Size -----*/

        var total_width = 0;
        for (var i = 0; i < slides.length; i++) {
            total_width = total_width + getWidth(slides[i]);
        }

        if (total_width < _width) {
            total_width = _width;
        }
        slider_wrapper.style.width = total_width + "px";
    }
}

function autoPlaySliderNav(slider) {
    var slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
    var slides = slider.getElementsByClassName("slide");
    var start_index = getCurrentActiveSlide(slider);
    var direction = "ltr";
    var new_index;

    var interval = parseInt(slider.getAttribute("data-interval"));

    if (start_index == slides.length - 1) {
        direction = "rtl";
    }

    setInterval(function () {
        if (direction == "ltr") {
            new_index = getCurrentActiveSlide(slider) + 1;
            if (new_index < slides.length) {
                transformSliderX(slider_wrapper, new_index);
            } else {
                direction = "rtl";
            }
        }
        if (direction == "rtl") {
            new_index = getCurrentActiveSlide(slider) - 1;
            if (new_index >= 0) {
                transformSliderX(slider_wrapper, new_index);
            } else {
                direction = "ltr";
            }
        }
    }, interval);
}

function createSliderNumber(slider) {
    var slides = slider.getElementsByClassName("slide");

    if (slides.length > 1) {
        var html = "";

        html += '<div class="slider-number">';
        html += '	<div class="number-wrapper">';
        html += '	<span class="current-number">01</span>';
        html += '	<span class="total-number">0' + slides.length + "</span>";
        html += "	</div>";
        html += "</div>";

        $(slider).append(html);
    } else {
    }
}

function createSliderNav(slider) {
    var slider_wrapper = slider.getElementsByClassName("slider-wrapper")[0];
    var slides = slider.getElementsByClassName("slide");

    if (slides.length > 1) {
        var prev = document.createElement("div");
        prev.innerHTML =
            '<svg viewBox="0 0 40 40" ><path d="M11.8812 18.6618C11.1788 19.3716 11.1751 20.6246 11.8812 21.3382L24.8023 34.4466C25.5346 35.1845 26.7201 35.1845 27.4505 34.4466C28.1828 33.7086 28.1828 32.51 27.4505 31.7721L15.848 19.9991L27.4505 8.22793C28.1828 7.49001 28.1828 6.29136 27.4505 5.55344C26.7182 4.81552 25.5327 4.81552 24.8023 5.55344L11.8812 18.6618Z"/></svg>';
        prev.setAttribute("class", "nav prev");

        var next = document.createElement("div");
        next.innerHTML =
            '<svg viewBox="0 0 40 40" ><path d="M28.1186 21.3382C28.8209 20.6284 28.8247 19.3754 28.1186 18.6618L15.1975 5.55344C14.4652 4.81552 13.2797 4.81552 12.5492 5.55344C11.8169 6.29136 11.8169 7.49001 12.5492 8.22793L24.1518 20.0009L12.5492 31.7721C11.8169 32.51 11.8169 33.7086 12.5492 34.4466C13.2815 35.1845 14.4671 35.1845 15.1975 34.4466L28.1186 21.3382Z"/></svg>';
        next.setAttribute("class", "nav next");

        slider.appendChild(prev);
        slider.appendChild(next);

        prev.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var current_index = getCurrentActiveSlide(slider);

            var new_index = current_index - 1;

            if (new_index >= 0) {
                transformSliderX(slider_wrapper, new_index);
            }
        });

        next.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var current_index = getCurrentActiveSlide(slider);

            var current_index = getCurrentActiveSlide(slider);
            var new_index = current_index + 1;

            if (slider.getAttribute("data-mode") == "center") {
                if (new_index < slides.length) {
                    transformSliderX(slider_wrapper, new_index);
                }
            } else {
                var num_display = getSliderDisplayNum(slider);
                var max_index = slides.length - num_display;
                if (new_index <= max_index) {
                    transformSliderX(slider_wrapper, new_index);
                }
            }
        });
    }
}

function getSliderDisplayNum(slider) {
    var data_display = slider.getAttribute("data-display").split(",");
    var _width = window.innerWidth;

    if (_width >= 992) {
        num_display = parseInt(data_display[0]);
    }
    if (_width >= 768 && _width <= 991) {
        num_display = parseInt(data_display[1]);
    }
    if (_width >= 576 && _width <= 767) {
        num_display = parseInt(data_display[2]);
    }
    if (_width <= 575) {
        num_display = parseInt(data_display[3]);
    }
    return num_display;
}




function createSliderDots(slider) {

    var slides = slider.getElementsByClassName("slide");

    var display_num = getSliderDisplayNum(slider);
    var necessary = true;

    if (slides.length <= display_num) {
        necessary = false;
    }



    if (necessary == true) {
        var slider_dots = document.createElement("div");
        slider_dots.setAttribute("class", "slider-dots");
        slider.appendChild(slider_dots);

        var dots_wrapper = document.createElement("div");
        dots_wrapper.setAttribute("class", "dots-wrapper");
        slider_dots.appendChild(dots_wrapper);

        if (slides.length > 1) {
            for (var i = 0; i < slides.length; i++) {
                var dot = document.createElement("div");
                dot.setAttribute("data-dot-index", i);
                dot.classList.add("dot");

                var _span = document.createElement("span");
                dot.appendChild(_span);

                slider_dots.appendChild(dot);
                dot.addEventListener("click", function (e) {
                    if (this.classList.contains("active") == false) {
                        var slider = this.closest(".featured-slider");
                        var slider_wrapper =
                            slider.getElementsByClassName("slider-wrapper")[0];
                        transformSliderX(
                            slider_wrapper,
                            parseInt(this.getAttribute("data-dot-index"))
                        );
                    }
                });
            }
        }
    }
}

function getCurrentActiveSlide(slider) {
    var current = 0;
    var slides = slider.getElementsByClassName("slide");
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active")) {
            current = i;
        }
    }

    return current;
}

function getWidth(el) {
    var str_width = el.style.width;
    if (str_width) {
        str_width = str_width.split("px")[0];
        return parseInt(str_width);
    } else {
        return el.clientWidth;
    }
}

function getTransform(el) {
    var str = el.style.transform;
    if (str) {
        var numb = str.match(/\d/g);
        numb = numb.join("");
        return parseInt(numb);
    } else {
        return 0;
    }
}

function isInsideAnchor(pos, el) {
    if (el) {
        var rect = el.getBoundingClientRect();
        // && pos > rect.top && pos < rect.bottom
        if (pos > rect.left && pos < rect.right) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

function pauseOtherVideos(w_videos, index) {
    for (var i = 0; i < w_videos.length; i++) {
        if (index != i) {
            var video = w_videos[i].querySelector("video");
            if (video.paused == false) {
                video.pause();
            }
        }
    }
}

function hiddenAllBoardNoPopup(className) {
    let tempHiddenBtns = className;
    let lengthSlide = tempHiddenBtns.length;
    if (lengthSlide > 0) {
        for (var j = lengthSlide - 1; j >= 0; j--) {
            var _slide = tempHiddenBtns[j].closest(".slide");
            removeSlide(_slide);
        }
    }
}




