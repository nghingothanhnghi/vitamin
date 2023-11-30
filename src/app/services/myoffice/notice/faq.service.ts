import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FaqModel } from '@app/models/myoffice/notice/faq.model';
import { environment } from '@enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http:HttpClient) { }

  search(params:any):Observable<FaqModel[]>{
    let url = `${environment.apiUrl}/faq/frequentlySearch`;
    return  this.http.post<FaqModel[]>(url, params);
    
  }
  getCount(params:any):Observable<number>{
    let url = `${environment.apiUrl}/faq/frequentlyCount`;
    return  this.http.post<number>(url, params);
  }

  getCodes(kindCd: String): Observable<FaqModel[]> {
    let url = `${environment.apiUrl}/faq/getListTitle/search?comid=${environment.comId}&code=${kindCd}`;

    return this.http.get<FaqModel[]>(url);
  }
  
}
