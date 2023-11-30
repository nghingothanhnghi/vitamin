import { Component, OnInit } from '@angular/core';
import './../../../../assets/js/home/business-info.js'

declare const addEventListenerClickBusinessInfo: any;
declare const addReWriteSpan: any;

@Component({
  selector: 'app-business-infor',
  templateUrl: './business-infor.component.html',
  styleUrls: ['./business-infor.component.css',
              './../../../../assets/css/home/business/business-info.css'],
  
})
export class BusinessInforComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      addReWriteSpan();
    }, 200);

    setTimeout(() => {
			if (typeof addEventListenerClickBusinessInfo === "function") {
				addEventListenerClickBusinessInfo();
			}
		}, 1000);
  } 
}
