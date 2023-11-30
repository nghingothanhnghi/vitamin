import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';

@Injectable({
  providedIn: 'root'
})
export class OrderProductSearchService {

  constructor(private _http: HttpClient) { }

  searchOrderProduct(params: any): Observable<OrderPdtModel[]> {
    let url = `${environment.apiUrl}/order/searchPdtOrder`;
    return this._http.post<OrderPdtModel[]>(url, params);
  }

  countOrderProduct(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/order/countPdtOrder`;
    return this._http.post<Number>(url, params);
  }

  sumOrderProduct(params: any): Observable<OrderPdtModel> {
    let url = `${environment.apiUrl}/order/sumPdtOrder`;
    return this._http.post<OrderPdtModel>(url, params);
  }
}