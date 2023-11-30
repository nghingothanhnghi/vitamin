import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ADORegisterState, getAdmitDates } from '@app/selectors/myoffice/auto-ship/ado-register.selector';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ConvertUtil } from '@app/common/util/convert.util';
import { loadAdmitDate } from '@app/actions/myoffice/auto-ship/ado-register.action';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { AuthUtil } from '@app/common/util/auth.util';
import { LangConstant } from '@app/common/constant/lang.constant';

@Component({
  selector: 'reg-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {

  @Output()
  toggleZipPopup = new EventEmitter<boolean>();

  today = new Date();

  form: FormGroup = {} as FormGroup;

  strYear: string = "년";
  strMonth: string = "월";
  strDay: string = "일";

  admitDates$ = new Observable<ADORegisterModel[]>();
  admitDates: ADORegisterModel[] = [];

  yearOptions: SelectDropdownModel[] = [];
  yearSelected: SelectDropdownModel = {} as SelectDropdownModel;

  monthOptions: SelectDropdownModel[] = [];
  monthSelected: SelectDropdownModel = {} as SelectDropdownModel;

  daysOptions: SelectDropdownModel[] = [];
  daySelected: SelectDropdownModel = {} as SelectDropdownModel;

  showZipPopup: boolean = false;
  
  loginedInfo = AuthUtil.getLoginedInfo();

  constructor(
    private _rootFormGroup: FormGroupDirective,
    private adoRegisterStore: Store<ADORegisterState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.admitDates$ = adoRegisterStore.select(getAdmitDates);
  }

  ngOnInit(): void {
    this.form = this._rootFormGroup.form;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    
    this.admitDates$.subscribe(res => this.handleOnSubscribeAdmitDates(res));

    const yyyymm = ConvertUtil.convertToSring(this.today.getFullYear()) + ConvertUtil.convertToZeroDecimal(this.today.getMonth() + 1);
    this.loadAdmitDates(yyyymm);
  }

  handleOnOpenZipPopup(): void {
    this.toggleZipPopup.emit(true);
  }

  handleOnChangeYearSelected(seleted: SelectDropdownModel): void {
    this.yearSelected = seleted;
    this.pathValueStartDate();
  }

  handleOnChangeMonthSelected(seleted: SelectDropdownModel): void {
    this.monthSelected = seleted;
    this.pathValueStartDate();
  }

  handleOnChangeDaySelected(seleted: SelectDropdownModel): void {
    this.daySelected = seleted;
    this.pathValueStartDate();
  }

  handleOnClickNewShipping(): void {
    this.form.patchValue({
      recipient: "",
      tel: "",
      mobile: "",
      post: "",
      addr1: "",
      addr2: "",
      eMail: "",
    });
  }

  handleOnClickLoginedPerson(): void {
    if (this.loginedInfo) {
      this.form.patchValue({
        recipient: ConvertUtil.convertToSring(this.loginedInfo.username),
        tel: ConvertUtil.convertToSring(this.loginedInfo.tel),
        mobile: ConvertUtil.convertToSring(this.loginedInfo.mobile),
        post: ConvertUtil.convertToSring(this.loginedInfo.post),
        addr1: ConvertUtil.convertToSring(this.loginedInfo.addr1),
        addr2: "",
        addr2Tmp: ConvertUtil.convertToSring(this.loginedInfo.addr2),
        eMail: ConvertUtil.convertToSring(this.loginedInfo.email),
      });
    }
  }

  handleOnSubscribeAdmitDates(res: ADORegisterModel[]): void {
    this.admitDates = res;

    this.yearOptions = [];
    this.monthOptions = [];
    this.daysOptions = [];

    this.yearSelected = {} as SelectDropdownModel;
    this.monthSelected = {} as SelectDropdownModel;
    this.daySelected = {} as SelectDropdownModel;

    let setYear = new Set();
    let setMonth = new Set();
    let setDay = new Set();

    let arr;
    for (const item of res) {
      arr = item.admitDate.split("-");
      if (arr.length === 3) {
        setYear.add(arr[0]);
        setMonth.add(arr[1]);
        setDay.add(arr[2]);
      }
    }
    
    for (const item of setYear.values()) {
      this.yearOptions.push({ label: item + this.strYear, value: ConvertUtil.convertToSring(item) });
    }

    for (const item of setMonth.values()) {
      this.monthOptions.push({ label: item + this.strMonth, value: ConvertUtil.convertToSring(item) });
    }

    for (const item of setDay.values()) {
      this.daysOptions.push({ label: item + this.strDay, value: ConvertUtil.convertToSring(item) });
    }

    if (ValidationUtil.isNotNullAndNotEmpty(this.yearOptions)) {
      this.yearSelected = this.yearOptions[0];
    }

    if (ValidationUtil.isNotNullAndNotEmpty(this.monthOptions)) {
      this.monthSelected = this.monthOptions[0];
    }

    if (ValidationUtil.isNotNullAndNotEmpty(this.daysOptions)) {
      this.daySelected = this.daysOptions[0];
    }

    this.pathValueStartDate();
    
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
  }

  initDayAdmitOptions(items: ADORegisterModel[]): void {
    let item;
    const options = [];

    if (ValidationUtil.isNotNullAndNotEmpty(items)) {
      for (let i = 0; i < items.length; i++) {
        item = items[i];
        options.push({ label: ConvertUtil.convertToZeroDecimal(item.admitDate) + this.strDay, value: ConvertUtil.convertToZeroDecimal(item.admitDate) });
      }
    } else {
      options.push({ label: "없음", value: "" });
    }

    this.daysOptions = options;
    this.daySelected = options[0];
    this.pathValueStartDate();
  }

  loadAdmitDates(yyyymm: string): void {
    if (yyyymm.length !== 6) return;
    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.adoRegisterStore.dispatch(loadAdmitDate({ yyyymm: yyyymm }));
  }

  pathValueStartDate(): void {
    if (ValidationUtil.isNullOrEmpty(this.daySelected.value)) {
      this.form.patchValue({ startDate: "" });
    } else if (ValidationUtil.isNullOrEmpty(this.monthSelected.value)) {
      this.form.patchValue({ startDate: "" });
    } else if (ValidationUtil.isNullOrEmpty(this.yearSelected.value)) {
      this.form.patchValue({ startDate: "" });
    } else {
      let startDate = ConvertUtil.convertToStringFromDateModelAndLang(
        { date: this.daySelected, month: this.monthSelected, year: this.yearSelected },
        LangConstant.LANG_KR
      );
      this.form.patchValue({ startDate: startDate, admitsDay: startDate });
    }
  }
}
