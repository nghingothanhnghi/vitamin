import { createReducer, on } from '@ngrx/store';

import { ConsumerRegistrationState } from '@app/selectors/myoffice/omnitrition/consumer-registration.selector';
import { ConsumerRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-registration.model';
import { countConsumserRegistrationSuccess, searchConsumserRegistrationSuccess,deleteConsumserRegistrationSuccess,saveConsumserRegistrationSuccess } from '@app/actions/myoffice/omnitrition/consumer-registration/omnitrition-consumer-registration.action';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';

export const consumerRegistrationFeatureKey = 'consumerRegistration';

export const initialState: ConsumerRegistrationState = {
    consumerRs: [] as ConsumerRegistrationModel[],
    count: 0,
    saveConsumer :{} as ResultProcessModel,
    deleteConsumer: {} as ResultProcessModel

}

export const consumerRegistrationReducer = createReducer(
  initialState,
  on(searchConsumserRegistrationSuccess, (state, { consumerRegistrations}) => ({ ...state, consumerRs: consumerRegistrations })),
  on(countConsumserRegistrationSuccess, (state, { count }) => ({ ...state, count:count  })),
  on(saveConsumserRegistrationSuccess, (state, { result }) => ({ ...state, saveConsumer:result  })),
  on(deleteConsumserRegistrationSuccess, (state, { result }) => ({ ...state, deleteConsumer:result  })),


);