import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: "[hideAdvancedFilter]"
})
export class HideAdvancedFilterDirective {
  constructor() { }

  @HostListener("click")
  onClickShowAdvancedSearch(): void {
    const showAdvancedContents = document.getElementsByClassName("advanced-search-items");
    for (let i = 0; i < showAdvancedContents.length; i++) {
      showAdvancedContents[i].setAttribute("style", "display: none;");
    }

    const showAdvancedButtons = document.getElementsByClassName("simple-search-items");
    for (let i = 0; i < showAdvancedButtons.length; i++) {
      showAdvancedButtons[i].setAttribute("style", "display: block;");
    }
  }
}