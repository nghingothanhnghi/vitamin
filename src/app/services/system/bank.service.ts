import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Bank } from '../../models/system/bank.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getBank(kind:string){
    return this.http.get<Bank[]>(`${environment.apiUrl}/bank/search?comid=${environment.comId}&kind=${kind}`);
  }
}
