import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerConsultationGuideDetailModel } from '@app/models/myoffice/notice/customer-consultation-guide-detail.model';
import { QnaModel } from '@app/models/myoffice/notice/qna.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { CodeModel } from '@app/models/system/code.model';
import { environment } from '@enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  constructor(private http:HttpClient) { }

  search(params:any):Observable<QnaModel[]>{
    let url = `${environment.apiUrl}/qna/search/${params.kindCd}`;
    return  this.http.post<QnaModel[]>(url, params);
  }

  getCount(params:any):Observable<number>{
    let url = `${environment.apiUrl}/qna/count/${params.kindCd}`;
    return  this.http.post<number>(url, params);
  }
  
  save(params:any):Observable<ResultProcessModel>{
    
    let url = `${environment.apiUrl}/qna/saveQna`;
    return  this.http.post<ResultProcessModel>(url,params);
  }
  getDetail(boardNo: Number){
    let url = `${environment.apiUrl}/board/findByBoardNoQnaDetail/search?comid=${environment.comId}&boardid=${boardNo}`;
    return  this.http.get<CustomerConsultationGuideDetailModel>(url);
  }

  getBoardCateList():Observable<CodeModel[]>{
    let url = `${environment.apiUrl}/qna/board-cate-list?comId=${environment.comId}`;
    return  this.http.get<CodeModel[]>(url);
  }
  
  deleteQna(params:any):Observable<ResultProcessModel>{
    let url = `${environment.apiUrl}/qna/deleteQna`;
    return  this.http.post<ResultProcessModel>(url,params);
  }

}
