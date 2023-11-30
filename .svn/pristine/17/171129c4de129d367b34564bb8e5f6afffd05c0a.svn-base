import { Component, HostListener, OnInit } from '@angular/core';
import { loadFindPayHeader, loadWowWord } from '@app/actions/system/sm-wownet.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { MemberBenefitModel } from '@app/models/myoffice/benefit/member-benefit.module';
import { OrderHistoryModel } from '@app/models/myoffice/benefit/order-history.module';
import { PayPrintModel } from '@app/models/myoffice/benefit/pay-print.module';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { getFindPayHeader, getWowWord, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const getYnPayHeader: any;

@Component({
  selector: 'app-benefit-statement-report',
  templateUrl: './benefit-statement-report.component.html',
  styleUrls: ['./benefit-statement-report.component.css']
})
export class BenefitStatementReportComponent implements OnInit {

  // find pay print
  findPayPrintSearchItems$ = new Observable<PayPrintModel[]>;
  collectionFindPayPrint: PayPrintModel[] = [];

  // find pay history
  findPayHistorySearchItems$ = new Observable<PayPrintModel[]>;
  collectionFindPayHistory: PayPrintModel[] = [];

  //Member info
  memberInfoSearchItem$ = new Observable<MemberBenefitModel>;
  collectionInfoMember: any = {} as MemberBenefitModel ;

  //grid-order-history
  orderHistorySearchItems$ = new Observable<OrderHistoryModel[]>;
  sumOrderHistorySearchItem$ = new Observable<OrderHistoryModel>;
  collectionOrderHistory: OrderHistoryModel[] = [];
  collectionSumOrderHistory: any = {} as OrderHistoryModel ;

  //grid-order-product-history
  orderProductHistorySearchItems$ = new Observable<OrderHistoryModel[]>;
  sumOrderProductHistorySearchItem$ = new Observable<OrderHistoryModel>;
  collectionOrderProductHistory: OrderHistoryModel[] = [];
  collectionSumOrderProductHistory: any = {} as OrderHistoryModel ;

  params : any = "";

  isPv1: boolean = false;
  isPv2: boolean = false;
  isPv3: boolean = false;
  smPayHeader$ = new Observable<SmPayHeaderModel>();
  
  smWowWord$ = new Observable<WownetWordModel>();
  smWowWord: any = {} as WownetWordModel;
  
  dateShow : String = "";
  addrCompany: String = "";

  constructor(
    private _smWownetStateStore: Store<SmWownetState>
  ) { 
    this.smPayHeader$ = this._smWownetStateStore.select(getFindPayHeader);
    this.smWowWord$ = this._smWownetStateStore.select(getWowWord);
  }

  ngOnInit(): void {

    this._smWownetStateStore.dispatch(loadWowWord());
    this._smWownetStateStore.dispatch(loadFindPayHeader());

    this.smPayHeader$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.isPv1 = getYnPayHeader(res, "pv1");
        this.isPv2 = getYnPayHeader(res, "pv2");
        this.isPv3 = getYnPayHeader(res, "pv3");
      }
    });

    this.smWowWord$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWowWord = res;
      }
    });

    this.params = localStorage.getItem("benefitParams");
    let paramsParse = JSON.parse(this.params);

    this.loadData(paramsParse);

  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: any) {
    localStorage.removeItem("benefitParams");
  }

  loadData(params : any): void {
    this.dateShow = params.dateShow;
    this.addrCompany = params.addrCompany;

    this.loadGridPayPrint(params.findPayPrintStatement);
    this.loadFindPayHistory(params.findPayHistoryStatement);
    this.loadMemberInfo(params.infoMember);
    this.loadSearchFindOrderHistory(params.findOrderHistoryStatement, params.sumOrderHistoryStatement);
    this.loadSearchFindOrderProductHistory(params.findOrderProductHistoryStatement, params.sumOrderProductHistoryStatement);

  }

  loadGridPayPrint(data : any): void {
    if (ValidationUtil.isNotNullAndNotEmpty(data)) {
      this.collectionFindPayPrint = data;

    } else {
      this.collectionFindPayPrint = [];
    }
  }

  loadFindPayHistory(data : any): void {

    if (ValidationUtil.isNotNullAndNotEmpty(data)) {
      this.collectionFindPayHistory = data;
      
    } else {
      this.collectionFindPayHistory = [];
    }

  }

  loadMemberInfo(data : any): void {
    this.collectionInfoMember = data;
  }

  loadSearchFindOrderHistory(data : any, dataSum: any): void {
    
    if (ValidationUtil.isNotNullAndNotEmpty(data)) {
      this.collectionOrderHistory = data;
      
    } else {
      this.collectionOrderHistory = [];
    }

    if (ValidationUtil.isNotNullAndNotEmpty(dataSum)) {
      this.collectionSumOrderHistory = dataSum;

    } else {
      let item = {
        cash : "",
        card : "",
        bankbook : "",
        other : ""
      }

      this.collectionSumOrderHistory = item;
    }
  }
  
  loadSearchFindOrderProductHistory(data : any, dataSum : any): void {

    if (ValidationUtil.isNotNullAndNotEmpty(data)) {
      this.collectionOrderProductHistory = data;

    } else {
      this.collectionOrderProductHistory = [];
    }

    if (ValidationUtil.isNotNullAndNotEmpty(dataSum)) {
      this.collectionSumOrderProductHistory = dataSum;

    } else {
      let item = {
        qty : "",
        amt : "",
        pv : "",
      }

      this.collectionSumOrderProductHistory = item;
    }

    setTimeout(() => window.print(), 500);

  }

}
