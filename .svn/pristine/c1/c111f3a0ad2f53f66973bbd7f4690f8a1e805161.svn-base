import { Component, HostListener, OnInit } from '@angular/core';
import { detailWitholdingTax, sumDetailWitholdingTax, userWitholdingTax } from '@app/actions/myoffice/benefit/witholding-tax.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { WitholdingTaxModel } from '@app/models/myoffice/benefit/witholding-tax.module';
import { Company } from '@app/models/system/company.model';
import { detailWitholdingTaxItems, sumDetailWitholdingTaxItems, userWitholdingTaxItems, WitholdingTaxSearchState } from '@app/selectors/myoffice/benefit/witholding-tax.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-witholding-tax-report',
  templateUrl: './witholding-tax-report.component.html',
  styleUrls: ['./witholding-tax-report.component.css']
})
export class WitholdingTaxReportComponent implements OnInit {

  witholdingTaxSearchItems$ = new Observable<WitholdingTaxModel[]>;
  witholdingTaxSumItem$ = new Observable<WitholdingTaxModel>;
  userWitholdingTaxItems$ = new Observable<WitholdingTaxModel>;

  collection: WitholdingTaxModel[] = [];
  collectionSum: any = {} as WitholdingTaxModel ;
  collectionUser: any = {} as WitholdingTaxModel ;
  company: any = {} as Company ;
  params : any = "";
  pathImg : String = "";

  now: Date = new Date();
  currentDay : String = "";
  currentYear : String = "";

  constructor(
    private _witholdingTaxSearchtore: Store<WitholdingTaxSearchState>,
  ) { 
    this.witholdingTaxSearchItems$ = this._witholdingTaxSearchtore.select(detailWitholdingTaxItems);
    this.witholdingTaxSumItem$ = this._witholdingTaxSearchtore.select(sumDetailWitholdingTaxItems);
    this.userWitholdingTaxItems$ = this._witholdingTaxSearchtore.select(userWitholdingTaxItems);

  }

  ngOnInit(): void {

    const y = this.now.getFullYear();
    const m = this.now.getMonth() + 1;
    const d = this.now.getDate();

    this.currentDay = y + '년 ' + m +'월 '+ d + '일';
    this.currentYear = y + '년';
    
    this.params = localStorage.getItem("witholdingTax");
    let paramsParse = JSON.parse(this.params);

    if (ValidationUtil.isNotNullAndNotEmpty(paramsParse)) {
      this.loadData(paramsParse);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: any) {
    localStorage.removeItem("witholdingTax");
  }

  loadData(params : any) {

    this.company = params.company;
    this.pathImg = params.pathImg;

    let param = {
      comId  : environment.comId,
      lang   : environment.default_lang,
      userId : params.userId,
      sDate  : params.sDate,
      eDate  : params.eDate
    };

    this._witholdingTaxSearchtore.dispatch(userWitholdingTax({ params: param }));
    this._witholdingTaxSearchtore.dispatch(sumDetailWitholdingTax({ params: param }));
    this._witholdingTaxSearchtore.dispatch(detailWitholdingTax({ params: param }));
    
    this.loadDataUser();
    this.loadDataRepot();
  }

  loadDataUser() {
    this.userWitholdingTaxItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionUser = res;
      }
    });
  }

  loadDataRepot() {
    this.witholdingTaxSumItem$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collectionSum = res;
      }
    });
    
    this.witholdingTaxSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;

        setTimeout(() => window.print(), 500);
      }
    });

  }

}
