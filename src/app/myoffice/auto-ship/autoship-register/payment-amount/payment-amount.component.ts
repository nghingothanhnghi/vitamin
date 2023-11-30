import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';

@Component({
  selector: 'reg-payment-amount',
  templateUrl: './payment-amount.component.html',
  styleUrls: ['./payment-amount.component.css']
})
export class PaymentAmountComponent implements OnInit, OnChanges {

  @Input()
  items: ADORegisterModel[] = [];

  @Input()
  isPv1: boolean = false;

  @Input()
  isPv2: boolean = false;

  @Input()
  isPv3: boolean = false;
  
  @Input()
  isPoint: boolean = false;

  @Input()
  smWowWord: WownetWordModel = {} as WownetWordModel;

  @Output()
  patchPaymentAmount = new EventEmitter<ADORegisterModel>();

  deliAmt: number = 0;
  ordAmt: number = 0;
  ordPoint: number = 0;
  pv1: number = 0;
  pv2: number = 0;
  pv3: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcPaymentAmount();
  }

  calcPaymentAmount(): void {
    let ordVat = 0;
    let ordPrice = 0;
    let ordAmt = 0;
    let ordPoint = 0;
    let pv1 = 0;
    let pv2 = 0;
    let pv3 = 0;
    let qty = 0;
    for (const item of this.items) {
      qty = item.qty;
      ordVat += item.vat * qty;
      ordPrice += item.price * qty;
      ordAmt += item.amt * qty;
      ordPoint += item.point * qty;
      pv1 += item.pv1 * qty;
      pv2 += item.pv2 * qty;
      pv3 += item.pv3 * qty;
    }
    this.ordAmt = ordAmt;
    this.ordPoint = ordPoint;
    this.pv1 = pv1;
    this.pv2 = pv2;
    this.pv3 = pv3;
    this.deliAmt = 0;

    this.patchPaymentAmount.emit({ 
      deliAmt: this.deliAmt ,
      totVat: ordVat,
      totPrice: ordPrice,
      totAmt: this.ordAmt,
      totPoint: this.ordPoint,
      totPv1: this.pv1,
      totPv2: this.pv2,
      totPv3: this.pv3,
    } as ADORegisterModel);
  }
}
