import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MyBanner } from '../../models/system/my-banner.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyBannerService {

  constructor(private http: HttpClient) { }

  getBanners(kind: string, dateNow: string){
    let param = {
      comId  : `${environment.comId}`,
      kind   : kind,
      dateNow: dateNow
    };

    return this.http.post<MyBanner[]>(`${environment.apiUrl}/mybanner`, param);
  }
}
