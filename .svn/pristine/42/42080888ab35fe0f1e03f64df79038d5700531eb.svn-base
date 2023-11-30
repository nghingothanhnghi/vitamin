import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { CodeModel } from '@app/models/system/code.model';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { loadCodesY } from '@app/actions/system/code.action';
import {countConsumser,searchConsumser  } from '@app/actions/myoffice/omnitrition/consumer-inquiry/omnitrition-consumer-inquiry.action';

import { ConvertUtil } from '@app/common/util/convert.util';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ConsumerInquiryState ,getCountConsumerR,getConsumerRs} from '@app/selectors/myoffice/omnitrition/consumer-Inquiry.selector';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { PaginationInstance } from 'ngx-pagination';
import { environment } from '@enviroments/environment';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { AuthUtil } from '@app/common/util/auth.util';


@Component({
  selector: 'app-omnitrition-consumer-inquiry',
  templateUrl: './omnitrition-consumer-inquiry.component.html',
  styleUrls: ['./omnitrition-consumer-inquiry.component.css']
})

export class OmnitritionConsumerInquiryComponent implements OnInit ,OnChanges{

  @Input()
  page: number = 1;

  @Input()
  len: number = 10;

  reload:boolean=true;
  keyword:string='';

  userId:string="";
  userName:string = '';
  logid: string = '' 

  check:boolean=true;
  
  selectedValue: SelectDropdownModel = new SelectDropdownModel();
  options: SelectDropdownModel[] = LenConstant.listLen;



  codesY$ = new Observable<CodeModel[]>;
  yearOptions: SelectDropdownModel[] = [];

  dateFilterSelected: DateFilterModel = new DateFilterModel();


  searchConsInquiry$= new Observable<ConsumerRegistrationModel[]>;
  consumers: ConsumerRegistrationModel[]=[];
  countConsinquiry$= new Observable<Number>;
  totalCons:number=0;

  config: PaginationInstance = {
    id: 'consumer',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalCons
  }
  constructor(
     private _codeStore: Store<CodeState>,
     private _overlayLoadingStore: Store<OverlayLoadingState>,
     private _consumerinquiryStore:Store<ConsumerInquiryState>
    ) {
    this.codesY$ = this._codeStore.select(getCodesY);
    this.searchConsInquiry$=this._consumerinquiryStore.select(getConsumerRs);
    this.countConsinquiry$=this._consumerinquiryStore.select(getCountConsumerR);
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
  } 
  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.logid = ConvertUtil.convertToSring(member.userid);
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }
    this.selectedValue = this.options[0];
    this._codeStore.dispatch(loadCodesY());
    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });
  }
  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.keyword="";
    this.handleOnSearch();
  }
  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    this.page=1;
    this.len=Number(selected.value);
    this.handleOnSearch();
  }

  handleOnChangePage(page: number): void {
    this.page=page;
    this.handleOnSearch();
  }
  
  handleOnSearch(){
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    setTimeout(() => {
      let params =this.getParams();
      this._consumerinquiryStore.dispatch(searchConsumser({params:params}));
      this._consumerinquiryStore.dispatch(countConsumser({params:params}));
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      this.searchConsInquiry$.subscribe(res=>{
        if(ValidationUtil.isNotNullAndNotEmpty(res)){
          this.consumers=res;
        }else{
          this.consumers=[];
        }
      })
      this.countConsinquiry$.subscribe(res=>{
        if(ValidationUtil.isNotNullAndNotEmpty(res)){
          this.totalCons=Number(res);
        }else{
          this.totalCons=0;
        }
        this.config.totalItems = this.totalCons;
  
      })
    }, 200);
   
  }
  handleSearch(keyword:string){
    this.keyword=keyword;
    this.check=false;
    this.handleOnSearch();
  } 
  getParams():any{
    let startDate="";
    let endDate="";
    if(this.check){
       startDate = this.dateFilterSelected.fromDate.year.value + "-" 
      + this.dateFilterSelected.fromDate.month.value + "-" 
      + this.dateFilterSelected.fromDate.date.value;
       endDate = this.dateFilterSelected.toDate.year.value + "-" 
      + this.dateFilterSelected.toDate.month.value + "-" 
      + this.dateFilterSelected.toDate.date.value;
    }else{
      startDate="1900-01-01";
      endDate="9999-12-31";
      this.check=true;
    }
   

 

    let params={
      sDate:startDate,
      eDate:endDate,
      userid:this.userId,
      username:this.userName,
      comId: environment.comId,
      lang: environment.default_lang,
      page: this.page-1,
      len:this.len,
      condition:this.keyword
    }
    return params;
  }
  
}
