import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';
import { WAlertState } from '@app/selectors/w-alert.selector';
import { setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'ado-cart',
  templateUrl: './ado-cart.component.html',
  styleUrls: ['./ado-cart.component.css']
})
export class AdoCartComponent implements OnInit, OnChanges {

  @Input()
  isPv1: boolean = false;

  @Input()
  isPv2: boolean = false;

  @Input()
  isPv3: boolean = false;

  @Input()
  isRetailAmt: boolean = false;

  @Input()
  isAmt: boolean = false;

  @Input()
  isOrd: boolean = false;

  @Input()
  isPoint: boolean = false;

  @Input()
  smWownet: SmWownetModel = {} as SmWownetModel;

  @Input()
  smWowWord: WownetWordModel = {} as WownetWordModel;

  @Input()
  items: ADORegisterModel[] = [];

  @Input()
  haveAdo: boolean = false;

  @Output()
  openProductPopup = new EventEmitter<boolean>();

  @Output()
  removeItem = new EventEmitter<string>();

  @Output()
  addToCart = new EventEmitter<ADORegisterModel>();

  plus: string = "+";
  minus: string = "-";

  totalCol: number = 4;

  constructor(private wAlertStore: Store<WAlertState>) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalCol = 4;
    if (this.isPv1) this.totalCol++;
    if (this.isPv2) this.totalCol++;
    if (this.isPv3) this.totalCol++;
    if (this.isPoint) this.totalCol++;
  }

  hanleOnClickOpenProducPopup(): void {
    this.openProductPopup.emit(true);
  }

  handleOnClickRemoveItem(pdtCd: string): void {
    this.removeItem.emit(pdtCd);
  }

  handleOnChangeQuanity(item: ADORegisterModel, type: string): void {
    let quantity = item.qty;
    if (type === this.plus) {
      quantity++;
    } else if (type === this.minus) {
      quantity--;
    } 

    if (item.adoMinQty && item.adoMinQty > 0 && item.adoMinQty > quantity) {
      this.wAlertStore.dispatch(
        setWAlert({ 
          wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgSaleQtyMinInvalid.replace("{0}", ConvertUtil.convertToSring(item.adoMinQty) ) } 
        })
      );
    } else if (item.adoMaxQty && item.adoMaxQty > 0 && item.adoMaxQty < quantity) {
      this.wAlertStore.dispatch(
        setWAlert({ 
          wAlert: { icon: WAlertConstant.cancelled, message: MessageConstant.msgSaleQtyMaxInvalid.replace("{0}", ConvertUtil.convertToSring(item.adoMaxQty) ) } 
        })
      );
    } else {
      this.addToCart.emit({ ...item, qty: quantity });
    }
  }
}
