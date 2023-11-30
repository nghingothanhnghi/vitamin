import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { loadCodesY } from '@app/actions/system/code.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { DateFilterModel } from '@app/models/components/date-filter.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { CodeModel } from '@app/models/system/code.model';
import { CodeState, getCodesY } from '@app/selectors/system/code.selector';
import  * as consumerRegisSelect  from '@app/selectors/myoffice/omnitrition/consumer-registration.selector';

import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { last, Observable } from 'rxjs';
import {NgForm} from '@angular/forms';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';
import {ResultProcessModel  } from '@app/models/myoffice/result-process.model';

import { ValidationUtil } from '@app/common/util/validation.util';
import { environment } from '@enviroments/environment';
import * as actionConsumerRegis from '@app/actions/myoffice/omnitrition/consumer-registration/omnitrition-consumer-registration.action';
import { DateModel } from '@app/models/components/date.model';
import { LenConstant } from '@app/common/constant/len.constant';
import { Zip } from '@app/models/system/zip.model';
import { AuthUtil } from '@app/common/util/auth.util';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';

import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';


@Component({
  selector: 'app-omnitrition-consumer-registration',
  templateUrl: './omnitrition-consumer-registration.component.html',
  styleUrls: ['./omnitrition-consumer-registration.component.css']
})
export class OmnitritionConsumerRegistrationComponent implements OnInit,OnChanges {

  @Input()
  page: number = 1;

  @Input()
  len: number = 10;

  @Output()
  changeLen = new EventEmitter<SelectDropdownModel>();

  @Output()
  changeDateTimeRes = new EventEmitter<DateModel>;

  @Output()
  changeDateTimeBir = new EventEmitter<DateModel>;


  @Input()
  stringYear: String = "년";

  @Input()
  stringMonth: String = "월";

  @Input()
  stringDate: String = "일";

  rPost:string="";

  fromYear: SelectDropdownModel = new SelectDropdownModel();
  fromMonth: SelectDropdownModel = new SelectDropdownModel();
  fromDate: SelectDropdownModel = new SelectDropdownModel();

  
  fromYearRes: SelectDropdownModel = new SelectDropdownModel();
  fromMonthRes: SelectDropdownModel = new SelectDropdownModel();
  fromDateRes: SelectDropdownModel = new SelectDropdownModel();
  
  codesY$ = new Observable<CodeModel[]>;
  yearOptions: SelectDropdownModel[] = [];
  
  dateRegisDate: DateModel = new DateModel();
  dateBirthday: DateModel = new DateModel();

  selectedValue: SelectDropdownModel = new SelectDropdownModel();
  options: SelectDropdownModel[] = LenConstant.listLen;


  listConsumerUserId:ConsumerRegistrationModel[]=[];
  consumerEdit= {} as ConsumerRegistrationModel;
  resultDelete={} as ResultProcessModel;
  resultSave={} as ResultProcessModel;

  inforRegis= {} as ConsumerRegistrationModel;
  
  
  consumersUserId$ = new Observable<ConsumerRegistrationModel[]>;
  count$ =new Observable<number>;
  resutlSave$= new Observable<ResultProcessModel>;
  resutlDelete$= new Observable<ResultProcessModel>;

  showZipPopup: boolean = false;

  userId:string="";

  userName:string="";

  error:string="";
  success:string="";

  countConumser:number=0;

  wAlertStatus$ = new Observable<WAlertStatus>();

  statusConfrim ={} as WAlertStatus;
  consumerId:string="";

  actionConfirmDelete="acction_confrim_detete";
  config: PaginationInstance = {
    id: 'tableConsumer',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.countConumser
  }

  constructor(
    private _codeStore: Store<CodeState>,
    private __consumerStore:Store<consumerRegisSelect.ConsumerRegistrationState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _wAlertStore: Store<WAlertState>,

  ) { 
    this.codesY$ = this._codeStore.select(getCodesY);
    this.consumersUserId$=this.__consumerStore.select(consumerRegisSelect.getConsumerRs);
    this.count$=this.__consumerStore.select(consumerRegisSelect.getCountConsumerR);
    this.resutlSave$=this.__consumerStore.select(consumerRegisSelect.saveConsumerRs);
    this.resutlDelete$=this.__consumerStore.select(consumerRegisSelect.deleteConsumerR);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
  }
  ngOnInit(): void {
    
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }

    this.inforRegis.consumerName="";
    this.selectedValue = this.options[0];
    this.handleOnSearch();
    this.convertDateSelect(new Date,new Date());
  
