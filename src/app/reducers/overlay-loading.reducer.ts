import { createReducer, on } from "@ngrx/store";

import { OverlayLoadingState } from "@app/selectors/overlay-loading.selector";
import { setShowOverlayLoading } from "@app/actions/overlay-loading.action";

export const overlayLoadingFeatureKey = 'overlayLoading';

export const initialState: OverlayLoadingState = {
  loading: false,
}

export const overlayLoadingReducer = createReducer(
  initialState,
  on(setShowOverlayLoading, (state, { loading }) => ({
    ...state,
    loading: loading
  }))
);