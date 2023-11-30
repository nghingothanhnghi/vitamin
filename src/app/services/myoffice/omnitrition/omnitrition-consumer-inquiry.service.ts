import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConsumerRegistrationModel } from '../../../models/myoffice/omnitrition/consumer-registration.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OmnitritionConsumerInquiryService {

  constructor(private http:HttpClient) { }

  search(params:any):Observable<ConsumerRegistrationModel[]>{
    let url = `${environment.apiUrl}/omni/consumerInquiry/search`;
    return  this.http.post<ConsumerRegistrationModel[]>(url, params);
    
  }
  getCount(params:any):Observable<Number>{
    let url = `${environment.apiUrl}/omni/consumerInquiry/count`;
    return  this.http.post<Number>(url, params);
  }

  
}
