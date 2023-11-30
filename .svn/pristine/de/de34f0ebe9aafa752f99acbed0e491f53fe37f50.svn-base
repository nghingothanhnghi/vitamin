import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CodeModel } from '@app/models/system/code.model';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private _http: HttpClient) { }

  getCodes(kind: String): Observable<CodeModel[]> {
    let url = `${environment.apiUrl}/code/search?comid=${environment.comId}&lang=${environment.default_lang}&kind=${kind}`;

    return this._http.get<CodeModel[]>(url);
  }
}