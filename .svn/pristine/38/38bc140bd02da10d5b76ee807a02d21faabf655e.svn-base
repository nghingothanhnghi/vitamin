import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MaccoModel } from '@app/models/shoppingmall/macco.model';

@Injectable({
  providedIn: 'root'
})
export class MaccoService {

  constructor(private _http: HttpClient) { }

  callMacco(kind: string, ordNo: string, userid: string): Observable<MaccoModel> {
    let url = `${environment.apiUrl}/maccoReport/${environment.comId}/${kind}/${ordNo}/${environment.default_lang}/${userid}`;
    return this._http.get<MaccoModel>(url);
  }
}