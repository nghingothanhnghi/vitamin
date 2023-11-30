import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MyProgram } from '../../models/system/my-program.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyProgramService {

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.get<MyProgram[]>(`${environment.apiUrl}/mymenu/${environment.comId}`);
  }
}
