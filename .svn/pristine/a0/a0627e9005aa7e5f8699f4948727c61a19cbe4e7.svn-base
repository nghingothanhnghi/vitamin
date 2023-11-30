import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CheckoutConstant } from '@app/common/constant/checkout.constant';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { BankState, getBank } from '@app/selectors/system/bank.selector';
import { Bank } from '@app/models/system/bank.model';
import { loadBank } from '@app/actions/system/bank.actions';
import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'reg-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {

  form: FormGroup = {} as FormGroup;

  cardInstallOptions: SelectDropdownModel[] = CheckoutConstant.cardInstallOptions;
  cardInstallSelected: SelectDropdownModel = this.cardInstallOptions[0];

  banks$ = new Observable<Bank[]>();
  bankOptions: SelectDropdownModel[] = [];
  bankSelected: SelectDropdownModel = new SelectDropdownModel();

  constructor(
    private _rootFormGroup: FormGroupDirective,
    private bankStore: Store<BankState>
  ) { 
    this.banks$ = this.bankStore.select(getBank);
  }

  ngOnInit(): void {
    this.bankStore.dispatch(loadBank('CARD'));

    this.form = this._rootFormGroup.form;

    this.banks$.subscribe(res => {
      if (res) {
        this.bankOptions = [];
        for (const item of res) {
          if(item.useYn == 'Y'){
            this.bankOptions.push({ label: `${item.bankCd} ${item.bankName}`, value:`${item.bankCd}` });
          }
        }
        this.handleOnSelectedBank(this.bankOptions[0]);
      }
    });

    this.form.get("cardNo1")?.valueChanges.subscribe(res => {
      this.patchCardNoValue();
    });

    this.form.get("cardNo2")?.valueChanges.subscribe(res => {
      this.patchCardNoValue();
    });

    this.form.get("cardNo3")?.valueChanges.subscribe(res => {
      this.patchCardNoValue();
    });

    this.form.get("cardNo4")?.valueChanges.subscribe(res => {
      this.patchCardNoValue();
    });
  }

  handleOnSelectedCardInstall(selected: SelectDropdownModel): void {
    this.cardInstallSelected = selected;
    if (selected) {
      this.form.patchValue({ cardInstall: ConvertUtil.convertToSring(selected.value) });
    }
  }

  handleOnSelectedBank(selected: SelectDropdownModel): void {
    this.bankSelected = selected;
    if (selected) {
      this.form.patchValue({ cardCd: ConvertUtil.convertToSring(selected.value) });
    }
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

  patchCardNoValue(): void {
    const _cardNo1 = this.form.get("cardNo1");
    const _cardNo2 = this.form.get("cardNo2");
    const _cardNo3 = this.form.get("cardNo3");
    const _cardNo4 = this.form.get("cardNo4");
    if (_cardNo1 && _cardNo2 && _cardNo3 && _cardNo4) {
      this.form.patchValue({
        cardNo: _cardNo1.value + "-" + _cardNo2.value + "-" + _cardNo3.value + "-" + _cardNo4.value + "-"
      })
    }
  }

  get total(): number {
    return this.form.get("totAmt")?.value + this.form.get("totPoint")?.value;
  }
}
