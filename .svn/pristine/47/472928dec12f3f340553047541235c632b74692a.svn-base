import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PaymentCardResult } from '@app/models/shoppingmall/payment-card-result.model';

@Injectable({
  providedIn: 'root'
})
export class VbBankService {

  constructor(private _http: HttpClient) { }

  payVBank(params: any): Observable<PaymentCardResult> {
    let url = `${environment.apiUrl}/paymentVBBankNew`;
    return this._http.post<PaymentCardResult>(url, params);
  }
}