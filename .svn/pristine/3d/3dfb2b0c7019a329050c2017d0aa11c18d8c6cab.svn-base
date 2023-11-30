import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Member } from '@app/models/myoffice/member/member.model'

@Injectable({
  providedIn: 'root'
})
export class MemberPopupService {

  constructor(private _http: HttpClient) { }

  searchMemberPopup(params: any): Observable<Member[]> {
    let url = `${environment.apiUrl}/popup/memberSearch?value=${params.value}&page=${params.page}&len=${params.len}&comid=${environment.comId}&lang=${environment.default_lang}`;
    if(params.prgid){
      url =`${url}&prgid=${params.prgid}`
    }
    return this._http.get<Member[]>(url);
  }

  countMemberPopup(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/popup/memberCount?value=${params.value}&page=${params.page}&len=${params.len}&comid=${environment.comId}&lang=${environment.default_lang}`;
    if(params.prgid){
      url =`${url}&prgid=${params.prgid}`
    }
    return this._http.get<Number>(url);
  }
}