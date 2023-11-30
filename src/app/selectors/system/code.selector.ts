import { createFeatureSelector, createSelector } from '@ngrx/store';

import { codeFeatureKey } from '@app/reducers/system/code.reducer';
import { CodeModel } from '@app/models/system/code.model';

export interface CodeState {
  codesY: CodeModel[];
  codesO: CodeModel[];
  codesT: CodeModel[];
  codesE: CodeModel[];
}

export const getCodeState = createFeatureSelector<CodeState>(codeFeatureKey);

export const getCodesY = createSelector(
  getCodeState,
  (state: CodeState) => state.codesY
);

export const getCodesO = createSelector(
  getCodeState,
  (state: CodeState) => state.codesO
);

export const getCodesT = createSelector(
  getCodeState,
  (state: CodeState) => state.codesT
);
export const getCodesE = createSelector(
  getCodeState,
  (state: CodeState) => state.codesE
);