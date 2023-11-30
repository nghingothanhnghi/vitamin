import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PopBoardModel } from '@app/models/homepage/pop-board.model';
import { popBoardFeatureKey } from '@app/reducers/homepage/pop-board.reducer';

export interface PopBoardState {
  popBoards: PopBoardModel[];
}

export const getPopBoardState = createFeatureSelector<PopBoardState>(popBoardFeatureKey);

export const getPopBoards = createSelector(
  getPopBoardState,
  (state: PopBoardState) => state.popBoards
);