import { createReducer, on } from '@ngrx/store';

import { CodeModel } from '@app/models/system/code.model';
import { CodeState } from '@app/selectors/system/code.selector';
import { 
  loadCodesYSuccess, 
  loadCodesOSuccess, 
  loadCodesTSuccess,
  loadCodesESuccess 
} from '@app/actions/system/code.action';

export const codeFeatureKey = 'code';

export const initialState: CodeState = {
  codesY: [] as CodeModel[],
  codesO: [] as CodeModel[],
  codesT: [] as CodeModel[],
  codesE: [] as CodeModel[],
}

export const codeReducer = createReducer(
  initialState,
  on(loadCodesYSuccess, (state, { codes }) => ({
    ...state,
    codesY: codes,
  })),
  on(loadCodesOSuccess, (state, { codes }) => ({
    ...state,
    codesO: codes,
  })),
  on(loadCodesTSuccess, (state, { codes }) => ({
    ...state,
    codesT: codes,
  })),
  on(loadCodesESuccess, (state, { codes }) => ({
    ...state,
    codesE: codes,
  })),
);
