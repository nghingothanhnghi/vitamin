import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getChart1, getChart3, searchBenefitAnalysis, sumBenefitAnalysis } from '@app/actions/myoffice/benefit/benefit-analysis.action';
import { loadTitlePay } from '@app/actions/myoffice/benefit/benefit-details-inquiry.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { BenefitAnalysisModel } from '@app/models/myoffice/benefit/benefit-analysis.module';
import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';
import { BenefitAnalysisSearchState, getBenefitAnalysisSearchItems, getBenefitAnalysisSumItem, getChart1Benefit, getChart3Benefit } from '@app/selectors/myoffice/benefit/benefit-analysis.selector';
import { BenefitSearchState, getBenefitTotalItems, getTitlePayItems } from '@app/selectors/myoffice/benefit/benefit-details-inquiry.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { ChartType } from "angular-google-charts";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-benefit-analysis',
  templateUrl: './benefit-analysis.component.html',
  styleUrls: ['./benefit-analysis.component.css']
})
export class BenefitAnalysisComponent implements OnInit {

  year: string = "";
  userid: string = "";
  userName : String = "";

  // Chart1
  type = ChartType.PieChart;
  dataChart1: any[] = []; 
  optionsChart = {  
    legend: {position: 'top', alignment: 'center', maxLines: 10},
    height: 400,
    width : 1140,
  }; 

  optionsChartMoblie = {  
    legend: {position: 'top', alignment: 'center', maxLines: 10},
    height: 400,
    // width : 1140,
    width : 380
  }; 

  chart1Benefit$ = new Observable<BenefitAnalysisModel[]>;

 // Chart2
  dataChart2: any[] = []; 
  chart2Benefit$ = new Observable<BenefitAnalysisModel[]>;
  maxValueChart2 : number = 0;

   // Chart3
   dataChart3: any[] = []; 
   chart3Benefit$ = new Observable<BenefitAnalysisModel[]>;
   maxValueChart3 : number = 0;

  // Data Table
  tiltePay$ = new Observable<BenefitDetailInquiryModel[]>;
  tiltePayNew : any[] = [];
  titleResult: string | any[] = [];
  lengthTitleResult: number = 0;
  benefitAnalysisSearchItems$ = new Observable<BenefitAnalysisModel[]>;
  benefitAnalysisSumItem$ = new Observable<BenefitAnalysisModel>;
  collection: BenefitAnalysisModel[] = [];
  rows: number[] = [];
  cols: number[] = new Array(16);
  totalCols: number = 6;
  totalRows: number = 0;
  floorTotalCols: number = 0;
  
