import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";
import { environment } from "@enviroments/environment";
import { OrderWithdrawalPdt } from "@app/models/myoffice/report/order-withdrawal-product.model";

@Injectable({
  providedIn: 'root'
})
export class OrderWithdrawalService {

  constructor(private http: HttpClient) { }

  loadOrderMstWithdralwal(orderNo: string): Observable<OrderMstModel> {
    let url = `${environment.apiUrl}/report/orderWithdrawal/orderMst?comId=${environment.comId}&ordNo=${orderNo}`;
    return this.http.get<OrderMstModel>(url);
  }

  loadListOrderPdtWithdralwal(orderNo: string): Observable<OrderWithdrawalPdt[]> {
    let url = `${environment.apiUrl}/report/orderWithdrawal/listOrdPdt?comId=${environment.comId}&ordNo=${orderNo}`;
    return this.http.get<OrderWithdrawalPdt[]>(url);
  }

  loadSumOrderPdtWithdralwal(orderNo: string): Observable<OrderWithdrawalPdt> {
    let url = `${environment.apiUrl}/report/orderWithdrawal/sumOrdPdt?comId=${environment.comId}&ordNo=${orderNo}`;
    return this.http.get<OrderWithdrawalPdt>(url);
  }
}