import { createReducer, on } from '@ngrx/store';
import { Member } from '@app/models/myoffice/member/member.model';

import { MemberModel } from '@app/models/system/member.model';
import { Login2State } from '@app/selectors/system/login2.select';
import { coutBonusSuccess, findIdSuccess, findPassWdSuccess, getLoginInfoSuccess, memberLogin, loginUserid2Success, logout, findMemberSuccess, setLoginMember2 } from '@app/actions/system/login2.action';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';

export const login2SearchFeatureKey = 'login2Search';

export const initialState: Login2State = {
    memberItems: {} as MemberModel,
    count: 0,
    result: {} as ResultProcessModel,
    member: false,
    memberUserId2: {} as Member,
    findMemberItem : {} as MemberModel
}

export const login2SearchReducer = createReducer(
  initialState,
  on(getLoginInfoSuccess, (state, { member }) => ({ ...state, memberItems: member })),
  on(coutBonusSuccess, (state, { count }) => ({ ...state, count: count })),
  on(findIdSuccess, (state,  { member }) => ({...state, memberItems: member})),
  on(findPassWdSuccess, (state,  { result }) => ({...state, result: result})),
  on(memberLogin, (state, {member})=> ({...state, member: member})),
  on(loginUserid2Success, (state, { memberUserId2 }) => ({ ...state, memberUserId2: memberUserId2 })),
  on(logout, (state) => ({...state, memberItems: {} as MemberModel, member: false, memberUserId2: {} as Member})),
  on(findMemberSuccess, (state, { findMember }) => ({ ...state, findMemberItem: findMember })),
  on(setLoginMember2, (state, { payload }) => ({ ...state, memberUserId2: payload }))
);