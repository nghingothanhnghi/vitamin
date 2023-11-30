import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getBanner, getBannerSuccess } from '@app/actions/homepage/banner.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { MyRollingBannerModel } from '@app/models/homepage/my-rolling-banner.module';
import { BannerSearchState, loadBannerSearchItems } from '@app/selectors/homepage/banner.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

declare const initProductImageSlider: any;

@Component({
  selector: 'hp-slider',
  templateUrl: './hp-slider.component.html',
  styleUrls: ['./hp-slider.component.css']
})
export class HpSliderComponent implements OnInit, OnDestroy { 
  @Input() urlWownet : String = "";

  loadBannerItems$ = new Observable<MyRollingBannerModel[]>;
  
  contentsBanner : MyRollingBannerModel[] = [];
  todate: Date = new Date();
  subBanner = {} as Subscription
  constructor(private _bannerStore: Store<BannerSearchState>) { 
    this.loadBannerItems$ = this._bannerStore.select(loadBannerSearchItems);
  }
  ngOnDestroy(): void {
    let hasValue = this.subBanner.closed != undefined
    if(this.subBanner && hasValue){
      this.subBanner.unsubscribe()
    }
    this._bannerStore.dispatch(getBannerSuccess({banner:[]}))
  }

  ngOnInit(): void {
    this.loadBanner();
  }

  loadBanner() : void {
    const y = this.todate.getFullYear();
    const m = this.todate.getMonth() + 1 < 10 ? '0' + (this.todate.getMonth() + 1) : this.todate.getMonth();
    const d = this.todate.getDate() < 10 ? '0' + this.todate.getDate() : this.todate.getDate();

    const dateNow = '' + y + m + d;

    let params = {
      kind : "SP",
      dateNow : dateNow
    }

    this._bannerStore.dispatch(getBanner({ params: params }));

    this.subBanner = this.loadBannerItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.contentsBanner = res;

        if(res.length > 0){
          setTimeout(() => {
            initProductImageSlider("#features-slider .featured-slider");
          }, 500);
        }
      }
    });
  }
}
