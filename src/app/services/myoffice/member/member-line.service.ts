import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rank } from '@models/system/rank.model'
import { Member } from '@models/myoffice/member/member.model'

@Injectable({
  providedIn: 'root'
})
export class MemberLineService {

  constructor(private _http: HttpClient) { }

  findLine(params: any) {
    let url = `${environment.apiUrl}/member/find-line`;
    return this._http.post<Member[]>(url, params);
  }
  countLine(params: any) {
    let url = `${environment.apiUrl}/member/count-line`;
    return this._http.post<Number>(url, params);
  }
  
  findTopLineMember (userId: string, logId: string, memberType: string) {
    return this._http.get<Member>(`${environment.apiUrl}/member/top-line?userid=${userId}&logid=${logId}&memberType=${memberType}`);
  }
}

