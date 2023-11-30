import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { WitholdingTaxModel } from '@app/models/myoffice/benefit/witholding-tax.module';

@Injectable({
  providedIn: 'root'
})
export class WitholdingTaxService {

  constructor(private http: HttpClient) { }

  searchWitholdingTax(params: any): Observable<WitholdingTaxModel[]> {
    let url = `${environment.apiUrl}/bonus/searchWitholdingTax`;
    return this.http.post<WitholdingTaxModel[]>(url, params);
  }

  countWitholdingTax(params: any): Observable<Number> {
    let url = `${environment.apiUrl}/bonus/countWitholdingTax`;
    return this.http.post<Number>(url, params);
  }

  sumWitholdingTax(params: any): Observable<WitholdingTaxModel> {
    let url = `${environment.apiUrl}/bonus/sumWitholdingTax`;
    return this.http.post<WitholdingTaxModel>(url, params);
  }

  // Start Report
  detailWitholdingTax(params: any): Observable<WitholdingTaxModel[]> {
    let url = `${environment.apiUrl}/bonus/detailWitholdingTax`;
    return this.http.post<WitholdingTaxModel[]>(url, params);
  }

  sumDetailWitholdingTax(params: any): Observable<WitholdingTaxModel> {
    let url = `${environment.apiUrl}/bonus/sumDetailWitholdingTax`;
    return this.http.post<WitholdingTaxModel>(url, params);
  }

  userWitholdingTax(params: any): Observable<WitholdingTaxModel> {
    let url = `${environment.apiUrl}/bonus/userWitholdingTax`;
    return this.http.post<WitholdingTaxModel>(url, params);
  }


  // END Report
}

