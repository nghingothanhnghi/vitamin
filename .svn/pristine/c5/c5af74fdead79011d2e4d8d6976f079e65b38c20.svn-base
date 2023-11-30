import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ADOPopupService {

  constructor(private _http: HttpClient) { }

  loadListAdo(params: any): Observable<ADORegisterModel[]> {
    const url = `${environment.apiUrl}/ado/list`;
    return this._http.post<ADORegisterModel[]>(url, params);
  }

  loadTotalAdo(params: any): Observable<number> {
    const url = `${environment.apiUrl}/ado/count`;
    return this._http.post<number>(url, params);
  }
}

