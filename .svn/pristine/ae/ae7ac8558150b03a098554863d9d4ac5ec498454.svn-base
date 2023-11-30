import { createReducer, on } from '@ngrx/store';

import { UserProfileModel } from '@models/myoffice/user-profile/user-profile.model';
import { UserProfileState } from '@app/selectors/myoffice/user-profile/user-profile.selector'
import { loadUserProfileSuccess } from "@app/actions/myoffice/user-profile/user-profile.actions"
import { Member } from '@app/models/myoffice/member/member.model';
import { MemberModel } from '@app/models/system/member.model';

export const userProfileFeatureKey = 'userProfile';

export const initialState : UserProfileState = {
    userProfile: {} as Member,
}


export const userProReducer = createReducer(
    initialState,
    on(loadUserProfileSuccess, (state, { userprofile }) => ({ ...state, userProfile: userprofile })),
)