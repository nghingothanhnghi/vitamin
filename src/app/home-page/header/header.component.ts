import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, GuardsCheckEnd, Router } from '@angular/router';

import { MyProgram } from 'src/app/models/system/my-program.model';
import { MyProgramState } from 'src/app/selectors/system/my-program.selector';

import { getMyPrograms } from 'src/app/selectors/system/my-program.selector';
import * as myProgramActions from 'src/app/actions/system/my-program.actions';
import {
  getLoading,
  OverlayLoadingState,
} from '@app/selectors/overlay-loading.selector';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { Node } from '@app/models/components/node.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import {
  getPageHeadingChild,
  getPageHeadingChildren,
  getPathname,
  PageHeadingState,
} from '@app/selectors/page-heading.selector';
import {
  setPageHeading,
  setShowPageHeading,
  setTypePageHeading,
} from '@app/actions/page-heading.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { AuthUtil } from '@app/common/util/auth.util';
import {
  CartState,
  getActionResult,
  getCartInfo,
  getCartItems,
  getIsBuyNow,
  getReload,
  getShowAlert,
} from '@app/selectors/shoppingmall/cart.selector';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { ResultProc } from '@app/models/system/result-proc.model';
import {
  loadCartInfo,
  loadCartItems,
  setReload,
} from '@app/actions/shoppingmall/cart.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { MemberModel } from '@app/models/system/member.model';
import { PageHeadingConstants } from '@app/common/constant/page-heading.constant';
import {
  getSmWownet,
  getSmWownetPg,
  SmWownetState,
} from '@app/selectors/system/sm-wownet.selector';
import {
  loadFindPayHeader,
  loadSmWownet,
  loadSmWownetPg,
  loadWowWord,
} from '@app/actions/system/sm-wownet.action';
import { Login2State } from '@app/selectors/system/login2.select';
import { logout } from '@app/actions/system/login2.action';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import {
  getPdtCates,
  PdtCateState,
} from '@app/selectors/shoppingmall/pdt-cate.selector';
import { loadPdtCate } from '@app/actions/shoppingmall/pdt-cate.action';
import {
  getMemberPoint,
  MemberPointState,
} from '@app/selectors/shoppingmall/member-point.selector';
import { loadMemberPoint } from '@app/actions/shoppingmall/member-point.action';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { PdtCateModel } from '@app/models/shoppingmall/pdt-cate.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { CheckUseridConstant } from '@app/common/constant/check-userid.constant';
import { CommonUtils } from '@app/common/util/common.util';

declare const addEventListenerForMobileMenu: any;
declare const addEventListenerClickButtonSearch: any;
declare const clickBtnSearchClose: any;
declare const backToTop: any;
declare const updateMainSidebarWitdth: any;
declare const adjustSidebarActiveMenuItemLiPosition: any;
declare const onClickToTarget: any;


declare const onClickCollapseMenu: any;



