import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'ado-shipping',
  templateUrl: './ado-shipping.component.html',
  styleUrls: ['./ado-shipping.component.css']
})
export class AdoShippingComponent implements OnInit {

  @Input()
  haveAdo: boolean = false;

  @Output()
  toggleZipPopup = new EventEmitter<boolean>();

  form: FormGroup = {} as FormGroup;

  constructor(private _rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this._rootFormGroup.form;
  }

  handleOnOpenZipPopup(): void {
    this.toggleZipPopup.emit(true);
  }
}
