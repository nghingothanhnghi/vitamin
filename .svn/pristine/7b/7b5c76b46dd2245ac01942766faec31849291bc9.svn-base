import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ConvertUtil } from '@app/common/util/convert.util';
import { ADORegisterModel } from '@app/models/myoffice/auto-ship/ado-register.model';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { ADORegisterState, getAdmitDates } from '@app/selectors/myoffice/auto-ship/ado-register.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { ValidationUtil } from '@app/common/util/validation.util';
import { loadAdmitDate } from '@app/actions/myoffice/auto-ship/ado-register.action';
import { LangConstant } from '@app/common/constant/lang.constant';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { MessageConstant } from '@app/common/constant/message.constant';

@Component({
  selector: 'ado-common-info',
  templateUrl: './ado-common-info.component.html',
  styleUrls: ['./ado-common-info.component.css']
})
export class AdoCommonInfoComponent implements OnInit {

  @Input()
  haveAdo: boolean = false;

  @Output()
  cancelAdo = new EventEmitter<any>();

  form: FormGroup = {} as FormGroup;

  today = new Date();

  admitDates$ = new Observable<ADORegisterModel[]>();
  admitDates: ADORegisterModel[] = [];

  wAlertStatus$ = new Observable<WAlertStatus>();

  yearOptions: SelectDropdownModel[] = [];
  yearSelected: SelectDropdownModel = {} as SelectDropdownModel;

  monthOptions: SelectDropdownModel[] = [];
  monthSelected: SelectDropdownModel = {} as SelectDropdownModel;

  daysOptions: SelectDropdownModel[] = [];
  daySelected: SelectDropdownModel = {} as SelectDropdownModel;

  strYear: string = "년";
  strMonth: string = "월";
  strDay: string = "일";

  admitsDayYYYYMMDD: string = "";

  actionConfirm = "confirm";

  constructor(
    private _rootFormGroup: FormGroupDirective,
    private adoRegisterStore: Store<ADORegisterState>,
    private wAlertStore: Store<WAlertState>,
    private overlayLoadingStore: Store<OverlayLoadingState>
  ) { 
    this.admitDates$ = adoRegisterStore.select(getAdmitDates);
    this.wAlertStatus$ = this.wAlertStore.select(getWAlertStatus);
  }

  ngOnInit(): void {
    this.form = this._rootFormGroup.form;

    this.overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    
    // this.admitDates$.subscribe(res => this.handleOnSubscribeAdmitDates(res));

    this.wAlertStatus$.subscribe(res => {
       if (res.action === this.actionConfirm && res.isConfirm) {
        this.cancelAdo.emit();
        this.wAlertStore.dispatch(clearWAlert());
      }
    });

    this.form.get("admitsDayYYYYMMDD")?.valueChanges.subscribe(res => this.handleOnChangeAdmitsDayYYYYMMDD(res));

    const yyyymm = ConvertUtil.convertToSring(this.today.getFullYear()) + ConvertUtil.convertToZeroDecimal(this.today.getMonth() + 1);
    this.loadAdmitDates(yyyymm);
  }

  handleOnClickCancelAdo(): void {
    this.wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgConfirmCancelAdo, action: this.actionConfirm } }));
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

  handleOnChangeAdmitsDayYYYYMMDD(res: string): void {
    this.admitsDayYYYYMMDD = res;

    const year = res.substring(0, 4);
    const month = res.substring(4, 6);
    const day = res.substring(6, 8);
    
    for (const item of this.yearOptions) {
      if (item.value === year) {
        this.handleOnChangeYearSelected(item);
      }
    }

    for (const item of this.monthOptions) {
      if (item.value === month) {
        this.handleOnChangeMonthSelected(item);
      }
    }

    for (const item of this.yearOptions) {
      if (item.value === day) {
        this.handleOnChangeDaySelected(item);
      }
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

    const data = this.form.value;
    if (ValidationUtil.isNotNullAndNotEmpty(data.admitsDayYYYYMMDD)) {
      this.handleOnChangeAdmitsDayYYYYMMDD(data.admitsDayYYYYMMDD);
    }
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

  get adoNo(): string {
    return ConvertUtil.convertToSring(this.form.get("adoNo")?.value);
  }

  get username(): string {
    return ConvertUtil.convertToSring(this.form.get("username")?.value);
  }

  get regDate(): string {
    return ConvertUtil.convertToSring(this.form.get("regDate")?.value);
  }

  get strStatus(): string {
    return ConvertUtil.convertToSring(this.form.get("strStatus")?.value);
  }

  get status(): string {
    return ConvertUtil.convertToSring(this.form.get("status")?.value);
  }

  get admitDay(): string {
    return ConvertUtil.convertToSring(this.form.get("admitsDay")?.value);
  }
}
