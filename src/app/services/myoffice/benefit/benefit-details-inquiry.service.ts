import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenefitDetailsInquiryService {

  constructor(private http: HttpClient) { }

  getTiltePay(params: any): Observable<BenefitDetailInquiryModel[]> {
    let url = `${environment.apiUrl}/bonus/titlePay?comId=${environment.comId}`;
    return this.http.get<BenefitDetailInquiryModel[]>(url);
  }

  
  searchBenefitDetailsInquiry(params: any): Observable<BenefitDetailInquiryModel[]> {
    let url = `${environment.apiUrl}/bonus/BenefitDetailInquiry/search`;
    return this.http.post<BenefitDetailInquiryModel[]>(url, params);
  }

  countBenefitDetailsInquiry(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/bonus/BenefitDetailInquiry/count`;
    return this.http.post<Number>(url, params);
  }

  sumBenefitDetailsInquiry(params: any): Observable<BenefitDetailInquiryModel> {
    let url = `${environment.apiUrl}/bonus/BenefitDetailInquiry/sum`;
    return this.http.post<BenefitDetailInquiryModel>(url, params);
  }
}

