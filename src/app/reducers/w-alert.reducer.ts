import { createReducer, on } from "@ngrx/store";

import { WAlert } from "@app/models/components/w-alert.model";
import { WAlertState } from "@app/selectors/w-alert.selector";
import { clearWAlert, setWAlert, setWAlertStatus } from "@app/actions/w-alert.action";
import { WAlertStatus } from "@app/models/components/w-alert-stauts.model";

export const wAlertFeatureKey = 'wAlert';

export const initialState: WAlertState = {
  wAlert: {} as WAlert,
  status: {} as WAlertStatus,
}

export const wAlertReduercer = createReducer(
  initialState,
  on(setWAlert, (state, { wAlert }) => ({ wAlert: wAlert, status: {} as WAlertStatus })),
  on(clearWAlert, () => ({ wAlert: {} as WAlert, status: {} as WAlertStatus })),
  on(setWAlertStatus, (state, { status }) => ({ wAlert: {} as WAlert, status: status }))
);