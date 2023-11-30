import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@enviroments/environment';
import { Observable } from 'rxjs';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';

@Injectable({
  providedIn: 'root'
})
export class SmWownetService {

  constructor(private http: HttpClient) { }

  loadSmWownet(): Observable<SmWownetModel> {
    let url = `${environment.apiUrl}/wownet?comid=${environment.comId}&lang=${environment.default_lang}`;
    return this.http.get<SmWownetModel>(url);
  }
  loadSmWownetConfig(): Observable<SmWownetConfigModel> {
    let url = `${environment.apiUrl}/config/${environment.comId}`;
    return this.http.get<SmWownetConfigModel>(url);
  }
  loadSmWownetPg(): Observable<SmWownetPgModel> {
    let url = `${environment.apiUrl}/wownetpg/${environment.comId}`;
    return this.http.get<SmWownetPgModel>(url);
  }
  
  /* ------------------------- */
  loadFindPayHeader(): Observable<SmPayHeaderModel> {
    let url = `${environment.apiUrl}/wownet/findPayHeaderApi?comid=${environment.comId}&lang=${environment.default_lang}`;
    return this.http.get<SmPayHeaderModel>(url);
  }

  loadWowWord(): Observable<WownetWordModel> {
    let url = `${environment.apiUrl}/wownet-word?comid=${environment.comId}&lang=${environment.default_lang}`;
    return this.http.get<WownetWordModel>(url);
  }

}