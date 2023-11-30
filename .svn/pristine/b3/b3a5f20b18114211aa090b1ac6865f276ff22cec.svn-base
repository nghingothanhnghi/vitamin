import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { CenterInfoModel } from '@app/models/shoppingmall/center-info.model';
import { CenterInfoState, getCenterInfo } from '@app/selectors/shoppingmall/center-info.selector';

declare const modifyBackToCloseModal: any;

@Component({
  selector: 'order-shipping',
  templateUrl: './order-shipping.component.html',
  styleUrls: ['./order-shipping.component.css']
})
export class OrderShippingComponent implements OnInit {

  @Input() 
  formGroupName: string = "";

  @Output()
  toggleZipPopup = new EventEmitter<boolean>();

  @Output()
  toggleDeliPopup = new EventEmitter<boolean>();

  form: FormGroup = {} as FormGroup;

  shippingTypeBuyer: number = 1;
  shippingTypeNew: number = 2;
  shippingTypeCenter: number = 3;
  shippingTypeHistory: number = 4;
  isDisableShippingType: boolean = false;

  centerInfo$ = new Observable<CenterInfoModel>();
  centerInfo: CenterInfoModel = {} as CenterInfoModel;

  constructor(
    private _rootFormGroup: FormGroupDirective,
    private _centerInfoStore: Store<CenterInfoState>
  ) { 
    this.centerInfo$ = this._centerInfoStore.select(getCenterInfo);
  }

  ngOnInit(): void {
    this.form = this._rootFormGroup.control.get(this.formGroupName) as FormGroup;
    
    this.centerInfo$.subscribe(res => this.centerInfo = res);
  }

  handleOnClickToggleZipPopup(show: boolean): void {
    modifyBackToCloseModal();
    this.toggleZipPopup.emit(show);
  }

  handleOnClickShippingType(type: number): void {
    if (type === this.shippingTypeBuyer) {
      this.patchShippingTypeBuyer();
    } else if (type === this.shippingTypeNew) {
      this.patchShippingTypeNew();
    } else if (type === this.shippingTypeCenter) {
      this.patchShippingTypeCenter();
    } else if (type === this.shippingTypeHistory) {
      modifyBackToCloseModal();
      this.toggleDeliPopup.emit(true);
    }
  }

  patchShippingTypeBuyer(): void {
    let loginedInfo = AuthUtil.getLoginedInfo();
    this.form.patchValue({
      rName: ConvertUtil.convertToSring(loginedInfo?.username),
      rEmail: ConvertUtil.convertToSring(loginedInfo?.email),
      rMobile: ConvertUtil.convertToSring(loginedInfo?.mobile),
      rPost: ConvertUtil.convertToSring(loginedInfo?.post),
      rAddr1: ConvertUtil.convertToSring(loginedInfo?.addr1),
      rAddr2: ConvertUtil.convertToSring(loginedInfo?.addr2),
    });
    this.isDisableShippingType = true;
  }

  patchShippingTypeNew(): void {
    this.form.patchValue({
      rName: "",
      rEmail: "",
      rMobile: "",
      rPost: "",
      rAddr1: "",
      rAddr2: "",
    });
    this.isDisableShippingType = false;
  }

  patchShippingTypeCenter(): void {
    this.form.patchValue({
      rName: ConvertUtil.convertToSring(this.centerInfo.cntName),
      rEmail: "",
      rMobile: ConvertUtil.convertToSring(this.centerInfo.tel),
      rPost: ConvertUtil.convertToSring(this.centerInfo.post),
      rAddr1: ConvertUtil.convertToSring(this.centerInfo.addr1),
      rAddr2: ConvertUtil.convertToSring(this.centerInfo.addr2),
    });
    this.isDisableShippingType = true;
  }
}
