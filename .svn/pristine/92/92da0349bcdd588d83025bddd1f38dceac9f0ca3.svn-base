import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';

@Injectable({
  providedIn: 'root'
})
export class MemberPointService {

  constructor(private _http: HttpClient) { }

  loadMemberPoint(userid: string): Observable<OrderMstModel> {
    let url = `${environment.apiUrl}/ordreg/havePoint?comId=${environment.comId}&userid=${userid}`;
    return this._http.get<OrderMstModel>(url);
  }
}