import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { loadCodesY } from '@app/actions/system/code.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { CodeModel } from '@app/models/system/code.model';
import { ConsumerSalesRatioInquiryModel } from '@app/models/myoffice/omnitrition/consumer-sales-ratio-inquiry.model';

import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import { Store } from '@ngrx/store';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ConsSalesRatioInquiryState, getCountSalesRatio, getSalesRatioInquiry, getSalesRatioInquiryItems } from '@app/selectors/myoffice/omnitrition/consumer-sales-ratio-inquiry.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { environment } from '@enviroments/environment';
import { countConsumserSalesRatio, searchConsumserSalesRatio, sumConsumserSalesRatio } from '@app/actions/myoffice/omnitrition/consumer-sales-ratio-inquiry/OmnitritionConsumerSalesRatioInquiry.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { AuthUtil } from '@app/common/util/auth.util';

@Component({
  selector: 'app-omnitrition-consumer-sales-ratio-inquiry',
  templateUrl: './omnitrition-consumer-sales-ratio-inquiry.component.html',
  styleUrls: ['./omnitrition-consumer-sales-ratio-inquiry.component.css']
})
export class OmnitritionConsumerSalesRatioInquiryComponent implements OnInit ,OnChanges{

  @Input()
  page: number = 1;

  @Input()
  len: number = 10;
  screen:string = "consumer-sales-ratio-inquiry";

  @Output()
  changeLen = new EventEmitter<SelectDropdownModel>();
 
  keyword:string='';

  userid: string = "";
  username: string = "";
  logid:string="";
  
  options: SelectDropdownModel[] = LenConstant.listLen;
  selectedValue: SelectDropdownModel = new SelectDropdownModel();



  codesY$ = new Observable<CodeModel[]>;
  codesO$ = new Observable<CodeModel[]>;
  codesT$ = new Observable<CodeModel[]>;
  yearOptions: SelectDropdownModel[] = [];
  kindOptions: SelectDropdownModel[] = [];
  pathOptions: SelectDropdownModel[] = [];
  dateFilterSelected: DateFilterModel = new DateFilterModel();


  search$= new Observable<ConsumerSalesRatioInquiryModel[]>;
  consumers: ConsumerSalesRatioInquiryModel[]=[];
  count$= new Observable<number>;
  consumerSalesRatio$= new Observable<ConsumerSalesRatioInquiryModel>;

  totalConsumer= {} as ConsumerSalesRatioInquiryModel;
  totalCons:number=0;

  config: PaginationInstance = {
    id: 'consumer-sales-ratio',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalCons
  }
  constructor(
     private _codeStore: Store<CodeState>,
     private _overlayLoadingStore: Store<OverlayLoadingState>,
     private _consumerSalseInquiryStore:Store<ConsSalesRatioInquiryState>
    ) {
      
    this.codesY$ = this._codeStore.select(getCodesY);
    this.search$=this._consumerSalseInquiryStore.select(getSalesRatioInquiryItems);
    this.consumerSalesRatio$=this._consumerSalseInquiryStore.select(getSalesRatioInquiry);
    this.count$=this._consumerSalseInquiryStore.select(getCountSalesRatio);
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
  }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.logid = ConvertUtil.convertToSring(member.userid);
      this.userid = ConvertUtil.convertToSring(member.userid);
      this.username = ConvertUtil.convertToSring(member.username);
    }
    this.selectedValue = this.options[0];
    this._codeStore.dispatch(loadCodesY());
    this.codesY$.subscribe(res => {
      this.yearOptions = [];
      res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    });

    this.search$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){

        this.consumers=res;

      }else{
        this.consumers=[];
      }
    })
    this.count$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.totalCons=res;
      }else{
        this.totalCons=0;
      }
    })
    this.consumerSalesRatio$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.totalConsumer=res;

      }else{
        this.totalConsumer={} as ConsumerSalesRatioInquiryModel ;
      }
    })

    
  }
  handleOnChangeDateFilter(dateFilter: DateFilterModel): void {
    this.dateFilterSelected = dateFilter;
    this.keyword="";
    this.handleOnSearch();

  }
  handleOnChangePage(page: number): void {
    this.page = Number(page);
    this.handleOnSearch()
  }
  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    this.page=1;
    this.len=Number(selected.value);
    this.handleOnSearch();
  }
  
  handleOnSearch(){
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    setTimeout(() => {
      let params =this.getParams();
      this._consumerSalseInquiryStore.dispatch(searchConsumserSalesRatio({parmas:params}));
      this._consumerSalseInquiryStore.dispatch(countConsumserSalesRatio({parmas:params}));
      this._consumerSalseInquiryStore.dispatch(sumConsumserSalesRatio({parmas:params}));
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    }, 200);
 

  }
  
  handleSearch(keyword:string){
    this.keyword=keyword;
    this.handleOnSearch();
  }
  getParams():any{
    let startDate = this.dateFilterSelected.fromDate.year.value + "-" 
    + this.dateFilterSelected.fromDate.month.value + "-" 
    + this.dateFilterSelected.fromDate.date.value;
    let endDate = this.dateFilterSelected.toDate.year.value + "-" 
    + this.dateFilterSelected.toDate.month.value + "-" 
    + this.dateFilterSelected.toDate.date.value;

    let params={
      comId: environment.comId,
      lang: environment.default_lang,
      startDate:startDate,
      endDate:endDate,
      userid:this.userid,
      page:this.page-1,
      len:this.len,
      //condition:this.keyword,
      cntCd:"",
      rankCd:"",
    }
    return params;
  }
}