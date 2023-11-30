import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Member } from '@app/models/myoffice/member/member.model';
import { MemberModel } from '@app/models/system/member.model';
import { login2SearchFeatureKey } from '@app/reducers/system/login2.reducer';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';

export interface Login2State {
    memberItems: MemberModel;
    count: Number;
    result: ResultProcessModel
    member: boolean
    memberUserId2: Member  ;
    findMemberItem: MemberModel;
}

export const getLogin2 = createFeatureSelector<Login2State>(login2SearchFeatureKey);


export const getLoginInfo2 = createSelector(
    getLogin2,
  (state: Login2State) => state.memberItems
);

export const coutBonus2 = createSelector(
    getLogin2,
  (state: Login2State) => state.count
);

export const findIdSelector = createSelector(
  getLogin2,
  (state: Login2State) => state.memberItems
);

export const findPassWdSelector = createSelector(
  getLogin2,
  (state: Login2State) => state.result
);

export const memberLogin = createSelector(
  getLogin2,
  (state: Login2State) => state.member
);

export const loginUserid2 = createSelector(
  getLogin2,
  (state: Login2State) => state.memberUserId2
);


export const findMemberItem = createSelector(
  getLogin2,
(state: Login2State) => state.findMemberItem
);
