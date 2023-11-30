import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MyProgram } from '@app/models/system/my-program.model';
import { getPageHeadingChild, getPageHeadingChildren, getPageHeadingData, getPathname, PageHeadingState } from '@app/selectors/page-heading.selector';
import { Node } from '@app/models/components/node.model';

@Component({
  selector: 'hp-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})
export class PageHeadingComponent implements OnInit {

  parent$ = new Observable<MyProgram>();
  child$ = new Observable<MyProgram>();
  children$ = new Observable<Node<MyProgram>[]>();
  pathname$ = new Observable<string>();

  pathname: string = "";
  parent: MyProgram = {} as MyProgram;
  child: MyProgram = {} as MyProgram;
  children: Node<MyProgram>[] = [] as Node<MyProgram>[];

  tempActiveId: string = "";

  constructor(private _pageHeadingStore: Store<PageHeadingState>) {
    this.parent$ = this._pageHeadingStore.select(getPageHeadingData);
    this.child$ = this._pageHeadingStore.select(getPageHeadingChild);
    this.children$ = this._pageHeadingStore.select(getPageHeadingChildren);
    this.pathname$ = this._pageHeadingStore.select(getPathname);
  }

  ngOnInit(): void { 
    this.parent$.subscribe(res => {
      this.parent = res;
    });

    this.child$.subscribe(res => {
      this.pathname = window.location.pathname;

      this.child = res;
      this.tempActiveId = this.child.prgId;
    });

    this.children$.subscribe(res => {
      this.children = res;
    })

    this.pathname$.subscribe(res => this.pathname = res);
  }
}
