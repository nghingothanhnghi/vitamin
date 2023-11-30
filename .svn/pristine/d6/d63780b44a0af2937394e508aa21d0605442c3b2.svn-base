import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PopBoardModel } from '@app/models/homepage/pop-board.model';

@Injectable({
  providedIn: 'root'
})
export class PopBoardService {

  constructor(private _http: HttpClient) { }

  loadPopBoards(): Observable<PopBoardModel[]> {
    let url = `${environment.apiUrl}/popboard/list?comId=${environment.comId}&comCd=${environment.comCd}`;
    return this._http.get<PopBoardModel[]>(url);
  }
}