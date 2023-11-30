import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { getMemberPoint, MemberPointState } from '@app/selectors/shoppingmall/member-point.selector';
import { getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare const changeRecipt: any;

@Component({
  selector: 'vbbank',
  templateUrl: './vbbank.component.html',
  styleUrls: ['./vbbank.component.css']
})
export class VbbankComponent implements OnInit {

  today = new Date();

  @Input() 
  formGroupName: string = "";

  @Input() 
  orderInfo: OrderMstModel = {} as OrderMstModel;

  @Input()
  smWownetPg: SmWownetPgModel = {} as SmWownetPgModel;

  memberPoint$ = new Observable<OrderMstModel>();
  totalPoint: number = 0;

  smConfig$ = new Observable<SmWownetConfigModel>();
  smConfig: SmWownetConfigModel = {} as SmWownetConfigModel;
  
  @Input()
  point: number = 0;
  
  form: FormGroup = 
  
  {} as FormGroup;
  cashRcptYNOptions: SelectDropdownModel[] = [
    { label: "미발행" , value: "N" },
    { label: "발행"   , value: "Y" }
  ];
  cashRcptYNSelected: SelectDropdownModel = this.cashRcptYNOptions[0];

  vaccAdmitInfoOptions: SelectDropdownModel[] = [
    { label: "케이뱅크"    , value: "089" },
    { label: "NH농협은행"  , value: "011" },
    { label: "KB국민은행"  , value: "004" },
    { label: "신한은행"    , value: "088" },
    { label: "우리은행"    , value: "020" },
    { label: "IBK기업은행" , value: "003" },
    { label: "KEB하나은행" , value: "081" },
    { label: "SC제일은행"  , value: "023" },
    { label: "우체국"      , value: "071" },
    { label: "부산은행"    , value: "032" },
    { label: "광주은행"    , value: "034" },
  ];
  vaccAdmitInfoSelected: SelectDropdownModel = this.vaccAdmitInfoOptions[0];

  cashRcptOpt1: SelectDropdownModel[] = [
    { label: "소득증빙용"    , value: "0" },
    { label: "지출증빙용"    , value: "1" },
  ];
  cashRcptOpt1Selected: SelectDropdownModel = this.cashRcptOpt1[0];

  cashRcptOpt2: SelectDropdownModel[] = [
    { label: "현금영수증 카드번호"    , value: "1" },
    { label: "주민번호"             , value: "2" },
    { label: "사업자번호"           , value: "3" },
    { label: "휴대폰번호"           , value: "4" },
  ];
  cashRcptOpt2Selected: SelectDropdownModel = this.cashRcptOpt2[0];
  
  constructor(
    private _rootFormGroup: FormGroupDirective,
    private _memberPointStore: Store<MemberPointState>,
    private _smWownetStore: Store<SmWownetState>,
    private _wAlertStore: Store<WAlertState>,
  ) { 
    this.smConfig$ = this._smWownetStore.select(getSmWownetConfig);
    this.memberPoint$ = this._memberPointStore.select(getMemberPoint);
  }

  ngOnInit(): void {
    this.form = this._rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.memberPoint$.subscribe(res => {
      let totalPoint = "0";
      if (ValidationUtil.isNotNullAndNotEmpty(res) && ValidationUtil.isNotNullAndNotEmpty(res.havePoint)) {
        totalPoint = ConvertUtil.convertToSring(res.havePoint);
      }
      this.totalPoint = +totalPoint;
    });

    this.smConfig$.subscribe(res => {
      this.smConfig = res;
    });
  }

  handleReciptOnclick(selected: SelectDropdownModel, flag : any){
    if(flag == 1) {
      this.cashRcptYNSelected = selected;
      this.form.patchValue({ cashRcptYN: selected.value });
      if(selected.value == 'N') {
        this.form.patchValue({ 
          cashRcptOpt1: ["1"],
          cashRcptOpt2: ["1"],
          cashRcptOpt3: [""]
        });
      }
      changeRecipt(selected.value);
    } else if(flag == 2) {
      this.cashRcptOpt1Selected = selected;
      this.form.patchValue({ cashRcptOpt1: selected.value });
    } else if(flag == 3) {
      this.cashRcptOpt2Selected = selected;
      this.form.patchValue({ cashRcptOpt2: selected.value });
    }

  }

  handleVaccAdmitInfoOnclick(selected: SelectDropdownModel){
    this.vaccAdmitInfoSelected = selected;
    this.form.patchValue({ vaccAdmitInfo: selected.value });
  }

  handleOnChangeUsePointVBank(_e: any): void {
    let value = _e.value;
    if (value) {
      var usePoint = value.replace(/[^0-9-+]/g, "");
      this.checkMemberPointVBank(+usePoint);
    } else {
      this.checkMemberPointVBank(0);
    }
  }

  checkMemberPointVBank(usePoint: number): void {
    if (ValidationUtil.isNullOrEmpty(this.orderInfo)) return;
    if (ValidationUtil.isNullOrEmpty(this.orderInfo.totalAmt)) return;

    let minPoint = 0;
    let rate = 100;
    let totalAmt = +this.orderInfo.totalAmt;
    
    if (ValidationUtil.isNotNullAndNotEmpty(this.smConfig)) {
      if (ValidationUtil.isNotNullAndNotEmpty(this.smConfig.oUseMinPoint)) {
        minPoint = this.smConfig.oUseMinPoint;
      }
      if (ValidationUtil.isNotNullAndNotEmpty(this.smConfig.oUsePointRate)) {
        rate = this.smConfig.oUsePointRate;
      }
    }

    let realPoint = totalAmt * rate / 100;
    
    if (realPoint > this.totalPoint) {
      realPoint = this.totalPoint;
    }

    let newPoint = usePoint;
    if (usePoint > 0) {
      if (usePoint < minPoint) {
        let msg = `마일리지로 결제하려면 현재 마일리지가 ${ConvertUtil.setComma(minPoint)} 이상 되어야 합니다.`;
        this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.cancelled, message: msg } }));
        newPoint = 0;
      } else if (realPoint > 0) {
        if (usePoint > realPoint) {
          newPoint = realPoint;
        } else if (usePoint > this.totalPoint) {
          newPoint = this.totalPoint;
        }
      }
    }
    this.form.patchValue({ usePointVBank: ConvertUtil.setComma(newPoint) });
  } 

}
