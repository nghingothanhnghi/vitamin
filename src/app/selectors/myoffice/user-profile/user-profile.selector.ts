import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userProfileFeatureKey } from '@app/reducers/myoffice/user-profile/user-profile.reducer';
import { Member } from '@app/models/myoffice/member/member.model';

export interface UserProfileState {
    userProfile: Member;
}

export const getUserProfileState = createFeatureSelector<UserProfileState>(userProfileFeatureKey);

export const getUserProfileItems = createSelector(
    getUserProfileState,
    (state: UserProfileState) => state.userProfile
);