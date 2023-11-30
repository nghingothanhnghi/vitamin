import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { PdtCateModel } from '@app/models/shoppingmall/pdt-cate.model';
import { getPdtCates, PdtCateState } from '@app/selectors/shoppingmall/pdt-cate.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { getKeySearch, getPdtCate, getTotalProduct, ProductState } from '@app/selectors/shoppingmall/product.selector';
import { setCateCd, setKeySearch, setPdtCate } from '@app/actions/shoppingmall/product.action';
import { Node } from '@app/models/components/node.model';
import { getProductNameMainHeading, PdtDetailState } from '@app/selectors/shoppingmall/pdt-detail.selector';
import { clearProductDetailState, setProductNameMainHeading } from '@app/actions/shoppingmall/pdt-detail.action';
import { MyProgram } from '@app/models/system/my-program.model';
import { getPageHeadingChildren, PageHeadingState } from '@app/selectors/page-heading.selector';
import { getItemS, itemState } from '@app/selectors/item.selector';
import { setItem, setParamItem } from '@app/actions/item.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';

declare const activeShoppingMallMobileMainMenu: any;
declare const modifyBackToCloseModal: any;
declare const addEventListenerForViewModeProduct: any;

@Component({
  selector: 'shopping-home',
  templateUrl: './shopping-home.component.html',
  styleUrls: ['./shopping-home.component.css']
})
export class ShoppingHomeComponent implements OnInit, OnDestroy {
  
  pdtCates$ = new Observable<PdtCateModel[]>();
  cates: PdtCateModel[] = [];

  pdtCates: Node<PdtCateModel>[] = [];
  treePdtCates: Map<String, Node<PdtCateModel>> = new Map();

  children$ = new Observable<Node<MyProgram>[]>();
  children: Node<MyProgram>[] = [] as Node<MyProgram>[];

  productNameMainHeading$ = new Observable<string>();
  productNameMainHeading: string = "";

  key$ = new Observable<string>();
  key: string = "";

  pdtCate$ = new Observable<string>();

  total$ = new Observable<number>();
  total: string = "0";

  parentMainHeading: string = "";
  childMainHeading: string = "";
  totalChildMainHeading: string = "";

  activeCateCd: string = "";
  activePCd: string = ""
  cate: string = "";

  showProductPopup: boolean = false;
  getItem$ = new Observable<any>();
  esc : boolean = false;
  backHistory : boolean = false;
  
