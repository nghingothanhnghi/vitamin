import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { MemberSearchState } from '@selectors/myoffice/member/member-search.selector';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';

import { Observable } from 'rxjs';
import { Member } from '@models/myoffice/member/member.model';
import { getMember, countMember } from '@selectors/myoffice/member/member-search.selector';
import { ValidationUtil } from '@app/common/util/validation.util';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { MemberConstants } from '@app/common/constant/member.constant';
import { LenConstant } from '@app/common/constant/len.constant';

@Component({
  selector: 'app-member-search-grid',
  templateUrl: './member-search-grid.component.html',
  styleUrls: ['./member-search-grid.component.css']
})
export class MemberSearchGridComponent implements OnInit, OnChanges {
  @Input()
  page: number = 0;

  @Input()
  len: number = 10;

  @Output()
  changeLen = new EventEmitter<SelectDropdownModel>();

  @Output()
  changePage = new EventEmitter<number>();

  totalItems: number = 0;

  collection: Member[] = [];
  options: SelectDropdownModel[] = [];

  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  totalCols: number = 8;
  message: string = "조회된 데이타가 없습니다.";
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = [];

  config: PaginationInstance = {
    id: 'grid-member',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }
  members$ = new Observable<Member[]>;
  memberTotalItems$ = new Observable<Number>;
  constructor(
    private _memberSearchStore: Store<MemberSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>
  ) {
    this.members$ = this._memberSearchStore.select(getMember);
    this.memberTotalItems$ = this._memberSearchStore.select(countMember);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.config.itemsPerPage = this.len;
    this.config.currentPage = this.page;
  }

  ngOnInit(): void {
    this.options = LenConstant.listLen;
    this.selectedValue = this.options[0];

    this.members$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res
      } else {
        this.collection = [];
      }
      this.setBlankRow();
      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    this.memberTotalItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    });

  }

  onChangeLen(selected: SelectDropdownModel): void {
    // this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.changeLen.emit(selected);
  }

  onChangePage(page: number): void {
    // this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: true }));
    this.changePage.emit(page);
  }
  handleOnClickRow(item:Member)  {
    window.open(MemberConstants.URL_MEMBER_INQUIRY+"?userid=" + item.userid,"_blank")
  }
  setBlankRow() {
    this.totalRows = this.collection.length;
    if (this.totalRows === 0) {
      this.rows = new Array(5);
    } else if (this.totalRows < 5) {
      this.rows = new Array(5 - this.totalRows);
    }

    this.cols = new Array(this.totalCols);
  }
}
