import { createReducer, on } from '@ngrx/store';

import { QnaModel } from '@app/models/myoffice/notice/qna.model';
import { QnaSearchState } from '@app/selectors/myoffice/notice/qna.selector';
import { countQnaSuccess, deleteQnaSuccess, detailQnaSuccess, getBoardCateListSuccess, saveQnaSuccess, searchQnaSuccess } from '@app/actions/myoffice/notice/qna.action';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { CustomerConsultationGuideDetailModel } from '@app/models/myoffice/notice/customer-consultation-guide-detail.model';
import { CodeModel } from '@app/models/system/code.model';

export const qnaSearchFeatureKey = 'qnaSearch';

export const initialState: QnaSearchState = {
  searchItems: [] as QnaModel[],
  totalItems: 0,
  resultSave :{} as ResultProcessModel,
  detailItems :{} as CustomerConsultationGuideDetailModel,
  boardCateItems: [] as  CodeModel[],
  resultDelete :{} as ResultProcessModel
}

export const qnaSearchReducer = createReducer(
  initialState,
  on(searchQnaSuccess, (state, { qna }) => ({ ...state, searchItems: qna })),
  on(countQnaSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(saveQnaSuccess, (state, { result }) => ({ ...state, resultSave :result  })),
  on(detailQnaSuccess, (state, { detailQna }) => ({ ...state, detailItems :detailQna  })),
  on(getBoardCateListSuccess, (state, { boardCateList }) => ({ ...state, boardCateItems : boardCateList  })),
  on(deleteQnaSuccess, (state, { result }) => ({ ...state, resultDelete :result  })),
);