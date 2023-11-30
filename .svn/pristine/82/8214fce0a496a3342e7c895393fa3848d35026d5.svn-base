import { createReducer, on } from '@ngrx/store';

import { UnsoldProductInquiryState } from '@app/selectors/myoffice/omnitrition/unsold-product-inquiry.selector';
import { ConsumerSalesRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-sales-registration.model';
import { countConsumserSalesRegisSuccess, sumConsumserSalesRegisSuccess,searchConsumserSalesRegisSuccess } from '@app/actions/myoffice/omnitrition/unsold-product-inquiry/unsold-product-inquiry.action';

export const unsoldProductInquiryFeatureKey = 'UnsoldProductInquiry';

export const initialState: UnsoldProductInquiryState = {
  unsoldProducts: [] as ConsumerSalesRegistrationModel[],
  unsoldProduct:{} as ConsumerSalesRegistrationModel,
    count: 0,
}

export const unsoldProductInquiryReducer = createReducer(
  initialState,
  on(searchConsumserSalesRegisSuccess, (state, { consSalesResgiss}) => ({ ...state, unsoldProducts: consSalesResgiss })),
  on(sumConsumserSalesRegisSuccess, (state, { consSalesResgis}) => ({ ...state, unsoldProduct: consSalesResgis })),
  on(countConsumserSalesRegisSuccess, (state, { count }) => ({ ...state, count:count  })),
);