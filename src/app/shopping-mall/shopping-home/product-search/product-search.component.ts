import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { getProducts, getTotalProduct, ProductState } from '@app/selectors/shoppingmall/product.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import { loadProducts, loadTotalProduct, setKeySearch } from '@app/actions/shoppingmall/product.action';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  smWownet$ = new Observable<SmWownetModel>();

  products$ = new Observable<OrdPdtModel[]>();
  products: OrdPdtModel[] = [];

  total$ = new Observable<number>();
  total: number = 0;

  lenOptions: SelectDropdownModel[] = [
    { label: "12", value: "12" },
    { label: "24", value: "24" },
    { label: "48", value: "48" },
    { label: "100", value: "100" },
  ];
  lenSelected = this.lenOptions[0];

  page: number = 1;
  len: number = 12;
  urlWownet: string = "";
  key: string = "";

  pathKind: string = "PC";

  config: PaginationInstance = {
    id: "product-search",
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.total,
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _productStore: Store<ProductState>,
    private _smWownetStore: Store<SmWownetState>,
    private _deviceService: DeviceDetectorService
  ) {
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
    this.total$ = this._productStore.select(getTotalProduct);
    this.products$ = this._productStore.select(getProducts);
  }

  ngOnInit(): void {
    this.pathKind = this._deviceService.isDesktop()? 'PC' : 'PHONE';

    this._activatedRoute.queryParamMap.subscribe(params => {
      let key = ConvertUtil.convertToSring(params.get("key"));
      if (ValidationUtil.isNotNullAndNotEmpty(key)) {
        this.key = key;
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
        this.loadProducts();
        this.loadTotalProduct();
        setTimeout(() => {
          this._productStore.dispatch(setKeySearch({ key: this.key }));
        }, 100);
      } else {
        this._router.navigate([MyProgramConstant.urlShopping]);
      }
    });

    this.smWownet$.subscribe(res => this.urlWownet = ConvertUtil.convertToSring(res.urlWownet));

    this.total$.subscribe(res => {
      this.total = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.products$.subscribe(res => {
      this.products = res;
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
  }

  handleOnChangeLenSelected(selected: SelectDropdownModel): void {
    this.lenSelected;
    this.page = 1;
    this.len = +selected.value;
    this.config.currentPage = 1;
    this.config.itemsPerPage = this.len;

    this.loadTotalProduct();
    this.loadProducts();
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.config.currentPage = page;
    
    this.loadProducts();
  }

  loadTotalProduct(): void {
    const params = this.getParams();

    if (params.page < 0) return;
    
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._productStore.dispatch(loadTotalProduct({ params: params }));
  }

  loadProducts(): void {
    const params = this.getParams();

    if (params.page < 0) return;

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this._productStore.dispatch(loadProducts({ params: params }));
  }

  getParams(): any {
    const params = {
      comId: environment.comId,
      cateCd: "",
      pathKind: this.pathKind,
      key: this.key,
      page: this.page - 1,
      len: this.len,
    }

    return params;
  }
}
