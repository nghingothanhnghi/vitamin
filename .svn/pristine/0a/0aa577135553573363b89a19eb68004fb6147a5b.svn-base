import {createAction, props} from '@ngrx/store';
import { ConsumerRegistrationModel } from '../../../../models/myoffice/omnitrition/consumer-registration.model'


// search ConsumerResInquiry
export const searchConsumser = createAction(
    '[Consumer-inquiry API] search ConsumerResInquiry',
    props<{ params: any }>()
);

export const searchConsumserSuccess = createAction(
    '[Consumer-inquiry API] search ConsumerResInquiry Success',
    props<{ consumerRegistrations: ConsumerRegistrationModel[] }>()
);

export const searchConsumserFailure = createAction(
    '[Consumer-inquiry API] search Consumer inquiry Failure',
    props<{ msg: any }>()
);

// count ConsumerResInquiry

export const countConsumser = createAction(
    '[Consumer-inquiry API] count ConsumerResInquiry',
    props<{ params: any }>()
);

export const countConsumserSuccess = createAction(
    '[Consumer-inquiry API] count ConsumerResInquiry Success',
    props<{ count: Number }>()
);

export const countConsumserFailure = createAction(
    '[Consumer-inquiry API] count ConsumerResInquiry Failure',
    props<{ msg: any }>()
);