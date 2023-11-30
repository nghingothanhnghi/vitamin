import { createReducer, on } from '@ngrx/store';

import { NoticeSearchState } from '@app/selectors/myoffice/notice/notice.selector';
import { countBoardListSuccess, countNoticeSuccess, searchBoardFindLastedSuccess, searchBoardListSuccess, searchNoticeSuccess, searchNoticeYSuccess } from '@app/actions/myoffice/notice/notice.action';
import { NoticeModel } from '@app/models/myoffice/notice/notice.model';

export const noticeSearchFeatureKey = 'noticeSearch';

export const initialState: NoticeSearchState = {
  searchItems: [] as NoticeModel[],
  searchYItems:[] as NoticeModel[],
  totalItems: 0,
  boardLasted:[] as NoticeModel[],
  boardList : [] as NoticeModel[],
  totalBoardListItems: 0
}

export const noticeSearchReducer = createReducer(
  initialState,
  on(searchNoticeSuccess, (state, { notice }) => ({ ...state, searchItems: notice })),
  on(searchNoticeYSuccess, (state, { noticeY }) => ({ ...state, searchYItems: noticeY })),
  on(countNoticeSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(searchBoardFindLastedSuccess, (state, { notice }) => ({ ...state, boardLasted: notice })),
  on(searchBoardListSuccess, (state, { boardList }) => ({ ...state, boardList: boardList })),
  on(countBoardListSuccess, (state, { total }) => ({ ...state, totalBoardListItems: total })),
);