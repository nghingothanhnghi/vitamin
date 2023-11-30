import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: "[draggableWrapper]"
})
export class DraggableWrapperDirective {
  

  constructor(private elementRef: ElementRef) { 
    const draggableWrapper = this.elementRef.nativeElement;

    if (draggableWrapper) {
      let isDown = false;
      let startX: any;
      let scrollLeft: any;

      let start_movement = 0;
      let end_movement = 0;

      draggableWrapper.addEventListener('mousedown', (e: any) => {
        e.stopPropagation();
        isDown = true;
        draggableWrapper.classList.add('active');
        startX = e.pageX - draggableWrapper.offsetLeft;
        scrollLeft = draggableWrapper.scrollLeft;
    
        start_movement = e.pageX;
      });

      draggableWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        draggableWrapper.classList.remove('active');
      });

      draggableWrapper.addEventListener('mouseup', (e: any) => {
        isDown = false;
        draggableWrapper.classList.remove('active');
        end_movement = e.pageX;
      });

      draggableWrapper.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - draggableWrapper.offsetLeft;
        const walk = (x - startX) * 1;
        draggableWrapper.scrollLeft = scrollLeft - walk;
      });
    }
  }
}