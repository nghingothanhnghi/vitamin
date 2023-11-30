import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { OrderMoneyModel } from '@app/models/myoffice/order/order-money.model';

@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {

  constructor(private _http: HttpClient) { }

  getOrderInfo(params: any): Observable<OrderMstModel[]> {
    let url = `${environment.apiUrl}/order/infoOrder`;
    return this._http.post<OrderMstModel[]>(url, params);
  }

  getInfoPay(params: any): Observable<OrderMoneyModel[]> {
    let url = `${environment.apiUrl}/order/infoOrderPay`;
    return this._http.post<OrderMoneyModel[]>(url, params);
  }

  getInfoPdt(orderNo: string): Observable<OrderPdtModel[]> {
    let url = `${environment.apiUrl}/order/infoOrderPdt/search?comId=${environment.comId}&ordNo=${orderNo}`;
    return this._http.get<OrderPdtModel[]>(url);
  }
  
  getSumInfoPdt(orderNo: string): Observable<OrderPdtModel> {
    let url = `${environment.apiUrl}/order/infoOrderPdt/sum?comId=${environment.comId}&ordNo=${orderNo}`;
    return this._http.get<OrderPdtModel>(url);
  }

  getDeliOrd(orderNo: string): Observable<OrderMstModel[]> {
    let url = `${environment.apiUrl}/order/deliOrd?comId=${environment.comId}&ordNo=${orderNo}`;
    return this._http.get<OrderMstModel[]>(url);
  }
}