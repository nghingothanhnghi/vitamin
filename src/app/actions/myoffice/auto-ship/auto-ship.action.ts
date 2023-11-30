import { AutoShipModel } from '@app/models/myoffice/auto-ship/auto-ship.model';
import { createAction, props } from '@ngrx/store';


//-------------------------------------------Autoship-Registration-Details--------------------------------------------------
// search
export const registrationDetailSearch = createAction(
  "[AutoShip API] registration detail search",
  props<{ params: any }>()
);

export const registrationDetailSearchSuccess = createAction(
  "[AutoShip API] registration detail search success",
  props<{ autoShip: AutoShipModel[] }>()
);

export const registrationDetailSearchFailure = createAction(
  "[AutoShip API] registration detail search failure",
  props<{ msg: any }>()
);

// count
export const registrationDetailCount = createAction(
  "[AutoShip API] registration detail count",
  props<{ params: any }>()
);

export const registrationDetailCountSuccess = createAction(
  "[AutoShip API] registration detail count success",
  props<{ total: Number }>()
);

export const registrationDetailCountFailure = createAction(
  "[AutoShip API] registration detail count failure",
  props<{ msg: any }>()
);

// sum
export const registrationDetailSum = createAction(
  "[AutoShip API] registration detail sum",
  props<{ params: any }>()
);

export const registrationDetailSumSuccess = createAction(
  "[AutoShip API] registration detail sum success",
  props<{ autoShip: AutoShipModel }>()
);

export const registrationDetailSumFailure = createAction(
  "[AutoShip API] registration detail sum failure",
  props<{ msg: any }>()
);

//-------------------------------------------Autoship-Payment-Status--------------------------------------------------
// search
export const paymentStatusSearch = createAction(
 "[AutoShip API] payment status search",
 props<{ params: any }>()
);
  
export const paymentStatusSearchSuccess = createAction(
 "[AutoShip API] payment status search success",
 props<{ autoShip: AutoShipModel[] }>()
);
  
export const paymentStatusSearchFailure = createAction(
 "[AutoShip API] payment status search failure",
 props<{ msg: any }>()
);
  
// count
export const paymentStatusCount = createAction(
 "[AutoShip API] payment status count",
 props<{ params: any }>()
);

export const paymentStatusCountSuccess = createAction(
 "[AutoShip API] payment status count success",
 props<{ total: Number }>()
);

export const paymentStatusCountFailure = createAction(
 "[AutoShip API] payment status count failure",
 props<{ msg: any }>()
);

// sum
export const paymentStatusSum = createAction(
 "[AutoShip API] payment status sum",
 props<{ params: any }>()
);

export const paymentStatusSumSuccess = createAction(
 "[AutoShip API] payment status sum success",
 props<{ autoShip: AutoShipModel }>()
);

export const paymentStatusSumFailure = createAction(
 "[AutoShip API] payment status sum failure",
 props<{ msg: any }>()
);