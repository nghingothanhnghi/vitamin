import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '@app/models/system/company.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyState, getCompany } from '@app/selectors/system/company.selector';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { loadCompany } from '@app/actions/system/company.actions';
import { getListOrderPdtWithdrawal, getOrderMstWithdrawal, getSumOrderPdtWithdrawal, OrderWithdrawalState } from '@app/selectors/myoffice/report/order-withdrawal.selector';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderWithdrawalPdt } from '@app/models/myoffice/report/order-withdrawal-product.model';
import { loadListOrderPdtWithdrawal, loadOrderMstWithdrawal, loadSumOrderPdtWithdrawal } from '@app/actions/myoffice/report/order-withrawal.action';

@Component({
  selector: 'order-withdrawal',
  templateUrl: './order-withdrawal.component.html',
  styleUrls: ['./order-withdrawal.component.css']
})
export class OrderWithdrawalComponent implements OnInit {

  orderNo: string = "";

  yyyymmdd: string = "";

  countDone: number = 0;
  totalDone: number = 4;

  company$ = new Observable<Company>;
  company: Company = {} as Company;

  ordMst$ = new Observable<OrderMstModel>;
  ordMst: OrderMstModel = {} as OrderMstModel;

  listOrdPdt$ = new Observable<OrderWithdrawalPdt[]>;
  listOrdPdt: OrderWithdrawalPdt[] = [] as OrderWithdrawalPdt[];

  sumOrdPdt$ = new Observable<OrderWithdrawalPdt>;
  sumOrdPdt: OrderWithdrawalPdt = {} as OrderWithdrawalPdt;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _companyStore: Store<CompanyState>,
    private _orderWithdrawalStore: Store<OrderWithdrawalState>
  ) { 
    this.company$ = this._companyStore.select(getCompany);
    this.ordMst$ = this._orderWithdrawalStore.select(getOrderMstWithdrawal);
    this.listOrdPdt$ = this._orderWithdrawalStore.select(getListOrderPdtWithdrawal);
    this.sumOrdPdt$ = this._orderWithdrawalStore.select(getSumOrderPdtWithdrawal);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.orderNo = ConvertUtil.convertToSring(params.get("orderNo"));
      this.countDone = 0;

      if (ValidationUtil.isNotNullAndNotEmpty(this.orderNo)) {
        this._companyStore.dispatch(loadCompany());
        this._orderWithdrawalStore.dispatch(loadOrderMstWithdrawal({ ordNo: this.orderNo }));
        this._orderWithdrawalStore.dispatch(loadListOrderPdtWithdrawal({ ordNo: this.orderNo }));
        this._orderWithdrawalStore.dispatch(loadSumOrderPdtWithdrawal({ ordNo: this.orderNo }));
      }
    });

    let now = new Date();
    this.yyyymmdd = now.getFullYear() + "" + ConvertUtil.convertToZeroDecimal(now.getMonth() + 1) + "" + ConvertUtil.convertToZeroDecimal(now.getDate());

    this.company$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.company = res;
        this.print();
      }
    });

    this.ordMst$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.ordMst = res;
        this.print();
      }
    });

    this.listOrdPdt$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.listOrdPdt = res;
        this.print();
      }
    });

    this.sumOrdPdt$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.sumOrdPdt = res;
        this.print();
      }
    });
  }

  print(): void {
    if (ValidationUtil.isNullOrEmpty(this.company.comId)) return;
    if (ValidationUtil.isNullOrEmpty(this.ordMst.ordNo)) return;
    if (ValidationUtil.isNullOrEmpty(this.listOrdPdt)) return;
    if (!this.sumOrdPdt.amt && !this.sumOrdPdt.qty) return;

    window.print();
  }
}
