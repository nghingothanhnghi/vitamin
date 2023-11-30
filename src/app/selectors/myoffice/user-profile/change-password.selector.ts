import { createFeatureSelector, createSelector } from '@ngrx/store';
import { changePassFeatureKey } from '@app/reducers/myoffice/user-profile/change-password.reducer';
import { ResultProc } from '@models/system/result-proc.model'

export interface ChangePassWordState {
    encryptpass: string;
    result: ResultProc;
}

export const getChangePasswordState = createFeatureSelector<ChangePassWordState>(changePassFeatureKey);

export const checkEncryptPass = createSelector(
    getChangePasswordState,
    (state: ChangePassWordState) => state.encryptpass
);

export const updatePass = createSelector(
    getChangePasswordState,
    (state: ChangePassWordState) => state.result
);