import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenefitAccountingInquiryService {

  constructor(private http: HttpClient) { }

  getTiltePay(params: any): Observable<BenefitDetailInquiryModel[]> {
    let url = `${environment.apiUrl}/bonus/titlePay?comId=${environment.comId}`;
    return this.http.post<BenefitDetailInquiryModel[]>(url, params);
  }

  
  searchBenefitAccountingInquiry(params: any): Observable<BenefitDetailInquiryModel[]> {
    let url = `${environment.apiUrl}/bonus/accountingInquiry/search`;
    return this.http.post<BenefitDetailInquiryModel[]>(url, params);
  }

  countBenefitAccountingInquiry(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/bonus/accountingInquiry/count`;
    return this.http.post<Number>(url, params);
  }

  sumBenefitAccountingInquiry(params: any): Observable<BenefitDetailInquiryModel> {
    let url = `${environment.apiUrl}/bonus/accountingInquiry/sum`;
    return this.http.post<BenefitDetailInquiryModel>(url, params);
  }
}

