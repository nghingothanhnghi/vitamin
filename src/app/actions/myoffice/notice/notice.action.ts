import { createAction, props } from '@ngrx/store';

import { NoticeModel } from '@app/models/myoffice/notice/notice.model';
import { BoardModel } from '@app/models/myoffice/notice/board.model';

// search N
export const searchNotice = createAction(
  "[Notice API] search notice",
  props<{ params: any }>()
);

export const searchNoticeSuccess = createAction(
  "[Notice API] search notice success",
  props<{ notice: NoticeModel[] }>()
);

export const searchNoticeFailure = createAction(
  "[Notice API] search notice",
  props<{ msg: any }>()
);

// search Y
export const searchNoticeY = createAction(
  "[Notice API] search notice y",
  props<{ params: any }>()
);

export const searchNoticeYSuccess = createAction(
  "[Notice API] search notice y success",
  props<{ noticeY: NoticeModel[] }>()
);

export const searchNoticeYFailure = createAction(
  "[Notice API] search notice y failure",
  props<{ msg: any }>()
);

// count
export const countNotice = createAction(
  "[Notice API] count notice",
  props<{ params: any }>()
);

export const countNoticeSuccess = createAction(
  "[Notice API] count notice success",
  props<{ total: Number }>()
);

export const countNoticeFailure = createAction(
  "[Notice API] count notice failure",
  props<{ msg: any }>()
);

// detail
export const detailNotice = createAction(
  "[Notice API] detail notice",
  props<{ boardNo: String }>()
);

export const detailNoticeSuccess = createAction(
  "[Notice API] detail notice success",
  props<{ detail: BoardModel }>()
);

export const detailNoticeFailure = createAction(
  "[Notice API] detail notice failure",
  props<{ msg: any }>()
);

// listFile
export const listFile = createAction(
  "[File API] list file",
  props<{ boardNo: String }>()
);

export const listFileSuccess = createAction(
  "[File API] list file success",
  props<{ file: BoardModel[] }>()
);

export const listFileFailure = createAction(
  "[File API] list file failure",
  props<{ msg: any }>()
);

// searchBoardFindLasted
export const searchBoardFindLasted = createAction(
  "[Notice API] search board find lasted",
  props<{ params: any }>()
);

export const searchBoardFindLastedSuccess = createAction(
  "[Notice API] search board find lasted success",
  props<{ notice: NoticeModel[] }>()
);

export const searchBoardFindLastedFailure = createAction(
  "[Notice API] search board find lasted notice",
  props<{ msg: any }>()
);

// search Y
export const searchBoardList = createAction(
  "[Notice API] search board list",
  props<{ params: any }>()
);

export const searchBoardListSuccess = createAction(
  "[Notice API] search board list success",
  props<{ boardList: NoticeModel[] }>()
);

export const searchBoardListFailure = createAction(
  "[Notice API] search board list failure",
  props<{ msg: any }>()
);

// count
export const countBoardList = createAction(
  "[Notice API] count board list",
  props<{ params: any }>()
);

export const countBoardListSuccess = createAction(
  "[Notice API] count board list success",
  props<{ total: Number }>()
);

export const countBoardListFailure = createAction(
  "[Notice API] count board list failure",
  props<{ msg: any }>()
);