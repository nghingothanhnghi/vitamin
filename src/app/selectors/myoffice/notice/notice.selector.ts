import { NoticeModel } from "@app/models/myoffice/notice/notice.model";
import { noticeSearchFeatureKey } from "@app/reducers/myoffice/notice/notice.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface NoticeSearchState {
    searchItems: NoticeModel[];
    searchYItems: NoticeModel[];
    totalItems: Number;
    boardLasted: NoticeModel[];
    boardList : NoticeModel[];
    totalBoardListItems: Number;
}
export const getNoticeSearchState = createFeatureSelector<NoticeSearchState>(noticeSearchFeatureKey);

export const getNoticeSearchItems = createSelector(
    getNoticeSearchState,
  (state: NoticeSearchState) => state.searchItems
);

export const getNoticeYSearchItems = createSelector(
  getNoticeSearchState,
(state: NoticeSearchState) => state.searchYItems
);

export const getNoticeTotalItems = createSelector(
    getNoticeSearchState,
  (state: NoticeSearchState) => state.totalItems
);

export const getBoardFindLastedSearchItems = createSelector(
  getNoticeSearchState,
(state: NoticeSearchState) => state.boardLasted
);

export const searchBoardListItems = createSelector(
  getNoticeSearchState,
(state: NoticeSearchState) => state.boardList
);

export const counstBoardListTotalItems = createSelector(
  getNoticeSearchState,
(state: NoticeSearchState) => state.totalBoardListItems
);

