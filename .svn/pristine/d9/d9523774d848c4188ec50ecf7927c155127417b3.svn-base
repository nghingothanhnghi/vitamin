import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Rank } from "@app/models/system/rank.model";
import { rankFeatureKey } from '@app/reducers/system/rank.reducer';
import { RankHistory } from '@app/models/myoffice/member/rank-history.model';

export interface RankState {
  ranks: Rank[];
}

export const getRankState = createFeatureSelector<RankState>(rankFeatureKey);

export const loadAllRank = createSelector(
  getRankState,
  (state: RankState) => state.ranks
);