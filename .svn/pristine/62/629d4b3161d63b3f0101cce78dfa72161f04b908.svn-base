import { createAction, props } from "@ngrx/store";
import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";

// load ado by adoNo
export const loadAdoByAdoNo = createAction(
  "[ADO API] load ado by adoNo",
  props<{ adoNo: string }>()
);

export const loadAdoByAdoNoSuccess = createAction(
  "[ADO API] load ado by adoNo success",
  props<{ ado: ADORegisterModel }>()
);

export const loadAdoByAdoNoFailure = createAction(
  "[ADO API] load ado by adoNo failure",
  props<{ msg: any }>()
);

// load ado pdt by adoNo
export const loadAdoPdtByAdoNo = createAction(
  "[ADO API] load ado pdt by adoNo",
  props<{ adoNo: string }>()
);

export const loadAdoPdtByAdoNoSuccess = createAction(
  "[ADO API] load ado pdt by adoNo success",
  props<{ pdts: ADORegisterModel[] }>()
);

export const loadAdoPdtByAdoNoFailure = createAction(
  "[ADO API] load ado pdt by adoNo failure",
  props<{ msg: any }>()
);

export const setAdoInfo = createAction(
  "[ADO] set ado info",
  props<{ data: ADORegisterModel }>()
);

export const setAdoPdts = createAction(
  "[ADO] set ado pdts",
  props<{ pdts: ADORegisterModel[] }>()
);