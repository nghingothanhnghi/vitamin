import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { loadCompany } from '@app/actions/system/company.actions';
import { Company } from '@app/models/system/company.model';
import { getOrderInfosReport, getOrderMstReport, getOrderProductsReport, OrderReportState } from '@app/selectors/myoffice/report/order-report.selector';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderProductReportModel } from '@app/models/myoffice/report/order-product.model';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { loadOrderInfoReport, loadOrderMstReport, loadOrderProductReport } from '@app/actions/myoffice/report/order-report.action';
import { getMemInfo, MemberInfoInquiryState } from '@app/selectors/myoffice/member/member-infor-inquiry.selector';
import { MemInfo } from '@app/models/myoffice/member/mem-info.model';
import { loadMemInfo } from '@app/actions/myoffice/member/member-infor-inquiry.actions';
import { environment } from '@enviroments/environment';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { getSmWownet, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { loadSmWownet } from '@app/actions/system/sm-wownet.action';

@Component({
  selector: 'order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {

  userid: string = "";
  orderNo: string = "";

  totalDone: number = 0;

  company$ = new Observable<Company>;
  company: Company = {} as Company;

  orderProducts$ = new Observable<OrderProductReportModel[]>;
  orderProducts: OrderProductReportModel[] = [];

  orderMst$ = new Observable<OrderMstModel>;
  orderMst: OrderMstModel = {} as OrderMstModel;

  memInfo$ = new Observable<MemInfo>;
  memInfo: MemInfo = {} as MemInfo;

  orderInfos$ = new Observable<OrderMstModel[]>;
  orderInfo: OrderMstModel = {} as OrderMstModel;

  smWownet$ = new Observable<SmWownetModel>;
  smWownet: SmWownetModel = {} as SmWownetModel;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _companyStore: Store<CompanyState>,
    private _orderReportStore: Store<OrderReportState>,
    private _memberInfoStore: Store<MemberInfoInquiryState>,
    private _smWownetStore: Store<SmWownetState>,
  ) { 
    this.company$ = this._companyStore.select(getCompany);
    this.orderProducts$ = this._orderReportStore.select(getOrderProductsReport);
    this.orderMst$ = this._orderReportStore.select(getOrderMstReport);
    this.orderInfos$ = this._orderReportStore.select(getOrderInfosReport);
    this.memInfo$ = this._memberInfoStore.select(getMemInfo);
    this.smWownet$ = this._smWownetStore.select(getSmWownet);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userid = ConvertUtil.convertToSring(params.get("userid"));
      this.orderNo = ConvertUtil.convertToSring(params.get("orderNo"));
      
      if (ValidationUtil.isNotNullAndNotEmpty(this.userid) && ValidationUtil.isNotNullAndNotEmpty(this.orderNo)) {
        this._companyStore.dispatch(loadCompany());
        this._orderReportStore.dispatch(loadOrderProductReport({ ordNo: this.orderNo }));
        this._orderReportStore.dispatch(loadOrderMstReport({ ordNo: this.orderNo }));
        this._orderReportStore.dispatch(loadOrderInfoReport({ params: {comId: environment.comId, lang: environment.default_lang, ordNo: this.orderNo} }));
        this._memberInfoStore.dispatch(loadMemInfo(this.userid));
        this._smWownetStore.dispatch(loadSmWownet());
      }
    });
    
    this.company$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.company = res;
        this.print();
      }
    });

    this.orderProducts$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.orderProducts = res;
        this.print();
      }
    });

    this.orderMst$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.orderMst = res;
        this.print();
      }
    });

    this.orderInfos$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.orderInfo = res[res.length - 1];
        this.print();
      }
    });

    this.memInfo$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.memInfo = res;
        this.print();
      }
    });

    this.smWownet$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.smWownet = res;
        this.print();
      }
    });
  }

  print(): void {
    if (ValidationUtil.isNullOrEmpty(this.company.comId)) return;
    if (ValidationUtil.isNullOrEmpty(this.orderProducts)) return;
    if (ValidationUtil.isNullOrEmpty(this.orderMst.ordNo)) return;
    if (ValidationUtil.isNullOrEmpty(this.orderInfo.ordNo)) return;
    if (ValidationUtil.isNullOrEmpty(this.memInfo.userid)) return;
    if (ValidationUtil.isNullOrEmpty(this.smWownet.comId)) return;
    setTimeout(() => window.print(), 500);
  }
}
