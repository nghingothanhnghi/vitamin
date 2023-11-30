import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnalysisMember } from '@models/myoffice/member/analysis-member.model'
import { AnalysisMemberMonth } from '@models/myoffice/member/analysis-member-month.model'
import { AnalysisAge } from '@models/myoffice/member/analysis-age.model'


@Injectable({
  providedIn: 'root'
})
export class MemberAnalysisService {

  constructor(private _http: HttpClient) { }

  chartMemberGender(userId: string) {
    return this._http.get<AnalysisMember[]>(`${environment.apiUrl}/member/analysis-gender?userid=${userId}&comid=${environment.comId}`);
  }
  chartMemberMonth(userId: string) {
    return this._http.get<AnalysisMemberMonth[]>(`${environment.apiUrl}/member/analysis-month?userid=${userId}&comid=${environment.comId}`);
  }
  chartMemberAge(userId: string) {
    return this._http.get<AnalysisAge[]>(`${environment.apiUrl}/member/analysis-age?userid=${userId}&comid=${environment.comId}`);
  }
  chartMemberRank(userId: string) {
    return this._http.get<AnalysisMember[]>(`${environment.apiUrl}/member/analysis-rank?userid=${userId}&comid=${environment.comId}`);
  }

}

