import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';

declare const getYoutubeVideoId: any;

@Pipe({ name: "youtubeFrame" })
export class YoutubeFramePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: String, classes: string | null | undefined): SafeHtml {
    let html = "";

    if (ValidationUtil.isNullOrEmpty(value)) return this.sanitizer.bypassSecurityTrustHtml("");
    
    let videoId = getYoutubeVideoId(value);

    if (ValidationUtil.isNullOrEmpty(videoId)) return this.sanitizer.bypassSecurityTrustHtml("");
      
    html = '<iframe id="' + videoId + '" class="' + ConvertUtil.convertToSring(classes)
      + '" src="https://www.youtube.com/embed/' + videoId 
			+ '?rel=0&wmode=Opaque&enablejsapi=1" allow="autoplay" allowfullscreen frameborder="0"></iframe>';

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Pipe({ name: "playYoutubeFrame" })
export class PlayYoutubeFramePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: String, index: number | null | undefined): SafeHtml {
    let html = "";

    if (ValidationUtil.isNullOrEmpty(value)) return this.sanitizer.bypassSecurityTrustHtml("");
    
    if (ValidationUtil.isNullOrEmpty(index)) return this.sanitizer.bypassSecurityTrustHtml("");

    let videoId = getYoutubeVideoId(value);

    if (ValidationUtil.isNullOrEmpty(videoId)) return this.sanitizer.bypassSecurityTrustHtml("");
    
    html  = '<div class="ytp-play-button ytp-button" id-video="' + videoId +'" index-video="' + index + '">'
      html += '<svg width="100%" height="100%" viewBox="0 0 36 36" version="1.1">'
        html += '<defs>'
          html += '<path id="ytp-12" d="M 11 10 L 17 10 L 17 26 L 11 26 M 20 10 L 26 10 L 26 26 L 20 26">'
            html += '<animate id="animation" begin="indefinite" attributeType="XML" attributeName="d" fill="freeze"'
            html += 'from="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"'
            html += 'to="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"'
            html += 'dur="0.1s" keySplines=".4 0 1 1" repeatCount="1">'
            html += '</animate>'
          html += '</path>'
        html += '</defs>'
        html += '<use xlink:href="#ytp-12" class="ytp-svg-shadow"></use>'
        html += '<use xlink:href="#ytp-12" class="ytp-svg-fill"></use>'
      html += '</svg>'
    html += '</div>'

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}