import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MemInfo } from '@models/myoffice/member/mem-info.model';
import { RankHistory } from '@models/myoffice/member/rank-history.model';
import { AffiliatedMember } from '@models/myoffice/member/affiliated-member.model';
import { OrdMonth } from '@models/myoffice/member/ord-month.model';
import { Member } from '@models/myoffice/member/member.model';
import { MemRank } from '@models/myoffice/member/mem-rank.model';
import { OrdMonthly } from '@models/myoffice/member/ord-monthly.model';

@Injectable({
  providedIn: 'root'
})
export class MemberInforInquiryService {

  constructor(private http: HttpClient) { }

  getMemInfo(userId: string) {
    return this.http.get<MemInfo>(`${environment.apiUrl}/member/find-id?userid=${userId}&comid=${environment.comId}&lang=${environment.default_lang}`);
  }

  getRankHistories(userId: string) {
    return this.http.get<RankHistory[]>(`${environment.apiUrl}/member/rank-history?userid=${userId}&comid=${environment.comId}&lang=${environment.default_lang}`);
  }
  findAffiliatedMember(userId: string) {
    return this.http.get<AffiliatedMember>(`${environment.apiUrl}/member/find-affiliated?userid=${userId}&comid=${environment.comId}`);
  }
  getTreeInfo(userId: string, page:number, len:number) {
    return this.http.get<Member[]>(`${environment.apiUrl}/member/find-tree?userid=${userId}&comid=${environment.comId}&lang=${environment.default_lang}&page=${page}&len=${len}`);
  }
  countTreeInfo(userId: string) {
    return this.http.get<Number>(`${environment.apiUrl}/member/count-tree?userid=${userId}&comid=${environment.comId}`);
  }
}

