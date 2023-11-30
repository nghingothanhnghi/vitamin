import { createFeatureSelector, createSelector } from '@ngrx/store';
import { changePerInforFeatureKey } from '@app/reducers/myoffice/user-profile/change-personal-information.reducer';
import { ResultProc } from '@models/system/result-proc.model'

export interface ChangePerInforState {
    result: ResultProc;
    isNickName: Boolean;
}

export const getChangePerInforState = createFeatureSelector<ChangePerInforState>(changePerInforFeatureKey);

export const updatePerInfo = createSelector(
    getChangePerInforState,
    (state: ChangePerInforState) => state.result
);

export const checkNickName = createSelector(
    getChangePerInforState,
    (state: ChangePerInforState) => state.isNickName
);