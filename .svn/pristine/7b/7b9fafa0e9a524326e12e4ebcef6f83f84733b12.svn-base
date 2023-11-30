import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getBoardCateList, saveQna } from '@app/actions/myoffice/notice/qna.action';
import { clearWAlert, setWAlert } from '@app/actions/w-alert.action';
import { MemberConstants } from '@app/common/constant/member.constant';
import { WAlertConstant } from '@app/common/constant/w-alert-icon.constant';
import { AuthUtil } from '@app/common/util/auth.util';
import { ConvertUtil } from '@app/common/util/convert.util';
import { ValidationUtil } from '@app/common/util/validation.util';
import { SelectDropdownModel } from '@app/models/components/select-dropdown.model';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';
import { CustomerConsultationGuideComposingModel } from '@app/models/myoffice/notice/customer-consultation-guide-composing.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { CodeModel } from '@app/models/system/code.model';
import { getBenefitAccountingSearchItems } from '@app/selectors/myoffice/benefit/benefit-accounting-inquiry.selector';
import { getBoardCateListItems, getResultSave, QnaSearchState } from '@app/selectors/myoffice/notice/qna.selector';
import { getWAlertStatus, WAlertState } from '@app/selectors/w-alert.selector';
import { environment } from '@enviroments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//const CKEDITOR_BASEPATH = 'src/assets/js/ckeditor/'
declare const CKEDITOR: any;

@Component({
  selector: 'app-customer-consultation-guide-composing',
  templateUrl: './customer-consultation-guide-composing.component.html',
  styleUrls: ['./customer-consultation-guide-composing.component.css']
})
export class CustomerConsultationGuideComposingComponent implements OnInit {

  "scripts": [
    "src/assets/js/ckeditor/ckeditor.js",
  ]

  userId: string = "";
  
  qnaRegis= {} as CustomerConsultationGuideComposingModel;

  resutlSave$= new Observable<ResultProcessModel>;
  resultSave={} as ResultProcessModel;

  getResultSave$ = new Observable<ResultProcessModel>;
  

  actionQnaSuccessfull: string = "actionQnaSuccessfull";
  wAlertStatus$ = new Observable<WAlertStatus>();
  error : string = "";

  getBoardCateList$ = new Observable<CodeModel[]>;
  boardCateOptions: SelectDropdownModel[] = [];
  boardCateSelected: SelectDropdownModel = new SelectDropdownModel();

  constructor(
    private __qnaStore:Store<QnaSearchState>,
    private _wAlertStore: Store<WAlertState>,
    private _router: Router,
  ) {
    this.getResultSave$ = this.__qnaStore.select(getResultSave);
    this.getBoardCateList$ = this.__qnaStore.select(getBoardCateListItems);
    this.wAlertStatus$ = this._wAlertStore.select(getWAlertStatus);
   }

  ngOnInit(): void {

    let member = AuthUtil.getLoginedInfo();
    if (member) {
      this.userId = ConvertUtil.convertToSring(member.userid);
    }

    this.__qnaStore.dispatch(getBoardCateList());

    this.getBoardCateList$.subscribe(res => {
      if(ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.boardCateOptions = [];
        res.forEach((item) => this.boardCateOptions.push({ 
            label: (ValidationUtil.isNotNullAndNotEmpty(item.codeName) ? item.codeName : ''), 
            value: ConvertUtil.convertToSring(item.codeCd)
          }));
          // label: (ValidationUtil.isNotNullAndNotEmpty(item.codeName) ? item.codeName : '') + ' (' + (ValidationUtil.isNotNullAndNotEmpty(item.codeCd) ? item.codeCd : '') +')', 
        this.boardCateSelected = this.boardCateOptions[0]
      }
    });

    
    this.resutlSave$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res)){
        this.resultSave=res;
      }else{
        this.resultSave={} as ResultProcessModel;
      }
    });

    // let element = document.getElementById('contentsNew') as HTMLElement;
    
    CKEDITOR.replace('contentsNew', {
      // filebrowserImageUploadUrl: 'https://global.wownet.biz/6090/myoffice/6062/image/upload',
      //filebrowserImageUploadUrl : `${environment.apiUrl}/qna/saveQna/image/upload`,
      toolbar: 'Basic'
    }) 

    this.wAlertStatus$.subscribe(res => {
      if (res.action === this.actionQnaSuccessfull) {
        if(ValidationUtil.isNotNullAndNotEmpty(CKEDITOR.instances.contentsNew)) {
          CKEDITOR.instances.contentsNew.destroy();
        }
        this._router.navigate(["/serviceCenter/qna"]);
        this._wAlertStore.dispatch(clearWAlert());
      }
    });

  }

  hanldeOnChangeUserKindSelectedValue(selected: SelectDropdownModel): void {
    this.boardCateSelected = selected;
  }

  onSubmit(){
    let errorValidation = this.validation();

    if (errorValidation != '') {
			this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: errorValidation} }));
    }else {
      let params = this.getParamsForm();
      this.__qnaStore.dispatch(saveQna({params:params}));
      this.getResultSave$.subscribe( result => {
        if(ValidationUtil.isNotNullAndNotEmpty(result) && result.retStr && result.retStr.length > 0) {
          if(result.retCode=='OK'){
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.successful, message: result.retStr,action: this.actionQnaSuccessfull } }));
          } else {
            this._wAlertStore.dispatch(setWAlert({ wAlert: { icon: WAlertConstant.warning, message: result.retStr } }));
          }
        }
      });
    }
  }

  validation() {
    this.error = "";

    if (ValidationUtil.isNullOrEmpty(this.boardCateSelected) && ValidationUtil.isNullOrEmpty(this.boardCateSelected.value)) {
      this.error += '게시판 카테고리를 선택해주세요';
      this.error += '<br>';
    }

    if (ValidationUtil.isNullOrEmpty(this.qnaRegis.title)) {
      this.error += '제목을 입력하세요';
      this.error += '<br>';
    }

    if (ValidationUtil.isNullOrEmpty(CKEDITOR.instances.contentsNew.getData())) {
      this.error += '이미지를 입력하세요';
    }

    return this.error;
  }


  getParamsForm():any{

    let param = {
      comId: environment.comId,
      workUser :this.userId,
      title :this.qnaRegis.title,
      contents: CKEDITOR.instances.contentsNew.getData(),
      cateCd: "Q",
      kindCd: environment.comCd + "B08",
      readKind: "All",
      topYn: "N",
      secretYn: "N",
      boardCate : this.boardCateSelected.value
      }
      return param;
  }

}
