import { createReducer, on } from '@ngrx/store';

import { CenterState } from "@app/selectors/system/center.selector";
import { CenterModel } from '@app/models/system/center.model';
import { loadCenterSuccess } from '@app/actions/system/center.action';

export const centerFeatureKey = 'center';

export const initialState: CenterState = {
  centers: [] as CenterModel[],
}

export const centerReducer = createReducer(
  initialState,
  on(loadCenterSuccess, (state, { centers }) => ({
    ...state,
    centers: centers
  }))
);
