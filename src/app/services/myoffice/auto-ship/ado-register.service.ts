import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ADORegisterService {

  constructor(private _http: HttpClient) { }

  loadADOProducts(params: any): Observable<ADORegisterModel[]> {
    const url = `${environment.apiUrl}/ado/reg/product/search`;
    return this._http.post<ADORegisterModel[]>(url, params);
  }

  countADOProduct(params: any): Observable<number> {
    const url = `${environment.apiUrl}/ado/reg/product/count`;
    return this._http.post<number>(url, params);
  }

  loadAdmitDate(yyyymm: string): Observable<ADORegisterModel[]> {
    const url = `${environment.apiUrl}/ado/reg/AdmitDate/${environment.comId}/${yyyymm}`;
    return this._http.get<ADORegisterModel[]>(url);
  }

  loadAdoInfo(userid: string): Observable<ADORegisterModel> {
    const url = `${environment.apiUrl}/ado/info/${environment.comId}/${environment.default_lang}/${userid}`;
    return this._http.get<ADORegisterModel>(url);
  }

  loadDeliInfo(): Observable<ADORegisterModel> {
    const url = `${environment.apiUrl}/ado/reg/deliInfo/${environment.comId}`;
    return this._http.get<ADORegisterModel>(url);
  }

  registerADO(data: any): Observable<ADORegisterModel> {
    const url = `${environment.apiUrl}/ado/reg`;
    return this._http.post<ADORegisterModel>(url, data);
  }

  countTotalOrdered(userid: string): Observable<number> {
    const url = `${environment.apiUrl}/ado/reg/countTotalOrdered/${environment.comId}/${userid}`;
    return this._http.get<number>(url);
  }

  countTotalAdoCancelBetween90Days(userid: string): Observable<number> {
    const url = `${environment.apiUrl}/ado/reg/countTotalAdoCancelBetween90Days/${environment.comId}/${userid}`;
    return this._http.get<number>(url);
  }
}

