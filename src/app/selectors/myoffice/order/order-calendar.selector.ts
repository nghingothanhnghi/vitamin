import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderScheduleModel } from '@app/models/myoffice/order/order-schedule.model';
import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';
import { orderCalendarFeatureKey } from '@app/reducers/myoffice/order/order-calendar.reducer';

export interface OrderCalendarState {
  searchCalendar: OrderScheduleModel[];
  sumCalendar: OrderMonthlyModel[];
}

export const getOrderCalendarState = createFeatureSelector<OrderCalendarState>(orderCalendarFeatureKey);

export const getOrderCalendarSearchItems = createSelector(
  getOrderCalendarState,
  (state: OrderCalendarState) => state.searchCalendar
);

export const getOrderCalendarSumItems = createSelector(
  getOrderCalendarState,
  (state: OrderCalendarState) => state.sumCalendar
);