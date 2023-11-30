import {createAction, props} from '@ngrx/store';
import { Member } from '@app/models/myoffice/member/member.model';

/* loadUserProfile */
export const loadUserProfile = createAction(
    '[UserProfile API] Load UserProfile',
    (userId: string) => ({ userId })
);

export const loadUserProfileSuccess = createAction(
    '[UserProfile API] Load UserProfile Success',
    props<{ userprofile: Member }>()
);

export const loadUserProfileFailure = createAction(
    '[UserProfile API] Load UserProfile Failure',
    props<{ msg: any }>()
);