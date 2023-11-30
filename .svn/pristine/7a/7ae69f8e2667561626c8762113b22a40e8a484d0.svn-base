import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Company } from '../../models/system/company.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompany(){
    return this.http.get<Company>(`${environment.apiUrl}/company/${environment.comId}`);
  }
}
