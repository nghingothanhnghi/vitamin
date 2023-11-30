import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { getMemberPoint, MemberPointState } from '@app/selectors/shoppingmall/member-point.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { getSmWownetConfig, SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { setWAlert } from '@app/actions/w-alert.action';

@Component({
  selector: 'order-point',
  templateUrl: './order-point.component.html',
  styleUrls: ['./order-point.component.css']
})
export class OrderPointComponent implements OnInit {

  @Input()
  orderInfo: OrderMstModel = {} as OrderMstModel;

  @Input() 
  formGroupName: string = "";

  form: FormGroup = {} as FormGroup;

  smConfig$ = new Observable<SmWownetConfigModel>();
  smConfig: SmWownetConfigModel = {} as SmWownetConfigModel;

  memberPoint$ = new Observable<OrderMstModel>();
  totalPoint: number = 0;

  constructor(
    private _rootFormGroup: FormGroupDirective, 
    private _smWownetStore: Store<SmWownetState>,
    private _memberPointStore: Store<MemberPointState>,
    private _wAlertStore: Store<WAlertState>
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
      this.form.patchValue({ point: { totalPoint: totalPoint } });
    });
  }

  handleOnChangeUsePoint(_e: any): void {
    let value = _e.value;
    if (value) {
      var usePoint = value.replace(/[^0-9-+]/g, "");
      this.checkMemberPoint(+usePoint);
    } else {
      this.checkMemberPoint(0);
    }
  }

  handleOnClickUseAllPoint(): void {
    this.checkMemberPoint(this.totalPoint);
  }

  checkMemberPoint(usePoint: number): void {
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
    this.form.patchValue({ usePoint: ConvertUtil.setComma(newPoint) });
  } 
}
