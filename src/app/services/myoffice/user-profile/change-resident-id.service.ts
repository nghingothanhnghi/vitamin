import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Member } from '@app/models/myoffice/member/member.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { ResultJumin } from '@app/models/myoffice/user-profile/result-jumin.model';

@Injectable({
    providedIn: 'root'
})
export class ChangeResidentIdService {
    constructor(private http: HttpClient) { }

    updateJumin(params:any) : Observable<ResultProcessModel> {

        let url = `${environment.apiUrl}/member/update-jumin`;

        return  this.http.post<ResultProcessModel>(url,params);
    }
    getJumin(userid:string) : Observable<Member> {
        let url = `${environment.apiUrl}/member/get-jumin?userid=${userid}&comid=${environment.comId}`;

        return  this.http.get<Member>(url);
    }
    verifyJumin(params:any) : Observable<ResultJumin> {
        let url = `${environment.apiUrl}/verify-jumin`;

        return  this.http.post<ResultJumin>(url,params);
    }
}