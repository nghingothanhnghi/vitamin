import { createReducer, on } from "@ngrx/store";

import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";
import { ADORegisterState } from "@app/selectors/myoffice/auto-ship/ado-register.selector";
import { countADOProductsSuccess, countTotalAdoCancelBetween90DaysSuccess, countTotalOrderedSuccess, loadAdmitDateSuccess, loadAdoInfoSuccess, loadADOProductsSuccess, loadDeliInfoSuccess, registerADOSuccess } from "@app/actions/myoffice/auto-ship/ado-register.action";

export const adoRegisterFeatureKey = 'adoRegister';

export const initialState: ADORegisterState = {
  products: [],
  total: 0,
  admitDates: [],
  adoInfo: {} as ADORegisterModel,
  deliInfo: {} as ADORegisterModel,
  regResult: {} as ADORegisterModel,
  totalOrdered: 0,
  totalAdoCancelBetween90Days: 0,
}

export const adoRegisterReducer = createReducer(
  initialState,
  on(loadADOProductsSuccess, (state, { products }) => ({ ...state, products: products })),
  on(countADOProductsSuccess, (state, { total }) => ({ ...state, total: total })),
  on(loadAdmitDateSuccess, (state, { dates }) => ({ ...state, admitDates: dates })),
  on(loadAdoInfoSuccess, (state, { info }) => ({ ...state, adoInfo: info })),
  on(loadDeliInfoSuccess, (state, { info }) => ({ ...state, deliInfo: info })),
  on(registerADOSuccess, (state, { result }) => ({ ...state, regResult: result })),
  on(countTotalOrderedSuccess, (state, { total }) => ({ ...state, totalOrdered: total })),
  on(countTotalAdoCancelBetween90DaysSuccess, (state, { total }) => ({ ...state, totalAdoCancelBetween90Days: total }))
);