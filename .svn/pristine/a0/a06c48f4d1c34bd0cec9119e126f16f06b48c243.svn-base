import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardModel } from '@app/models/myoffice/notice/board.model';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';
import { ScheduleModel } from '@app/models/myoffice/schedule/schedule.model';
import { environment } from '@enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }

  search(year: String, month: String){
    let url = `${environment.apiUrl}/schedule/list?comid=${environment.comId}&searchdate=${year}${month}`;
    return  this.http.get<ScheduleModel[]>(url);
    
  }
  eventVideos(regNo: String): Observable<BoardModel>{
    let url = `${environment.apiUrl}/event-videos?id=${regNo}&comid=${environment.comId}`;
    return  this.http.get<BoardModel>(url);
    
  }
  listFile(regNo: String){
    let url = `${environment.apiUrl}/event-videos/list?comid=${environment.comId}`;
    return  this.http.get<BoardModel[]>(url);
    
  }
  countEventVideos():Observable<number>{
    let url = `${environment.apiUrl}/event-videos/count?comid=${environment.comId}`;
    return  this.http.get<number>(url);
    
  }
}
