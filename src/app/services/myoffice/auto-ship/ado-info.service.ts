import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { environment } from '@enviroments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class ADOInfoService {

  constructor(
    private _http: HttpClient,
    private _deviceService: DeviceDetectorService
  ) { }

  loadAdoByAdoNo(adoNo: string): Observable<ADORegisterModel> {
    const url = `${environment.apiUrl}/ado/loadAdoByAdoNo/${environment.comId}/${environment.default_lang}/${adoNo}`;
    return this._http.get<ADORegisterModel>(url);
  }

  loadAdoPdtByAdoNo(adoNo: string): Observable<ADORegisterModel[]> {
    const pathKind = this._deviceService.isDesktop() ? "PC" : "MOBILE";
    const url = `${environment.apiUrl}/ado/loadAdoPdtByAdoNo/${environment.comId}/${adoNo}/${pathKind}`;
    return this._http.get<ADORegisterModel[]>(url);
  }
}

