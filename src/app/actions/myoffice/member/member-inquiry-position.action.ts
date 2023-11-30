import {createAction, props} from '@ngrx/store';
import { Rank } from '@models/system/rank.model'
import { Member } from '@models/myoffice/member/member.model'
import { AbPosInfo } from '@app/models/myoffice/member/abpos-info.model';




/* getRankRankMember */
export const getRankMember = createAction(
    '[RankMember API] Load RankMember',
    props<{ params: any }>()
);

export const getRankMemberSuccess = createAction(
    '[RankMember API] Load RankMember Success',
    props<{ ranks: Rank[] }>()
);

export const getRankMemberFailure = createAction(
    '[RankMember API] Load RankMember Failure',
    props<{ msg: any }>()
);

/* memberRId */
export const getMemberRId = createAction(
    '[MemberRId API] Load MemberRId',
    props<{ params: any }>()
);

export const getMemberRIdSuccess = createAction(
    '[MemberRId API] Load MemberRId Success',
    props<{ members: Member[] }>()
);

export const getMemberRIdFailure = createAction(
    '[MemberRId API] Load MemberRId Failure',
    props<{ msg: any }>()
);

/* countMemberRId */
export const countMemberRId = createAction(
    '[CountMemberRId API] Load CountMemberRId',
    props<{ params: any }>()
);

export const countMemberRIdSuccess = createAction(
    '[CountMemberRId API] Load CountMemberRId Success',
    props<{ total: Number }>()
);

export const countMemberRIdFailure = createAction(
    '[CountMemberRId API] Load CountMemberRId Failure',
    props<{ msg: any }>()
);
/* abPosinfo */
export const loadAbPosInfo = createAction(
    '[loadAbPosInfo API] Load loadAbPosInfo',
    (userId: string) => ({ userId })
);

export const loadAbPosInfoSuccess = createAction(
    '[loadAbPosInfo API] Load loadAbPosInfo Success',
    props<{ abPosinfo: AbPosInfo }>()
);

export const loadAbPosInfoFailure = createAction(
    '[loadAbPosInfo API] Load loadAbPosInfo Failure',
    props<{ msg: any }>()
);
/* binaryLegSearchA */
export const binaryLegsInfoA = createAction(
    '[binaryLegsInfoA API] Load binaryLegsInfo',
    props<{ params: any }>()
);

export const binaryLegsInfoASuccess = createAction(
    '[binaryLegsInfoA API] Load binaryLegsInfo Success',
    props<{ binaryLegsA: Member[] }>()
);

export const binaryLegsInfoAFailure = createAction(
    '[binaryLegsInfoA API] Load binaryLegsInfo Failure',
    props<{ msg: any }>()
);
/* binaryLegCountA */
export const binaryLegCountA = createAction(
    '[binaryLegCountA API] Load binaryLegCount',
    props<{ params: any }>()
);

export const binaryLegCountASuccess = createAction(
    '[binaryLegCountA API] Load binaryLegCount Success',
    props<{ totalLegA: Number }>()
);

export const binaryLegCountAFailure = createAction(
    '[binaryLegCountA API] Load binaryLegCount Failure',
    props<{ msg: any }>()
);
/* binaryLegSearch B */
export const binaryLegsInfoB = createAction(
    '[binaryLegsBInfo API] Load binaryLegsBInfo',
    props<{ params: any }>()
);

export const binaryLegsInfoBSuccess = createAction(
    '[binaryLegsBInfo API] Load binaryLegsBInfo Success',
    props<{ binaryLegsB: Member[] }>()
);

export const binaryLegsInfoBFailure = createAction(
    '[binaryLegsBInfo API] Load binaryLegsBInfo Failure',
    props<{ msg: any }>()
);
/* binaryLegCountB */
export const binaryLegCountB = createAction(
    '[binaryLegCountB API] Load binaryLegCountB',
    props<{ params: any }>()
);

export const binaryLegCountBSuccess = createAction(
    '[binaryLegCountB API] Load binaryLegCountB Success',
    props<{ totalLegB: Number }>()
);

export const binaryLegCountBFailure = createAction(
    '[binaryLegCountB API] Load binaryLegCountB Failure',
    props<{ msg: any }>()
);

