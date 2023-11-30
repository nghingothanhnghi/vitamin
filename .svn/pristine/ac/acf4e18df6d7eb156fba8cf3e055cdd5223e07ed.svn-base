import { createAction, props } from '@ngrx/store';

import { BenefitDetailInquiryModel } from '@app/models/myoffice/benefit/benefit-details-inquiry.module';

// search
export const searchBenefitAccountingInquiry = createAction(
  "[Benefit API] search benefit accounting inquiry",
  props<{ params: any }>()
);

export const searchBenefitAccountingInquirySuccess = createAction(
  "[Benefit API] search benefit accounting inquiry success",
  props<{ benefit: BenefitDetailInquiryModel[] }>()
);

export const searchBenefitAccountingInquiryFailure = createAction(
  "[Benefit API] search benefit accounting inquiry failure",
  props<{ msg: any }>()
);

// count
export const countBenefitAccountingInquiry = createAction(
  "[Benefit API] count benefit accounting inquiry",
  props<{ params: any }>()
);

export const countBenefitAccountingInquirySuccess = createAction(
  "[Benefit API] count benefit accounting inquiry success",
  props<{ total: Number }>()
);

export const countBenefitAccountingInquiryFailure = createAction(
  "[Benefit API] count benefit accounting inquiry failure",
  props<{ msg: any }>()
);

// sum
export const sumBenefitAccountingInquiry = createAction(
  "[Benefit API] sum benefit accounting inquiry",
  props<{ params: any }>()
);

export const sumBenefitAccountingInquirySuccess = createAction(
  "[Benefit API] sum benefit accounting inquiry success",
  props<{ benefit: BenefitDetailInquiryModel }>()
);

export const sumBenefitAccountingInquiryFailure = createAction(
  "[Benefit API] sum benefit accounting inquiry failure",
  props<{ msg: any }>()
);
