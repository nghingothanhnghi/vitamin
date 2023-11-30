import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";
import { adoRegisterFeatureKey } from "@app/reducers/myoffice/auto-ship/ado-register.reducer";

export interface ADORegisterState {
  products: ADORegisterModel[],
  total: number,
  admitDates: ADORegisterModel[],
  adoInfo: ADORegisterModel,
  deliInfo: ADORegisterModel,
  regResult: ADORegisterModel,
  totalOrdered: number,
  totalAdoCancelBetween90Days: number,
}

export const getADORegisterState = createFeatureSelector<ADORegisterState>(adoRegisterFeatureKey);

export const getADOProducts = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.products
)

export const getTotalADOProducts = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.total
)

export const getAdmitDates = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.admitDates
)

export const getADODeliInfo = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.deliInfo
)

export const getADOInfo = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.adoInfo
);

export const getRegResult = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.regResult
)

export const getTotalOrdered = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.totalOrdered
);

export const getTotalAdoCancelBetween90Days = createSelector(
  getADORegisterState,
  (state: ADORegisterState) => state.totalAdoCancelBetween90Days
);