import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMileageInquiryModel } from '@app/models/myoffice/order/order-mileage-inquiry.model';

@Injectable({
  providedIn: 'root'
})
export class OrderMileageInquiryService {

  constructor(private _http: HttpClient) { }

  searchOrderMileageInquiry(params: any): Observable<OrderMileageInquiryModel[]> {
    let url = `${environment.apiUrl}/order/mileageInquiry/search`;
    return this._http.post<OrderMileageInquiryModel[]>(url, params);
  }

  countOrderMileageInquiry(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/order/mileageInquiry/count`;
    return this._http.post<Number>(url, params);
  }

  sumOrderMileageInquiry(params: any): Observable<OrderMileageInquiryModel> {
    let url = `${environment.apiUrl}/order/mileageInquiry/sum`;
    return this._http.post<OrderMileageInquiryModel>(url, params);
  }
}