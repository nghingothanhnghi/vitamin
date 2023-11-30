import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Zip } from '@app/models/system/zip.model';

@Injectable({
  providedIn: 'root'
})
export class ZipPopupService {

  constructor(private _http: HttpClient) { }

  searchZipPopup(params: any): Observable<Zip[]> {

    let url = `${environment.apiUrl}/popup/zip/search/${params.value}?page=${params.page}&len=${params.len}&comid=${environment.comId}&lang=${environment.default_lang}`;
    return this._http.get<Zip[]>(url);
  }

  countZipPopup(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/popup/zip/count/${params.value}?page=${params.page}&len=${params.len}&comid=${environment.comId}&lang=${environment.default_lang}`;
    return this._http.get<Number>(url);
  }
}