  constructor(
    private _benefitAnalysisSearchStore: Store<BenefitAnalysisSearchState>,
    private _benefitSearchStore: Store<BenefitSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
  ) { 
    this.tiltePay$ = this._benefitSearchStore.select(getTitlePayItems);
  }

  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }

    let now = new Date();
    this.year = ConvertUtil.convertToSring(now.getFullYear());

    let paramsTitle = {};
    this._benefitSearchStore.dispatch(loadTitlePay({ params: paramsTitle }));


    this.onSearch();
   
  }

 
  onMinusbtn(): void {
    this.year = (Number(this.year) - 1).toString();
    this.onSearch();
  }

  onPlusbtn(): void {
    let now = new Date();
    let yearNow = now.getFullYear();

    let year = (Number(this.year) + 1);

    if(year <= yearNow) {
      this.year = year.toString();
      this.onSearch();
    }
  }
  
  onSearch(): void {
    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    }, 1);
    let params = this.getParams();
    this._benefitAnalysisSearchStore.dispatch(searchBenefitAnalysis({params:params}));
    this._benefitAnalysisSearchStore.dispatch(sumBenefitAnalysis({params:params}));
    this._benefitAnalysisSearchStore.dispatch(getChart1({params:params}));
    this._benefitAnalysisSearchStore.dispatch(getChart3({params:params}));

    this.loadChart1();
    this.loadChart2();
    this.loadDataTable();
    this.loadChart3();

    setTimeout(() => {
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    }, 250);
  }


  getParams(): any {
    let params = {
      userid: this.userid,
      year : this.year
    };

    return params;
  }

  loadChart1() : void {
    this.chart1Benefit$ = this._benefitAnalysisSearchStore.select(getChart1Benefit);

    this.chart1Benefit$.subscribe(res => {
      this.dataChart1 = [];
      let dataItem = res;

      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        for (var i = 0; i < dataItem.length; i++) {
          this.dataChart1.push([dataItem[i].payName, dataItem[i].totalAmt]);
        }
      } else {
        this.dataChart1 = [['조회된 데이타가 없습니다.', 10]];  
      }
    });

  }

  loadChart2() : void {
    this.chart2Benefit$ = this._benefitAnalysisSearchStore.select(getChart1Benefit);

    this.chart2Benefit$.subscribe(res => {
      this.dataChart2 = [];
      
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        
        for (var i = 0; i < res.length; i++) {
          let item = res[i];
          if(ValidationUtil.isNotNullAndNotEmpty(item.totalAmt)) {
            let totalAmtNumber = Number(item.totalAmt);
            if(totalAmtNumber > this.maxValueChart2) {
              this.maxValueChart2 = totalAmtNumber;
            }
          }
        }
        this.dataChart2 = res
      }
    });
  }

  loadChart3() : void {
    this.chart3Benefit$ = this._benefitAnalysisSearchStore.select(getChart3Benefit);

    this.chart3Benefit$.subscribe(res => {
      this.dataChart3 = [];
      
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        
        for (var i = 0; i < res.length; i++) {
          let item = res[i];
          if(ValidationUtil.isNotNullAndNotEmpty(item.totalAmt)) {
            let totalAmtNumber = Number(item.totalAmt);
            if(totalAmtNumber > this.maxValueChart3) {
              this.maxValueChart3 = totalAmtNumber;
            }
          }
        }
        this.dataChart3 = res
      }
    });
  }

  getHeigthOfElement(totalAmt : String, typeChart : String): number {
    
    if(ValidationUtil.isNotNullAndNotEmpty(totalAmt)) {
      let totalAmtNumber = Number(totalAmt);
      let _height = 0;
        if(typeChart == '2') {
          _height = totalAmtNumber / this.maxValueChart2 * 150;
        } else if(typeChart == '3') {
          _height = totalAmtNumber / this.maxValueChart3 * 150;
        }
       
      return _height;
    }

    return 0;
  }

  loadDataTable() : void {

    this.benefitAnalysisSearchItems$ = this._benefitAnalysisSearchStore.select(getBenefitAnalysisSearchItems);
    this.benefitAnalysisSumItem$ = this._benefitAnalysisSearchStore.select(getBenefitAnalysisSumItem);

     //Render Hedaer
     this.tiltePay$.subscribe( result => {
      this.tiltePayNew = [];
      this.titleResult = result;
      this.lengthTitleResult = result.length;

      this.tiltePayNew.push({payName : "정산일자"});
      for (let i = 0; i < result.length; i++) {
        let items = {
          payName : result[i].payName
        }
  
        this.tiltePayNew.push(items);
      }
      this.tiltePayNew.push({payName : "합계금액"});

    });

     //Render Body
     this.benefitAnalysisSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
        
        if (this.collection.length < 5) {
          this.rows = new Array(5 - this.collection.length);
        }
      } else {
        this.collection = [];
        this.rows = new Array(5);
      }

      setTimeout(() => {
        this.setBlankRow();
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }, 500);
    });
  }

  setBlankRow() {
    this.totalRows = this.collection.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.totalCols = this.lengthTitleResult > 0 ? this.lengthTitleResult + 2 : 2;

    this.floorTotalCols =   Math.floor((this.totalCols/2));

    this.cols = new Array(this.totalCols);
  }
  
}
