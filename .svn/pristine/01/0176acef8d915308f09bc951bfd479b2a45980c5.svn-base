import {createAction, props} from '@ngrx/store';
import { Member } from '@models/myoffice/member/member.model'




/* loadMember */
export const searchMember = createAction(
    '[Member API] Load Member',
    props<{ params: any }>()
);

export const searchMemberSuccess = createAction(
    '[Member API] Load Member Success',
    props<{ members: Member[] }>()
);

export const searchMemberFailure = createAction(
    '[Member API] Load Member Failure',
    props<{ msg: any }>()
);

/* countMember */
export const countMember = createAction(
    '[CountMember API] Count Member',
    props<{ params: any }>()
);

export const countMemberSuccess = createAction(
    '[CountMember API] Count Member Success',
    props<{ count: Number }>()
);

export const countMemberFailure = createAction(
    '[CountMember API] Count Member Failure',
    props<{ msg: any }>()
);
