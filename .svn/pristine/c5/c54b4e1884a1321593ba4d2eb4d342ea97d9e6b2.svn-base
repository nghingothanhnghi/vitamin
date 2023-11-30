import { Component, OnInit } from '@angular/core';
import { countBenefitAccountingInquiry, searchBenefitAccountingInquiry, sumBenefitAccountingInquiry } from '@app/actions/myoffice/benefit/benefit-accounting-inquiry.action';
import { loadTitlePay } from '@app/actions/myoffice/benefit/benefit-details-inquiry.action';
import { loadCodesY } from '@app/actions/system/code.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { BenefitAccountingInquiryModel } from '@app/models/myoffice/benefit/benefit-acounting-inquiry.module';
import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';
import { CodeModel } from '@app/models/system/code.model';
import { BenefitAcountingInquirySearchState, getBenefitAccontingSumItem, getBenefitAccountingSearchItems, getBenefitAccountingTotalItems } from '@app/selectors/myoffice/benefit/benefit-accounting-inquiry.selector';
import { BenefitSearchState, getTitlePayItems } from '@app/selectors/myoffice/benefit/benefit-details-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { PaginationInstance } from 'ngx-pagination';
import { AuthUtil } from '@app/common/util/auth.util';
import { LenConstant } from '@app/common/constant/len.constant';

@Component({
  selector: 'app-benefit-accounting-inquiry',
  templateUrl: './benefit-accounting-inquiry.component.html',
  styleUrls: ['./benefit-accounting-inquiry.component.css',
              './../../../../../assets/css/my-office/benefit-management.css']
})
export class BenefitAccountingInquiryComponent implements OnInit {

// Start Data of select date
codesY$ = new Observable<CodeModel[]>;

yearOptions: SelectDropdownModel[] = [];
dateFilterSelected: DateFilterModel = new DateFilterModel();

// End Data of select date

//Start Information UserLogin

userId: String = '';
userName: String = "";
labelDate : String = "정산일자";

//End Information UserLogin

// Start Paging
page: number = 1;

len: number = 10;

totalItems: number = 0;

config: PaginationInstance = {
    id: 'benefit-accounting-inquiry',
  itemsPerPage: this.len,
  currentPage: this.page,
    totalItems: this.totalItems,
  }
  options: SelectDropdownModel[] = [];
  selectedValue: SelectDropdownModel = new SelectDropdownModel();
  // End Paging

  tiltePay$ = new Observable<BenefitDetailInquiryModel[]>;
  benefitAcountingSearchItems$ = new Observable<BenefitAccountingInquiryModel[]>;
  benefitAcountingSumItem$ = new Observable<BenefitAccountingInquiryModel>;
  benefitAcountingTotalItems$ = new Observable<Number>;
  tiltePayNew : any[] = [];
  titleResult: string | any[] = [];
  collection: BenefitDetailInquiryModel[] = [];
  lengthTitleResult: number = 0;
  floorTotalCols: number = 0;
  rows: number[] = [];
  cols: number[] = new Array(16);
  totalCols: number = 6;
  totalRows: number = 0;
  isChkDate = 1;


  constructor(
    private _codeStore: Store<CodeState>,
    private _benefitSearchStore: Store<BenefitSearchState>,
    private _benefitAcountingSearchStore: Store<BenefitAcountingInquirySearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
  ) {
    this.tiltePay$ = this._benefitSearchStore.select(getTitlePayItems);
    this.codesY$ = this._codeStore.select(getCodesY);
  }

  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }


    // Start load code of year
    this._codeStore.dispatch(loadCodesY());
    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });
    // End load code of year

    let params = {};
    this._benefitSearchStore.dispatch(loadTitlePay({ params: params }));

    this.options = LenConstant.listLen;
    this.selectedValue = this.options[0];
  }

  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.page = 1;
    this.onSearch();
  }

  //Start Paging
  onChangeLen(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.len = Number(selected.value);
      this.page = 1;
      this.onSearch();
    }
  }

  onChangePage(page: number): void {
    this.page = page;
    this.onSearch();
  }

  //End Paging

  getParams(): any {
    let startDate = "" + this.dateFilterSelected.fromDate.year.value
                  + this.dateFilterSelected.fromDate.month.value;

    let endDate = "" + this.dateFilterSelected.toDate.year.value
                + this.dateFilterSelected.toDate.month.value;

    let chkDate = this.isChkDate

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,

      date1: startDate,
      date2: endDate,
      userId: this.userId,
      chkDate : chkDate,

      page: Number(this.page) - 1,
      len: this.len,

    }

    return params;
  }

  onSearch(): void {

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    let params = this.getParams();

    this._benefitAcountingSearchStore.dispatch(searchBenefitAccountingInquiry({ params: params }));
    this._benefitAcountingSearchStore.dispatch(countBenefitAccountingInquiry({ params: params }));
    this._benefitAcountingSearchStore.dispatch(sumBenefitAccountingInquiry({ params: params }));


    this.benefitAcountingSearchItems$ = this._benefitAcountingSearchStore.select(getBenefitAccountingSearchItems);
    this.benefitAcountingSumItem$ = this._benefitAcountingSearchStore.select(getBenefitAccontingSumItem);
    this.benefitAcountingTotalItems$ = this._benefitAcountingSearchStore.select(getBenefitAccountingTotalItems);

    //Render Hedaer
    this.tiltePay$.subscribe( result => {
      this.tiltePayNew = [];
      this.titleResult = result;
      this.lengthTitleResult = result.length;

      this.tiltePayNew.push({payName : "정산일자"});
      for (let i = 0; i < result.length; i++) {
        let items = {
          payName : result[i].payName
        }

        this.tiltePayNew.push(items);
      }
      this.tiltePayNew.push({payName : "합계금액"});
    });
    //Render Body
    this.benefitAcountingSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;

        if (this.collection.length < 5) {
          this.rows = new Array(5 - this.collection.length);
        }
      } else {
        this.collection = [];
        this.rows = new Array(5);
      }

      setTimeout(() => {
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        this.setBlankRow();
      }, 250);


    });

    //Total Items Of data
    this.benefitAcountingTotalItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    })


  }

  setBlankRow() {
    this.totalRows = this.collection.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.totalCols = this.lengthTitleResult > 0 ? this.lengthTitleResult + 2 : 2;

    this.floorTotalCols =   Math.floor((this.totalCols/2));

    this.cols = new Array(this.totalCols);
  }

  search() {
    this.page = 1;
    this.onSearch();
  }

}
