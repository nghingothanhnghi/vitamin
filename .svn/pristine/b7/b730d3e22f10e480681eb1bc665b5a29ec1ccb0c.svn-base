import { createAction, props } from "@ngrx/store";
import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";

// load list ado
export const loadListAdo = createAction(
  "[ADO API] load list ado",
  props<{ params: any }>()
);

export const loadListAdoSuccess = createAction(
  "[ADO API] load list ado success",
  props<{ items: ADORegisterModel[] }>()
);

export const loadListAdoFailure = createAction(
  "[ADO API] load list ado failure",
  props<{ msg: any }>()
);

// load total ado
export const loadTotalAdo = createAction(
  "[ADO API] load total ado",
  props<{ params: any }>()
);

export const loadTotalAdoSuccess = createAction(
  "[ADO API] load total ado success",
  props<{ total: number }>()
);

export const loadTotalAdoFailure = createAction(
  "[ADO API] load total ado failure",
  props<{ msg: any }>()
);