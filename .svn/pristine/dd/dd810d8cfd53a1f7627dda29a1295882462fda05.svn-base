import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { countADOProducts, loadADOProducts } from '@app/actions/myoffice/auto-ship/ado-register.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { ADORegisterState, getADOProducts, getTotalADOProducts } from '@app/selectors/myoffice/auto-ship/ado-register.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'ado-products-popup',
  templateUrl: './ado-products-popup.component.html',
  styleUrls: ['./ado-products-popup.component.css']
})
export class AdoProductsPopupComponent implements OnInit, OnChanges {

  @Input()
  show: boolean = false;

  @Input()
  isPv1: boolean = false;

  @Input()
  isPv2: boolean = false;

  @Input()
  isPv3: boolean = false;

  @Input()
  isRetailAmt: boolean = false;

  @Input()
  isAmt: boolean = false;

  @Input()
  isOrd: boolean = false;

  @Input()
  isPoint: boolean = false;

  @Input()
  smWownet: SmWownetModel = {} as SmWownetModel;

  @Input()
  smWowWord: WownetWordModel = {} as WownetWordModel;

  @Output()
  closePopup = new EventEmitter<boolean>();

  @Output()
  clickRow = new EventEmitter<ADORegisterModel>();

  products$ = new Observable<ADORegisterModel[]>();
  products: ADORegisterModel[] = [];

  total$ = new Observable<number>();
  total: number = 0;

  count = 0
  key: string = "";
  page: number = 0;
  len: number = 10;

  config: PaginationInstance = {
    id: 'ado-product-popup',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  rows: number[] = [];

  constructor(
    private _deviceService: DeviceDetectorService,
    private adoRegisterStore: Store<ADORegisterState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.products$ = this.adoRegisterStore.select(getADOProducts);
    this.total$ = this.adoRegisterStore.select(getTotalADOProducts);
  }

  ngOnInit(): void {
    this.products$.subscribe(res => {
      this.products = res;
      if (res.length < 5) {
        this.rows = new Array(5 - res.length);
      }
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.total$.subscribe(res => {
      this.total = res;
      this.config.totalItems = res;
      this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.key = "";
      this.page = 1;
      this.handleOnClickSearch();
    }
  }

  handleOnClickClosePopup(): void {
    this.closePopup.emit(false);
  }

  handleOnClickRow(item: ADORegisterModel) {
    this.clickRow.emit(item);
    this.handleOnClickClosePopup();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = this.page;

    let params = this.getParams();

    if (params.page < 0) return;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(loadADOProducts({ params: params }));
  }

  handleOnClickSearch(): void {
    this.page = 1;
    let params = this.getParams();

    if (params.page < 0) return;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(loadADOProducts({ params: params }));
    this.adoRegisterStore.dispatch(countADOProducts({ params: params }));
  }

  getParams(): any {
    const loginedInfo = AuthUtil.getLoginedInfo();

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      key: this.key,
      userKindCd: ConvertUtil.convertToSring(loginedInfo?.userKindCd),
      page: this.page - 1,
      len: this.len,
      pathKind: this._deviceService.isDesktop() ? 'PC' : 'PHONE'
    }
    return params;
  }
}
