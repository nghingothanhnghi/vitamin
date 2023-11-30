import { createFeatureSelector, createSelector } from '@ngrx/store';

import { consumerInquiryFeatureKey } from '@app/reducers/myoffice/omnitrition/omnitrition-consumer-inquiry.reducer';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';

export interface ConsumerInquiryState {
     consumerRs:  ConsumerRegistrationModel[];
     count: Number;
}

export const getConsumerRState = createFeatureSelector<ConsumerInquiryState>(consumerInquiryFeatureKey);

export const getConsumerRs = createSelector(
    getConsumerRState,
  (state: ConsumerInquiryState) => state.consumerRs
);

export const getCountConsumerR = createSelector(
    getConsumerRState,
  (state: ConsumerInquiryState) => state.count
);

