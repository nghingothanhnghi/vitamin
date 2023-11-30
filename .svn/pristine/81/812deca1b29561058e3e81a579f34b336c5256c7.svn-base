import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { countQna, deleteQna, getBoardCateList, searchQna } from '@app/actions/myoffice/notice/qna.action';
import { countConsumserSalesRatioFailure } from '@app/actions/myoffice/omnitrition/consumer-sales-ratio-inquiry/OmnitritionConsumerSalesRatioInquiry.action';
import { setShowOverlayLoading } from '@app/actions/overlay-loading.action';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { LenConstant } from '@app/common/constant/len.constant';
import { MessageConstant } from '@app/common/constant/message.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { QnaModel } from '@app/models/myoffice/notice/qna.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { CodeModel } from '@app/models/system/code.model';
import { getBoardCateListItems, getQnaSearchItems, getQnaTotalItems, getResultDelete, QnaSearchState } from '@app/selectors/myoffice/notice/qna.selector';
import { OverlayLoadingState } from '@app/selectors/overlay-loading.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit  {


  page: number = 1;

  len: number = 12;

  totalItems: number = 0;

  config: PaginationInstance = {
    id: 'qna',
    itemsPerPage: this.len,
    currentPage: this.page,
    totalItems: this.totalItems,
  }

  options: SelectDropdownModel[] = [];
  selectedValue: SelectDropdownModel = new SelectDropdownModel();

  qnaSearchItems$ = new Observable<QnaModel[]>;
  qnaTotalItems$ = new Observable<Number>;

  collection: QnaModel[] = [];

  totalCols: number = 5;
  totalRows: number = 0;
  rows: number[] = [];
  cols: number[] = new Array(16);

  getBoardCateList$ = new Observable<CodeModel[]>;
  boardCateOptions: SelectDropdownModel[] = [];
  boardCateSelected: SelectDropdownModel = new SelectDropdownModel();

  getResultDelete$ = new Observable<ResultProcessModel>;
  wAlertStatus$ = new Observable<WAlertStatus>();
  actionConfirmDeleteQna: string = "actionConfirmDeleteQna";
  userId: string = "";
  paramsDelete : any  = {};

  constructor(
    private _qnaSearchStore: Store<QnaSearchState>,
    private _overlayLoadingStore: Store<OverlayLoadingState>,
    private router: Router,
    private _wAlertStore: Store<WAlertState>,
  ) {
    this.getResultDelete$ = this._qnaSearchStore.select(getResultDelete);
    this.getBoardCateList$ = this._qnaSearchStore.select(getBoardCateListItems);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
   }
  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
    }

    this.options = LenConstant.listLen;
    this.selectedValue = this.options[0];

    this._qnaSearchStore.dispatch(getBoardCateList());

    this.getBoardCateList$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.boardCateOptions = [];

        this.boardCateOptions.push({label : '전체', value : ''})

        res.forEach((item) => this.boardCateOptions.push({ 
            label: (ValidationUtil.isNotNullAndNotEmpty(item.codeName) ? item.codeName : ''), 
            value: ConvertUtil.convertToSring(item.codeCd)
          }));
          // label: (ValidationUtil.isNotNullAndNotEmpty(item.codeName) ? item.codeName : '') + ' (' + (ValidationUtil.isNotNullAndNotEmpty(item.codeCd) ? item.codeCd : '') +')', 
        this.boardCateSelected = this.boardCateOptions[0]
      }
    });

    this.wAlertStatus$.subscribe(res => this.handleActionConfirm(res));

    this.onSearch();
   
  }

  hanldeOnChangeUserKindSelectedValue(selected: SelectDropdownModel): void {
    this.boardCateSelected = selected;
    this.onSearch();
  }

  handleOnChangeSelectedValue(selected: SelectDropdownModel): void {
    if(ValidationUtil.isNotNullAndNotEmpty(selected.value)) {
      this.len = Number(selected.value);
      this.page = 1;
      this.onSearch();
    }
  }

  handleOnChangePage(page: number): void {
    this.page = page;
    this.onSearch();
  }

  handleOnClickTitle(boardNo: String): void {

    sessionStorage.setItem('boardNoQna', JSON.stringify(boardNo));
    this.router.navigate(['/serviceCenter/customer-consultation-guide-detail']);
  }

  getParams(): any {

    let params = {
      comId:  environment.comId,
      comCd:  environment.comCd,
      kindCd: environment.comCd + "B08",
      boardCate : this.boardCateSelected.value,
      page: Number(this.page) - 1,
      len: this.len,
    }

    return params;
  }

  onSearch(): void {
    let params = this.getParams();

    this._qnaSearchStore.dispatch(searchQna({ params: params }));
    this._qnaSearchStore.dispatch(countQna({ params: params }));

   
    this.qnaSearchItems$ = this._qnaSearchStore.select(getQnaSearchItems);
    this.qnaTotalItems$ = this._qnaSearchStore.select(getQnaTotalItems);

    //Render Body
    this.qnaSearchItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.collection = res;
      } else {
        this.collection = [];
      }

      this.setBlankRow();

      this._overlayLoadingStore.dispatch(setShowOverlayLoading({ loading: false }));
    });

    //Total Items Of data
    this.qnaTotalItems$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.totalItems = Number(res);
      } else {
        this.totalItems = 0;
      }
      this.config.totalItems = this.totalItems;
    })
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

  handleActionConfirm(status: WAlertStatus): void {
    if (status.action === this.actionConfirmDeleteQna && status.isConfirm) {
      this._wAlertStore.dispatch(clearWAlert());
      this.deleteQna();
    }
  }

  confirmDelete(item : any) {

    this.paramsDelete = {
      comId:  environment.comId,
      workUser : this.userId,
      formNo : '6090',
      boardNo : item.boardNo,
      boardNoQ : item.boardNo,
      boardNoA : item.boardNoA,
      kindCd: environment.comCd + "B08",
    }

    this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.confirm, message: MessageConstant.msgQna1, action: this.actionConfirmDeleteQna } }));
  }

  deleteQna() {
    this._qnaSearchStore.dispatch(deleteQna({params:this.paramsDelete}));
      this.getResultDelete$.subscribe( result => {
        if(ValidationUtil.isNotNullAndNotEmpty(result) && result.retStr && result.retStr.length > 0) {
          if(result.retCode=='OK'){
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: result.retStr} }));
            this.paramsDelete = {};
            this.onSearch();
          } else {
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: result.retStr } }));
          }
        }
    });
  }



}
