import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { getCardInstall } from '@app/actions/shoppingmall/kor-payment.action';
import { setWAlert } from '@app/actions/w-alert.action';

import { CheckoutConstant } from '@app/common/constant/checkout.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { CardInstallModel } from '@app/models/shoppingmall/list-card-install.model';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { getListCardInstallResult, KorPaymentState } from '@app/selectors/shoppingmall/kor-payment.selector';
import { getMemberPoint, MemberPointState } from '@app/selectors/shoppingmall/member-point.selector';
import { getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})
export class PersonalCardComponent implements OnInit {

  @Input() 
  pFormGroupName: string = "";

  @Input() 
  formGroupName: string = "";

  form: FormGroup = {} as FormGroup;

  @Input() 
  orderInfo: OrderMstModel = {} as OrderMstModel;

  @Input()
  smWownetPg: SmWownetPgModel = {} as SmWownetPgModel;

  smConfig$ = new Observable<SmWownetConfigModel>();
  smConfig: SmWownetConfigModel = {} as SmWownetConfigModel;

  memberPoint$ = new Observable<OrderMstModel>();
  totalPoint: number = 0;
    
  personalCardInstallOptions: SelectDropdownModel[] = [];
  personalCardSelected: SelectDropdownModel = new SelectDropdownModel();

  cardInstall$ = new Observable<CardInstallModel>();
  cardInstall: CardInstallModel = {} as CardInstallModel;

  constructor(
      private _rootFormGroup: FormGroupDirective,
      private _memberPointStore: Store<MemberPointState>,
      private _smWownetStore: Store<SmWownetState>,
      private _wAlertStore: Store<WAlertState>,
      private _cardInstallStore: Store<KorPaymentState>,
    ) { 
      this.smConfig$ = this._smWownetStore.select(getSmWownetConfig);
      this.memberPoint$ = this._memberPointStore.select(getMemberPoint);
      this.cardInstall$ = this._cardInstallStore.select(getListCardInstallResult);
    }

  ngOnInit(): void {
    const cardForm = this._rootFormGroup.control.get(this.pFormGroupName);
    if (cardForm) {
      this.form = cardForm.get(this.formGroupName) as FormGroup;
    }

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

    this._cardInstallStore.dispatch(getCardInstall());

    this.cardInstall$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        if(res.res_code === '0000'){
          this.personalCardInstallOptions = [];
          for(let i=0; i <= +res.quota; i++){
            if(i < 10){
              if(i === 0){
                this.personalCardInstallOptions.push({ label: '일시불', value: '00'});
              }else{
                this.personalCardInstallOptions.push({ label: i + '개월', value: '0' + i});
              }
            }else{
              this.personalCardInstallOptions.push({ label: i + '개월', value: '' + i});
            }
          }
          this.personalCardSelected = this.personalCardInstallOptions[0];
        }
      }
    })

  }

  handleOnChangePersonalSelectedCardInstall(selected: SelectDropdownModel): void {
    this.personalCardSelected = selected;
    this.form.patchValue({ cardInstall: ConvertUtil.convertToSring(selected.value) });
  }

  handleOnKeyUpNumber(_e: any): void {
    let value = _e.value;
    if (value) {
      value = value.replace(/[^0-9-+]/g, "");
    } else {
      value = "";
    }
    _e.value = value;
  }

  handleOnChangeUsePointPCard(_e: any): void {
    let value = _e.value;
    if (value) {
      var usePoint = value.replace(/[^0-9-+]/g, "");
      this.checkMemberPointPCard(+usePoint);
    } else {
      this.checkMemberPointPCard(0);
    }
  }

  checkMemberPointPCard(usePoint: number): void {
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
    this.form.patchValue({ usePointPCard: ConvertUtil.setComma(newPoint) });
  } 
}