    this._codeStore.dispatch(loadCodesY());
    // this.codesY$.subscribe(res => {
    //   this.yearOptions = [];
    //   res.forEach((item) => this.yearOptions.push({ label: item.codeName, value: ConvertUtil.convertToSring(item.codeS1) }));
    // });
    var now = new Date();
    for(var i=now.getFullYear(); i>now.getFullYear()-100; i--){
      this.yearOptions.push({label: ConvertUtil.convertToSring(i), value: ConvertUtil.convertToSring(i)});
    }
    this.consumersUserId$.subscribe(res=> {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.listConsumerUserId=res;
      }else{
        this.listConsumerUserId=[];
      }
    })

    this.count$.subscribe(res=> {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.countConumser=res;
      }else{
        this.countConumser=0;
      }
    })
    this.resutlDelete$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
      this.showAlertDel(res);
      };
    });
    this.resutlSave$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.showAlertSucc(res);
      };
    })
    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));
  }
  
  handleOnChangePage(page: number): void {
    this.page=page;
    this.handleOnSearch()
  }
  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    this.page=1;
    this.len=Number(selected.value);
    this.handleOnSearch();
  }

  handleOnClickToggleZipPopup(show: boolean): void {
    this.showZipPopup = show;
  }
  handleOnClickRowZipPopup(zip: Zip): void {
    this.inforRegis.addr1 =zip.zipCode
    this.inforRegis.addr2 =zip.jibun
    this.inforRegis.post = zip.address
  }
  handleOnClickShowZipPopup(): void {
    this.rPost=this.inforRegis.post;
    this.showZipPopup = true
  }

  onSubmit(consumserRegis:NgForm){
      if(this.validate()==false){
       this.showAlertWarning();
        return;
      }
        let params=this.getParamsForm();
        this.__consumerStore.dispatch(actionConsumerRegis.saveConsumserRegistration({params:params}));
        this.inforRegis={ consumerName:"",} as ConsumerRegistrationModel;
  }

  handleOnDelete(consumerId:string){
    if(consumerId){
      this.showAlertConfirm();
      this.consumerId=consumerId;
    } else {
      this.error = "Please select a consumer.";
      this.showAlertWarning();
      return;
    }
  }
  handleActionConfirm(status: WAlertStatus) {
    var check=false;
    if (status.action === this.actionConfirmDelete && status.isConfirm) {
      let params={
        consumerId:this.consumerId,
        workUser:this.userId
       }
      // this._wAlertStore.dispatch(clearWAlert());
      this.__consumerStore.dispatch(actionConsumerRegis.deleteConsumserRegistration({params}));
      check=true;
    }

  }
  showAlertDel(res:ResultProcessModel):void{
    if(res.retCode=="OK"){
      this.success=res.retStr;
      this.showAlertSuccess();
      this.handleOnSearch();
    }

  }
  showAlertSucc(res:ResultProcessModel):void{
    if(res.retCode=="OK"){
      this.success=res.retStr;
      this.showAlertSuccess();
      this.handleOnSearch();
    };
  }
  handleEdit(consumerId:string){
    this.listConsumerUserId.forEach(consumer=>{
      if(consumer.consumerId==consumerId){
      this.inforRegis.addr1=consumer.addr1;
      this.inforRegis.addr2=consumer.addr2;
      this.inforRegis.consumerId=consumer.consumerId;
      this.inforRegis.consumerName=consumer.consumerName;
      this.inforRegis.email=consumer.email;
      this.inforRegis.mobile=consumer.mobile;
      this.inforRegis.post=consumer.post;
      this.inforRegis.rankRId=consumer.rankRId;
      this.inforRegis.remark=consumer.remark;
      this.inforRegis.workDate=this.inforRegis.workDate;
      this.inforRegis.workUser=this.userId;
      this.inforRegis.rid=consumer.rid;
      this.inforRegis.csmId=consumer.consumerId;
      this.inforRegis.regDate=consumer.regDate;
      this.inforRegis.birthDay=consumer.birthDay;
      }
    })
     var resgis=new Date(this.inforRegis.regDate);
     var dateBd=new Date(this.inforRegis.birthDay);
      this.convertDateSelect(resgis,dateBd);    

  
  }
  convertDateSelect(resgis:Date,dateBd:Date){
    this.fromYearRes = this.getSelectDropdown(resgis.getFullYear(), ConvertUtil.convertToSring(resgis.getFullYear()), this.stringYear);
    this.fromMonthRes = this.getSelectDropdown(resgis.getMonth()+1, ConvertUtil.convertToSring(resgis.getMonth()+1), this.stringMonth);
    this.fromDateRes = this.getSelectDropdown(resgis.getDate(), ConvertUtil.convertToSring(resgis.getDate()), this.stringDate);
    
    this.fromYear = this.getSelectDropdown(dateBd.getFullYear(), ConvertUtil.convertToSring(dateBd.getFullYear()), this.stringYear);
    this.fromMonth = this.getSelectDropdown(dateBd.getMonth()+1, ConvertUtil.convertToSring(dateBd.getMonth()+1), this.stringMonth);
    this.fromDate = this.getSelectDropdown(dateBd.getDate(), ConvertUtil.convertToSring(dateBd.getDate()), this.stringDate);
    this.handleOnChangeDateResgis();
    this.handleOnChangeDateBirthday();
  }


  hanldeOnGetResdate(value: DateModel): void {
    this.fromYearRes = value.year;
    this.fromMonthRes = value.month;
    this.fromDateRes = value.date;
 }
 hanldeOnGetDateBirthday(value: DateModel): void {
  this.fromYear = value.year;
  this.fromMonth = value.month;
  this.fromDate = value.date;
}
  
 handleOnChangeDateResgis(): void {
    this.changeDateTimeBir.emit({
    year:this.fromYear,
    month:this.fromMonth,
    date:this.fromDate
    }
    );
   
}
handleOnChangeDateBirthday(): void {
  this.changeDateTimeRes.emit({
    year:this.fromYearRes,
    month:this.fromMonthRes,
    date:this.fromDateRes
  }
    );

}

 getSelectDropdown(value: String | Number, label: String | Number, unit: any): SelectDropdownModel {
  return {
    value: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(value)),
    label: ConvertUtil.convertToSring(ConvertUtil.convertToZeroDecimal(label)) + ConvertUtil.convertToSring(unit),
  }
}

   handleOnSearch(){
    this.resetAlert();
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    setTimeout(() => {
      let params =this.getParams();
      this.__consumerStore.dispatch(actionConsumerRegis.searchConsumserRegistration({params:params} ));
      this.__consumerStore.dispatch(actionConsumerRegis.countConsumserRegistration({params:params} ));
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    }, 200);
  }
  getParamsForm():any{
    let dateBirthday =this.fromYear.value+"-"+this.fromMonth.value+"-"+this.fromDate.value;
    let dateRegis =this.fromYearRes.value+"-"+this.fromMonthRes.value+"-"+this.fromDateRes.value;
    let params={
      comId: environment.comId,
      lang: environment.default_lang,
      username :this.userName,
      userid :this.userId,
      regDate:dateRegis,
      csmId:null,
      consumerId:this.convertString(this.inforRegis.consumerId) ,
      consumerName:this.convertString(this.inforRegis.consumerName),
      mobile:this.convertString(this.inforRegis.mobile),
      birthday:dateBirthday,
      post: this.convertString(this.inforRegis.post),
      email:this.convertString(this.inforRegis.email),
      addr1:this.convertString(this.inforRegis.addr1),
      addr2:this.convertString(this.inforRegis.addr2),
      remark:this.convertString(this.inforRegis.remark)
      }
      return params;
  }
  getParams(): any {
    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      userId: this.userId, 
      consumerId:null,
      page:this.page-1,
      len:this.len
    }
    return params;
  }
  convertString(data:string):any{
    let params="";
    if(data!=undefined){
      params =data;
    }
    return params;
  }
  validate():boolean{
    let check=true;
    this.resetAlert();
    
    if (this.inforRegis.consumerName=="") {
     this.error +=MessageConstant.msgConsumer +"<br>";
      check= false;
    }
    if (!ValidationUtil.isNullOrEmpty(this.inforRegis.email)&& !this.inforRegis.email.includes("@")) {
      this.error+=MessageConstant.msgConsumerEmail+"<br>";
      check= false;
    }
    if(this.inforRegis.mobile!=null && Number(this.inforRegis.mobile).toString()=="NaN" && this.inforRegis.mobile.length!=11){
      this.error+=MessageConstant.msgConsumerEmail;
      check= false;
    }
    return check;
  }


  
  showAlertConfirm(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgDeleteConsumer, action: this.actionConfirmDelete } }));
  }
  showAlertWarning(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: this.error } }));
  }
  showAlertSuccess(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: this.success } }));
  }
  resetAlert():void{
    this.error="";
    this.success="";
  } 
}


