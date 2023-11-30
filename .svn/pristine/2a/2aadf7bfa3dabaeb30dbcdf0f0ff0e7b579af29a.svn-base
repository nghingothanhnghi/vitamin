import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '@models/myoffice/member/member.model'

@Injectable({
  providedIn: 'root'
})
export class MemberBoxService {

  constructor(private _http: HttpClient) { }

  findBox(params: any) {
    let url = `${environment.apiUrl}/member/find-box`;
    return this._http.post<Member[]>(url, params);
  }

  getInfoMemImage(params: any) {
    let url = `${environment.apiUrl}/member/get-info-member-image`;
    return this._http.post<Member>(url, params);
  }

}

