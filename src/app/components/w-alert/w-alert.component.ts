import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getWAlert, WAlertState } from '@app/selectors/w-alert.selector';
import { WAlert } from '@app/models/components/w-alert.model';
import { ValidationUtil } from '@app/common/util/validation.util';
import { setWAlertStatus } from '@app/actions/w-alert.action';
import { ConvertUtil } from '@app/common/util/convert.util';

declare const addEventListenerWAlert: any;
declare const showAlert: any;
declare const hideAlert: any;
declare const hideAllAlerts: any;

@Component({
  selector: 'w-alert',
  templateUrl: './w-alert.component.html',
  styleUrls: ['./w-alert.component.css']
})
export class WAlertComponent implements OnInit {

  wAlert$ = new Observable<WAlert>();
  wAlert: WAlert = {} as WAlert;

  confirmBtnText: string = "확인";
  cancelBtnText: string = "취소";
  icon: string = "successful";

  constructor(private _wAlertStore: Store<WAlertState>) { 
    this.wAlert$ = this._wAlertStore.select(getWAlert);
  }

  ngOnInit(): void {
    this.wAlert$.subscribe(res => {
      this.wAlert = res;
      this.initButtonText(res);

      if (ValidationUtil.isNotNullAndNotEmpty(res.icon)) {
        this.icon = ConvertUtil.convertToSring(res.icon);
        if (typeof showAlert === "function") {
          setTimeout(() => showAlert(res.icon), 50);
        }
      } else {
        this.icon = "successful";
        if (typeof hideAllAlerts === "function") {
          hideAllAlerts(res.icon)
        }
      }
    });

    if (typeof addEventListenerWAlert === "function") {
      setTimeout(() => addEventListenerWAlert(), 50);
    }
  }

  handleOnClickConfirm(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.wAlert.icon)) {
      this._wAlertStore.dispatch(setWAlertStatus({ status: { action: ConvertUtil.convertToSring(this.wAlert.action), isConfirm: true } }))
      if (typeof hideAlert === "function") {
        setTimeout(() => hideAlert(this.wAlert.icon), 50);
      }
    }
  }

  handleOnClickCancel(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.wAlert.icon)) {
      this._wAlertStore.dispatch(setWAlertStatus({ status: { action: ConvertUtil.convertToSring(this.wAlert.action), isCancel: true } }))
      if (typeof hideAlert === "function") {
        setTimeout(() => hideAlert(this.wAlert.icon), 50);
      }
    }
  }
  handleOnClickOuter(): void {
    if (ValidationUtil.isNotNullAndNotEmpty(this.wAlert.icon)) {
      this._wAlertStore.dispatch(setWAlertStatus({ status: { action: ConvertUtil.convertToSring(this.wAlert.action), isConfirm: false } }))
      if (typeof hideAlert === "function") {
        setTimeout(() => hideAlert(this.wAlert.icon), 50);
      }
    }
  }

  initButtonText(res: WAlert): void {
    if (ValidationUtil.isNotNullAndNotEmpty(res.confirmBtnText)) {
      this.confirmBtnText = ConvertUtil.convertToSring(res.confirmBtnText);
    } else {
      this.confirmBtnText = "확인";
    }

    if (ValidationUtil.isNotNullAndNotEmpty(res.cancelBtnText)) {
      this.cancelBtnText = ConvertUtil.convertToSring(res.cancelBtnText);
    } else {
      this.cancelBtnText = "취소";
    }
  }
}
