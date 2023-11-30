import { BenefitCalendarModel } from '@app/models/myoffice/benefit/benefit-calendar.module';
import { createAction, props } from '@ngrx/store';


// search
export const searchBenefitCalendar = createAction(
  "[Benefit API] search benefit calendar",
  props<{ params: any }>()
);

export const searchBenefitCalendarSuccess = createAction(
  "[Benefit API] search benefit calendar success",
  props<{ benefit: BenefitCalendarModel[] }>()
);

export const searchBenefitCalendarFailure = createAction(
  "[Benefit API] search benefit calendar failure",
  props<{ msg: any }>()
);