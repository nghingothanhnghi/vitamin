import { createAction, props } from '@ngrx/store';

import { QnaModel } from '@app/models/myoffice/notice/qna.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { CustomerConsultationGuideDetailModel } from '@app/models/myoffice/notice/customer-consultation-guide-detail.model';
import { CodeModel } from '@app/models/system/code.model';

// search
export const searchQna = createAction(
  "[Qna API] search qna",
  props<{ params: any }>()
);

export const searchQnaSuccess = createAction(
  "[Qna API] search qna success",
  props<{ qna: QnaModel[] }>()
);

export const searchQnaFailure = createAction(
  "[Qna API] search qna",
  props<{ msg: any }>()
);

// count
export const countQna = createAction(
  "[Qna API] count qna",
  props<{ params: any }>()
);

export const countQnaSuccess = createAction(
  "[Qna API] count qna success",
  props<{ total: Number }>()
);

export const countQnaFailure = createAction(
  "[Qna API] count qna failure",
  props<{ msg: any }>()
);

// save
export const saveQna = createAction(
  "[Qna API] save qna",
  props<{ params: any }>()
);

export const saveQnaSuccess = createAction(
  "[Qna API] save qna success",
  props<{ result: ResultProcessModel }>()
);

export const saveQnaFailure = createAction(
  "[Qna API] save qna failure",
  props<{ msg: any }>()
);

// detail
export const detailQna = createAction(
  "[Qna API] detail qna",
  props<{ boardNo: Number }>()
);

export const detailQnaSuccess = createAction(
  "[Qna API] detail qna success",
  props<{ detailQna: CustomerConsultationGuideDetailModel}>()
);

export const detailQnaFailure = createAction(
  "[Qna API] detail qna failure",
  props<{ msg: any }>()
);

// getBoardCateList
export const getBoardCateList = createAction(
  "[Qna API] get board cate list"
);

export const getBoardCateListSuccess = createAction(
  "[Qna API] get board cate list success",
  props<{ boardCateList: CodeModel[] }>()
);

export const getBoardCateListFailure = createAction(
  "[Qna API] get board cate list failure",
  props<{ msg: any }>()
);

// delete
export const deleteQna = createAction(
  "[Qna API] delete qna",
  props<{ params: any }>()
);

export const deleteQnaSuccess = createAction(
  "[Qna API] delete qna success",
  props<{ result: ResultProcessModel }>()
);

export const deleteQnaFailure = createAction(
  "[Qna API] delete qna failure",
  props<{ msg: any }>()
);