import { Component, EventEmitter, Input, OnInit, Output, ElementRef, HostListener } from '@angular/core';

import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';

@Component({
  selector: 'select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {

  @Input()
  selected: SelectDropdownModel = new SelectDropdownModel();

  @Input()
  options: SelectDropdownModel[] = [];
  
  @Output()
  changeSelectedValue = new EventEmitter<SelectDropdownModel>;

  showOptions: Boolean = false;
    
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event:any): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
       this.showOptions = false;
     }
  }

  handleOnClickSelectDropdown(): void {
    this.showOptions = !this.showOptions;
  }

  handleOnClickOption(value: SelectDropdownModel): void {
    this.selected = value;
    this.showOptions = false;
    this.getSelectedValue();
  }

  getSelectedValue() {
    this.changeSelectedValue.emit(this.selected);
  }
}
