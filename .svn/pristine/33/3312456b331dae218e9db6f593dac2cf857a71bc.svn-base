import { Component, OnInit } from '@angular/core';
import { countFaq, loadCodes, searchFaq } from '@app/actions/myoffice/notice/faq.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { FaqModel } from '@app/models/myoffice/notice/faq.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { FaqSearchState, getCodes, getFaqSearchItems, getFaqTotalItems } from '@app/selectors/myoffice/notice/faq.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

declare const Opened: any;
declare const activeTileFag: any;
declare const updateSrc: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  page: number = 1;

  len: number = 10;

  totalItems: number = 0;

  boardCate : String = "";

  config: PaginationInstance = {
    id: 'faq',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }

  options: SelectDropdownModel[] = [];
  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  faqSearchItems$ = new Observable<FaqModel[]>;
  faqCodeItems$ = new Observable<FaqModel[]>;
  faqTotalItems$ = new Observable<Number>;

  collection: FaqModel[] = [];
  title: FaqModel[] = [];
  rows: number[] = [];
  cols: number[] = new Array(16);

  smWownet$ = new Observable<SmWownetModel>;
  urlWownet : String = "";

  searchKey : String = "";

  constructor(
    private _faqSearchStore: Store<FaqSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _smWownetStateStore: Store<SmWownetState>
  ) { 
    this.smWownet$ = this._smWownetStateStore.select(getSmWownet);
  }

  ngOnInit(): void {

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.urlWownet = res.urlWownet;
      }
    });

    this.options = LenConstant.listLen;
    this.selectedValue = this.options[0];

    this.onSearch();

  }
  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.len = Number(selected.value);
      this.page = 1;
      this.onSearch();
    }
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.onSearch();
  }

  getParams(): any {
    let params = {
      comId:  environment.comId,
      kindCd: environment.comCd + "B07",
      boardCate : this.boardCate,
      searchKey : this.searchKey.trim(),
      page: this.page,
      len: this.len,
    }

    return params;
  }

  onSearch(): void {

    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));

    let params = this.getParams();

    this._faqSearchStore.dispatch(searchFaq({ params: params }));
    this._faqSearchStore.dispatch(countFaq({ params: params }));
    this._faqSearchStore.dispatch(loadCodes());

   
    this.faqSearchItems$ = this._faqSearchStore.select(getFaqSearchItems);
    this.faqTotalItems$ = this._faqSearchStore.select(getFaqTotalItems);
    this.faqCodeItems$ = this._faqSearchStore.select(getCodes);

    //Title
    this.faqCodeItems$.subscribe(res => {
      this.title = res;
    })

    //Render Body
    this.faqSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
        if (this.collection.length < 5) {
          this.rows = new Array(5 - this.collection.length);
        }
      } else {
        this.collection = [];
        this.rows = new Array(5);
      }

      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    setTimeout(() => {
      this.updateSrcForElement();
    }, 500);

    //Total Items Of data
    this.faqTotalItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    })
  }


  loadDataOfTitle(codeCd : String) :void {
    this.boardCate = codeCd;
    this.onSearch();

    setTimeout(() => {
      activeTileFag(codeCd);
    }, 250);
  }

  openHideFagToggle(idFaqToggle : any) {
    let e = document.getElementById(idFaqToggle) as HTMLElement; 
    Opened(e);
  }
  
  updateSrcForElement() {

    for(let i = 0; i< this.collection.length; i++) {

      let idContentA = "contentsA" + i;
      let eContentA = document.getElementById(idContentA) as HTMLElement; 
      updateSrc(eContentA, this.urlWownet);

      let idContentQ = "contentsQ" + i;
      let eContentQ = document.getElementById(idContentQ) as HTMLElement; 
      updateSrc(eContentQ, this.urlWownet);
    }
  }

}
