import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { PdtDetailModel } from '@app/models/shoppingmall/pdt-detail.model';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getPdtImages, getPdtNotify, PdtDetailState } from '@app/selectors/shoppingmall/pdt-detail.selector';
import { ConvertUtil } from '@app/common/util/convert.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ImageKindConstant } from '@app/common/constant/image-kind.constant';
import { ValidationUtil } from '@app/common/util/validation.util';

declare const addEventListenerClickTabContent: any;

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {

  smWownet$ = new Observable<SmWownetModel>();
  urlWownet: string = "";

  pdtImages$ = new Observable<PdtDetailModel[]>();
  pdtImages: PdtDetailModel[] = [];

  pdtNotify$ = new Observable<PdtDetailModel[]>();
  pdtNotify: PdtDetailModel[] = [];

  constructor(
    private _smWownetStore: Store<SmWownetState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _pdtDetailStore: Store<PdtDetailState>
  ) { 
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.pdtImages$ = this._pdtDetailStore.select(getPdtImages);
    this.pdtNotify$ = this._pdtDetailStore.select(getPdtNotify);
  }

  ngOnInit(): void {
    this.smWownet$.subscribe(res => this.urlWownet = ConvertUtil.convertToSring(res.urlWownet));

    this.pdtImages$.subscribe(res => {
      this.pdtImages = res.filter(x => x.imageKind !== ImageKindConstant.large && ValidationUtil.isNotNullAndNotEmpty(x.fileName));
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.pdtNotify$.subscribe(res => {
      this.pdtNotify = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    if (typeof addEventListenerClickTabContent === "function") {
      addEventListenerClickTabContent();
    }
  }
}
