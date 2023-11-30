import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PdtDetailModel } from '@app/models/shoppingmall/pdt-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PdtDetailService {

  constructor(private _http: HttpClient) { }

  loadPdtDetail(pdtCd: string): Observable<PdtDetailModel> {
    let url = `${environment.apiUrl}/product/info?comId=${environment.comId}&pdtCd=${pdtCd}`;
    return this._http.get<PdtDetailModel>(url);
  }

  loadPdtImages(pdtCd: string, pathKind: string): Observable<PdtDetailModel[]> {
    let url = `${environment.apiUrl}/product/info-image?comId=${environment.comId}&pdtCd=${pdtCd}&pathKind=${pathKind}`;
    return this._http.get<PdtDetailModel[]>(url);
  }

  loadPdtNotify(pdtCd: string): Observable<PdtDetailModel[]> {
    let url = `${environment.apiUrl}/product/info-notify?comId=${environment.comId}&pdtCd=${pdtCd}`;
    return this._http.get<PdtDetailModel[]>(url);
  }
  getPdtInfosByCateCd(cateCd: string, rowNum: string, prdCd:string, pathKind:string): Observable<PdtDetailModel[]> {
    let url = `${environment.apiUrl}/product/products-related?comId=${environment.comId}&pdtCd=${prdCd}&rowNum=${rowNum}&cateCd=${cateCd}&pathKind=${pathKind}`;
    return this._http.get<PdtDetailModel[]>(url);
  }
}