import { createAction, props } from '@ngrx/store';

import { FaqModel } from '@app/models/myoffice/notice/faq.model';

// search
export const searchFaq = createAction(
  "[Faq API] search faq",
  props<{ params: any }>()
);

export const searchFaqSuccess = createAction(
  "[Faq API] search faq success",
  props<{ faq: FaqModel[] }>()
);

export const searchFaqFailure = createAction(
  "[Faq API] search faq",
  props<{ msg: any }>()
);

// count
export const countFaq = createAction(
  "[Faq API] count faq",
  props<{ params: any }>()
);

export const countFaqSuccess = createAction(
  "[Faq API] count faq success",
  props<{ total: Number }>()
);

export const countFaqFailure = createAction(
  "[Faq API] count faq failure",
  props<{ msg: any }>()
);

// code kind
export const loadCodes = createAction(
  "[Code API] Load Codes");

export const loadCodesSuccess = createAction(
  "[Code API] Load Codes Success",
  props<{ codes: FaqModel[] }>()
);

export const loadCodesFailure = createAction(
  "[Code API] Load Codes Failure",
  props<{ msg: any }>()
);
