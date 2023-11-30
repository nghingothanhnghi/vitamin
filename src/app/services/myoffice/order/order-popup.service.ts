import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderPopupModel } from '@app/models/myoffice/order/order-popup.model';

@Injectable({
  providedIn: 'root'
})
export class OrderPopupService {

  constructor(private _http: HttpClient) { }

  searchOrderPopup(params: any): Observable<OrderPopupModel[]> {
    let url = `${environment.apiUrl}/popup/order/search`;
    return this._http.post<OrderPopupModel[]>(url, params);
  }

  countOrderPopup(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/popup/order/count`;
    return this._http.post<Number>(url, params);
  }
}