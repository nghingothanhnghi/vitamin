import { createAction, props } from '@ngrx/store';
import { AffiliatedMember } from '@models/myoffice/member/affiliated-member.model'
import { MemInfo } from '@models/myoffice/member/mem-info.model'
import { MemRank } from '@models/myoffice/member/mem-rank.model'
import { OrdMonth } from '@models/myoffice/member/ord-month.model'
import { RankHistory } from '@models/myoffice/member/rank-history.model'
import { OrdMonthly } from '@models/myoffice/member/ord-monthly.model'
import { Member } from '@models/myoffice/member/member.model'




/* AffiliatedMember */
export const loadAffiliatedMember = createAction(
    '[AffiliatedMember API] Load AffiliatedMember',
    (userId: string) => ({ userId })
);

export const loadAffiliatedMemberSuccess = createAction(
    '[AffiliatedMember API] Load AffiliatedMember Success',
    props<{ affiliatedMember: AffiliatedMember }>()
);

export const loadAffiliatedMemberFailure = createAction(
    '[AffiliatedMember API] Load AffiliatedMember Failure',
    props<{ msg: any }>()
);

/* countTreeInfo */
export const countTreeInfo = createAction(
    '[CountTreeInfo API] Count TreeInfo',
    (userId: string) => ({ userId })
);

export const countTreeInfoSuccess = createAction(
    '[CountTreeInfo API] Count TreeInfo Success',
    props<{ count: Number }>()
);

export const countTreeInfoFailure = createAction(
    '[CountTreeInfo API] Count TreeInfo Failure',
    props<{ msg: any }>()
);

/* loadMemInfo */
export const loadMemInfo = createAction(
    '[MemInfo API] Load MemInfo',
    (userId: string) => ({ userId })
);

export const loadMemInfoSuccess = createAction(
    '[MemInfo API] Load MemInfo Success',
    props<{ memInfo: MemInfo }>()
);

export const loadMemInfoFailure = createAction(
    '[MemInfo API] Load MemInfo Failure',
    props<{ msg: any }>()
);

/* loadMonthlyPositionDetails */
export const loadMonthlyPositionDetails = createAction(
    '[MonthlyPositionDetails API] Load MonthlyPositionDetails',
    (userId: string) => ({ userId })
);

export const loadMonthlyPositionDetailsSuccess = createAction(
    '[MonthlyPositionDetails API] Load MonthlyPositionDetails Success',
    props<{ memRank: MemRank }>()
);

export const loadMonthlyPositionDetailsFailure = createAction(
    '[MonthlyPositionDetails API] Load MonthlyPositionDetails Failure',
    props<{ msg: any }>()
);


/* loadRankHistorys */
export const loadRankHistorys = createAction(
    '[RankHistory API] Load RankHistory',
    (userId: string) => ({ userId })
);

export const loadRankHistorySuccess = createAction(
    '[RankHistory API] Load RankHistory Success',
    props<{ rankHistories: RankHistory[] }>()
);

export const loadRankHistoryFailure = createAction(
    '[RankHistory API] Load RankHistory Failure',
    props<{ msg: any }>()
);

/* loadTreeInfo */
export const loadTreeInfo = createAction(
    '[TreeInfo API] Load TreeInfo',
    (userId: string, page: number, len: number) => ({ userId, page, len })
);

export const loadTreeInfoSuccess = createAction(
    '[TreeInfo API] Load TreeInfo Success',
    props<{ members: Member[] }>()
);

export const loadTreeInfoFailure = createAction(
    '[TreeInfo API] Load TreeInfo Failure',
    props<{ msg: any }>()
);


export const clearMemState = createAction(
    '[clearMemState API] clear MemState',
);


