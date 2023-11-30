import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResultProc } from '@models/system/result-proc.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChangePassWordService {

    constructor(private _http: HttpClient) { }

    encryptPass(params: any): Observable<string> {
        let url = `${environment.apiUrl}/member/encrypt-pass`;
        return this._http.post(url, params,{ responseType: 'text'});
    }

    update(params: any):Observable<ResultProc> {
        let url = `${environment.apiUrl}/member/update-pass`;
        return this._http.post<ResultProc>(url, params);
    }

}