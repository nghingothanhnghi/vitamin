import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResultProc } from '@models/system/result-proc.model'


@Injectable({
  providedIn: 'root'
})
export class MemberRegistService {

  constructor(private _http: HttpClient) { }

  checkMobile(mobile: string) {
    return this._http.get<Boolean>(`${environment.apiUrl}/member/check-mobile?mobile=${mobile}&comid=${environment.comId}`);
  }
  checkEmail(email: string) {
    return this._http.get<Boolean>(`${environment.apiUrl}/member/check-email?email=${email}&comid=${environment.comId}`);
  }

  save(params: any) {
    let url = `${environment.apiUrl}/member/save`;
    return this._http.post<ResultProc>(url, params);
  }

}

