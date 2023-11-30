import { createReducer, on } from "@ngrx/store";
import { PopBoardState } from "@app/selectors/homepage/pop-board.selector";
import { loadPopBoardsSuccess } from "@app/actions/homepage/pop-board.action";

export const popBoardFeatureKey = "popBoard";

export const initialState: PopBoardState = {
  popBoards: []
}

export const popBoardReducer = createReducer(
  initialState,
  on(loadPopBoardsSuccess, (state, { popBoards }) => ({ ...state, popBoards: popBoards}))
);