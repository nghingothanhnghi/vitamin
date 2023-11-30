import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BenefitRemittanceDetailsModel } from '@app/models/myoffice/benefit/benefit-remittance-details.module';

@Injectable({
  providedIn: 'root'
})
export class BenefitRemittanceDetailsService {

  constructor(private http: HttpClient) { }

  searchBenefitRemittanceDetails(params: any): Observable<BenefitRemittanceDetailsModel[]> {
    let url = `${environment.apiUrl}/bonus/searchbenefitRemittance`;
    return this.http.post<BenefitRemittanceDetailsModel[]>(url, params);
  }

  countBenefitRemittanceDetails(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/bonus/countbenefitRemittance`;
    return this.http.post<Number>(url, params);
  }

  sumBenefitRemittanceDetails(params: any): Observable<BenefitRemittanceDetailsModel> {
    let url = `${environment.apiUrl}/bonus/sumbenefitRemittance`;
    return this.http.post<BenefitRemittanceDetailsModel>(url, params);
  }
}

