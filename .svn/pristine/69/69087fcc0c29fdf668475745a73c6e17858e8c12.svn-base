import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IzexRes } from '../../models/system/izex.model';
import { environment } from '@enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class IzexService {
  key:string = '88956aba576362ca65e2d1fcd3e9295a'


  constructor(private http: HttpClient) { }

  addOrUpdatePartner(params: any) {
    return this.http.post<IzexRes>(`${environment.apiUrl}/member/update-beta-izex`, params);
  }
}
