import { createFeatureSelector, createSelector} from '@ngrx/store';
import { verifyFeatureKey } from 'src/app/reducers/system/verify.reducer';
import { ApiResultMember } from '@models/system/api-result-member.model';

export interface VerifyState {
    apiResultMember: ApiResultMember;
}

export const verifyState = createFeatureSelector<VerifyState>(verifyFeatureKey);

export const verify = createSelector(
    verifyState,
    (state: VerifyState) => state.apiResultMember
);
export const clearResVerify = createSelector(
    verifyState,
    (state: VerifyState) => state.apiResultMember
);
