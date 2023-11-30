import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";
import { adoInfoFeatureKey } from "@app/reducers/myoffice/auto-ship/ado-info.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ADOInfoState {
  adoInfo: ADORegisterModel;
  pdts: ADORegisterModel[];
}

export const getADOInfoState = createFeatureSelector<ADOInfoState>(adoInfoFeatureKey);

export const getADOInfo = createSelector(
  getADOInfoState,
  (state: ADOInfoState) => state.adoInfo
);

export const getADOPdts = createSelector(
  getADOInfoState,
  (state: ADOInfoState) => state.pdts
);