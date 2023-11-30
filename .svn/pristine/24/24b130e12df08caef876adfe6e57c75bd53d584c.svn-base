import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AutoShipModel } from '@app/models/myoffice/auto-ship/auto-ship.model';
import { autoShipFeatureKey } from '@app/reducers/myoffice/auto-ship/auto-ship.reducer';

export interface AutoShipState {
    registrationDetailSearchItem: AutoShipModel[];
    totalRegistrationDetailItem: Number;
    sumRegistrationDetailItem: AutoShipModel;

    paymentStatusSearchItem: AutoShipModel[];
    totalPaymentStatusItem: Number;
    sumPaymentStatusItem: AutoShipModel;
  
}

export const getAutoShipFeatureKeyState = createFeatureSelector<AutoShipState>(autoShipFeatureKey);

//-------------------------------------------Autoship-Registration-Details--------------------------------------------------
export const registrationDetailSearchItems$= createSelector(
    getAutoShipFeatureKeyState,
  (state: AutoShipState) => state.registrationDetailSearchItem
);

export const registrationDetailCountItems$ = createSelector(
    getAutoShipFeatureKeyState,
  (state: AutoShipState) => state.totalRegistrationDetailItem
);

export const registrationDetailSumItems$ = createSelector(
    getAutoShipFeatureKeyState,
  (state: AutoShipState) => state.sumRegistrationDetailItem
);
 //-------------------------------------------Autoship-Payment-Status--------------------------------------------------
 export const paymentStatusSearchItems$ = createSelector(
    getAutoShipFeatureKeyState,
  (state: AutoShipState) => state.paymentStatusSearchItem
);

export const paymentStatusCountItems$ = createSelector(
    getAutoShipFeatureKeyState,
  (state: AutoShipState) => state.totalPaymentStatusItem
);

export const paymentStatusSumItems$ = createSelector(
    getAutoShipFeatureKeyState,
  (state: AutoShipState) => state.sumPaymentStatusItem
);