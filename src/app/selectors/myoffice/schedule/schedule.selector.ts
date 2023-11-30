import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScheduleModel } from '@app/models/myoffice/schedule/schedule.model';
import { scheduleSearchFeatureKey } from '@app/reducers/myoffice/schedule/schedule.reducer';
import { BoardModel } from '@app/models/myoffice/notice/board.model';

export interface ScheduleState {
  searchItems: ScheduleModel[];
  totalItems: Number;
  eventVideoItems: BoardModel;
}

export const getScheduleState = createFeatureSelector<ScheduleState>(scheduleSearchFeatureKey);

export const getScheduleSearchItems = createSelector(
  getScheduleState,
  (state: ScheduleState) => state.searchItems
);

export const getScheduleTotalItems = createSelector(
  getScheduleState,
  (state: ScheduleState) => state.totalItems
  );

export const getEventVideoItems = createSelector(
  getScheduleState,
  (state: ScheduleState) => state.eventVideoItems
);