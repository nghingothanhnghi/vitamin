import { createFeatureSelector, createSelector } from '@ngrx/store';

import { consumerRegistrationFeatureKey } from '@app/reducers/myoffice/omnitrition/omnitrition-consumer-registration.reducer';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';


export interface ConsumerRegistrationState {
     consumerRs:  ConsumerRegistrationModel[];
     count: number;
     saveConsumer:ResultProcessModel;
     deleteConsumer:ResultProcessModel;

}

export const getConsumerRState = createFeatureSelector<ConsumerRegistrationState>(consumerRegistrationFeatureKey);

export const getConsumerRs = createSelector(
    getConsumerRState,
  (state: ConsumerRegistrationState) => state.consumerRs
);

export const getCountConsumerR = createSelector(
    getConsumerRState,
  (state: ConsumerRegistrationState) => state.count
);
export const saveConsumerRs = createSelector(
    getConsumerRState,
  (state: ConsumerRegistrationState) => state.saveConsumer
);

export const deleteConsumerR = createSelector(
    getConsumerRState,
  (state: ConsumerRegistrationState) => state.deleteConsumer
);

