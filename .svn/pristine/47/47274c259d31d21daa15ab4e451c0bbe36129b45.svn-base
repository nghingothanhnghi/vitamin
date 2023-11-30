import { createAction, props } from '@ngrx/store';

import { ScheduleModel } from '@app/models/myoffice/schedule/schedule.model';
import { BoardModel } from '@app/models/myoffice/notice/board.model';

// search
export const searchSchedule = createAction(
  "[Schedule API] search schedule",
  props<{ year: string, month: string }>()
);

export const searchScheduleSuccess = createAction(
  "[Schedule API] search schedule success",
  props<{ schedule: ScheduleModel[] }>()
);

export const searchScheduleFailure = createAction(
  "[Schedule API] search schedule failure",
  props<{ msg: any }>()
);

export const countSchedule = createAction(
  "[Schedule API] count schedule",
  props<{ year: string, month: string }>()
);

export const countScheduleSuccess = createAction(
  "[Schedule API] count schedule success",
  props<{ total: Number }>()
);

export const countScheduleFailure = createAction(
  "[Schedule API] count schedule failure",
  props<{ msg: any }>()
);

export const eventVideos = createAction(
  "[Event Videos API] count event videos",
  props<{ regNo: String }>()
);

export const eventVideosSuccess = createAction(
  "[Event Videos API] count event videos success",
  props<{ board: BoardModel }>()
);

export const eventVideosFailure = createAction(
  "[Event Videos API] count event videos failure",
  props<{ msg: any }>()
);