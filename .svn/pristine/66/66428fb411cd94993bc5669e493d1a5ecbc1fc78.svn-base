import { createReducer, on } from '@ngrx/store';
import { ResultProc } from '@models/system/result-proc.model'
import  * as memberRegistAction from "@app/actions/myoffice/member/member-regist.action"
import * as memberRegistSelector from '@selectors/myoffice/member/member-regist.selector'

export const memberRegistFeatureKey = 'memberRegist';

export const initialMemberRegist : memberRegistSelector.MemberRegistState = {
    isMobile: {} as Boolean,
    isEmail: {} as Boolean,
    result: {} as ResultProc
};


export const memRegistReducer = createReducer(
    initialMemberRegist,
    on( memberRegistAction.checkMobileSuccess, (state, { isMobile }) => ({
        ...state,
        isMobile,
    })),
    on( memberRegistAction.checkEmailSuccess, (state, { isEmail }) => ({
        ...state,
        isEmail,
    })),
    on( memberRegistAction.saveSuccess, (state, { result }) => ({
        ...state,
        result,
    })),
    on( memberRegistAction.clearStateRegis, () => ({
        ...initialMemberRegist
    }))
);