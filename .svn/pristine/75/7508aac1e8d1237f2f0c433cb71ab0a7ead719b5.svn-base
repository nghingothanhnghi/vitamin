import { createReducer, on } from '@ngrx/store';

import { ScheduleModel } from '@app/models/myoffice/schedule/schedule.model';
import { ScheduleState } from '@app/selectors/myoffice/schedule/schedule.selector';
import { countScheduleSuccess, eventVideosSuccess, searchScheduleSuccess } from '@app/actions/myoffice/schedule/schedule.action';
import { BoardModel } from '@app/models/myoffice/notice/board.model';

export const scheduleSearchFeatureKey = 'scheduleSearch';

export const initialState: ScheduleState = {
  searchItems: [] as ScheduleModel[],
  totalItems: 0,
  eventVideoItems: {} as BoardModel, 
}

export const scheduleSearchReducer = createReducer(
  initialState,
  on(searchScheduleSuccess, (state, { schedule }) => ({ ...state, searchItems: schedule })),
  on(eventVideosSuccess, (state, { board }) => ({ ...state, eventVideoItems: board })),
  on(countScheduleSuccess, (state, { total }) => ({ ...state, totalItems: total })),
);