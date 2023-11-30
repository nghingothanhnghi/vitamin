import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: "[showAdvancedFilter]"
})
export class ShowAdvancedFilterDirective {
  constructor() { }

  @HostListener("click")
  onClickShowAdvancedSearch(): void {
    const showAdvancedButtons = document.getElementsByClassName("simple-search-items");
    for (let i = 0; i < showAdvancedButtons.length; i++) {
      showAdvancedButtons[i].setAttribute("style", "display: none;");
    }

    const showAdvancedContents = document.getElementsByClassName("advanced-search-items");
    for (let i = 0; i < showAdvancedContents.length; i++) {
      showAdvancedContents[i].setAttribute("style", "display: block;");
    }
  }
}