import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { DashBoardModel } from '@app/models/myoffice/dashboard/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private http: HttpClient) { }

  getListMonthPaymentDate(params: any): Observable<DashBoardModel[]> {
    let url = `${environment.apiUrl}/get-list-month-payment-date`;
    return this.http.post<DashBoardModel[]>(url, params);
  }

  getListPaymentDate(params: any): Observable<DashBoardModel[]> {
    let url = `${environment.apiUrl}/get-list-payment-date`;
    return this.http.post<DashBoardModel[]>(url, params);
  }

  getInfoDashBoard(params: any): Observable<DashBoardModel> {
    let url = `${environment.apiUrl}/get-info-dash-board`;
    return this.http.post<DashBoardModel>(url, params);
  }

  getActivityStatusDashBoard(params: any): Observable<DashBoardModel[]> {
    let url = `${environment.apiUrl}/get-activity-status-dash-board`;
    return this.http.post<DashBoardModel[]>(url, params);
  }

  getActivityStatusDashBoardCount(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/get-activity-status-dash-board-count`;
    return this.http.post<Number>(url, params);
  }

  getSatusOfRankDashBoard(params: any): Observable<DashBoardModel[]> {
    let url = `${environment.apiUrl}/get-status-of-rank-dash-board`;
    return this.http.post<DashBoardModel[]>(url, params);
  }

  getSatusOfRankDashBoardSum(params: any): Observable<DashBoardModel> {
    let url = `${environment.apiUrl}/get-status-of-rank-dash-board-sum`;
    return this.http.post<DashBoardModel>(url, params);
  }
}

