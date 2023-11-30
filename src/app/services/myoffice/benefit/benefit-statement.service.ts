import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PayPrintModel } from '@app/models/myoffice/benefit/pay-print.module';
import { OrderHistoryModel } from '@app/models/myoffice/benefit/order-history.module';
import { MemberBenefitModel } from '@app/models/myoffice/benefit/member-benefit.module';

@Injectable({
  providedIn: 'root'
})
export class BenefitSatementService {

  constructor(private http: HttpClient) { }

  //find-days
  getSelectDate(params: any): Observable<String[]> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/find-days?comId=${environment.comId}&userId=${params.userId}&yyyymm=${params.date}`;
    return this.http.get<String[]>(url);
  }

  //grid-pay-print
  searchFindPayPrint(params: any): Observable<PayPrintModel[]> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/find-pay-print?comId=${environment.comId}&lang=${environment.default_lang}&userId=${params.userId}&payDate=${params.date}`;
    return this.http.get<PayPrintModel[]>(url);
  }
  // grid-pay-history
  searchFindPayHistory(params: any): Observable<PayPrintModel[]> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/find-pay-history?comId=${environment.comId}&payDate=${params.date}&userId=${params.userId}`;
    return this.http.get<PayPrintModel[]>(url);
  }

  //grid-order-history
  searchFindOrderHistory(params: any): Observable<OrderHistoryModel[]> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/find-order-history?comId=${environment.comId}&lang=${environment.default_lang}&ordDate=${params.date}&userId=${params.userId}`;
    return this.http.get<OrderHistoryModel[]>(url);
  }

  sumFindOrderHistory(params: any): Observable<OrderHistoryModel> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/sum-order-history?comId=${environment.comId}&ordDate=${params.date}&userId=${params.userId}`;
    return this.http.get<OrderHistoryModel>(url);
  }

  //grid-order-product-history
  searchFindOrderProductHistory(params: any): Observable<OrderHistoryModel[]> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/find-order-product-history?comId=${environment.comId}&lang=${environment.default_lang}&ordDate=${params.date}&userId=${params.userId}`;
    return this.http.get<OrderHistoryModel[]>(url);
  }

  sumFindOrderProductHistory(params: any): Observable<OrderHistoryModel> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/sum-order-product-history?comId=${environment.comId}&ordDate=${params.date}&userId=${params.userId}`;
    return this.http.get<OrderHistoryModel>(url);
  }

  //member-info
  getMemberInfo(params: any): Observable<MemberBenefitModel> {
    let url = `${environment.apiUrl}/bonus/benefit-statement/member-info?comId=${environment.comId}&lang=${environment.default_lang}&userId=${params.userId}`;
    return this.http.get<MemberBenefitModel>(url);
  }
  
}

