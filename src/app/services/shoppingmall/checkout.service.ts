import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ResultProc } from '@app/models/system/result-proc.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _http: HttpClient) { }

  saveOrderMoneyTmp(params: any): Observable<ResultProc> {
    let url = `${environment.apiUrl}/ordreg/ord-money-tmp`;
    return this._http.post<ResultProc>(url, params);
  }

  saveOrder(params: any): Observable<ResultProc> {
    let url = `${environment.apiUrl}/ordreg/save`;
    return this._http.post<ResultProc>(url, params);
  }
}