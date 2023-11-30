import { Member } from "@app/models/myoffice/member/member.model";
import { ResultProcessModel } from "@app/models/myoffice/result-process.model";
import { ResultJumin } from "@app/models/myoffice/user-profile/result-jumin.model";
import { changeResidentIdFeatureKey } from "@app/reducers/myoffice/user-profile/change-resident-id.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ChangeResdentIdState {
    result: ResultProcessModel,
    jumin:Member,
    resultJumin:ResultJumin
}
export const getPersonalInfoSearchState = createFeatureSelector<ChangeResdentIdState>(changeResidentIdFeatureKey);

export const updateJumin = createSelector(
  getPersonalInfoSearchState,
  (state: ChangeResdentIdState) => state.result
);

export const getJumin = createSelector(
    getPersonalInfoSearchState,
    (state: ChangeResdentIdState) => state.jumin
  );
  
  export const verifyJumin = createSelector(
    getPersonalInfoSearchState,
    (state: ChangeResdentIdState) => state.resultJumin
  );

  export const clearJumnin = createSelector(
    getPersonalInfoSearchState,
    (state: ChangeResdentIdState) => state
);