import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rank } from '../../models/system/rank.model';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  constructor(private http: HttpClient) { }

  loadAllRank(){
    return this.http.get<Rank[]>(`${environment.apiUrl}/rank/${environment.comId}`);
  }
}
