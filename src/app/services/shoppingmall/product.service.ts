import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  loadTotalProduct(params: any): Observable<number> {
    let url = `${environment.apiUrl}/product/count`;
    return this._http.post<number>(url, params);
  }

  loadProducts(params: any): Observable<OrdPdtModel[]> {
    let url = `${environment.apiUrl}/product/search`;
    return this._http.post<OrdPdtModel[]>(url, params);
  }

  loadMainProducts(params: any): Observable<OrdPdtModel[]> {
    let url = `${environment.apiUrl}/product/main`;
    return this._http.post<OrdPdtModel[]>(url, params);
  }

  loadSpecialProducts(params: any): Observable<OrdPdtModel[]> {
    let url = `${environment.apiUrl}/product/special`;
    return this._http.post<OrdPdtModel[]>(url, params);
  }
}