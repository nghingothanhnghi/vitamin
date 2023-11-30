import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConsumerSalesRegistrationModel } from '../../../models/myoffice/omnitrition/consumer-sales-registration.model';
import { ResultProcessModel } from '../../../models/myoffice/result-process.model';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerSalesRegistrationService {

  constructor(private http:HttpClient) { }

  getlistConsumer(params:any):Observable<ConsumerSalesRegistrationModel[]>{
    let url = `${environment.apiUrl}/omni/salesRegistration/listConsumer`;
    return  this.http.post<ConsumerSalesRegistrationModel[]>(url, params);
  }
  getInfoConsumer(csmId:string):Observable<ConsumerSalesRegistrationModel> {
    let url = `${environment.apiUrl}/omni/salesRegistration/infoConsumer?comId=${environment.comId}&lang=${environment.default_lang}&consumerId=${csmId}`;
    return  this.http.get<ConsumerSalesRegistrationModel>(url);
  }

  getConsumerSales(userId:string):Observable<ConsumerSalesRegistrationModel>{
    let url = `${environment.apiUrl}/omni/salesRegistration/salesRatio?comId=${environment.comId}&lang=${environment.default_lang}&userId=${userId}`;
    return  this.http.get<ConsumerSalesRegistrationModel>(url);
  }
  getListPdt(userId:string):Observable<ConsumerSalesRegistrationModel[]>{

    let url = `${environment.apiUrl}/omni/salesRegistration/listPdt?comId=${environment.comId}&lang=${environment.default_lang}&userId=${userId}`;
    return  this.http.get<ConsumerSalesRegistrationModel[]>(url);

  }
  getCountPdt(userId:string):Observable<number>{
    let url = `${environment.apiUrl}/omni/salesRegistration/countPdt?comId=${environment.comId}&lang=${environment.default_lang}&userId=${userId}`;

    return  this.http.get<number>(url);

  }
  getListSale(userId:string):Observable<ConsumerSalesRegistrationModel[]>{
    let url = `${environment.apiUrl}/omni/salesRegistration/getListSale?comId=${environment.comId}&userId=${userId}`;
    return  this.http.get<ConsumerSalesRegistrationModel[]>(url);
  }

  getCntSale(userId:string):Observable<number> {

    let url = `${environment.apiUrl}/omni/salesRegistration/countSales?comId=${environment.comId}&userId=${userId}`;
    return  this.http.get<number>(url);
    
  }

  save(params: any): Observable<ResultProcessModel> {
    let member = AuthUtil.getLoginedInfo();
    //let userId = 'KR00050004'//TODO
        let userId = '';

    if (member) {
      userId = ConvertUtil.convertToSring(member.userid);
    }
    let url = `${environment.apiUrl}/omni/salesRegistration/save?comId=${environment.comId}&workUser=${userId}`;
    return this.http.post<ResultProcessModel>(url, params);
  }

}
