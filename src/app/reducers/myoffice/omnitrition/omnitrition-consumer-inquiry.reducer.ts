import { createReducer, on } from '@ngrx/store';

import { ConsumerInquiryState } from '@app/selectors/myoffice/omnitrition/consumer-Inquiry.selector';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';
import { countConsumserSuccess, searchConsumserSuccess } from '@app/actions/myoffice/omnitrition/consumer-inquiry/omnitrition-consumer-inquiry.action';

export const consumerInquiryFeatureKey = 'consumerInquiry';

export const initialState: ConsumerInquiryState = {
    consumerRs: [] as ConsumerRegistrationModel[],
    count: 0
}

export const consumerInquiryReducer = createReducer(
  initialState,
  on(searchConsumserSuccess, (state, { consumerRegistrations}) => ({ ...state, consumerRs: consumerRegistrations })),
  on(countConsumserSuccess, (state, { count }) => ({ ...state, count:count  })),
);