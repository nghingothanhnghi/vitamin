import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";
import { adoPopupFeatureKey } from "@app/reducers/myoffice/auto-ship/ado-popup.reducer";

export interface ADOPopupState {
  listAdo: ADORegisterModel[];
  totalAdo: number;
}

export const getADOPopupState = createFeatureSelector<ADOPopupState>(adoPopupFeatureKey);

export const getListAdo = createSelector(
  getADOPopupState,
  (state: ADOPopupState) => state.listAdo
);

export const getTotalAdo = createSelector(
  getADOPopupState,
  (state: ADOPopupState) => state.totalAdo
);