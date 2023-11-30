import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CheckoutConstant } from '@app/common/constant/checkout.constant';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { Bank } from '@app/models/system/bank.model';
import { BankState, getBank } from '@app/selectors/system/bank.selector';
import { loadBank } from '@app/actions/system/bank.actions';
import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'ado-card',
  templateUrl: './ado-card.component.html',
  styleUrls: ['./ado-card.component.css']
})
export class AdoCardComponent implements OnInit {

  @Input()
  haveAdo: boolean = false;

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

    this.banks$.subscribe(res => this.handleOnSubscribeBank(res));

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

    this.form.get("cardCd")?.valueChanges.subscribe(res => {
      for (const option of this.bankOptions) {
        if (option.value === res) {
          this.bankSelected = option;
          break;
        }
      }
    });

    this.form.get("cardInstall")?.valueChanges.subscribe(res => {
      for (const option of this.cardInstallOptions) {
        if (option.value === res) {
          this.cardInstallSelected = option;
          break;
        }
      }
    })
  }

  handleOnSelectedCardInstall(selected: SelectDropdownModel): void {
    if (selected) {
      this.form.patchValue({ cardInstall: ConvertUtil.convertToSring(selected.value) });
    }
  }

  handleOnSelectedBank(selected: SelectDropdownModel): void {
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

  handleOnSubscribeBank(res: Bank[]): void {
    if (res) {
      let index = 0;
      let selectedIndex = 0;

      const cardCd = this.form.get("cardCd")?.value;
      this.bankOptions = [];

      for (const item of res) {
        if (item.useYn == 'Y') {
          if (item.bankCd === cardCd) {
            selectedIndex = index;
          }
          this.bankOptions.push({ label: `${item.bankCd} ${item.bankName}`, value:`${item.bankCd}` });
          index++;
        }
      }

      this.handleOnSelectedBank(this.bankOptions[selectedIndex]);
    }
  }

  patchCardNoValue(): void {
    const _cardNo1 = this.form.get("cardNo1");
    const _cardNo2 = this.form.get("cardNo2");
    const _cardNo3 = this.form.get("cardNo3");
    const _cardNo4 = this.form.get("cardNo4");
    if (_cardNo1 && _cardNo2 && _cardNo3 && _cardNo4) {
      this.form.patchValue({
        cardNo: _cardNo1.value + "-" + _cardNo2.value + "-" + _cardNo3.value + "-" + _cardNo4.value
      })
    }
  }
}
