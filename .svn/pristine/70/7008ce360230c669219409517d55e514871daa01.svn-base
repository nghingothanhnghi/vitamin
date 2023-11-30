import { BenefitRemittanceDetailsModel } from '@app/models/myoffice/benefit/benefit-remittance-details.module';
import { createAction, props } from '@ngrx/store';


// search
export const searchBenefitRemittanceDetails = createAction(
  "[Benefit API] search benefit remittance details",
  props<{ params: any }>()
);

export const searchBenefitRemittanceDetailsSuccess = createAction(
  "[Benefit API] search benefit remittance details success",
  props<{ benefit: BenefitRemittanceDetailsModel[] }>()
);

export const searchBenefitRemittanceDetailsFailure = createAction(
  "[Benefit API] search benefit remittance details failure",
  props<{ msg: any }>()
);

// count
export const countBenefitRemittanceDetails = createAction(
  "[Benefit API] count benefit remittance details",
  props<{ params: any }>()
);

export const countBenefitRemittanceDetailsSuccess = createAction(
  "[Benefit API] count benefit remittance details success",
  props<{ total: Number }>()
);

export const countBenefitRemittanceDetailsFailure = createAction(
  "[Benefit API] count benefit remittance details failure",
  props<{ msg: any }>()
);

// sum
export const sumBenefitRemittanceDetails = createAction(
  "[Benefit API] sum benefit remittance details",
  props<{ params: any }>()
);

export const sumBenefitRemittanceDetailsSuccess = createAction(
  "[Benefit API] sum benefit remittance details success",
  props<{ benefit: BenefitRemittanceDetailsModel }>()
);

export const sumBenefitRemittanceDetailsFailure = createAction(
  "[Benefit API] sum benefit remittance details failure",
  props<{ msg: any }>()
);
