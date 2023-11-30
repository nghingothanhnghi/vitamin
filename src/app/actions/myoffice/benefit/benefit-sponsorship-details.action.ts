import { BenefitSponsorshipDetailsModel } from '@app/models/myoffice/benefit/benefit-sponsorship-details.module';
import { createAction, props } from '@ngrx/store';


// search
export const searchBenefitSponsorshipDetails = createAction(
  "[Benefit API] search benefit sponsorship details",
  props<{ params: any }>()
);

export const searchBenefitSponsorshipDetailsSuccess = createAction(
  "[Benefit API] search benefit sponsorship details success",
  props<{ benefit: BenefitSponsorshipDetailsModel[] }>()
);

export const searchBenefitSponsorshipDetailsFailure = createAction(
  "[Benefit API] search benefit sponsorship details failure",
  props<{ msg: any }>()
);

// count
export const countBenefitSponsorshipDetails = createAction(
  "[Benefit API] count benefit sponsorship details",
  props<{ params: any }>()
);

export const countBenefitSponsorshipDetailsSuccess = createAction(
  "[Benefit API] count benefit sponsorship details success",
  props<{ total: Number }>()
);

export const countBenefitSponsorshipDetailsFailure = createAction(
  "[Benefit API] count benefit sponsorship details failure",
  props<{ msg: any }>()
);

// sum
export const sumBenefitSponsorshipDetails = createAction(
  "[Benefit API] sum benefit sponsorship details",
  props<{ params: any }>()
);

export const sumBenefitSponsorshipDetailsSuccess = createAction(
  "[Benefit API] sum benefit sponsorship details success",
  props<{ benefit: BenefitSponsorshipDetailsModel }>()
);

export const sumBenefitSponsorshipDetailsFailure = createAction(
  "[Benefit API] sum benefit sponsorship details failure",
  props<{ msg: any }>()
);
