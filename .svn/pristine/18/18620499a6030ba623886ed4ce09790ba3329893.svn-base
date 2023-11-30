import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConsumerSalesRatioInquiryModel } from '../../../models/myoffice/omnitrition/consumer-sales-ratio-inquiry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmnitritionConsumerSalesRatioInquiryService {

  constructor(private http:HttpClient) { }

  search(params:any):Observable<ConsumerSalesRatioInquiryModel[]>{
   
    let url = `${environment.apiUrl}/omni/consumerSales/search2`;
    return  this.http.post<ConsumerSalesRatioInquiryModel[]>(url, params);

  }
  getCount(params:any):Observable<number>{
    
    let url = `${environment.apiUrl}/omni/salesRatioInquiry/count`;
    return  this.http.post<number>(url, params);
  }

  getSum(params:any):Observable<ConsumerSalesRatioInquiryModel>{
 
    let url = `${environment.apiUrl}/omni/salesRatioInquiry/sum`;
    return  this.http.post<ConsumerSalesRatioInquiryModel>(url, params);
  }
  
}
