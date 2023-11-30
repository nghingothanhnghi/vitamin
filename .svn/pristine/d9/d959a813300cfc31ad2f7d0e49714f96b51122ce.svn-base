import { Component, OnInit } from '@angular/core';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  page: number = 1;
  len: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  handleOnChangeLen(option: SelectDropdownModel): void {
    this.page = 1;
    this.len = Number(option.value);
  }

  handleOnChangePage(page: Number): void {
    this.page = Number(page);
  }
}
