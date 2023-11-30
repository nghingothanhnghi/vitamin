import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PageHeadingState } from '@app/selectors/page-heading.selector';
import { setTypePageHeading } from '@app/actions/page-heading.action';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _pageHeadingStore: Store<PageHeadingState>) { }
  
  ngOnInit(): void {
    setTimeout(() => this._pageHeadingStore.dispatch(setTypePageHeading({ payload: "OTHER" })), 50);
  }
}
