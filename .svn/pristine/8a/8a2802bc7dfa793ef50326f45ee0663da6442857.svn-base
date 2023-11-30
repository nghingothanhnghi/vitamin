import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { getFindPayHeader, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

declare const getYnPayHeader: any;

@Component({
  selector: 'order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {

  @Input()
  cartItems: OrdPdtModel[] = [];

  smPayHeader$ = new Observable<SmPayHeaderModel>();
  smWownetPg$ = new Observable<SmWownetPgModel>();

  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;

  constructor(
    private _smWownetStateStore: Store<SmWownetState>
    ) { 
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.smWowWord$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
         this.smWowWord = res;
      }
    });
    
    this.smWownetPg$.subscribe(res => this.isPoint = res.settMPoint === "Y");
  }
}
