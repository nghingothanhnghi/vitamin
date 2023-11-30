import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PaymentBankModel } from '@app/models/shoppingmall/payment-bank.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentBankService {

  constructor(private _http: HttpClient) { }

  loadPaymentBanks(): Observable<PaymentBankModel[]> {
    let url = `${environment.apiUrl}/ordreg/paymentBank/${environment.comId}`;
    return this._http.get<PaymentBankModel[]>(url);
  }
}