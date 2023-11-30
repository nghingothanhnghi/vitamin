import { Member } from '@app/models/myoffice/member/member.model';
import { createAction, props } from '@ngrx/store';

// search
export const searchMemberPopup = createAction(
  "[Member API] search member popup",
  props<{ params: any }>()
);

export const searchMemberPopupSuccess = createAction(
  "[Member API] search member popup success",
  props<{ memberItems: Member[] }>()
);

export const searchMemberPopupFailure = createAction(
  "[Member API] search member popup failure",
  props<{ msg: any }>()
);

// count
export const countMemberPopup = createAction(
  "[Member API] count member popup",
  props<{ params: any }>()
);

export const countMemberPopupSuccess = createAction(
  "[Member API] count member popup success",
  props<{ total: Number }>()
);

export const countMemberPopupFailure = createAction(
  "[Member API] count member popup failure",
  props<{ msg: any }>()
);