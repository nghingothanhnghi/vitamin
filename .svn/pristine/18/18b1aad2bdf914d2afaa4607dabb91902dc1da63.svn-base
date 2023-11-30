import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { OrderProductReportModel } from "@app/models/myoffice/report/order-product.model";
import { environment } from "@enviroments/environment";
import { OrderMstModel } from "@app/models/myoffice/order/order-mst.model";

@Injectable({
  providedIn: 'root'
})
export class OrderReportService {

  constructor(private http: HttpClient) { }

  getOrderProductByOrderNo(ordNo: string): Observable<OrderProductReportModel[]> {
    let url = `${environment.apiUrl}/report/order/listOrdPdt?ordNo=${ordNo}&comId=${environment.comId}`;
    return this.http.get<OrderProductReportModel[]>(url);
  }

  getOrderMstByOrderNo(ordNo: string): Observable<OrderMstModel> {
    let url = `${environment.apiUrl}/report/order/ordMst?ordNo=${ordNo}&comId=${environment.comId}`;
    return this.http.get<OrderMstModel>(url);
  }
}