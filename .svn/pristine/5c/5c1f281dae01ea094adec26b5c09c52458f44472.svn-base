import { createReducer, on } from '@ngrx/store';
import { DashBoardState } from '@app/selectors/myoffice/dashboard/dashboard.selector';
import { DashBoardModel } from '@app/models/myoffice/dashboard/dashboard.model';
import { getActivityStatusDashBoardCountSuccess, getActivityStatusDashBoardSuccess, getInfoDashBoardSuccess, getListMonthPaymentDateSuccess, getListPaymentDateSuccess, getSatusOfRankDashBoardSuccess, getSatusOfRankDashBoardSumSuccess } from '@app/actions/myoffice/dashboard/dashboard.action';

export const dashBoardFeatureKey = 'dashBoardKey';

export const initialState: DashBoardState = {
  getListMonthPaymentDate : [] as DashBoardModel[],
  getListPaymentDate : [] as DashBoardModel[],
  getInfoDashBoard :{} as DashBoardModel,
  getActivityStatusDashBoard : [] as DashBoardModel[],
  getSatusOfRankDashBoard : [] as DashBoardModel[],
  getSatusOfRankDashBoardSum : {} as DashBoardModel,
  getActivityStatusDashBoardTotal: 0
}

export const dashBoardReducer = createReducer(
  initialState,
  on(getListMonthPaymentDateSuccess, (state, { dashBoard }) => ({ ...state, getListMonthPaymentDate: dashBoard })),
  on(getListPaymentDateSuccess, (state, { dashBoard }) => ({ ...state, getListPaymentDate: dashBoard })),
  on(getInfoDashBoardSuccess, (state, { dashBoard }) => ({...state, getInfoDashBoard: dashBoard})),
  on(getActivityStatusDashBoardSuccess, (state, { dashBoard }) => ({ ...state, getActivityStatusDashBoard: dashBoard })),
  on(getActivityStatusDashBoardCountSuccess, (state, { total }) => ({ ...state, getActivityStatusDashBoardTotal: total })),
  on(getSatusOfRankDashBoardSuccess, (state, { dashBoard }) => ({ ...state, getSatusOfRankDashBoard: dashBoard })),
  on(getSatusOfRankDashBoardSumSuccess, (state, { dashBoard }) => ({ ...state, getSatusOfRankDashBoardSum: dashBoard }))
);