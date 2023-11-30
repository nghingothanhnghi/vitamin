import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';

import { MyProgramState } from 'src/app/selectors/system/my-program.selector';
import * as myProgramActions from "src/app/actions/system/my-program.actions";

export const myProgramsFeatureKey = 'myProgramState';

export const initialState: MyProgramState = {myPrograms: [], message: ""};

export const _myProgramReducer = createReducer(
  initialState,
  on(myProgramActions.loadMyProgramsSuccess, (state, { myPrograms }) => ({myPrograms: myPrograms, message: 'Success'}))
);

// export function myProgramReducer(state: any, action: Action) {
//   return _myProgramReducer(state, action);
// }