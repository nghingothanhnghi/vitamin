import { paymentStatusCountSuccess, paymentStatusSearchSuccess, paymentStatusSumSuccess, registrationDetailCountSuccess, registrationDetailSearchSuccess, registrationDetailSumSuccess } from '@app/actions/myoffice/auto-ship/auto-ship.action';
import { AutoShipModel } from '@app/models/myoffice/auto-ship/auto-ship.model';
import { AutoShipState } from '@app/selectors/myoffice/auto-ship/auto-ship.selector';
import { createReducer, on } from '@ngrx/store';

export const autoShipFeatureKey = 'autoShipKey';

export const initialState: AutoShipState = {
  registrationDetailSearchItem: [] as AutoShipModel[],
  totalRegistrationDetailItem: 0,
  sumRegistrationDetailItem: {} as AutoShipModel,

  paymentStatusSearchItem: [] as AutoShipModel[],
  totalPaymentStatusItem: 0,
  sumPaymentStatusItem: {} as AutoShipModel

}

export const AutoShipReducer = createReducer(
  initialState,
  on(registrationDetailSearchSuccess, (state, { autoShip }) => ({ ...state, registrationDetailSearchItem: autoShip })),
  on(registrationDetailCountSuccess, (state, { total }) => ({ ...state, totalRegistrationDetailItem: total })),
  on(registrationDetailSumSuccess, (state, { autoShip }) => ({...state, sumRegistrationDetailItem: autoShip})),

  on(paymentStatusSearchSuccess, (state, { autoShip }) => ({ ...state, paymentStatusSearchItem: autoShip })),
  on(paymentStatusCountSuccess, (state, { total }) => ({ ...state, totalPaymentStatusItem: total })),
  on(paymentStatusSumSuccess, (state, { autoShip }) => ({...state, sumPaymentStatusItem: autoShip}))
 
);