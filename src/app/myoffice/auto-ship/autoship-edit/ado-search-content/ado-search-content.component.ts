import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'ado-search-content',
  templateUrl: './ado-search-content.component.html',
  styleUrls: ['./ado-search-content.component.css']
})
export class AdoSearchContentComponent implements OnInit {

  @Output()
  toggleShowAdoPopup = new EventEmitter<boolean>();

  form: FormGroup = {} as FormGroup;

  constructor(private _rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this._rootFormGroup.form;
  }

  handleOnClickOpenAdoPopup(): void {
    this.toggleShowAdoPopup.emit(true);
  }

  get adoNo(): string {
    return ConvertUtil.convertToSring(this.form.get("adoNo")?.value);
  }
}
