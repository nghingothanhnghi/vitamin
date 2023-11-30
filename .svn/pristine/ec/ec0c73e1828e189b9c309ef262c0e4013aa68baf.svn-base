import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BenefitSponsorshipDetailsModel } from '@app/models/myoffice/benefit/benefit-sponsorship-details.module';

@Injectable({
  providedIn: 'root'
})
export class BenefitSponsorshipDetailsService {

  constructor(private http: HttpClient) { }

  searchBenefitSponsorshipDetails(params: any): Observable<BenefitSponsorshipDetailsModel[]> {
    let url = `${environment.apiUrl}/bonus/searchSponsorshipBenefit`;
    return this.http.post<BenefitSponsorshipDetailsModel[]>(url, params);
  }

  countBenefitSponsorshipDetails(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/bonus/countSponsorshipBenefit`;
    return this.http.post<Number>(url, params);
  }

  sumBenefitSponsorshipDetails(params: any): Observable<BenefitSponsorshipDetailsModel> {
    let url = `${environment.apiUrl}/bonus/sumSponsorshipBenefit`;
    return this.http.post<BenefitSponsorshipDetailsModel>(url, params);
  }
}

