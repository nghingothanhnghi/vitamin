import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BenefitAnalysisModel } from '@app/models/myoffice/benefit/benefit-analysis.module';

@Injectable({
  providedIn: 'root'
})
export class BenefitAnalysisService {

  constructor(private http: HttpClient) { }

  searchBenefitAnalysisTax(params: any): Observable<BenefitAnalysisModel[]> {
    let url = `${environment.apiUrl}/bonus/bonusAnalysicGird?comId=${environment.comId}&lang=${environment.default_lang}&userId=${params.userid}&year=${params.year}`;
    return this.http.get<BenefitAnalysisModel[]>(url);
  }

  sumBenefitAnalysisTax(params: any): Observable<BenefitAnalysisModel> {
    let url = `${environment.apiUrl}/bonus/bonusAnalysicGirdSum?comId=${environment.comId}&userId=${params.userid}&year=${params.year}`;
    return this.http.get<BenefitAnalysisModel>(url);
  }

  getChart1(params: any): Observable<BenefitAnalysisModel[]> {
    let url = `${environment.apiUrl}/bonus/bonusAnalysicChart1?comId=${environment.comId}&userId=${params.userid}&year=${params.year}`;
    return this.http.get<BenefitAnalysisModel[]>(url);
  }

  getChart3(params: any): Observable<BenefitAnalysisModel[]> {
    let url = `${environment.apiUrl}/bonus/bonusAnalysicChart3?comId=${environment.comId}&userId=${params.userid}&year=${params.year}`;
    return this.http.get<BenefitAnalysisModel[]>(url);
  }


}

