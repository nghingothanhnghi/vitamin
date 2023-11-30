import { Component, OnDestroy, OnInit } from '@angular/core';
import { getMemberInfo, getSelectDate, getSelectDateSuccess, searchFindOrderHistory, searchFindOrderProductHistory, searchFindPayHistory, searchFindPayPrint, sumFindOrderHistory, sumFindOrderProductHistory } from '@app/actions/myoffice/benefit/benefit-statement.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { loadCodesY } from '@app/actions/system/code.action';
import { loadCompany } from '@app/actions/system/company.actions';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ReportUtil } from '@app/common/util/report.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { MemberBenefitModel } from '@app/models/myoffice/benefit/member-benefit.module';
import { OrderHistoryModel } from '@app/models/myoffice/benefit/order-history.module';
import { PayPrintModel } from '@app/models/myoffice/benefit/pay-print.module';
import { CodeModel } from '@app/models/system/code.model';
import { Company } from '@app/models/system/company.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { BenefitStatmentSearchState, getMemberInfoItem, getSelectDateItem, searchFindOrderHistoryItem, searchFindOrderProductHistoryItem, searchFindPayHistoryItem, searchFindPayPrintItem, sumFindOrderHistoryItem, sumFindOrderProductHistoryItem } from '@app/selectors/myoffice/benefit/benefit-statement.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector';
import { getFindPayHeader, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

declare const getYnPayHeader: any;

@Component({
  selector: 'app-benefit-statement',
  templateUrl: './benefit-statement.component.html',
  styleUrls: ['./benefit-statement.component.css',
              './../../../../../assets/css/my-office/benefit-management.css']
})
export class BenefitStatementComponent implements OnInit, OnDestroy {

  //Start Information UserLogin

  userId: String = '';
  userName: String = "";
  labelDate : String = "지급일자";

//End Information UserLogin

  // Start Data of select date
  codesY$ = new Observable<CodeModel[]>;

  yearOptions: SelectDropdownModel[] = [];
  yearSelected: SelectDropdownModel = new SelectDropdownModel();

  stringMonth: String = "월";
  monthOptions: SelectDropdownModel[] = [
    { label: "01" + this.stringMonth, value: "01" },
    { label: "02" + this.stringMonth, value: "02" },
    { label: "03" + this.stringMonth, value: "03" },
    { label: "04" + this.stringMonth, value: "04" },
    { label: "05" + this.stringMonth, value: "05" },
    { label: "06" + this.stringMonth, value: "06" },
    { label: "07" + this.stringMonth, value: "07" },
    { label: "08" + this.stringMonth, value: "08" },
    { label: "09" + this.stringMonth, value: "09" },
    { label: "10" + this.stringMonth, value: "10" },
    { label: "11" + this.stringMonth, value: "11" },
    { label: "12" + this.stringMonth, value: "12" },
  ];
  monthSelected: SelectDropdownModel = new SelectDropdownModel();


  daySearchItems$ = new Observable<String[]>;
  dayOptions: SelectDropdownModel[] = [];
  daySelected: SelectDropdownModel = new SelectDropdownModel();
  // End Data of select date

  // find pay print
  findPayPrintSearchItems$ = new Observable<PayPrintModel[]>;
  collectionFindPayPrint: PayPrintModel[] = [];
  rowsFindPayPrint: number[] = [];
  colsFindPayPrint: number[] = new Array(16);
  totalColsFindPayPrint: number = 9;
  floorTotalColsFindPayPrint = Math.floor((this.totalColsFindPayPrint/2));
  totalRowsFindPayPrint: number = 0;

  // find pay history
  findPayHistorySearchItems$ = new Observable<PayPrintModel[]>;
  collectionFindPayHistory: PayPrintModel[] = [];
  rowsFindPayHistory: number[] = [];
  colsFindPayHistory: number[] = new Array(16);
  totalColsFindPayHistory: number = 3;
  floorTotalColsFindPayHistory = Math.floor((this.totalColsFindPayHistory/2));
  totalRowsFindPayHistory: number = 0;

  //Member info
  memberInfoSearchItem$ = new Observable<MemberBenefitModel>;
  collectionInfoMember: any = {} as MemberBenefitModel ;

  //grid-order-history
  orderHistorySearchItems$ = new Observable<OrderHistoryModel[]>;
  sumOrderHistorySearchItem$ = new Observable<OrderHistoryModel>;
  collectionOrderHistory: OrderHistoryModel[] = [];
  collectionSumOrderHistory: any = {} as OrderHistoryModel ;
  rowsOrderHistory: number[] = [];
  colsOrderHistory: number[] = new Array(16);
  totalColsOrderHistory: number = 8;
  floorTotalColsOrderHistory = Math.floor((this.totalColsOrderHistory/2));
  totalRowsOrderHistory: number = 0;

  //grid-order-product-history
  orderProductHistorySearchItems$ = new Observable<OrderHistoryModel[]>;
  sumOrderProductHistorySearchItem$ = new Observable<OrderHistoryModel>;
  collectionOrderProductHistory: OrderHistoryModel[] = [];
  collectionSumOrderProductHistory: any = {} as OrderHistoryModel ;
  rowsOrderProductHistory: number[] = [];
  colsOrderProductHistory: number[] = new Array(16);
  totalColsOrderProductHistory: number = 5;
  flooTotalColsOrderProductHistory = Math.floor((this.totalColsOrderProductHistory/2));
  totalRowsOrderProductHistory: number = 0;

  dateShow = "";
  wAlertStatus$: Observable<WAlertStatus>;

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  smPayHeader$ = new Observable<SmPayHeaderModel>();
  
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;

  company$ = new Observable<Company>();
  company: any = {} as Company;

  readonly BTN_NONE_ACTIVED:number = -1;
  readonly BTN_THIS_MONTH_ACTIVED: number = 0;
  readonly BTN_LAST_MONTH_ACTIVED: number = 1;

  btnFilterIsActive: number = this.BTN_NONE_ACTIVED;

  constructor(
    private _codeStore: Store<CodeState>,
    private _benefitStatmentSearchStore: Store<BenefitStatmentSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,
    private _smWownetStateStore: Store<SmWownetState>,
    private _companyStore: Store<CompanyState>
  ) { 
    this.codesY$ = this._codeStore.select(getCodesY);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);

    this.findPayPrintSearchItems$ = this._benefitStatmentSearchStore.select(searchFindPayPrintItem);
    this.findPayHistorySearchItems$ = this._benefitStatmentSearchStore.select(searchFindPayHistoryItem);
    this.memberInfoSearchItem$ = this._benefitStatmentSearchStore.select(getMemberInfoItem);
    this.orderHistorySearchItems$ = this._benefitStatmentSearchStore.select(searchFindOrderHistoryItem);
    this.sumOrderHistorySearchItem$ = this._benefitStatmentSearchStore.select(sumFindOrderHistoryItem);
    this.orderProductHistorySearchItems$ = this._benefitStatmentSearchStore.select(searchFindOrderProductHistoryItem);
    this.sumOrderProductHistorySearchItem$ = this._benefitStatmentSearchStore.select(sumFindOrderProductHistoryItem);
    this.daySearchItems$ = this._benefitStatmentSearchStore.select(getSelectDateItem);

    this.company$ = this._companyStore.select(getCompany);
  }

  subscriptions: Subscription[] = [];

  ngOnInit(): void {

    this._companyStore.dispatch(loadCompany());

    this.company$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.company = res;
      }
    });

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }

    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");

        if(this.isPv1) {
          this.flooTotalColsOrderProductHistory = 3;
          this.totalColsOrderProductHistory = 6;


          this.floorTotalColsOrderHistory = Math.floor((9/2));
          this.totalColsOrderHistory = 9;
        }

        // if(this.isPv2) {
        //   if(this.isPv1) {
        //     this.flooTotalColsOrderProductHistory = Math.floor((7/2));
        //     this.totalColsOrderProductHistory = 7;

        //     this.floorTotalColsOrderHistory = 5;
        //     this.totalColsOrderHistory = 10;

        //   } else {
        //     this.flooTotalColsOrderProductHistory = 3;
        //     this.totalColsOrderProductHistory = 6;

        //     this.floorTotalColsOrderHistory = Math.floor((9/2));
        //     this.totalColsOrderHistory = 9;

        //   }
        // }

        // if(this.isPv3) {
        //   if(this.isPv1 && this.isPv2) {
        //     this.flooTotalColsOrderProductHistory = 4;
        //     this.totalColsOrderProductHistory = 8;

        //     this.floorTotalColsOrderHistory = Math.floor((11/2));
        //     this.totalColsOrderHistory = 11;


        //   } else  if(!this.isPv1 && !this.isPv2) {
        //     this.flooTotalColsOrderProductHistory = 3;
        //     this.totalColsOrderProductHistory = 6;

        //     this.floorTotalColsOrderHistory = Math.floor((9/2));
        //     this.totalColsOrderHistory = 9;

        //   } else {
        //     this.flooTotalColsOrderProductHistory = Math.floor((7/2));
        //     this.totalColsOrderProductHistory = 7;

        //     this.floorTotalColsOrderHistory = 5;
        //     this.totalColsOrderHistory = 10;

        //   }
        // }
      }
    });

    this.smWowWord$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWowWord = res;
      }
    });

    let now = new Date();
    let thisYear = now.getFullYear();
    let thisMonth = now.getMonth() + 1;
    let _thisMonth = "";
    
    if(thisMonth < 10) {
      _thisMonth = "0" + thisMonth.toString();
    } else {
      _thisMonth = "" + thisMonth;
    }

    // Start load code of year
    this._codeStore.dispatch(loadCodesY());

    this.codesY$.subscribe(res => {
      this.yearOptions = [];

      res.forEach((item) => 
        this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) })
      );     

      this.yearSelected = { label: thisYear + '년', value: ConvertUtil.convertToSring(thisYear) };

      this.monthSelected = { label: _thisMonth + '월', value: ConvertUtil.convertToSring(_thisMonth) };
    });

    // End load code of year

    this.loadData("1");

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    localStorage.removeItem("benefitParams");
  }

  hanldeOnChangeYearSelectedValue(selected: SelectDropdownModel): void {
    this.btnFilterIsActive = this.BTN_NONE_ACTIVED;
    this.yearSelected = selected;
    this.loadData("1");
  }

  hanldeOnChangeMonthSelectedValue(selected: SelectDropdownModel): void {
    this.btnFilterIsActive = this.BTN_NONE_ACTIVED;
    this.monthSelected = selected;
    this.loadData("1");
  }

  hanldeOnChangeDaySelectedValue(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.btnFilterIsActive = this.BTN_NONE_ACTIVED;
      this.daySelected = selected;
      this.loadData("2");
    }
  }

  onThisMonth(): void {
    
    this.btnFilterIsActive = this.BTN_THIS_MONTH_ACTIVED;

    let now = new Date();
    let thisYear = now.getFullYear();
    let thisMonth = now.getMonth() + 1;

    let _thisMonth = thisMonth + "";

    if(thisMonth < 10) {
      _thisMonth = "0" + thisMonth;
    }

    this.yearSelected = { label: thisYear + '년', value: ConvertUtil.convertToSring(thisYear) };
    this.monthSelected = { label: _thisMonth + '월', value: ConvertUtil.convertToSring(_thisMonth) };

    this.loadData("1");

  }

  onLastMonth(): void {

    this.btnFilterIsActive = this.BTN_LAST_MONTH_ACTIVED;

    let now = new Date();
    let thisYear = now.getFullYear();
    let thisMonth = now.getMonth();

    let thisMonthCurrent = now.getMonth() + 1;

    if(thisMonthCurrent === 1) {

      this.yearSelected = { label: (thisYear - 1) + '년', value: ConvertUtil.convertToSring(thisYear - 1) };
      this.monthSelected = { label: 12 + '월', value: ConvertUtil.convertToSring(12) };
    }else  {
      let _lastMonth = "" + thisMonth;

      if(thisMonth < 10) {
        _lastMonth = "0" + thisMonth;
      }
  
      this.yearSelected = { label: thisYear + '년', value: ConvertUtil.convertToSring(thisYear) };
      this.monthSelected = { label: _lastMonth + '월', value: ConvertUtil.convertToSring(_lastMonth) };
    }

    this.loadData("1");

  }

  onSearch(): void {

    this.btnFilterIsActive = this.BTN_NONE_ACTIVED;

    this.loadData("2");
  }

  getParamsForDay(typeParam : String): any {

    let year =  this.yearSelected.value.toString();
    let month =  this.monthSelected.value.toString();
    let day = this.daySelected.value.toString()
    let date = year + month;

    if (typeParam === '2' && ValidationUtil.isNotNullAndNotEmpty(day)) {
      date = date + day;
    }

    let params = {
      userId: this.userId,
      date : date
    }

    this.dateShow = year + '년 ' + month + '월 ' + (day != '' ? day + '일' : '');

    return params;
  }

  loadData(flag : String): void {

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);

    if(flag === "1") {

      this.subscriptions.forEach((subscription) => subscription.unsubscribe());

      let params = this.getParamsForDay("1");

      this._benefitStatmentSearchStore.dispatch(getSelectDate({ params: params }));

      this.subscriptions.push(
        this.daySearchItems$.subscribe(res => {
          if (ValidationUtil.isNotNullAndNotEmpty(res)) {
            this.dayOptions = [];
            let listDate = [...res];

            if(listDate[0] == '없음') {
              this.daySelected = { label: "없음", value: "" };
              this.dayOptions = [
                  { label: "없음", value: "" }
              ];
            } else {
              this.daySelected = { label : listDate[0] + '일',  value : listDate[0] };

              for(let i = 0 ; i<listDate.length;i++) {
              
                let item = {
                  label : listDate[i] + '일',
                  value : listDate[i]
                }
                
                this.dayOptions.push(item);
              }
            }
            this.loadDataBenefit();
            this._benefitStatmentSearchStore.dispatch(getSelectDateSuccess({ benefit: [] }));
          } 
         
        })
      );
    } else {
      this.loadDataBenefit();
    }
  }

  loadDataBenefit(): void {
    let params = this.getParamsForDay("2");


    this._benefitStatmentSearchStore.dispatch(searchFindPayPrint({params:params}));
    this._benefitStatmentSearchStore.dispatch(searchFindPayHistory({params:params}));
    this._benefitStatmentSearchStore.dispatch(getMemberInfo({params:params}));
    this._benefitStatmentSearchStore.dispatch(searchFindOrderHistory({params:params}));
    this._benefitStatmentSearchStore.dispatch(sumFindOrderHistory({params:params}));
    this._benefitStatmentSearchStore.dispatch(searchFindOrderProductHistory({params:params}));
    this._benefitStatmentSearchStore.dispatch(sumFindOrderProductHistory({params:params}));
    

    this.loadGridPayPrint();
    this.loadFindPayHistory();
    this.loadInfoMember();
    this.loadSearchFindOrderHistory();
    this.loadSearchFindOrderProductHistory();
  }

  setBlankRow(flag : String) {

    if(flag === "1") {
      this.totalRowsFindPayPrint = this.collectionFindPayPrint.length;

      if (this.totalRowsFindPayPrint === 0) {
        this.rowsFindPayPrint = new Array(5);

      } else if (this.totalRowsFindPayPrint < 5) {
        this.rowsFindPayPrint = new Array(5 - this.totalRowsFindPayPrint);
      }

      this.colsFindPayPrint = new Array(this.totalColsFindPayPrint);

    } else if(flag === "2") {
      
      this.totalRowsFindPayHistory = this.collectionFindPayHistory.length;

      if (this.totalRowsFindPayHistory === 0) {
        this.rowsFindPayHistory = new Array(5);

      } else if (this.totalRowsFindPayHistory < 5) {
        this.rowsFindPayHistory = new Array(5 - this.totalRowsFindPayHistory);
      }

      this.colsFindPayHistory = new Array(this.totalColsFindPayHistory);

    } else if(flag === "3") {
      
      this.totalRowsOrderHistory = this.collectionOrderHistory.length;

      if (this.totalRowsOrderHistory === 0) {
        this.rowsOrderHistory = new Array(5);

      } else if (this.totalRowsOrderHistory < 5) {
        this.rowsOrderHistory = new Array(5 - this.totalRowsOrderHistory);
      }

      this.colsOrderHistory = new Array(this.totalColsOrderHistory);

    } else if(flag === "4") {
      
      this.totalRowsOrderProductHistory = this.collectionOrderProductHistory.length;

      if (this.totalRowsOrderProductHistory === 0) {
        this.rowsOrderProductHistory = new Array(5);

      } else if (this.totalRowsOrderProductHistory < 5) {
        this.rowsOrderProductHistory = new Array(5 - this.totalRowsOrderProductHistory);
      }

      this.colsOrderProductHistory = new Array(this.totalColsOrderProductHistory);

    }
    
  }

  loadGridPayPrint(): void {
    //Render Body
    this.findPayPrintSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionFindPayPrint = res;
        
        if (this.collectionFindPayPrint.length < 5) {
          this.rowsFindPayPrint = new Array(5 - this.collectionFindPayPrint.length);
        }

      } else {
        this.collectionFindPayPrint = [];
        this.rowsFindPayPrint = new Array(5);
      }

      this.setBlankRow("1");
    });
  }

  loadFindPayHistory(): void {

     //Render Body
     this.findPayHistorySearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionFindPayHistory = res;
        
        if (this.collectionFindPayHistory.length < 5) {
          this.rowsFindPayHistory = new Array(5 - this.collectionFindPayHistory.length);
        }

      } else {
        this.collectionFindPayHistory = [];
        this.rowsFindPayHistory = new Array(5);
      }

      this.setBlankRow("2");
    });

  }

  loadInfoMember() {
    //Render Body
    this.memberInfoSearchItem$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionInfoMember = res;
      }
    });
  }

  loadSearchFindOrderHistory(): void {
  
     //Render Body
     this.orderHistorySearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionOrderHistory = res;
        
        if (this.collectionOrderHistory.length < 5) {
          this.rowsOrderHistory = new Array(5 - this.collectionOrderHistory.length);
        }

      } else {
        this.collectionOrderHistory = [];
        this.rowsOrderHistory = new Array(5);
      }

      this.setBlankRow("3");
    });

    this.sumOrderHistorySearchItem$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionSumOrderHistory = res;
      } else {
        let item = {
          cash : "",
          card : "",
          bankbook : "",
          other : ""
        }
      this.collectionSumOrderHistory = item;
      }
    });
  }
  
  loadSearchFindOrderProductHistory(): void {

    //Render Body
    this.orderProductHistorySearchItems$.subscribe(res => {
    
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionOrderProductHistory = res;
        if (this.collectionOrderProductHistory.length < 5) {
          this.rowsOrderProductHistory= new Array(5 - this.collectionOrderProductHistory.length);
        }

      } else {
        this.collectionOrderProductHistory = [];
        this.rowsOrderProductHistory = new Array(5);
      }
      setTimeout(() => {
        this.setBlankRow("4");
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }, 500);

    });


    this.sumOrderProductHistorySearchItem$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionSumOrderProductHistory = res;

      } else {
        let item = {
          qty : "",
          amt : "",
          pv : "",
        }
      this.collectionSumOrderProductHistory = item;
      }
    });
  }

  handleOnClickReport(): void {
    setTimeout(() => {
      let params = this.getParamsForReport();
      if (ValidationUtil.isNotNullAndNotEmpty(params.userId)  && ValidationUtil.isNotNullAndNotEmpty(params.day)) {
        localStorage.setItem('benefitParams', JSON.stringify(params));
        ReportUtil.openBenefitReport();
      } else {
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: "데이터가 존재하지 않습니다."}}));
      }
    }, 250);
  }

  getParamsForReport() {
    let params = {
      userId: this.userId,
      infoMember : this.collectionInfoMember,
      findPayPrintStatement : this.collectionFindPayPrint,
      findPayHistoryStatement : this.collectionFindPayHistory,
      findOrderHistoryStatement: this.collectionOrderHistory,
      sumOrderHistoryStatement : this.collectionSumOrderHistory,
      findOrderProductHistoryStatement : this.collectionOrderProductHistory,
      sumOrderProductHistoryStatement: this.collectionSumOrderProductHistory,
      dateShow : this.dateShow,
      addrCompany : this.company.addr,
      day : this.daySelected.value.toString(),
    }

    return params;
  }

}
