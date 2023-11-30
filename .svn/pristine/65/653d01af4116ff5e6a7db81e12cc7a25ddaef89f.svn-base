import { createAction, props } from '@ngrx/store';

import { Rank } from '@app/models/system/rank.model';

export const loadRank = createAction("[Rank API] Load Rank");

export const loadRankSuccess = createAction(
  "[Rank API] Load Rank Success",
  props<{ ranks: Rank[] }>()
);

export const loadRankFailure = createAction(
  "[Rank API] Load Rank Failure",
  props<{ msg: any }>()
);