  isLogined: boolean = AuthUtil.isLogined();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _pdtCateStore: Store<PdtCateState>,
    private _productStore: Store<ProductState>,
    private _pdtDetailStore: Store<PdtDetailState>,
    private _pageHeadingStore: Store<PageHeadingState>,
    private _itemState: Store<itemState>
  ) { 
    this.key$ = this._productStore.select(getKeySearch);
    this.total$ = this._productStore.select(getTotalProduct);
    this.productNameMainHeading$ = this._pdtDetailStore.select(getProductNameMainHeading);
    this.pdtCates$ = this._pdtCateStore.select(getPdtCates);
    this.children$ = this._pageHeadingStore.select(getPageHeadingChildren);
    this.getItem$ = this._itemState.select(getItemS);
    this.pdtCate$ = this._productStore.select(getPdtCate);
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(params => {
      this.cate = ConvertUtil.convertToSring(params.get("cate"));
      if (ValidationUtil.isNotNullAndNotEmpty(this.cate)) {
        this.initPdtCates(this.cates);
      }
    });

    this.pdtCate$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.cate = res;
        if (ValidationUtil.isNotNullAndNotEmpty(this.cates)) {
          this.initPdtCates(this.cates);
        }
      }
    });

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    this.children$.subscribe(res => this.children = res);
    
    this.total$.subscribe(res => this.total = ConvertUtil.setComma(res));

    this.productNameMainHeading$.subscribe(res => this.productNameMainHeading = res);

    this.key$.subscribe(res => this.key = res);
    
    this.pdtCates$.subscribe(res => {
      this.cates = res;
      this.initPdtCates(res);
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });
    
    this.getItem$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        if (ValidationUtil.isNotNullAndNotEmpty(res.pdtCD)) {
          let checkItemProduct  = sessionStorage.getItem("checkItemProduct");
          if(checkItemProduct == 'next') {
            sessionStorage.setItem('checkItemProduct', "stop");
            let itemparam = {...res};

            let itemParam = {
              pdtCd : itemparam.pdtCD
            }
            this._itemState.dispatch(setParamItem({ itemParam: itemParam }));
            sessionStorage.setItem('checkItemParamProduct', "next");
          }
          modifyBackToCloseModal();
          this.esc = true;
          this.backHistory = true;
          this.showProductPopup = true;
          
          this._itemState.dispatch(setItem({ item: {} }));
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.cate = "";
  }

  handleOnClickModeProduct(): void {
    if (typeof addEventListenerForViewModeProduct === "function") {
      addEventListenerForViewModeProduct();
    }
  }

  handleOnClickCategory(item: Node<PdtCateModel>): void {
    let cateCd = "";
    let pCd = "";
    let parentMainPage = "";
    let childMainPage = "";
    if (ValidationUtil.isNotNullAndNotEmpty(item.children)) {
      let child = item.children[0];
      pCd = ConvertUtil.convertToSring(child.data.pcd);
      cateCd = ConvertUtil.convertToSring(child.data.cateCd);
      parentMainPage = ConvertUtil.convertToSring(child.data.pname);
      childMainPage = ConvertUtil.convertToSring(child.data.cateName)
      this.totalChildMainHeading =  "(상품 " + ConvertUtil.setComma(child.data.total) + "개)";
    } else {
      cateCd = ConvertUtil.convertToSring(item.data.cateCd);
      pCd = ConvertUtil.convertToSring(item.data.pcd);

      if (item.data.lv === "1") {
        parentMainPage = ConvertUtil.convertToSring(item.data.cateName)
        this.totalChildMainHeading =  "(상품 " + ConvertUtil.setComma(item.data.total) + "개)";
      } else if (item.data.lv === "2") {
        parentMainPage = ConvertUtil.convertToSring(item.data.pname);
        childMainPage = ConvertUtil.convertToSring(item.data.cateName) 
        this.totalChildMainHeading =  "(상품 " + ConvertUtil.setComma(item.data.total) + "개)";
      }
    }

    this._productStore.dispatch(setCateCd({ cateCd: cateCd }));
    this._pdtDetailStore.dispatch(clearProductDetailState());

    this.activePCd = pCd;
    this.activeCateCd = cateCd;
    this.parentMainHeading = parentMainPage;
    this.childMainHeading = childMainPage;

    this._productStore.dispatch(setKeySearch({ key: "" }));
    if (ValidationUtil.isNullOrEmpty(this.cate)) {
      this._router.navigate([MyProgramConstant.urlShopping + "/category/" + cateCd]);
    } else {
      const pathname = location.pathname;
      if (!pathname.includes(MyProgramConstant.urlShopping + "/product")) {
        window.history.replaceState("", "", MyProgramConstant.urlShopping);
      }
    }
    this.cate = "";
    this._productStore.dispatch(setPdtCate({ cate: cateCd }));
    this._pdtDetailStore.dispatch(setProductNameMainHeading({ heading: "" }));
    this.activeMobileMainMenu();
  }

  initPdtCates(res: PdtCateModel[]): void {
    if (ValidationUtil.isNotNullAndNotEmpty(res)) {
      this._pdtDetailStore.dispatch(setProductNameMainHeading({ heading: "" }));

      this.treePdtCates = new Map();

      let node;
      let pcate = "";
      let firstCate = "";
      let haveCate = false;
      let validCate = false;
      
      for (const item of res) {
        if (item.lv === "1") {
          if (ValidationUtil.isNullOrEmpty(firstCate)) {
            firstCate = ConvertUtil.convertToSring(item.cateCd);
          }
          this.treePdtCates.set(item.cateCd, { data: item, children: [] });
          if (this.cate === item.cateCd) {
            validCate = true;
          }
        } else if (item.lv === "2") {
          node = this.treePdtCates.get(item.pcd);
          if (node?.children !== undefined && node?.children !== null) {
            node.children.push({ data: item, children: [] });
          }
          if (!haveCate && firstCate === item.pcd) {
            haveCate = true;
            this.activeCateCd = ConvertUtil.convertToSring(item.cateCd);
            this.activePCd = ConvertUtil.convertToSring(item.pcd);
            this.childMainHeading = ConvertUtil.convertToSring(item.cateName)
            this.totalChildMainHeading = "(상품 " + ConvertUtil.setComma(item.total) + "개)";
            this.parentMainHeading = ConvertUtil.convertToSring(item.pname);
          }
          if (this.cate === item.cateCd) {
            pcate = ConvertUtil.convertToSring(item.pcd);
          }
        }
      }

      if (!haveCate) {
        let item = res[0];
        haveCate = true;
        this.activeCateCd = ConvertUtil.convertToSring(item.cateCd);
        this.activePCd = ConvertUtil.convertToSring(item.cateCd);
        this.parentMainHeading = ConvertUtil.convertToSring(item.cateName) + " (" + ConvertUtil.setComma(item.total) + ")";
      }

      if (ValidationUtil.isNotNullAndNotEmpty(this.cate)) {
        let cate;
        if (validCate) {
          cate = node = this.treePdtCates.get(this.cate);
          if (cate) {
            this.handleOnClickCategory(cate);
          }
        } else if (ValidationUtil.isNotNullAndNotEmpty(pcate)) {
          cate = node = this.treePdtCates.get(pcate);
          if (cate) {
            let children = cate.children;
            if (children) {
              for (const child of children) {
                if (child.data.cateCd === this.cate) {
                  this.handleOnClickCategory(child);
                  break;
                }
              }
            }
          }
        }
      } else {
        this._productStore.dispatch(setCateCd({ cateCd: this.activeCateCd }));
      }

      this.pdtCates = Array.from(this.treePdtCates.values());
    }
    this.activeMobileMainMenu();
  }

  activeMobileMainMenu(): void {
    if (typeof activeShoppingMallMobileMainMenu === "function") {
      setTimeout(() => activeShoppingMallMobileMainMenu(), 600);
    }
  }

  handleOnClickToggleProductPopup(show: boolean) {
    this.showProductPopup = show;
    this.esc = show;
    this.backHistory = show;
  }
}
