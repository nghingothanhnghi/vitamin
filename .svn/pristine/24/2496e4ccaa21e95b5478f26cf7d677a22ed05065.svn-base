import {createAction, props} from '@ngrx/store';
import { Member } from '@models/myoffice/member/member.model'


/* findTopLineMember */
export const findTopLineMember = createAction(
    '[TopLineMember API] Load TopLineMember',
    (userId: string, logId: string, memberType: string) => ({ userId, logId, memberType })
);

export const findTopLineMemberSuccess = createAction(
    '[TopLineMember API] Load TopLineMember Success',
    props<{ topLineMembers: Member }>()
);

export const findTopLineMemberFailure = createAction(
    '[TopLineMember API] Load TopLineMember Failure',
    props<{ msg: any }>()
);

/* findLine */
export const findLine = createAction(
    '[Line API] Load Line',
    props<{ params: any }>()
);

export const findLineSuccess = createAction(
    '[Line API] Load Line Success',
    props<{ lineMembers: Member[] }>()
);

export const findLineFailure = createAction(
    '[Line API] Load Line Failure',
    props<{ msg: any }>()
);

/* countLine */
export const countLine = createAction(
    '[CountLine API] Load CountLine',
    props<{ params: any }>()
);

export const countLineSuccess = createAction(
    '[CountLine API] Load CountLine Success',
    props<{ total: Number }>()
);

export const countLineFailure = createAction(
    '[CountLine API] Load CountLine Failure',
    props<{ msg: any }>()
);

