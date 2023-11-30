import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';

@Component({
  selector: 'reg-cart',
  templateUrl: './reg-cart.component.html',
  styleUrls: ['./reg-cart.component.css']
})
export class RegCartComponent implements OnInit, OnChanges {

  @Input()
  items: ADORegisterModel[] = [];

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
  smWowWord: WownetWordModel = {} as WownetWordModel;

  @Output()
  removeItem = new EventEmitter<string>();

  totalCol = 4;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTotalCol();
  }

  handleOnClickRemoveItem(pdtCd: string) {
    this.removeItem.emit(pdtCd);
  }

  setTotalCol() {
    this.totalCol = 4;
    if (this.isPv1) this.totalCol++;
    if (this.isPv2) this.totalCol++;
    if (this.isPv3) this.totalCol++;
    if (this.isPoint) this.totalCol++;
  }
}
