import { createReducer, on } from '@ngrx/store';
import { Member } from '@models/myoffice/member/member.model'

import  * as memberBoxAction from "@app/actions/myoffice/member/member-box.action"
import * as memberBoxSelector from '@selectors/myoffice/member/member-box.selector'

export const memberBoxFeatureKey = 'memberBox';

export const initialMemberBox : memberBoxSelector.MemberBoxState = {
    members: [] as Member[],
    memberImage: {} as Member
};


export const memBoxReducer = createReducer(
    initialMemberBox,
    on( memberBoxAction.findBoxSuccess, (state, { members }) => ({
        ...state,
        members,
    })),

    on( memberBoxAction.getInfoMemImageSuccess, (state, { memberImage }) => ({
        ...state,
        memberImage,
    })),
    on( memberBoxAction.clearBox, () => ({
        ...initialMemberBox,
    })),
);