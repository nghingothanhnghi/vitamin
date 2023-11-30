import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@enviroments/environment';
import { MemberModel } from '@app/models/system/member.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { Member } from '@app/models/myoffice/member/member.model';

@Injectable({
  providedIn: 'root'
})
export class Login2Service {

  constructor(private http: HttpClient) { }

  getLoginInfo(params: any): Observable<MemberModel> {
    // let url = `${environment.apiUrl}/auth/login-userid`;
    let url = `${environment.apiUrl}/auth/login-userid/${params.userid}/${params.password}/${environment.comId}`;
    // return this.http.post<MemberModel>(url, params);
    return this.http.get<MemberModel>(url);
  }

  coutBonus(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/auth/check-bonus`;
    return this.http.post<Number>(url, params);
  }

  findId(params: any): Observable<MemberModel>{
    let url = `${environment.apiUrl}/auth/find-log-id/${params.username}/${params.birthday}/${params.phone}`;

    return this.http.get<MemberModel>(url);
  }

  findPassWd(params: any): Observable<ResultProcessModel>{
    let url = `${environment.apiUrl}/auth/find-log-password/${params.logId}/${params.username}/${params.birthday}/${params.phone}`;

    return this.http.get<ResultProcessModel>(url);
  }

  loginUserid2(userid2: string): Observable<Member>{
    let url = `${environment.apiUrl}/auth/login-userid2?userid2=${userid2}&comid=${environment.comId}`;
    return this.http.get<Member>(url);
  }

  findMember(params: any): Observable<MemberModel> {
    let url = `${environment.apiUrl}/find-reg-member`;
    return this.http.post<MemberModel>(url, params);
  }

}

