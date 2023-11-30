import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderScheduleModel } from '@app/models/myoffice/order/order-schedule.model';
import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';

@Injectable({
  providedIn: 'root'
})
export class OrderScheduleService {

  constructor(private _http: HttpClient) { }

  searchOrderCalendar(userid: string, year: string, month: string): Observable<OrderScheduleModel[]> {
    let url = `${environment.apiUrl}/order/calendarSearch?comId=${environment.comId}&userId=${userid}&year=${year}&month=${month}`;
    return this._http.get<OrderScheduleModel[]>(url);
  }

  sumOrderCalendar(userid: string, year: string, month: string): Observable<OrderMonthlyModel[]> {
    let url = `${environment.apiUrl}/order/calendarSum?comId=${environment.comId}&userId=${userid}&year=${year}&month=${month}`;
    return this._http.get<OrderMonthlyModel[]>(url);
  }
}