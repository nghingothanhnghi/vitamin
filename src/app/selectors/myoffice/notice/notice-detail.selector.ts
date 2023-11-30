import { BoardModel } from "@app/models/myoffice/notice/board.model";
import { NoticeModel } from "@app/models/myoffice/notice/notice.model";
import { noticeDetailFeatureKey } from "@app/reducers/myoffice/notice/notice-detail.reducer";
import { noticeSearchFeatureKey } from "@app/reducers/myoffice/notice/notice.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface NoticeDetailState {
    detailItems: BoardModel ;
    fileItems: BoardModel[] ;
}
export const getDetailNoticeState = createFeatureSelector<NoticeDetailState>(noticeDetailFeatureKey);

export const getDetailNoticeItems = createSelector(
  getDetailNoticeState,
  (state: NoticeDetailState) => state.detailItems
);

export const getListFileItems = createSelector(
  getDetailNoticeState,
  (state: NoticeDetailState) => state.fileItems
);
