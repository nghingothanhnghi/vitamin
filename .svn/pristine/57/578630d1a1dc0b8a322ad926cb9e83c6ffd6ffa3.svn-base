import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashBoardModel } from '@app/models/myoffice/dashboard/dashboard.model';
import { dashBoardFeatureKey } from '@app/reducers/myoffice/dashboard/dashboard.reducer';

export interface DashBoardState {
  getListMonthPaymentDate : DashBoardModel[];
  getListPaymentDate : DashBoardModel[];
  getInfoDashBoard : DashBoardModel;
  getActivityStatusDashBoard : DashBoardModel[];
  getSatusOfRankDashBoard : DashBoardModel[];
  getSatusOfRankDashBoardSum : DashBoardModel;
  getActivityStatusDashBoardTotal: Number;
}

export const getDashBoardFeatureKeyState = createFeatureSelector<DashBoardState>(dashBoardFeatureKey);

export const getListMonthPaymentDateItems = createSelector(
  getDashBoardFeatureKeyState,
(state: DashBoardState) => state.getListMonthPaymentDate
);

export const getListPaymentDateItems = createSelector(
    getDashBoardFeatureKeyState,
  (state: DashBoardState) => state.getListPaymentDate
);

export const getInfoDashBoardItems = createSelector(
    getDashBoardFeatureKeyState,
  (state: DashBoardState) => state.getInfoDashBoard
);

export const getActivityStatusDashBoardItems = createSelector(
    getDashBoardFeatureKeyState,
  (state: DashBoardState) => state.getActivityStatusDashBoard
);

export const getActivityStatusDashBoardTotalItems = createSelector(
  getDashBoardFeatureKeyState,
(state: DashBoardState) => state.getActivityStatusDashBoardTotal
);

export const getSatusOfRankDashBoardItem = createSelector(
    getDashBoardFeatureKeyState,
  (state: DashBoardState) => state.getSatusOfRankDashBoard
);

export const getSatusOfRankDashBoardSumItem = createSelector(
  getDashBoardFeatureKeyState,
(state: DashBoardState) => state.getSatusOfRankDashBoardSum
);