import { createFeatureSelector, createSelector} from '@ngrx/store';
import {memberRegistFeatureKey} from 'src/app/reducers/myoffice/member/member-regist.reducer';
import { ResultProc } from '@models/system/result-proc.model'



export interface MemberRegistState {
    isMobile: Boolean;
    isEmail: Boolean;
    result: ResultProc;
}

export const getMemberRegistState = createFeatureSelector<MemberRegistState>(memberRegistFeatureKey);

export const checkMobile = createSelector(
    getMemberRegistState,
    (state: MemberRegistState) => state.isMobile
);

export const checkEmail = createSelector(
    getMemberRegistState,
    (state: MemberRegistState) => state.isEmail
);

export const save = createSelector(
    getMemberRegistState,
    (state: MemberRegistState) => state.result
);

export const clearStateRegis = createSelector(
    getMemberRegistState,
    (state: MemberRegistState) => state
);


