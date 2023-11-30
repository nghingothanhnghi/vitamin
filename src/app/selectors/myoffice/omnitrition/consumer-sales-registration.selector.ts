import { createFeatureSelector, createSelector } from '@ngrx/store';

import { consumerSalesRegisFeatureKey } from '@app/reducers/myoffice/omnitrition/consumer-sales-registration.reducer';
import { ConsumerSalesRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-sales-registration.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';

export interface ConsumerSalesRegisState {
  listConsumer: ConsumerSalesRegistrationModel[];
  infoConsumer: ConsumerSalesRegistrationModel;
  consumerSale: ConsumerSalesRegistrationModel;
  listPdt: ConsumerSalesRegistrationModel[];
  countPdt: number;
  listSales: ConsumerSalesRegistrationModel[];
  countSales: number;
  resultSave:ResultProcessModel;


}

export const getConsumerSalesRegisState = createFeatureSelector<ConsumerSalesRegisState>(consumerSalesRegisFeatureKey);

export const getListConsumer = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.listConsumer
);

export const getInfoConsumer = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.infoConsumer
);

export const getConsumerSale = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.consumerSale
);

export const getListPdt = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.listPdt
);

export const getCountPdt = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.countPdt
);

export const getListSales = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.listSales
);
export const getCountSales = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.countSales
);
export const save = createSelector(
    getConsumerSalesRegisState,
  (state: ConsumerSalesRegisState) => state.resultSave
);