import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rank } from '@models/system/rank.model'
import { Member } from '@models/myoffice/member/member.model'
import { AbPosInfo } from '@app/models/myoffice/member/abpos-info.model';

@Injectable({
  providedIn: 'root'
})
export class MemberInforPositionService {

  constructor(private _http: HttpClient) { }

  getRankMember(params: any) {
    let url = `${environment.apiUrl}/member/rank-position`;
    return this._http.post<Rank[]>(url, params);
  }
  getMemberRId(params: any) {
    let url = `${environment.apiUrl}/member/find-position`;
    return this._http.post<Member[]>(url, params);
  }
  countMemberRId(params: any) {
    let url = `${environment.apiUrl}/member/count-position`;
    return this._http.post<Number>(url, params);
  }
  abPosinfo(userId: string) {
    return this._http.get<AbPosInfo>(`${environment.apiUrl}/member/abPos-info?userid=${userId}&comid=${environment.comId}&lang=${environment.default_lang}`);
  }
  binaryLegSearch(params: any) {
    let url = `${environment.apiUrl}/member/binary-leg-search`;
    return this._http.post<Member[]>(url, params);
  }
  binaryLegCount(params: any) {
    let url = `${environment.apiUrl}/member/binary-leg-count`;
    return this._http.post<Number>(url, params);
  }
}

