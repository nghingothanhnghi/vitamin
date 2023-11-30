import { WitholdingTaxModel } from '@app/models/myoffice/benefit/witholding-tax.module';
import { createAction, props } from '@ngrx/store';


// search
export const searchWitholdingTax = createAction(
  "[Benefit API] search witholding tax",
  props<{ params: any }>()
);

export const searchWitholdingTaxSuccess = createAction(
  "[Benefit API] search witholding tax success",
  props<{ benefit: WitholdingTaxModel[] }>()
);

export const searchWitholdingTaxFailure = createAction(
  "[Benefit API] search witholding tax failure",
  props<{ msg: any }>()
);

// count
export const countWitholdingTax = createAction(
  "[Benefit API] count witholding tax",
  props<{ params: any }>()
);

export const countWitholdingTaxSuccess = createAction(
  "[Benefit API] count witholding tax success",
  props<{ total: Number }>()
);

export const countWitholdingTaxFailure = createAction(
  "[Benefit API] count witholding tax failure",
  props<{ msg: any }>()
);

// sum
export const sumWitholdingTax = createAction(
  "[Benefit API] sum witholding tax",
  props<{ params: any }>()
);

export const sumWitholdingTaxSuccess = createAction(
  "[Benefit API] sum witholding tax success",
  props<{ benefit: WitholdingTaxModel }>()
);

export const sumWitholdingTaxFailure = createAction(
  "[Benefit API] sum witholding tax failure",
  props<{ msg: any }>()
);

 // Start Report
export const detailWitholdingTax = createAction(
  "[Benefit API] detail witholding tax",
  props<{ params: any }>()
);

export const detailWitholdingTaxSuccess = createAction(
  "[Benefit API] detail witholding tax success",
  props<{ benefit: WitholdingTaxModel[] }>()
);

export const detailWitholdingTaxFailure = createAction(
  "[Benefit API] detail witholding tax failure",
  props<{ msg: any }>()
);

export const sumDetailWitholdingTax = createAction(
  "[Benefit API] sum detail witholding tax",
  props<{ params: any }>()
);

export const sumDetailWitholdingTaxSuccess = createAction(
  "[Benefit API] sum detail witholding tax success",
  props<{ benefit: WitholdingTaxModel }>()
);

export const sumDetailWitholdingTaxFailure = createAction(
  "[Benefit API] sum detail witholding tax failure",
  props<{ msg: any }>()
);

export const userWitholdingTax = createAction(
  "[Benefit API] user witholding tax",
  props<{ params: any }>()
);

export const userWitholdingTaxSuccess = createAction(
  "[Benefit API] user witholding tax success",
  props<{ benefit: WitholdingTaxModel }>()
);

export const userWitholdingTaxFailure = createAction(
  "[Benefit API] user witholding tax failure",
  props<{ msg: any }>()
);

 // END Report