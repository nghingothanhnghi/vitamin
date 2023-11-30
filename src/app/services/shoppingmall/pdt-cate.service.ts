import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PdtCateModel } from '@app/models/shoppingmall/pdt-cate.model';

@Injectable({
  providedIn: 'root'
})
export class PdtCateService {

  constructor(private _http: HttpClient) { }

  loadPdtCate(key: string): Observable<PdtCateModel[]> {
    let url = `${environment.apiUrl}/product/pdtcate?comId=${environment.comId}&key=${key}`;
    return this._http.get<PdtCateModel[]>(url);
  }
}