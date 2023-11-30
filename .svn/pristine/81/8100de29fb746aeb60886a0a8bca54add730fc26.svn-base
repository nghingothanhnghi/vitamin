import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Node } from '@app/models/components/node.model';
import { MyProgram } from '@app/models/system/my-program.model';
import { getPageHeadingChildren, getPageHeadingData, getPathname, PageHeadingState } from '@app/selectors/page-heading.selector';

@Component({
  selector: 'hp-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  parent$ = new Observable<MyProgram>();
  children$ = new Observable<Node<MyProgram>[]>();
  pathname$ = new Observable<string>();

  pathname: string = "";
  parent: MyProgram = {} as MyProgram;
  children: Node<MyProgram>[] = [] as Node<MyProgram>[];

  constructor(private _pageHeadingStore: Store<PageHeadingState>) {
    this.parent$ = this._pageHeadingStore.select(getPageHeadingData);
    this.children$ = this._pageHeadingStore.select(getPageHeadingChildren);
    this.pathname$ = this._pageHeadingStore.select(getPathname);
  }

  ngOnInit(): void {
    this.parent$.subscribe(res => {
      this.parent = res;
    });

    this.children$.subscribe(res => {
      this.children = res;
    })

    this.pathname$.subscribe(res => this.pathname = res);
  }
}
