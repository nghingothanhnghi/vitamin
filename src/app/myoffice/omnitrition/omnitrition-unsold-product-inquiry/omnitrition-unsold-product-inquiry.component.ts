import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import * as unsoldProState from '@app/selectors/myoffice/omnitrition/unsold-product-inquiry.selector';
import { ConsumerSalesRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-sales-registration.model';
import { Observable } from 'rxjs';
import { countConsumserSalesRegis,sumConsumserSalesRegis,searhConsumserSalesRegis} from '@app/actions/myoffice/omnitrition/unsold-product-inquiry/unsold-product-inquiry.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { LenConstant } from '@app/common/constant/len.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';


@Component({
  selector: 'app-omnitrition-unsold-product-inquiry',
  templateUrl: './omnitrition-unsold-product-inquiry.component.html',
  styleUrls: ['./omnitrition-unsold-product-inquiry.component.css']
})
export class OmnitritionUnsoldProductInquiryComponent implements OnInit,OnChanges {

  @Input()
  page: number = 1;
  @Input()
  len: number = 10;

  userId: string = "";
  
  userName: string = "";

  saleOption: string= "1";



    //pagination
    totalItems: number = 0;
    config: PaginationInstance = {
      id: 'unsoldId',
      itemsPerPage: this.len,
      currentPage: this.page,
      totalItems: this.totalItems,
    }
    options: SelectDropdownModel[] = LenConstant.listLen;
    selectedValue: SelectDropdownModel = new SelectDropdownModel();

    collection: ConsumerSalesRegistrationModel[]=[];
    consumerSalesRes$ = new Observable<ConsumerSalesRegistrationModel[]>;
    totalConsumer$ = new Observable<number>;

    sumConsSalesRe$= new Observable<ConsumerSalesRegistrationModel>;
    sumConSumer= {} as ConsumerSalesRegistrationModel;
    totalConsumer: number = 0

  
  constructor(
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private _unsoldProStore: Store<unsoldProState.UnsoldProductInquiryState>,
  ) {
    this.consumerSalesRes$=this._unsoldProStore.select(unsoldProState.getunsoldProducts);
    this.sumConsSalesRe$=this._unsoldProStore.select(unsoldProState.getUnsoldProduct);
    this.totalConsumer$=this._unsoldProStore.select(unsoldProState.getCountConsumerR);
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
    this.handleOnSearch();
    this.selectedValue = this.options[0];

    this.consumerSalesRes$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.collection=res;
      }else{
        this.collection=[];
      }
    })
    this.sumConsSalesRe$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.sumConSumer=res;
      }else{
        this.sumConSumer={pdtQty:"0", pdtPrice:"0",  saleQty:"0", saleAmt:"0", unsoldQty:"0", unsoldAmt:"0",} as ConsumerSalesRegistrationModel;
      }
    });
    this.totalConsumer$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.totalItems=res;
      }else{
        this.totalConsumer=0;
      }
    })

  }
  handleSearch() {
    this.page=1;
    this.len=10;
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
        let params=this.getParams();
        this._unsoldProStore.dispatch(countConsumserSalesRegis({params:params}));
        this._unsoldProStore.dispatch(searhConsumserSalesRegis({params:params}));
        this._unsoldProStore.dispatch(sumConsumserSalesRegis({params:params}));
        this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
      }, 200);
    }
  getParams(): any {

    let params = {
      comId: environment.comId,
      lang: environment.default_lang,
      userid: this.userId,
      cntCd:"",
      rankCd: "",
      page: Number(this.page)-1,
      len: this.len,
      pdtCd:"",
      saleOption: this.saleOption
    }
    return params;
  }

  onChangeSaleOption(event:any){
    this.saleOption = event.target.value;
    this.handleSearch()
  }

}
