import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConsumerRegistrationModel } from '../../../models/myoffice/omnitrition/consumer-registration.model';
import { Observable } from 'rxjs';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';

@Injectable({
  providedIn: 'root'
})
export class OmnitritionConsumerRegistrationService {

  constructor(private http:HttpClient) { }

  getlistConsumer(params:any):Observable<ConsumerRegistrationModel[]> {
    let url = `${environment.apiUrl}/omni/consumerRegistration/list`;
    return  this.http.post<ConsumerRegistrationModel[]>(url, params);
  }

  getCountConsumer(params:any):Observable<number>{
    let url = `${environment.apiUrl}/omni/consumerRegistration/count`;
    return  this.http.post<number>(url, params);
  }

  save(params:any):Observable<ResultProcessModel>{
    let url = `${environment.apiUrl}/omni/consumerRegistration/save`;
    return  this.http.post<ResultProcessModel>(url,params);
  }
   delete(params:any):Observable<ResultProcessModel>{
       let url = `${environment.apiUrl}/omni/consumerRegistration/delete?consumerId=${(params.consumerId)}&comId=${environment.comId}&workUser=${params.workUser}`;
      return  this.http.get<ResultProcessModel>(url);
   }

  
}
