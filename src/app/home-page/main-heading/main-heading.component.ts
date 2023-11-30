import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getPageHeadingChild, getPageHeadingData, PageHeadingState } from '@app/selectors/page-heading.selector';
import { MyProgram } from '@app/models/system/my-program.model';

@Component({
  selector: 'hp-main-heading',
  templateUrl: './main-heading.component.html',
  styleUrls: ['./main-heading.component.css']
})
export class MainHeadingComponent implements OnInit {

  parent$ = new Observable<MyProgram>();
  child$ = new Observable<MyProgram>();

  parent: MyProgram = {} as MyProgram;
  child: MyProgram = {} as MyProgram;

  constructor(private _pageHeadingStore: Store<PageHeadingState>) {
    this.parent$ = this._pageHeadingStore.select(getPageHeadingData);
    this.child$ = this._pageHeadingStore.select(getPageHeadingChild);
  }

  ngOnInit(): void {
    this.parent$.subscribe(res => this.parent = res);
    this.child$.subscribe(res => this.child = res);
  }
}
