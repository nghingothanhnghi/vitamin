import { ActionReducerMap } from '@ngrx/store';

import { MyProgramState } from '@selectors/system/my-program.selector';
import * as myProgramReducer from "./system/my-program.reducer";

// export interface AppState {
//   myProgramState: MyProgramState,
// }

// export const reducers: ActionReducerMap<AppState> = {
//   myProgramState: myProgramReducer.myProgramReducer,
// }