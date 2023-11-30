import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: "[draggableWrapperBoxChart]"
})
export class DraggableWrapperBoxChartDirective {
  

  constructor(private elementRef: ElementRef) { 
    const draggableWrapperBoxChart = this.elementRef.nativeElement;

   
    if (draggableWrapperBoxChart) {
      let isDown = false;
      let startX: any;
      let scrollLeft: any;
      let count = 100;
      let startY: any;
      let scrollTop: any;

      draggableWrapperBoxChart.addEventListener('mousedown', (e: any) => {
        e.stopPropagation();
        isDown = true;
        startX = e.pageX - draggableWrapperBoxChart.offsetLeft;
        scrollLeft = draggableWrapperBoxChart.scrollLeft;
        
        startY = e.pageY - draggableWrapperBoxChart.offsetTop;
        scrollTop = draggableWrapperBoxChart.scrollTop;
      });

      draggableWrapperBoxChart.addEventListener('mouseleave', () => {
        isDown = false;
      });

      draggableWrapperBoxChart.addEventListener('mouseup', (e: any) => {
        isDown = false;
      });

      draggableWrapperBoxChart.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - draggableWrapperBoxChart.offsetLeft;
        const y = e.pageY - draggableWrapperBoxChart.offsetTop;
        const walkX = (x - startX) * 1;
        const walkY = (y - startY) * 1;
        draggableWrapperBoxChart.scrollLeft = scrollLeft - walkX;
        draggableWrapperBoxChart.scrollTop = scrollTop - walkY;
      });


      // draggableWrapperBoxChart.addEventListener('wheel', (e: any) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   if(e.deltaY<0){
      //     if (count < 200) {
      //       count = count + 10
      //     }
      //   }else{
      //     if (count > 30 ) {
      //       count = count - 10
      //     }
      //   }
      //   let ele = draggableWrapperBoxChart.children[0];
      //   ele.style.zoom = `${count}%`;
      // });

    }
  }
}