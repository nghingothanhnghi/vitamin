import { createAction, props } from '@ngrx/store';

import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';

// search
export const searchBenefit = createAction(
  "[Benefit API] search benefit details inquiry",
  props<{ params: any }>()
);

export const searchBenefitSuccess = createAction(
  "[Benefit API] search benefit details inquiry success",
  props<{ benefit: BenefitDetailInquiryModel[] }>()
);

export const searchBenefitFailure = createAction(
  "[Benefit API] search benefit failure",
  props<{ msg: any }>()
);

// count
export const countBenefit = createAction(
  "[Benefit API] count benefit",
  props<{ params: any }>()
);

export const countBenefitSuccess = createAction(
  "[Benefit API] count benefit success",
  props<{ total: Number }>()
);

export const countBenefitFailure = createAction(
  "[Benefit API] count benefit failure",
  props<{ msg: any }>()
);

// sum
export const sumBenefit = createAction(
  "[Benefit API] sum benefit",
  props<{ params: any }>()
);

export const sumBenefitSuccess = createAction(
  "[Benefit API] sum benefit success",
  props<{ benefit: BenefitDetailInquiryModel }>()
);

export const sumBenefitFailure = createAction(
  "[Benefit API] sum benefit failure",
  props<{ msg: any }>()
);


// titlePay
export const loadTitlePay = createAction(
  "[TitlePay API] Load TitlePay",
  props<{ params: any }>()
);

export const loadTitlePaySuccess = createAction(
  '[TitlePay API] Load TitlePay Success',
  props<{ benefit: BenefitDetailInquiryModel[] }>()
);

export const loadTitlePayFailure = createAction(
  '[TitlePay API] Load TitlePay Failure',
  props<{ msg: any }>()
);