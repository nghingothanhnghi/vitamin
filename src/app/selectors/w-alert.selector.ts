import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WAlert } from '@app/models/components/w-alert.model';
import { wAlertFeatureKey } from '@app/reducers/w-alert.reducer';
import { WAlertStatus } from '@app/models/components/w-alert-stauts.model';

export interface WAlertState {
  wAlert: WAlert;
  status: WAlertStatus,
}

export const getWAlertState = createFeatureSelector<WAlertState>(wAlertFeatureKey);

export const getWAlert = createSelector(
  getWAlertState,
  (state: WAlertState) => state.wAlert
)

export const getWAlertStatus = createSelector(
  getWAlertState,
  (state: WAlertState) => state.status
)