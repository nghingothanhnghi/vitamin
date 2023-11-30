import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { ResultProc } from '@app/models/system/result-proc.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) { }

  loadCartItems(userid: string): Observable<OrdPdtModel[]> {
    let url = `${environment.apiUrl}/ordreg/cart-list?comid=${environment.comId}&userid=${userid}`;
    return this._http.get<OrdPdtModel[]>(url);
  }

  loadCartInfo(userid: string, ctrCd: string): Observable<OrderMstModel> {
    let url = `${environment.apiUrl}/ordreg/cart-info?comid=${environment.comId}&userid=${userid}&ctrCd=${ctrCd}`;
    return this._http.get<OrderMstModel>(url);
  }

  addToCart(params: any): Observable<ResultProc> {
    let url = `${environment.apiUrl}/ordreg/tmp-save`;
    return this._http.post<ResultProc>(url, {...params, lang: environment.default_lang});
  }

  removeCartItem(userid: string, pdtCd: string, ordNoTmp: number): Observable<ResultProc> {
    let url = `${environment.apiUrl}/ordreg/cart-del?comid=${environment.comId}&userid=${userid}&pdtCd=${pdtCd}&ordNoTmp=${ordNoTmp}`;
    return this._http.get<ResultProc>(url);
  }

  cancelOrder(userid: string, ordNoTmp: number): Observable<ResultProc> {
    let url = `${environment.apiUrl}/ordreg/tmp-del?comid=${environment.comId}&userid=${userid}&ordNoTmp=${ordNoTmp}`;
    return this._http.get<ResultProc>(url);
  }
}