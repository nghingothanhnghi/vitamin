import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';

@Injectable({
  providedIn: 'root'
})
export class InquiryPerformanceSearchService {

  constructor(private _http: HttpClient) { }

  searchInquiryPer(params: any): Observable<OrderMstModel[]> {
    let url = `${environment.apiUrl}/order/searchInquiryPerformance`;
    return this._http.post<OrderMstModel[]>(url, params);
  }

  sumInquiryPer(params: any): Observable<OrderPdtModel> {
    let url = `${environment.apiUrl}/order/sumInquiryPerformance`;
    return this._http.post<OrderPdtModel>(url, params);
  }
}