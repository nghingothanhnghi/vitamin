import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { KICCCardModel } from '@app/models/shoppingmall/kicc-card.model';

@Injectable({
  providedIn: 'root'
})
export class KICCPaymentService {

  constructor(private _http: HttpClient) { }

  payCard(params: any): Observable<KICCCardModel> {
    let url = `${environment.apiUrl}/paymentCard`;
    return this._http.post<KICCCardModel>(url, params);
  }
}