import { Component, OnInit } from '@angular/core';
import { PageHeadingConstants } from '@app/common/constant/page-heading.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { getTypePageHeading, PageHeadingState, showPageHeading } from '@app/selectors/page-heading.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  showPageHeading$ = new Observable<boolean>();
  pageHeadingType$ = new Observable<string>();

  typeHP = PageHeadingConstants.typeHP;
  typeSP = PageHeadingConstants.typeSP;
  typeOP = PageHeadingConstants.typeOP;
  
  isLogined: boolean = AuthUtil.isLogined();

  constructor(private _pageHeadingStore: Store<PageHeadingState>) { 
    this.showPageHeading$ = this._pageHeadingStore.select(showPageHeading);
    this.pageHeadingType$ = this._pageHeadingStore.select(getTypePageHeading);
  }

  ngOnInit(): void { }
}
