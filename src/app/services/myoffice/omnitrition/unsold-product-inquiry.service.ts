import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { ConsumerSalesRegistrationModel } from '../../../models/myoffice/omnitrition/consumer-sales-registration.model';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UnsoldProductInquiryService {

  constructor(private http:HttpClient) { }

  search(params:any):Observable<ConsumerSalesRegistrationModel[]>{
     let url = `${environment.apiUrl}/omni/unsoldProductInquiry/search`;
      return  this.http.post<ConsumerSalesRegistrationModel[]>(url, params);
  }
  getSum(params:any):Observable<ConsumerSalesRegistrationModel>{
    let url = `${environment.apiUrl}/omni/unsoldProductInquiry/sum`;
      return  this.http.post<ConsumerSalesRegistrationModel>(url, params);
  }
  getCount(params:any):Observable<number>{
    let url = `${environment.apiUrl}/omni/unsoldProductInquiry/count`;
  
    return  this.http.post<number>(url, params);
  }

}
