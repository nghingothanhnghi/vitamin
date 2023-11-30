import { CustomerConsultationGuideDetailModel } from "@app/models/myoffice/notice/customer-consultation-guide-detail.model";
import { QnaModel } from "@app/models/myoffice/notice/qna.model";
import { ResultProcessModel } from "@app/models/myoffice/result-process.model";
import { CodeModel } from "@app/models/system/code.model";
import { qnaSearchFeatureKey } from "@app/reducers/myoffice/notice/qna.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface QnaSearchState {
    searchItems: QnaModel[];
    totalItems: Number;
    resultSave: ResultProcessModel;
    detailItems: CustomerConsultationGuideDetailModel;
    boardCateItems: CodeModel[];
    resultDelete: ResultProcessModel;
}
export const getQnaSearchState = createFeatureSelector<QnaSearchState>(qnaSearchFeatureKey);

export const getQnaSearchItems = createSelector(
  getQnaSearchState,
  (state: QnaSearchState) => state.searchItems
);

export const getQnaTotalItems = createSelector(
  getQnaSearchState,
  (state: QnaSearchState) => state.totalItems
);

export const getResultSave = createSelector(
  getQnaSearchState,
(state: QnaSearchState) => state.resultSave
);

export const getDetailQnaItems = createSelector(
  getQnaSearchState,
  (state: QnaSearchState) => state.detailItems
);

export const getBoardCateListItems = createSelector(
  getQnaSearchState,
  (state: QnaSearchState) => state.boardCateItems
);

export const getResultDelete = createSelector(
  getQnaSearchState,
(state: QnaSearchState) => state.resultDelete
);
