


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytp_play_btns;
var players = [];
var lengthDataVideo = 0;

function getYoutubeVideoId(src) {
	var r;
	var rx =
		/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	r = src.match(rx);
	return r[1];
}

function addEventListenerYoutubePlay(selector) {
	if (isNullOrEmpty(selector)) return;

	ytp_play_btns = document.querySelectorAll(selector);

	for (var i=0; i<ytp_play_btns.length; i++) {	

		var flip = true,
		pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
		play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";

		ytp_play_btns[i].addEventListener("click", function () {

		lengthDataVideo = lengthDataVideo + 1;


		flip = !flip;
		$animation = $(this.querySelector("#animation"));
		$animation.attr({
			"from": flip ? pause : play,
			"to": flip ? play : pause
		}).get(0).beginElement();

		this.classList.add("closed");

		var video_id = this.getAttribute("id-video");

		var indexVideo = this.getAttribute("index-video");
		let playerVideo = 'ytplayer' + indexVideo;

		var w_youtube_video = this.closest('.w-youtube-video');

		var html_video_wrapper = '';

		html_video_wrapper += '	<div class="video-wrapper">';

		html_video_wrapper += '		<iframe id="'+ playerVideo + '" src="https://www.youtube.com/embed/' + video_id;
		html_video_wrapper += '?rel=0&wmode=Opaque&enablejsapi=1" allow="autoplay" allowfullscreen frameborder="0">';
		html_video_wrapper += '		</iframe>';

		html_video_wrapper += '	</div>';

		$(w_youtube_video).append(html_video_wrapper);
		
		onYouTubePlayer(video_id, playerVideo);

		});
	}
}

function onYouTubePlayer(video_id, playerVideo) {
	
	if (!video_id) {
		video_id = 'AGcTCvn-a6g';
	}

	setTimeout(function() {
		player = new YT.Player(playerVideo, {
			playerVars: {
				'autoplay': 1, 
				'controls': 0,
				'autohide': 1,
				'loop': 1,
				'wmode':'opaque' 
			},
			videoId: video_id,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange,
			}
		});
		players.push(player);
	}, 1000);	
}

function onPlayerReady(event) {
	event.target.playVideo();
}

function onPlayerStateChange(event) {

	if (event.data == YT.PlayerState.PLAYING) {
		stopVideo(event.target.id);
    }

	var state = event.target.getPlayerState();
	if (state == "0") {
		// var iframe = event.target.g;
		
		var iframe = getTargetVideo(event.target);
		if(null != iframe && "" != iframe && undefined != iframe) {
			var w_youtube_video = iframe.closest(".w-youtube-video");	

			var video_wrapper = w_youtube_video.querySelector(".video-wrapper");
			if (video_wrapper) {
				video_wrapper.remove();
			}	
	
			var ytp_play_btn = w_youtube_video.querySelector(".ytp-play-button");
			if (ytp_play_btn) {
				ytp_play_btn.classList.remove("closed");	
			}
		}
	}
}

function getTargetVideo(targetEvent) {
	if(null != targetEvent && "" != targetEvent && undefined != targetEvent) {
		
		const arrayLetter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		let itemVideo = "";
		
		for(let i = 0; i<arrayLetter.length;i++) {
			let itemLetter = arrayLetter[i];
			itemVideo = targetEvent[itemLetter];

			if(typeof itemVideo == 'object') {
				return itemVideo;
			}
		}
	}
	return ""
}

function stopVideo(player_id) {
	if(null != player_id && "" != player_id && undefined != player_id) {
		for(let i = 0; i < lengthDataVideo; i++) {
			if((i+1) != +player_id) {
				if(null != players[i] && "" != players[i] && undefined != players[i]) {
					players[i].stopVideo();
				}
			}

		}
	}
}