import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResultProc } from '@models/system/result-proc.model'
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class ChangePerInfoService {

    constructor(private http: HttpClient) { }

    updatePerInfo(params: any):Observable<ResultProc> {
        let url = `${environment.apiUrl}/member/update-infor`;
        return this.http.post<ResultProc>(url, params);
      }
    
    checkNickName(userid: string, nickname: string) {
        return this.http.get<Boolean>(`${environment.apiUrl}/member/check-nickname?comid=${environment.comId}&userid=${userid}&nickname=${nickname}`);
      }
}