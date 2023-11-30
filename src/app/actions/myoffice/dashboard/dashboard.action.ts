import { DashBoardModel } from '@app/models/myoffice/dashboard/dashboard.model';
import { createAction, props } from '@ngrx/store';


// getListMonthPaymentDate
export const getListMonthPaymentDate = createAction(
  "[DashBoard API] get list month payment date",
  props<{ params: any }>()
 );
   
 export const getListMonthPaymentDateSuccess = createAction(
  "[DashBoard API] get list month payment date success",
  props<{ dashBoard: DashBoardModel[]}>()
 );
   
 export const getListMonthPaymentDateFailure = createAction(
  "[DashBoard API] get list month payment date failure",
  props<{ msg: any }>()
 );

// getListPaymentDate
export const getListPaymentDate = createAction(
 "[DashBoard API] get list payment date",
 props<{ params: any }>()
);
  
export const getListPaymentDateSuccess = createAction(
 "[DashBoard API] get list payment date success",
 props<{ dashBoard: DashBoardModel[]}>()
);
  
export const getListPaymentDateFailure = createAction(
 "[DashBoard API] get list payment date failure",
 props<{ msg: any }>()
);

// getInfoDashBoard
export const getInfoDashBoard = createAction(
  "[DashBoard API] get info dash board",
  props<{ params: any }>()
);

export const getInfoDashBoardSuccess = createAction(
  "[DashBoard API] get info dash board success",
  props<{ dashBoard: DashBoardModel}>()
);

export const getInfoDashBoardFailure = createAction(
  "[DashBoard API] get info dash board failure",
  props<{ msg: any }>()
);

// getActivityStatusDashBoard   
export const getActivityStatusDashBoard = createAction(
 "[DashBoard API] get activity status dash board",
 props<{ params: any }>()
);

export const getActivityStatusDashBoardSuccess = createAction(
 "[DashBoard API] get activity status dash board success",
 props<{ dashBoard: DashBoardModel[]}>()
);

export const getActivityStatusDashBoardFailure = createAction(
 "[DashBoard API] get activity status dash board failure",
 props<{ msg: any }>()
);

// getActivityStatusDashBoardCount
export const getActivityStatusDashBoardCount = createAction(
  "[DashBoard API] get activity status dash boar count",
  props<{ params: any }>()
);

export const getActivityStatusDashBoardCountSuccess = createAction(
  "[DashBoard API] get activity status dash boar count success",
  props<{ total: Number }>()
);

export const getActivityStatusDashBoardCountFailure = createAction(
  "[DashBoard API] get activity status dash boar count failure",
  props<{ msg: any }>()
);

// getSatusOfRankDashBoard   
export const getSatusOfRankDashBoard = createAction(
 "[DashBoard API] get status of rank dash board",
 props<{ params: any }>()
);

export const getSatusOfRankDashBoardSuccess = createAction(
 "[DashBoard API] get status of rank dash board success",
 props<{ dashBoard: DashBoardModel[]}>()
);

export const getSatusOfRankDashBoardFailure = createAction(
 "[DashBoard API] get status of rank dash board failure",
 props<{ msg: any }>()
);
 

// getSatusOfRankDashBoardSum   
export const getSatusOfRankDashBoardSum = createAction(
  "[DashBoard API] get status of rank dash board sum",
  props<{ params: any }>()
 );
 
 export const getSatusOfRankDashBoardSumSuccess = createAction(
  "[DashBoard API] get status of rank dash board sum success",
  props<{ dashBoard: DashBoardModel}>()
 );
 
 export const getSatusOfRankDashBoardSumFailure = createAction(
  "[DashBoard API] get status of rank dash board sum failure",
  props<{ msg: any }>()
 );
   
