import {createAction, props} from '@ngrx/store';
import { ConsumerSalesRatioInquiryModel } from '../../../../models/myoffice/omnitrition/consumer-sales-ratio-inquiry.model'



// search ConsumserSalesRatio
export const searchConsumserSalesRatio = createAction(
    '[ConsumerSalesRatio API] search ConsumerSalesRatio',
    props<{parmas:any}>()
);

export const searchConsumserSalesRatioSuccess = createAction(
    '[ConsumerSalesRatio API] search ConsumerSalesRatio Success',
    props<{ consumerSalesRatios: ConsumerSalesRatioInquiryModel[] }>()
);

export const searchConsumserSalesRatioFailure = createAction(
    '[ConsumerSalesRatio API] search ConsumerSalesRatio Failure',
    props<{ msg: any }>()
);

// count ConsumserSalesRatio

export const countConsumserSalesRatio = createAction(
    '[ConsumerSalesRatio API] count ConsumerSalesRatio',
    props<{parmas:any}>()

);

export const countConsumserSalesRatioSuccess = createAction(
    '[ConsumerSalesRatio API] count ConsumerSalesRatio Success',
    props<{ count: number }>()
);

export const countConsumserSalesRatioFailure = createAction(
    '[ConsumerSalesRatio API] count ConsumerSalesRatio Failure',
    props<{ msg: any }>()
);

// sum ConsumserSalesRatio

export const sumConsumserSalesRatio = createAction(
    '[ConsumerSalesRatio API] sum ConsumerSalesRatio',
    props<{parmas:any}>()

);

export const sumConsumserSalesRatioSuccess = createAction(
    '[ConsumerSalesRatio API] sum ConsumerSalesRatio Success',
    props<{ consumerSalesRatio: ConsumerSalesRatioInquiryModel }>()
);

export const sumConsumserSalesRatioFailure = createAction(
    '[ConsumerSalesRatio API] sum ConsumerSalesRatio Failure',
    props<{ msg: any }>()
);