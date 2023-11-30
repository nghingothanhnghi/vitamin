import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { MemberModel } from '@app/models/system/member.model';
import { createAction, props } from '@ngrx/store';
import { Member } from '@app/models/myoffice/member/member.model';


// search
export const getLoginInfo = createAction(
  "[Login API] get login info",
  props<{ params: any }>()
);

export const getLoginInfoSuccess = createAction(
  "[Login API] get login info success",
  props<{ member: MemberModel }>()
);

export const getLoginInfoFailure = createAction(
  "[Login API] get login info failure",
  props<{ msg: any }>()
);

// count
export const coutBonus = createAction(
"[Login API] count bonus",
props<{ params: any }>()
);

export const coutBonusSuccess = createAction(
"[Login API] count bonus success",
    props<{ count: Number }>()
);

export const coutBonusFailure = createAction(
"[Login API] count bonus failure",
props<{ msg: any }>()
);

export const autoLogout = createAction(
  "[Login API] call logout",
);

export const autoLogoutSuccess = createAction(
  "[Login API] call logoutsuccess",
  props<{ msg: any }>()
);

export const findId = createAction(
  "[Login API] call fidId",
  props<{ params: any }>()
);

export const findIdSuccess = createAction(
  "[Login API] call fidIdSuccess",
  props<{ member: MemberModel }>()
);

export const findIdFialure = createAction(
  "[Login API] call findIdFialure",
  props<{ msg: any }>()
);

export const findPassWd = createAction(
  "[Login API] call fidPassWd",
  props<{ params: any }>()
);

export const findPassWdSuccess = createAction(
  "[Login API] call findPassWdSuccess",
  props<{ result: ResultProcessModel }>()
);

export const findPassWdFialure = createAction(
  "[Login API] call findPassWdFialure",
  props<{ msg: any }>()
);

export const memberLogin = createAction(
  "[Login API] set member login",
  props<{ member: boolean }>()
);

/* loginUserid2 */
export const loginUserid2 = createAction(
  "[loginUserid2 API] call loginUserid2",
  (userId2: string) => ({ userId2 })
);

export const loginUserid2Success = createAction(
  "[loginUserid2 API] call loginUserid2Success",
  props<{ memberUserId2: Member }>()
);

export const loginUserid2Fialure = createAction(
  "[loginUserid2 API] call loginUserid2Fialure",
  props<{ msg: any }>()
);

export const logout = createAction(
  "[Logout] logout"
);

/* findMember */
export const findMember = createAction(
  "[Find Member API] call find member",
  props<{ params: any }>()
);

export const findMemberSuccess = createAction(
  "[Find Member API] call find member sucess",
  props<{ findMember: MemberModel }>()
);

export const findMemberFialure = createAction(
  "[Find Member API] call findMemberFialure",
  props<{ msg: any }>()
);

// set login member2
export const setLoginMember2 = createAction(
  "[Login Member 2] set login member 2",
  props<{ payload: any }>()
);