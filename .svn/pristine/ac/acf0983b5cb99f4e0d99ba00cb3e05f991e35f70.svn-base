import { createSelector, createFeatureSelector } from '@ngrx/store';

import { MyProgram } from 'src/app/models/system/my-program.model';
import { myProgramsFeatureKey } from 'src/app/reducers/system/my-program.reducer';

export interface MyProgramState {
  myPrograms: MyProgram[];
  message: any;
}

// export const selectMyProgramState = (state: MyProgramState) => state;

export const getMyProgramState = createFeatureSelector<MyProgramState>(myProgramsFeatureKey);

export const getMyPrograms = createSelector(
  getMyProgramState,
  (state: MyProgramState) => state.myPrograms
);