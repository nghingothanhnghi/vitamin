import { createReducer, on } from '@ngrx/store';

import { OrderScheduleModel } from '@app/models/myoffice/order/order-schedule.model';
import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';
import { OrderCalendarState } from '@app/selectors/myoffice/order/order-calendar.selector';
import { searchOrderCalendarSuccess, sumOrderCalendarSuccess } from '@app/actions/myoffice/order/order-calendar.action';

export const orderCalendarFeatureKey = 'orderCalendar';

export const initialState: OrderCalendarState = {
  searchCalendar: [] as OrderScheduleModel[],
  sumCalendar: [] as OrderMonthlyModel[],
}

export const orderCalendarReducer = createReducer(
  initialState,
  on(searchOrderCalendarSuccess, (state, { items }) => ({...state, searchCalendar: items})),
  on(sumOrderCalendarSuccess, (state, { items }) => ({...state, sumCalendar: items}))
);