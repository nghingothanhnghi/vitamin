import { createAction, props } from "@ngrx/store";
import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";

// load products
export const loadADOProducts = createAction(
  "[ADO API] load ADO products",
  props<{ params: any }>()
);

export const loadADOProductsSuccess = createAction(
  "[ADO API] load ADO products success",
  props<{ products: ADORegisterModel[] }>()
);

export const loadADOProductsFailure = createAction(
  "[ADO API] load ADO products failure",
  props<{ msg: any }>()
);

// count products
export const countADOProducts = createAction(
  "[ADO API] count ADO products",
  props<{ params: any }>()
);

export const countADOProductsSuccess = createAction(
  "[ADO API] count ADO products success",
  props<{ total: number }>()
);

export const countADOProductsFailure = createAction(
  "[ADO API] count ADO products failure",
  props<{ msg: any }>()
);

// admit date
export const loadAdmitDate = createAction(
  "[ADO API] load admit date",
  props<{ yyyymm: string }>()
);

export const loadAdmitDateSuccess = createAction(
  "[ADO API] load admit date success",
  props<{ dates: ADORegisterModel[] }>()
);

export const loadAdmitDateFailure = createAction(
  "[ADO API] load admit date failure",
  props<{ msg: any }>()
);

// ado info
export const loadAdoInfo = createAction(
  "[ADO API] load ado info",
  props<{ userid: string }>()
);

export const loadAdoInfoSuccess = createAction(
  "[ADO API] load ado info success",
  props<{ info: ADORegisterModel }>()
);

export const loadAdoInfoFailure = createAction(
  "[ADO API] load ado info failure",
  props<{ msg: any }>()
);

// deli info
export const loadDeliInfo = createAction(
  "[ADO API] load deli info"
);

export const loadDeliInfoSuccess = createAction(
  "[ADO API] load deli info success",
  props<{ info: ADORegisterModel }>()
);

export const loadDeliInfoFailure = createAction(
  "[ADO API] load deli info failure",
  props<{ msg: any }>()
);

// register ado
export const registerADO = createAction(
  "[ADO API] register ado",
  props<{ data: any }>()
);

export const registerADOSuccess = createAction(
  "[ADO API] register ado success",
  props<{ result: ADORegisterModel }>()
);

export const registerADOFailure = createAction(
  "[ADO API] register ado failure",
  props<{ msg: any }>()
);

// count total ordered
export const countTotalOrdered = createAction(
  "[ADO API] count total ordered",
  props<{ userid: string }>()
);

export const countTotalOrderedSuccess = createAction(
  "[ADO API] count total ordered success",
  props<{ total: number }>()
);

export const countTotalOrderedFailre = createAction(
  "[ADO API] count total ordered failure",
  props<{ msg: any }>()
);

// count total ado cancel between 90 days
export const countTotalAdoCancelBetween90Days = createAction(
  "[ADO API] count total ado cancel between 90 days",
  props<{ userid: string }>()
);

export const countTotalAdoCancelBetween90DaysSuccess = createAction(
  "[ADO API] count total ado cancel between 90 days success",
  props<{ total: number }>()
);

export const countTotalAdoCancelBetween90DaysFailre = createAction(
  "[ADO API] count total ado cancel between 90 days failure",
  props<{ msg: any }>()
);