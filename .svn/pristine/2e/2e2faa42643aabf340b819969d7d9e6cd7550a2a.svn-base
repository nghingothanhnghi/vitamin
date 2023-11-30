import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CountryModel } from '@app/models/system/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _http: HttpClient) { }

  searchCountry(): Observable<CountryModel[]> {
    let url = `${environment.apiUrl}/country/search`;
   
    return this._http.get<CountryModel[]>(url);
  }
}