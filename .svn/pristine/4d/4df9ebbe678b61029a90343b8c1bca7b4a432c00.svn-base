import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@enviroments/environment';
import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';

@Injectable({
  providedIn: 'root'
})
export class ProductIntroService {

  constructor(private _http: HttpClient) { }

  loadProductIntro(params: any): Observable<OrdPdtModel[]> {
    let url = `${environment.apiUrl}/product/intro`;
    return this._http.post<OrdPdtModel[]>(url, params);
  }
}
