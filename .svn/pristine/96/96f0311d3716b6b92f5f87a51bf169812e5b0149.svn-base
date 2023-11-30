import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

@Injectable({
  providedIn: 'root'
})
export class DeliPopupService {

  constructor(private _http: HttpClient) { }

  loadDelis(userid: string, page: number, len: number): Observable<OrderMstModel[]> {
    let url = `${environment.apiUrl}/popup/deli/search/${userid}?comid=${environment.comId}&page=${page}&len=${len}`;
    return this._http.get<OrderMstModel[]>(url);
  }

  countDeli(userid: string, page: number, len: number): Observable<number> {
    let url = `${environment.apiUrl}/popup/deli/count/${userid}?comid=${environment.comId}&page=${page}&len=${len}`;
    return this._http.get<number>(url);
  }
}