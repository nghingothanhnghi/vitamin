import { Component, OnInit } from '@angular/core';

declare const addReWriteSpan: any;
declare const expandContent: any;

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css',
              './../../../../assets/css/home/business/story-detail.css']
})
export class StoryDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      addReWriteSpan();
      expandContent();
    }, 200);
  }

}
