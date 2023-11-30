import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const addReWriteSpan: any;

@Component({
  selector: 'app-producttion-facility',
  templateUrl: './producttion-facility.component.html',
  styleUrls: ['./producttion-facility.component.css']
})
export class ProducttionFacilityComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer!: ElementRef;

  showThum: boolean = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      addReWriteSpan();
    }, 200);
  }
  onPlay() {
    this.showThum = false;
    this.videoplayer?.nativeElement.play();
  }
}
