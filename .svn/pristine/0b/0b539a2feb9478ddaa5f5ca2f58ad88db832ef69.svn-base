import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';

@Injectable({
  providedIn: 'root'
})
export class OrderMonthlyService {

  constructor(private _http: HttpClient) { }

  searchOrderMonthly(params: any): Observable<OrderMonthlyModel[]> {
    let url = `${environment.apiUrl}/order/orderMonthSearch`;
    return this._http.post<OrderMonthlyModel[]>(url, params);
  }

  countOrderMonthly(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/order/orderMonthCount`;
    return this._http.post<Number>(url, params);
  }

  sumOrderMonthly(params: any): Observable<OrderMonthlyModel> {
    let url = `${environment.apiUrl}/order/orderMonthSum`;
    return this._http.post<OrderMonthlyModel>(url, params);
  }
}