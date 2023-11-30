import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

@Injectable({
  providedIn: 'root'
})
export class OrderSearchService {

  constructor(private _http: HttpClient) { }

  searchOrder(params: any): Observable<OrderMstModel[]> {
    let url = `${environment.apiUrl}/order/search`;
    return this._http.post<OrderMstModel[]>(url, params);
  }

  countOrder(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/order/count`;
    return this._http.post<Number>(url, params);
  }

  sumOrder(params: any): Observable<OrderMstModel> {
    let url = `${environment.apiUrl}/order/sum`;
    return this._http.post<OrderMstModel>(url, params);
  }
}