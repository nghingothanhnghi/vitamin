import { AfterViewChecked, Component, OnInit } from '@angular/core';
import * as memAnalysisSelector from '@app/selectors/myoffice/member/member-analysis.selector';
import { chartMemberAge, chartMemberGender, chartMemberMonth, chartMemberRank } from '@app/actions/myoffice/member/affiliate-member-analysis.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AnalysisMember } from '@models/myoffice/member/analysis-member.model'
import { AnalysisMemberMonth } from '@models/myoffice/member/analysis-member-month.model'
import { AnalysisAge } from '@models/myoffice/member/analysis-age.model'
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ChartUtils } from '@app/common/util/chart.ultil';
import { ChartType } from "angular-google-charts";
import { AuthUtil } from '@app/common/util/auth.util';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';


@Component({
  selector: 'app-member-analysis',
  templateUrl: './member-analysis.component.html',
  styleUrls: ['./member-analysis.component.css']
})
export class MemberAnalysisComponent implements OnInit, AfterViewChecked {

  type = ChartType.PieChart;
  dataChartAge: any[] = [];
  options = {
    legend: { position: 'top', alignment: 'center', maxLines: 10 },
    height: 400,
    width: 400
  };
  maxValueChart : number = 0;
  analysisAges$ = new Observable<AnalysisAge[]>;

  userId: string = ''

  analysisMemberGenders$ = new Observable<AnalysisMember[]>;
  analysisMemberGendersBody = [] as AnalysisMember[];
  analysisMemberGendersFooter = {} as AnalysisMember;

  analysisMemberMonths$ = new Observable<AnalysisMemberMonth[]>;
  analysisMemberMonthBodys = [] as AnalysisMemberMonth[];
  analysisMemberMonthsFooter = {} as AnalysisMemberMonth;

  memberRanks$ = new Observable<AnalysisMember[]>;
  constructor(
    private _memAnalysisStore: Store<memAnalysisSelector.MemberAnalysisState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.analysisMemberGenders$ = this._memAnalysisStore.select(memAnalysisSelector.chartMemberGender);
    this.analysisMemberMonths$ = this._memAnalysisStore.select(memAnalysisSelector.chartMemberMonth);
    this.analysisAges$ = this._memAnalysisStore.select(memAnalysisSelector.chartMemberAge);
    this.memberRanks$ = this._memAnalysisStore.select(memAnalysisSelector.chartMemberRank);
  }
  ngAfterViewChecked(): void {
    ChartUtils.drawChartBar("chart-member-rank")
  }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
    }

    this.analysisMemberGenders$.subscribe(res => {
      this.analysisMemberGendersBody = []
      if (res) {
        res.forEach((item) => {
          if (item.rankCD && item.rankCD != "") {
            this.analysisMemberGendersBody.push(item)
           
          } else {
            this.analysisMemberGendersFooter = item
          }
        })
      }
    });

    this.analysisMemberMonths$.subscribe(res => {
      this.analysisMemberMonthBodys = []
      if (res) {
        res.forEach((item) => {
          if (item.year !== '합계') {
            this.analysisMemberMonthBodys.push(item)
          } else {
            this.analysisMemberMonthsFooter = item
          }
        })
      }
    });

    this.analysisAges$.subscribe(res => {
      this.dataChartAge = [];

      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        for (var i = 0; i < res.length; i++) {
          this.dataChartAge.push([res[i].age, res[i].sum]);
        }
      } else {
        this.dataChartAge = [['조회된 데이타가 없습니다.', 10]];
      }
    });
    this.memberRanks$.subscribe(res => {
      if(res){
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
        for (var i = 0; i < res.length; i++) {
          let item = res[i];
          if(ValidationUtil.isNotNullAndNotEmpty(item.cntMem)) {
            let totalAmtNumber = Number(item.cntMem);
            if(totalAmtNumber > this.maxValueChart) {
              this.maxValueChart = totalAmtNumber;
            }
          }
        }
      }
    });
    this.onSearch()
  }
  onSearch(){
    setTimeout(() => {
      this._overlayLoadingStore.dispatch( setShowOverlayLoading({loading: true }));
    }, 1);
    this._memAnalysisStore.dispatch(chartMemberAge(this.userId));
    this._memAnalysisStore.dispatch(chartMemberGender(this.userId));
    this._memAnalysisStore.dispatch(chartMemberMonth(this.userId));
    this._memAnalysisStore.dispatch(chartMemberRank(this.userId));
  }

  
  getHeigthOfElement(totalAmt : String): number {
    
    if(ValidationUtil.isNotNullAndNotEmpty(totalAmt)) {
      let totalAmtNumber = Number(totalAmt);
      let _height = 0;
          _height = totalAmtNumber / this.maxValueChart * 150;
      return _height;
    }

    return 0;
  }
}
