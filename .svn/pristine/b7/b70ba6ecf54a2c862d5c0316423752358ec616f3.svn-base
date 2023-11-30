import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '@enviroments/environment';
import { Member } from '@models/myoffice/member/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberSearchService {

  constructor(private _http: HttpClient) { }

  searchMember(params: any) {
    let url = `${environment.apiUrl}/member/search`;
    return this._http.post<Member[]>(url, params);
  }
  countMember(params: any) {
    let url = `${environment.apiUrl}/member/count`;
    return this._http.post<Number>(url, params);
  }
}

