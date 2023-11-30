import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AutoShipModel } from '@app/models/myoffice/auto-ship/auto-ship.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoShipService {

  constructor(private http: HttpClient) { }

  //-------------------------------------------Autoship-Registration-Details--------------------------------------------------
  registrationDetailSearch(params: any): Observable<AutoShipModel[]> {
    let url = `${environment.apiUrl}/auto-ship/registration-detail-search`;
    return this.http.post<AutoShipModel[]>(url, params);
  }

  registrationDetailCount(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/auto-ship/registration-detail-count`;
    return this.http.post<Number>(url, params);
  }

  registrationDetailSum(params: any): Observable<AutoShipModel> {
    let url = `${environment.apiUrl}/auto-ship/registration-detail-sum`;
    return this.http.post<AutoShipModel>(url, params);
  }

  //-------------------------------------------Autoship-Payment-Status--------------------------------------------------

  paymentStatusSearch(params: any): Observable<AutoShipModel[]> {
    let url = `${environment.apiUrl}/auto-ship/payment-status-search`;
    return this.http.post<AutoShipModel[]>(url, params);
  }

  paymentStatusCount(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/auto-ship/payment-status-count`;
    return this.http.post<Number>(url, params);
  }

  paymentStatusSum(params: any): Observable<AutoShipModel> {
    let url = `${environment.apiUrl}/auto-ship/payment-status-sum`;
    return this.http.post<AutoShipModel>(url, params);
  }
}

