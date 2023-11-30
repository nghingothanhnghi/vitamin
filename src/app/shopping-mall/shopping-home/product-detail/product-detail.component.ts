import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { PdtDetailState } from '@app/selectors/shoppingmall/pdt-detail.selector';
import { ConvertUtil } from '@app/common/util/convert.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { loadPdtImages, loadPdtInfo, loadPdtNotify } from '@app/actions/shoppingmall/pdt-detail.action';
import { ProductState } from '@app/selectors/shoppingmall/product.selector';
import { setKeySearch, setPdtCate } from '@app/actions/shoppingmall/product.action';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  smWownet$ = new Observable<SmWownetModel>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _pdtDetailStore: Store<PdtDetailState>,
    private _productStore: Store<ProductState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _deviceService: DeviceDetectorService
  ) { 
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }

  ngOnInit(): void {
    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        if(!AuthUtil.isLogined() && res.lshowPdtYn !== "Y"){
          this._router.navigate(["/login"]);
        }
      }
    });

    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let pdtCd = ConvertUtil.convertToSring(params.get("pdtCd"));
      let pathKind = this._deviceService.isDesktop() ? 'PC' : 'PHONE';

      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
      this._pdtDetailStore.dispatch(loadPdtInfo({ pdtCd }));
      this._pdtDetailStore.dispatch(loadPdtImages({ pdtCd, pathKind }));
      this._pdtDetailStore.dispatch(loadPdtNotify({ pdtCd }));
      setTimeout(() => {
        this._productStore.dispatch(setKeySearch({ key: "" }));
      }, 100);
    }); 
  }

  ngOnDestroy(): void {
    this._productStore.dispatch(setPdtCate({ cate: "" }));
  }
}
