import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BenefitCalendarModel } from '@app/models/myoffice/benefit/benefit-calendar.module';

@Injectable({
  providedIn: 'root'
})
export class BenefitCalendarService {

  constructor(private http: HttpClient) { }

  searchBenefitCalendar(params: any): Observable<BenefitCalendarModel[]> {
    let url = `${environment.apiUrl}/bonus/getBenefitCalendar?comId=${environment.comId}&userId=${params.userId}&yyyymm=${params.giveDate}`;
    return this.http.get<BenefitCalendarModel[]>(url);
  }

}

