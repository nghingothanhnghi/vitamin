import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@enviroments/environment';
import { MyRollingBannerModel } from '@app/models/homepage/my-rolling-banner.module';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
    getBanner(params: any): Observable<MyRollingBannerModel[]> {
    let url = `${environment.apiUrl}/mybanner?comId=${environment.comId}&kind=${params.kind}&dateNow=${params.dateNow}`;
    return this.http.get<MyRollingBannerModel[]>(url);
  }

}

