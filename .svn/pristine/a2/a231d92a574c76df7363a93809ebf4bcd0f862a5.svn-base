import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { Member } from '@app/models/myoffice/member/member.model';

@Component({
  selector: 'sub-order-search',
  templateUrl: './sub-order-search.component.html',
  styleUrls: ['./sub-order-search.component.css']
})
export class SubOrderSearchComponent implements OnInit {
  page: number = 1;
  len: number = 10;

  userid: string = "";
  username: string = "";

  reload: boolean = false;
  showMemberPopup: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userid = ConvertUtil.convertToSring(member.userid);
      this.username = ConvertUtil.convertToSring(member.username);
    }
  }

  handleOnChangeLen(option: SelectDropdownModel): void {
    this.page = 1;
    this.len = Number(option.value);
  }

  handleOnChangePage(page: Number): void {
    this.page = Number(page);
  }

  handleOnToggleMemberPopup(show: boolean): void {
    this.showMemberPopup = show;
  }

  handleOnClickRowMemberPopup(item: Member): void {
    this.userid = item.userid;
    this.username = item.username;
    this.page = 1;
    this.reload = true;
  }

  handleOnResetReload(reload: boolean): void {
    this.reload = reload;
  }

  handleOnSearch($event: any): void {
    this.page = 1;
    this.reload = true;
  }
}
