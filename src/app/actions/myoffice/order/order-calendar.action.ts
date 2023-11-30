import { createAction, props } from '@ngrx/store';

import { OrderScheduleModel } from '@app/models/myoffice/order/order-schedule.model';
import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';

// search calendar
export const searchOrderCalendar = createAction(
  "[Order API] search order calendar",
  props<{ userId: string, year: string, month: string }>()
);

export const searchOrderCalendarSuccess = createAction(
  "[Order API] search order calendar success",
  props<{ items: OrderScheduleModel[] }>()
);

export const searchOrderCalendarFailure = createAction(
  "[Order API] search order calendar failure",
  props<{ msg: any }>()
);

// calendar sum
export const sumOrderCalendar = createAction(
  "[Order API] sum order calendar",
  props<{ userId: string, year: string, month: string }>()
);

export const sumOrderCalendarSuccess = createAction(
  "[Order API] sum order calendar success",
  props<{ items: OrderMonthlyModel[] }>()
);

export const sumOrderCalendarFailure = createAction(
  "[Order API] sum order calendar failure",
  props<{ msg: any }>()
);