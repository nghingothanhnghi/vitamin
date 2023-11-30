import { PopBoardModel } from '@app/models/homepage/pop-board.model';
import { createAction, props } from '@ngrx/store';

export const loadPopBoards = createAction("[PopBoard API] load PopBoard");

export const loadPopBoardsSuccess = createAction(
  "[PopBoard API] load PopBoard success",
  props<{ popBoards: PopBoardModel[] }>()
);

export const loadPopBoardsFailure = createAction(
  "[PopBoard API] load PopBoard failure",
  props<{ msg: any }>()
);