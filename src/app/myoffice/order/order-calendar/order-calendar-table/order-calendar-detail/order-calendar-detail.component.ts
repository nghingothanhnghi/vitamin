import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getFindPayHeader, getSmWownetPg, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

declare const getYnPayHeader: any;

@Component({
  selector: 'order-calendar-detail',
  templateUrl: './order-calendar-detail.component.html',
  styleUrls: ['./order-calendar-detail.component.css']
})
export class OrderCalendarDetailComponent implements OnInit, OnChanges {

  @Input()
  items: any[] = [];

  completedCase: number = 0;

  smPayHeader$ = new Observable<SmPayHeaderModel>();
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  isPoint: boolean = false;

  constructor(private _smWownetStateStore: Store<SmWownetState>) { 
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
  }

  ngOnInit(): void {
    this.smWowWord$.subscribe(res => this.smWowWord = res);
    
    this.smPayHeader$.subscribe(res => {
      this.isPv1 = getYnPayHeader(res, "pv1");
      this.isPv2 = getYnPayHeader(res, "pv2");
      this.isPv3 = getYnPayHeader(res, "pv3");
    });

    this.smWownetPg$.subscribe(res => {
      this.isPoint = res.settMPoint === "Y";
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.completedCase = this.items.length;
  }
}
