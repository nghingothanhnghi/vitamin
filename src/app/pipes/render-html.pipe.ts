
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: "renderHtml" })
export class RenderHtml implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}