import { createReducer, on } from '@ngrx/store';

import { BoardModel } from '@app/models/myoffice/notice/board.model';
import { NoticeDetailState } from '@app/selectors/myoffice/notice/notice-detail.selector';
import { detailNoticeSuccess, listFileSuccess } from '@app/actions/myoffice/notice/notice.action';

export const noticeDetailFeatureKey = 'noticeDetail';

export const initialState: NoticeDetailState = {
  detailItems: {} as BoardModel,
  fileItems: [] as BoardModel[]
}

export const detailNoticeReducer = createReducer(
  initialState,
  on(detailNoticeSuccess, (state, { detail }) => ({ ...state, detailItems: detail })),
  on(listFileSuccess, (state, { file }) => ({ ...state, fileItems: file })),
);
