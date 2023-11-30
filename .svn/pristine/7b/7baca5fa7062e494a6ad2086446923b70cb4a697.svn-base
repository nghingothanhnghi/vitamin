import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiResultMember } from '../../models/system/api-result-member.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpClient) { }

  verify(params: any){
    return this.http.post<ApiResultMember>(`${environment.apiUrl}/verify`, params);
  }
}
