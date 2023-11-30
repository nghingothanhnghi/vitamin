import { createReducer, on } from '@ngrx/store';
import { ApiResultMember } from '../../models/system/api-result-member.model';
import { verifySuccess, clearResVerify } from '../../actions/system/verify.actions'
import { VerifyState } from '../../selectors/system/verify.selector'

export const verifyFeatureKey = 'verify';

export const initialVerify : VerifyState = {
    apiResultMember: {} as ApiResultMember
};

export const verifyReducer = createReducer(
    initialVerify,
    on( verifySuccess, (state, { apiResultMember }) => ({
        ...state,
        apiResultMember,
    })),
    on( clearResVerify, () => ({
        ...initialVerify
    }))
);