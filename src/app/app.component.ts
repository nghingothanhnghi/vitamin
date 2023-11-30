import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { PageHeadingState, showPageHeading } from './selectors/page-heading.selector';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtils } from './common/util/common.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VITAMINPAY';

  showPageHeading$ = new Observable<boolean>();

  constructor(
    private _pageHeadingStore: Store<PageHeadingState>,
    private _translate: TranslateService,
    ) { 
    this.showPageHeading$ = this._pageHeadingStore.select(showPageHeading);
  }

  ngOnInit(): void {
    let messages = CommonUtils.getMessages();
    this._translate.use(messages);
  }
}
