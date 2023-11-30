import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CenterModel } from '@app/models/system/center.model';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private _http: HttpClient) { }

  getCenters(kind: string): Observable<CenterModel[]> {
    let url = `${environment.apiUrl}/center/search?comid=${environment.comId}&lang=${environment.default_lang}&kind=${kind}`;
   
    return this._http.get<CenterModel[]>(url);
  }
  
}