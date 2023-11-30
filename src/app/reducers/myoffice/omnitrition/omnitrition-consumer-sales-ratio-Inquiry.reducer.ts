import { createReducer, on } from '@ngrx/store';

import { ConsSalesRatioInquiryState } from '@app/selectors/myoffice/omnitrition/consumer-sales-ratio-inquiry.selector';
import { ConsumerSalesRatioInquiryModel } from '@app/models/myoffice/omnitrition/consumer-sales-ratio-inquiry.model';
import { countConsumserSalesRatioSuccess, searchConsumserSalesRatioSuccess,sumConsumserSalesRatioSuccess } from '@app/actions/myoffice/omnitrition/consumer-sales-ratio-inquiry/OmnitritionConsumerSalesRatioInquiry.action';

export const consSalesRatioInquiryFeatureKey = 'consumerSalesRatioInquiry';

export const initialState: ConsSalesRatioInquiryState = {
  consSalesRatios: [] as ConsumerSalesRatioInquiryModel[],
  consSalesRatio:{} as ConsumerSalesRatioInquiryModel,
  count: 0,
}

export const consSalesRatioInquiryReducer = createReducer(
  initialState,
  on(searchConsumserSalesRatioSuccess, (state, { consumerSalesRatios}) => ({ ...state, consSalesRatios: consumerSalesRatios })),
  on(sumConsumserSalesRatioSuccess, (state, { consumerSalesRatio}) => ({ ...state, consSalesRatio: consumerSalesRatio })),
  on(countConsumserSalesRatioSuccess, (state, { count }) => ({ ...state, count:count  })),
);