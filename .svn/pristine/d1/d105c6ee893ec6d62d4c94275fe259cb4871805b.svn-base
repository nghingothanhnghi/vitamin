import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CenterInfoModel } from '@app/models/shoppingmall/center-info.model';

@Injectable({
  providedIn: 'root'
})
export class CenterInfoService {

  constructor(private _http: HttpClient) { }

  loadCenterInfo(cntCd: string): Observable<CenterInfoModel> {
    let url = `${environment.apiUrl}/ordreg/cntInfor?comId=${environment.comId}&cntCd=${cntCd}`;
    return this._http.get<CenterInfoModel>(url);
  }
}