import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Member } from '@app/models/myoffice/member/member.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getUserProfile(userid:string) : Observable<Member> {
        let url = `${environment.apiUrl}/member/find-id?userid=${userid}&lang=${environment.default_lang}&comid=${environment.comId}`;

        return  this.http.get<Member>(url);
    }
}