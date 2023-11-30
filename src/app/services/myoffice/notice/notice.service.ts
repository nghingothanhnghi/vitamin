import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardModel } from '@app/models/myoffice/notice/board.model';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { environment } from '@enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private http:HttpClient) { }

  search(params: any){
    let url = `${environment.apiUrl}/board/notice/find?comid=${params.comId}&comcd=${params.comCd}&topYn=${params.topYn}&searchKey=${params.searchKey}&kindCd=${params.kindCd}&page=${params.page}&len=${params.len}`;
    return  this.http.get<NoticeModel[]>(url);
    
  }
  
  getCount(params: any):Observable<number>{
    let url = `${environment.apiUrl}/board/notice/count?comid=${params.comId}&comcd=${params.comCd}&topYn=${params.topYn}&searchKey=${params.searchKey}&kindCd=${params.kindCd}`;
    return  this.http.get<number>(url);
  }

  getDetail(boardNo: String){
    let url = `${environment.apiUrl}/board/findBoardById/search?comid=${environment.comId}&boardid=${boardNo}`;
    return  this.http.get<BoardModel>(url);
  }
  getListFile(boardNo: String){
    let url = `${environment.apiUrl}/board/findListFile/search?comid=${environment.comId}&boardNo=${boardNo}`;
    return  this.http.get<BoardModel[]>(url);
  }
  
  searchBoardFindLasted(params: any){
    let url = `${environment.apiUrl}/board/find-lasted?comid=${params.comId}&comcd=${params.comCd}`;
    return  this.http.get<NoticeModel[]>(url);
  }

  searchBoardList(params: any){
    let url = `${environment.apiUrl}/board/N/search`;
    return  this.http.post<NoticeModel[]>(url,params);
    
  }

  countBoardList(params: any){
    let url = `${environment.apiUrl}/board/N/count`;
    return  this.http.post<number>(url,params);
  }

}
