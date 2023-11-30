import { createReducer, on } from '@ngrx/store';

import { RankState } from "@app/selectors/system/rank.selector";
import { Rank } from '@app/models/system/rank.model';
import { loadRankSuccess } from '@app/actions/system/rank.action';

export const rankFeatureKey = 'rank';

export const initialState: RankState = {
  ranks: [] as Rank[],
}

export const rankReducer = createReducer(
  initialState,
  on(loadRankSuccess, (state, { ranks }) => ({
    ...state,
    ranks: ranks
  }))
);