import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetCommaPipe } from './set-comma.pipe';
import { SetTwoDigitPadPipe } from './two-digit-pad.pipe';
import { getPathSvgPipe } from './get-path-svg.pipe';
import { MobilePipe } from './mobile.pipe';
import { StringDatePipe } from './string-date.pipe';
import { RenderHtml } from './render-html.pipe';
import { ReplaceStr } from './replace-str.pipe'
import { PlayYoutubeFramePipe, YoutubeFramePipe } from './youtube-frame.pipe';
import { EncodePipe } from './encode.pipe';
import { PrgIdPipe } from './prg-id.pipe';

@NgModule({
  declarations: [
    SetCommaPipe,
    SetTwoDigitPadPipe,
    getPathSvgPipe,
    MobilePipe,
    StringDatePipe,
    RenderHtml,
    YoutubeFramePipe,
    PlayYoutubeFramePipe,
    EncodePipe,
    ReplaceStr,
    PrgIdPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SetCommaPipe,
    SetTwoDigitPadPipe,
    getPathSvgPipe,
    MobilePipe,
    StringDatePipe,
    RenderHtml,
    YoutubeFramePipe,
    PlayYoutubeFramePipe,
    EncodePipe,
    ReplaceStr,
    PrgIdPipe
  ]
})
export class PipeModule { }
