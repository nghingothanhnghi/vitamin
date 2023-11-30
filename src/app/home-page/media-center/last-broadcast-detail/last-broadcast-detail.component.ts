import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'last-broadcast-detail',
  templateUrl: './last-broadcast-detail.component.html',
  styleUrls: ['./last-broadcast-detail.component.css',
      './../../../../assets/css/home/media-center.css' 
]
})
export class LastBroadcastDetailComponent implements OnInit {

  @ViewChild('videoBroadcast') videoplayer!: ElementRef;
  
  showThum:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  onPlay(){
    this.showThum = false;
    this.videoplayer?.nativeElement.play();
  }
}
