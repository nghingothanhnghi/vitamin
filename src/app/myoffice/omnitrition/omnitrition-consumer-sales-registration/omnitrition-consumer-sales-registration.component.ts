import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionConsumerSalesRegis from '@app/actions/myoffice/omnitrition/consumer-sales-registration/consumer-sales-registration.action';
import  * as consumerSalesRegisSelect  from '@app/selectors/myoffice/omnitrition/consumer-sales-registration.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { Observable } from 'rxjs';
import { ConsumerSalesRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-sales-registration.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { ConvertUtil } from '@app/common/util/convert.util';
import { environment } from '@enviroments/environment';
import { LenConstant } from '@app/common/constant/len.constant';
import { PaginationInstance } from 'ngx-pagination';
import { Member } from '@app/models//myoffice/member/member.model';
import { AuthUtil } from '@app/common/util/auth.util';
import { DateUtils } from '@app/common/util/date.util';


import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';

@Component({
  selector: 'app-omnitrition-consumer-sales-registration',
  templateUrl: './omnitrition-consumer-sales-registration.component.html',
  styleUrls: ['./omnitrition-consumer-sales-registration.component.css']
})
export class OmnitritionConsumerSalesRegistrationComponent implements OnInit ,OnChanges,AfterContentChecked {

  page1: number = 1;
  len1: number = 10;
  
  page2: number = 1;
  len2: number = 10;

  page:number=0;
  len:number=10;

  showMemberPopup: boolean = false;
  keyword:string="";

  consumerSelected: SelectDropdownModel = new SelectDropdownModel();
  consumerOptions: SelectDropdownModel[] = [];

  options: SelectDropdownModel[] = LenConstant.listLen;

  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  inforCons = {} as ConsumerSalesRegistrationModel;


  consumers$=new Observable<ConsumerSalesRegistrationModel[]>;
  
  inforConsumer$= new Observable<ConsumerSalesRegistrationModel>;
  inforConsumer = {} as ConsumerSalesRegistrationModel;

  consumerSales$= new Observable<ConsumerSalesRegistrationModel>;
  consumerSales= {} as ConsumerSalesRegistrationModel;

  listProduct$= new Observable<ConsumerSalesRegistrationModel[]>;
  listProduct : ConsumerSalesRegistrationModel[]=[];

  countProduct$= new Observable<number>;
  countProduct: number=0;

  listSales$= new Observable<ConsumerSalesRegistrationModel[]>;
  listSales: ConsumerSalesRegistrationModel[]=[];

  countSales$= new Observable<number>;
  countSales:number=0;

  sale:number[]=[];
  limitSales:string[]=[];
  resultSave$= new Observable<ResultProcessModel>;
  resultSave= {} as ResultProcessModel; 

  wAlertStatus$ = new Observable<WAlertStatus>();

  
  qtySale:string="";
  userId:string="";
  userName:string="";
  
  error :string="";
  success:string="";

  infoConsumerVal:string="";
  consumerAddr:string="";
  remark :string="";
  
  config1: PaginationInstance = {
    id: 'sales-gird-1',
    itemsPerPage: this.len1,
    currentPage: this.page1,
    totalItems: this.countProduct,
  }
  config2: PaginationInstance = {
    id: 'sales-gird-2',
    itemsPerPage: this.len2,
    currentPage: this.page2,
    totalItems: this.countSales,
  }

  constructor(
  private _overlayLoadingStore: Store<OverlayLoadingState>,
  private _wAlertStore: Store<WAlertState>,
  private _consumerSalesRegisStore:Store<consumerSalesRegisSelect.ConsumerSalesRegisState>,
  private changeDetector: ChangeDetectorRef) {

    this.consumers$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getListConsumer);
    this.inforConsumer$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getInfoConsumer);
    this.consumerSales$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getConsumerSale);//2

    this.listProduct$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getListPdt);//1

    this.countProduct$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getCountPdt);//1

    this.listSales$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getListSales);//3
    this.countSales$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.getCountSales);//3
    this.resultSave$=this._consumerSalesRegisStore.select(consumerSalesRegisSelect.save);//3
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);

   }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.config1.itemsPerPage = this.len1;
    this.config1.currentPage = this.page1;
    this.config2.itemsPerPage = this.len2;
    this.config2.currentPage = this.page2;
  }

  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
      this.userName = ConvertUtil.convertToSring(member.username);
    }

   let params = this.getParams();
   this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.loadListConsumer({params:params}));
   
    this.selectedValue = this.options[0];

    this.consumers$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.consumerOptions = [];
        res.forEach((item) =>
          this.consumerOptions.push({
            label: item.consumerName,
            value: ConvertUtil.convertToSring(item.consumerId)
          })
          
        )
        this.consumerSelected = this.consumerOptions[0];
        if (this.consumerSelected.value) {
          this.findConsumerInfo(this.consumerSelected.value.toString())
        }
      }
    })
    this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.loadConsumerSales(this.userId));

    this.handleOnSearchProduct();
    this.handleOnSeachSales();

    this.listProduct$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.listProduct=res;
        for(var j=0;j<this.listProduct.length;j++){
          this.sale[j]=0;
          this.limitSales[j]="0";
        }
      }else{
        this.listProduct=[];
      }
    })
    this.countProduct$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.countProduct=res;
      }else{
        this.countProduct=0;
      }
    })

    this.consumerSales$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.consumerSales=res;
      }else{
        this.consumerSales={ ordAmt:"0", salePrice:"0",  unsoldAmt:"0",  salePriceRate:"0", unsoldAmtRate:"0" } as ConsumerSalesRegistrationModel;
      }
    })
    this.listSales$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.listSales=res;
      }else{
        this.listSales=[];
      }
    })
    this.countSales$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.countSales=res;
      }else{
        this.countProduct=0;
      }
    })
  }

  product:ConsumerSalesRegistrationModel = {} as ConsumerSalesRegistrationModel
  onSave(){
    var check=false;
    this.error='';
    if(this.consumerOptions.length==0 ){
    this.error+=MessageConstant.msgConsumer +"<br>"
    check=true;
    }
    if(this.listProduct.length==0){
      this.error+=MessageConstant.msgListProduct;
      check=true;
    }
    if(check){
     this.showAlertWarning();
      return;
    }
    if(this.listProduct){
      let productSaves = []
      for(let i = 0; i<this.listProduct.length; i++){
        this.product  = this.listProduct[i]
        if(this.product){

          const input = document.getElementById(this.product.ordNo) as HTMLInputElement;
            let saleQty = this.limitSales[i];
           let regNo ='0'
           let regSeq = '0'
           let regDate = DateUtils.getCurrentDate(false)
           let userid = this.userId
           let ordNo = this.product.ordNo
           let pdtSeq = this.product.pdtSeq
           let pdtCd = this.product.pdtCd
            let item ={
              regNo:regNo,
              regSeq:regSeq,
              regDate:regDate,
              userid:userid,
              csmId:this.consumerSelected.value.toString(),
              ordNo:ordNo,
              pdtSeq:pdtSeq,
              pdtCd:pdtCd,
              qty:saleQty,
              remark:this.remark,
            }
            productSaves.push(item)
        }
      }
      this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.save({params:{items: productSaves}}));

      this.resultSave$.subscribe(res => {
        this.resultSave  = res
        if (ValidationUtil.isNotNullAndNotEmpty(this.resultSave)) {
          if ( this.resultSave.retCode == 'OK') {
            this.success=( this.resultSave.retStr) ?  this.resultSave.retStr.toString() : '';
            this.showAlertSuccess();
          } else if ( this.resultSave.retStr&&  this.resultSave.retStr.length>0){
            this.error=( this.resultSave.retStr) ?  this.resultSave.retStr.toString() : '';
            this.showAlertWarning();
          }
      }
      })
    }
  }

  editable(id:string){
      const input = document.getElementById(id) as HTMLInputElement;
      if(input){
        input.readOnly = false
      }
  }
  loadPrice(event:any,price:string,index:number,unsoldQty:string){

    if( event.key !="Backspace" && Number(event.key).toString()=="NaN"){
      return;
    }

    if(event.key=="Backspace"){
      var i=this.qtySale.length;
      this.qtySale=this.qtySale.substring(0,i-1);
      if(i==0){
        this.qtySale="";
      }
    }else{
      this.qtySale+=event.key;
    }
    if(Number(this.qtySale)>Number(unsoldQty)){
      this.qtySale=unsoldQty;
      this.limitSales[index]=unsoldQty;
    }else{
      this.limitSales[index]=this.qtySale;
    }
    if(Number(this.limitSales[index])==0){
      this.limitSales[index]="0";
    }
   
    this.sale[index]=(Number(price)/Number(unsoldQty))*Number(this.qtySale);
    
  }

  findConsumerInfo(consumerId:string){
    this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.loadInfoConsumer(consumerId));
    this.inforConsumer$.subscribe(res=>{
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.infoConsumerVal =  ''
        this.consumerAddr =  ''
        this.remark =  ''
        if (res.birthDay) {
          this.infoConsumerVal = res.birthDay
        }
        if (res.regDate) {
          this.infoConsumerVal += "/" + res.regDate;
        }
        if (res.email) {
          this.infoConsumerVal += "/" + res.email;
        }

        if (res.post) {
          this.consumerAddr = res.post;
        }
        if (res.addr1) {
          this.consumerAddr +=  "/" + res.addr1;
        }
        if (res.addr2) {
          this.consumerAddr += "/" + res.addr2;
        }
        if (res.remark) {
          this.remark = res.remark;
        }

      }
    })
  }

  handleOnChangeSelectedValue1(selected: SelectDropdownModel): void {
    if(Number(this.page1)>1){
      this.page1=1;
     };
    this.len1=Number(selected.value);
    this.len=this.len1;  
  }
  handleOnChangeSelectedValue2(selected: SelectDropdownModel): void {
    if(Number(this.page2)>1){
      this.page2=1;
     };
    this.len2=Number(selected.value);
    this.len=this.len2;
  }
  handleOnChangePage1(page: number): void {
    this.page1 = Number(page);
    this.page=this.page;
   }
   handleOnChangePage2(page: number): void {
    this.page2 = Number(page);
    this.page=this.page2;
   }

  handleOnSearchProduct(){
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    setTimeout(() => {
      this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.loadListPdt(this.userId));
      this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.countPdt(this.userId));
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    }, 300);
    
  }
  handleOnSeachSales(){
    this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    setTimeout(() => {
      this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.loadListSale(this.userId));
      this._consumerSalesRegisStore.dispatch(actionConsumerSalesRegis.countSale(this.userId)); 
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    }, 300);
  }
  hanldeOnChangeKindSelectedValue(selected: SelectDropdownModel): void {
    this.consumerSelected = selected;
    this.findConsumerInfo(selected.value.toString())
    
  }
   getParams():any {
    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      userId: this.userId,
      sDate:"00000000",
      eDate:"99999999",
      date:"",
      page:1,
      len:10,
      userName:this.userName
    }
    return params;
  }
 
  
  getParamsSave():any{
    let params ={
      comId: environment.comId,
      workUser: this.userId,
      dto:{
        items:{}
      }
    }
   return params;
  }
  showAlertWarning(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: this.error } }));
  }
  showAlertSuccess(): void {
    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: this.success } }));
  }
}