@Component({
  selector: 'hp-header',
  host: { class: 'row sticky-top bg-white' },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  myPrograms$ = new Observable<MyProgram[]>();

  pdtCates$ = new Observable<PdtCateModel[]>();
  pdtCates: PdtCateModel[] = [];

  cartItems$ = new Observable<OrdPdtModel[]>();
  cartInfo$ = new Observable<OrderMstModel>();
  actionResult$ = new Observable<ResultProc>();
  cartInfo: OrderMstModel = {} as OrderMstModel;
  isLoadCartItems: boolean = false;
  isBuyNow: boolean = false;
  showAlert: boolean = false;

  // isClickedMF = CommonUtils.isClickedMF;
  isClickedMF: boolean = false;
  isHomepage: boolean = true;

  isSubMenu: boolean = false;
  isMainMenu: boolean = false;
  isNonemenu: boolean = false;

  leftmenu: MyProgram[] = [];
  // leftmenusub : MyProgram[] = [];
  momenusub: MyProgram[] = [];
  rightMenu: MyProgram[] = [];
  mainMenu: MyProgram[] = [];
  subMenu: MyProgram[] = [];
  mainItems: Node<MyProgram>[] = [];
  treeMainMenu: Map<String, Node<MyProgram>> = new Map();

  activeId: string = '';
  activeChildId: string = '';
  tempActiveId: string = '';
  activeTopLeft: string = '';

  loading: boolean = false;

  baseUrl: string = '';
  url: string = '';

  openedId: string = '';

  isLogined: boolean = false;
  loginedInfo: MemberModel | null = null;

  key: string = '';

  wAlertStatus$ = new Observable<WAlertStatus>();

  memberPoint$ = new Observable<OrderMstModel>();
  memberPoint: OrderMstModel = {} as OrderMstModel;

  smWownetPg$ = new Observable<SmWownetPgModel>();
  smWownetPg: SmWownetPgModel = {} as SmWownetPgModel;

  smWownet$ = new Observable<SmWownetModel>();

  children$ = new Observable<Node<MyProgram>[]>();
  children: Node<MyProgram>[] = [] as Node<MyProgram>[];

  child$ = new Observable<MyProgram>();
  child: MyProgram = {} as MyProgram;
  tempActiveIdChild: string = '';

  pathname$ = new Observable<string>();
  pathname: string = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _loginStore: Store<Login2State>,
    private _myProgramStore: Store<MyProgramState>,
    private _cartStore: Store<CartState>,
    private _pageHeadingStore: Store<PageHeadingState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _pdtCateStore: Store<PdtCateState>,
    private _memberPointStore: Store<MemberPointState>
  ) {
    this.myPrograms$ = this._myProgramStore.select(getMyPrograms);
    this.cartItems$ = this._cartStore.select(getCartItems);
    this.cartInfo$ = this._cartStore.select(getCartInfo);
    this.actionResult$ = this._cartStore.select(getActionResult);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.memberPoint$ = this._memberPointStore.select(getMemberPoint);
    this.smWownetPg$ = this._smWownetStateStore.select(getSmWownetPg);
    this.pdtCates$ = this._pdtCateStore.select(getPdtCates);
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
    this.children$ = this._pageHeadingStore.select(getPageHeadingChildren);
    this.child$ = this._pageHeadingStore.select(getPageHeadingChild);
    this.pathname$ = this._pageHeadingStore.select(getPathname);
  }

  ngOnInit(): void {
    this._smWownetStateStore.dispatch(loadSmWownet());
    this._smWownetStateStore.dispatch(loadFindPayHeader());
    this._smWownetStateStore.dispatch(loadWowWord());
    this._smWownetStateStore.dispatch(loadSmWownetPg());
    this._pdtCateStore.dispatch(loadPdtCate({ key: '' }));

    this.smWownet$.subscribe((res) =>
      sessionStorage.setItem(CheckUseridConstant.muserPid, res.musePId)
    );

    this._activatedRoute.queryParams.subscribe((params) => {
      this.key = ConvertUtil.convertToSring(params['key']);
    });

    this._router.events.forEach((_event) => {
      if (_event instanceof GuardsCheckEnd) {
        this.initMainMenu(this.removeUrlParams(_event.url));
        setTimeout(() => {
          if (typeof backToTop === 'function') {
            backToTop();
          }
        }, 200);
      }
    });

    this._overlayLoadingStore.dispatch(
      setShowOverlayLoading({ loading: true })
    );
    this._myProgramStore.dispatch(myProgramActions.loadMyPrograms());

    this.myPrograms$.subscribe((res) => {
      // this.leftmenu = res.filter(y => y.prgKind == MyProgramConstant.kindMenuTopLeft && y.menuLv == '1');
      //this.leftmenusub = res.filter(y => y.prgKind == MyProgramConstant.kindMenuTopLeft && y.menuLv == '2');
      this.momenusub = res.filter(
        (y) => y.prgKind == MyProgramConstant.kindMenuOffice && y.menuLv == '2'
      );
      this.rightMenu = res.filter(
        (y) => y.prgKind == MyProgramConstant.kindMenuTopRight
      );
      this.mainMenu = res.filter(
        (y) =>
          y.prgKind == MyProgramConstant.kindMenuHome ||
          y.prgKind == MyProgramConstant.kindMenuOffice ||
          y.prgKind == MyProgramConstant.kindMenuShopping
      );

      this._overlayLoadingStore.dispatch(
        setShowOverlayLoading({ loading: false })
      );
      this.initMainMenu(window.location.pathname);
    });

    this.pdtCates$.subscribe((res) => {
      this.pdtCates = res;
      // this.leftmenusub = [];
      // for (const pdtCate of res) {
      //   let item = this.convertToMyProgram(pdtCate, MyProgramConstant.kindMenuShopping, MyProgramConstant.urlShopping + '/cate/' + pdtCate.cateCd);
      //   this.leftmenusub.push(item);
      // }
    });

    this.smWownetPg$.subscribe((res) => (this.smWownetPg = res));

    this.actionResult$.subscribe((res) => {
      if (res.retCode === 'OK') {
        if (this.isBuyNow) {
          this._router.navigate([MyProgramConstant.urlShopping + '/checkout']);
        } else {
          if (this.showAlert) {
            this._wAlertStore.dispatch(
              setWAlert({
                wAlert: {
                  icon: WAlertConstant.successful,
                  message: ConvertUtil.convertToSring(res.retStr),
                },
              })
            );
          }
        }
        this.loadCart();
      } else if (ValidationUtil.isNotNullAndNotEmpty(res.retStr)) {
        this._wAlertStore.dispatch(
          setWAlert({
            wAlert: {
              icon: WAlertConstant.cancelled,
              message: ConvertUtil.convertToSring(res.retStr),
            },
          })
        );
      }
      this._overlayLoadingStore.dispatch(
        setShowOverlayLoading({ loading: false })
      );
    });

    this._overlayLoadingStore
      .select(getLoading)
      .subscribe((res) => (this.loading = res));
    this._cartStore
      .select(getIsBuyNow)
      .subscribe((res) => (this.isBuyNow = res));
    this._cartStore
      .select(getShowAlert)
      .subscribe((res) => (this.showAlert = res));
    this._cartStore.select(getReload).subscribe((res) => {
      if (res) {
        this.loadCart();
        this._cartStore.dispatch(setReload({ reload: false }));
      }
    });

    this.loadCart();

    this.cartInfo$.subscribe((res) => (this.cartInfo = res));
    this.memberPoint$.subscribe((res) => (this.memberPoint = res));

    if (typeof addEventListenerClickButtonSearch === 'function') {
      addEventListenerClickButtonSearch();
    }

    this.children$.subscribe((res) => {
      this.children = res;
      if (this.children.length == 0) {
        this.isNonemenu = true;
      } else if (this.children.length > 0) {
        this.isNonemenu = false;
      }
    });
    this.child$.subscribe((res) => {
      this.pathname = window.location.pathname;

      this.child = res;
      this.tempActiveIdChild = this.child.prgId;
    });

    this.pathname$.subscribe((res) => {
      if (res.includes('my-office')) {
        this.isHomepage = false;
      }
      this.pathname = res;
    });

    // const url = window.location.pathname;
    // const parts = url.split('/');
    // const temps = parts[1];
    // if(temps == 'my-office'){
    //   this.handleClickMyoffice("1");
    // }else{
    //   this.handleClickHomePage("1");
    // }
  }

  loadMainMenu(): void {
    this._overlayLoadingStore.dispatch(
      setShowOverlayLoading({ loading: true })
    );
    this.subMenu = [];

    this.changeTitlePage('VITAMINPAY');
    let kind = MyProgramConstant.kindMenuHome;
    if (this.baseUrl === MyProgramConstant.urlMyOffice) {
      kind = MyProgramConstant.kindMenuOffice;
      this.activeTopLeft = MyProgramConstant.officeId;
      this._pageHeadingStore.dispatch(
        setTypePageHeading({ payload: PageHeadingConstants.typeOP })
      );
    } /*if (this.baseUrl === MyProgramConstant.urlShopping)*/ else {
      kind = MyProgramConstant.kindMenuShopping;
      this.activeTopLeft = MyProgramConstant.shoppingId;
      this._pageHeadingStore.dispatch(
        setTypePageHeading({ payload: PageHeadingConstants.typeHP })
      );
    } /*  else {
      this.activeTopLeft = MyProgramConstant.homeId;
      if (this.url == "/") {
        this._pageHeadingStore.dispatch(setTypePageHeading({ payload: PageHeadingConstants.typeSP }));
      } else {
        this._pageHeadingStore.dispatch(setTypePageHeading({ payload: PageHeadingConstants.typeHP }));
      }
    }*/

    this.treeMainMenu = new Map();

    if (
      kind === MyProgramConstant.kindMenuHome ||
      kind === MyProgramConstant.kindMenuOffice
    ) {
      this.loadMainMyOfficeAndHomeMainMenu(this.mainMenu, kind);
    } else {
      //this.loadMainShoppingMenu(this.pdtCates, kind);
    }
    console.log(this.treeMainMenu.values());
    this.mainItems = Array.from(this.treeMainMenu.values());
    this.setActiveId();

    this._overlayLoadingStore.dispatch(
      setShowOverlayLoading({ loading: false })
    );

    if (typeof addEventListenerForMobileMenu === 'function') {
      setTimeout(() => addEventListenerForMobileMenu(), 1000);
      setTimeout(() => adjustSidebarActiveMenuItemLiPosition(), 1100);
    }
  }

  setDataTreeMainMenu(item: MyProgram): void {
    if (item.menuLv == '1') {
      this.treeMainMenu.set(item.prgId, { data: item, children: [] });
    } else if (item.menuLv == '2') {
      const node = this.treeMainMenu.get(item.pid);
      if (node?.children !== undefined && node?.children !== null) {
        node.children.push({ data: item, children: [] });
      }
      this.subMenu.push(item);
    }
  }

  loadMainMyOfficeAndHomeMainMenu(items: MyProgram[], kind: string): void {
    this.tempActiveId = '';
    let item;
    for (let i = 0; i < items.length; i++) {
      item = items[i];
      if (item.prgKind == kind) {
        this.setDataTreeMainMenu(item);
      }
      if (item.menuLv == '1' && item.linkInfo === this.url) {
        this.tempActiveId = item.prgId;
      }

      if (item.menuLv == '2' && item.linkInfo === this.url) {
        this.tempActiveId = item.prgId;
      }
      this.updateTitleByUrl(item);
    }
  }

  loadMainShoppingMenu(items: PdtCateModel[], kind: string): void {
    let item;
    for (const pdtCate of items) {
      item = this.convertToMyProgram(
        pdtCate,
        kind,
        MyProgramConstant.urlShopping + '/cate/' + pdtCate.cateCd
      );
      this.setDataTreeMainMenu(item);
      this.updateTitleByUrl(item);
    }
  }

  convertToMyProgram(
    item: PdtCateModel,
    kind: string,
    linkInfo: string
  ): MyProgram {
    return {
      comId: item.comId,
      prgId: item.cateCd,
      prgName: item.cateName,
      pid: 'ml.Shopping-mall',
      prgKind: kind,
      menuYn: 'Y',
      menuLv: item.lv,
      linkInfo: linkInfo,
      loginYn: 'A',
      cnt: item.total,
    } as MyProgram;
  }

  setActiveId(): void {
    let havePageHeading = false;
    this.activeId = '';
    this.activeChildId = '';

    if (ValidationUtil.isNotNullAndNotEmpty(this.subMenu)) {
      for (const item of this.subMenu) {
        if (
          item.linkInfo === this.url &&
          (item.prgKind === MyProgramConstant.kindMenuOffice ||
            item.prgKind === MyProgramConstant.kindMenuHome)
        ) {
          this.activeId = item.pid;
          this.activeChildId = item.prgId;
          const node = this.treeMainMenu.get(this.activeId);
          if (node !== undefined && node !== null) {
            havePageHeading = true;
            this._pageHeadingStore.dispatch(
              setPageHeading({ node: node, child: item, pathname: this.url })
            );
          }
        }
      }
    }
    if (!havePageHeading) {
      if (PageHeadingConstants.MAP_LINK_W_LEFT_MENU.has(this.url)) {
        let menuName = PageHeadingConstants.MAP_LINK_W_LEFT_MENU.get(this.url);
        for (const item of this.subMenu) {
          if (item.linkInfo === menuName) {
            const node = this.treeMainMenu.get(item.pid);
            if (node !== undefined && node !== null) {
              this._pageHeadingStore.dispatch(
                setPageHeading({
                  node: node,
                  child: item,
                  pathname: item.linkInfo,
                })
              );
            }
          }
        }
      } else {
        this._pageHeadingStore.dispatch(setShowPageHeading({ show: false }));
      }
    }
    if (
      ValidationUtil.isNullOrEmpty(this.activeId) &&
      ValidationUtil.isNullOrEmpty(this.activeChildId) &&
      ValidationUtil.isNotNullAndNotEmpty(this.tempActiveId)
    ) {
      this.activeId = this.tempActiveId;
    }
  }

  initMainMenu(url: string): void {
    // setTimeout(() => {
    //   if (typeof updateMainSidebarWitdth === "function") {
    //     updateMainSidebarWitdth(url);
    //   }
    // }, 100);

    if (AuthUtil.isLogined()) {
      this.isLogined = true;
    } else {
      this.isLogined = false;
    }

    let tm = setInterval(() => {
      this.loginedInfo = AuthUtil.getLoginedInfo();
      if (this.loginedInfo) {
        clearInterval(tm);
      }
    }, 100);

    let tempUrl: string[] = [];

    this.url = url;
    tempUrl = this.url.split('/');
    if (tempUrl.length >= 2) {
      this.baseUrl = '/' + tempUrl[1];
    }

    this.loadMainMenu();
  }

  handleOnClickRightMenu(item: MyProgram): void {
    this.isHomepage = false;

    if (item.linkInfo == '/logout') {
      this._loginStore.dispatch(logout());
      localStorage.removeItem('member');
      localStorage.removeItem('lastAction');

      location.href = '/';
    } /*else if(item.prgId =='ml.Office.User-profile'){
      this.isClickedMF = true;
      this.isHomepage = false;
    }*/ else {
      this._router.navigate([item.linkInfo]);
    }
  }

  handleOnSearch(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.key)) {
      this._router.navigateByUrl(
        MyProgramConstant.urlShopping + `/product-search?key=${this.key}`
      );
    } else {
      this._router.navigate([MyProgramConstant.urlShopping]);
    }
    if (typeof clickBtnSearchClose === 'function') {
      clickBtnSearchClose();
    }
  }

  loadCart(): void {
    if (AuthUtil.isLogined()) {
      let member = AuthUtil.getLoginedInfo();
      if (member) {
        this._cartStore.dispatch(
          loadCartInfo({
            userid: ConvertUtil.convertToSring(member.userid),
            ctrCd: ConvertUtil.convertToSring(member.ctrCd),
          })
        );
        this._cartStore.dispatch(
          loadCartItems({ userid: ConvertUtil.convertToSring(member.userid) })
        );
        this._memberPointStore.dispatch(
          loadMemberPoint({ userid: ConvertUtil.convertToSring(member.userid) })
        );
      }
    }
  }

  removeUrlParams(url: string): string {
    if (ValidationUtil.isNotNullAndNotEmpty(url)) {
      return url.split('?')[0];
    }
    return location.pathname;
  }

  updateTitleByUrl(item: MyProgram): void {
    if (item.linkInfo === this.url) {
      this.changeTitlePage('VITAMINPAY | ' + item.prgName);
    }
  }

  changeTitlePage(title: string): void {
    var _title = document.querySelector('title');
    if (_title) {
      _title.innerText = title;
    }
  }

  handleClickMyoffice(): void {
    this.isClickedMF = true;
    this.isHomepage = false;
    // if(flag === "2") {
    //   this._router.navigate(["/my-office/member-management/member-search"]);
    // }
  }
  handleClickHomePage(): void {
    this.isClickedMF = false;
    this.isHomepage = true;

    // if(flag === "2") {
    //   this._router.navigate(["/"]);
    // }
  }

  scrollElement(e1: string) {
    onClickToTarget(e1);
    onClickCollapseMenu();
  }

  noScrollCollapsedMenu (){
    onClickCollapseMenu();
  }

}
