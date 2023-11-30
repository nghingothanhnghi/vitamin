import { Component, OnInit } from '@angular/core';


declare const addReWriteSpan: any;

@Component({
  selector: 'app-accumulet-sa',
  templateUrl: './accumulet-sa.component.html',
  styleUrls: ['./accumulet-sa.component.css']
})
export class AccumuletSaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      addReWriteSpan();
    }, 200);
  }

}
