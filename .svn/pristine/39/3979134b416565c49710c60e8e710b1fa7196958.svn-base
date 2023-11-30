import { createReducer, on } from '@ngrx/store';

import { ConsumerSalesRegisState } from '@app/selectors/myoffice/omnitrition/consumer-sales-registration.selector';
import { ConsumerSalesRegistrationModel } from '@app/models/myoffice/omnitrition/consumer-sales-registration.model';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';

import { 
  saveSuccess, countPdtSuccess, countSaleSuccess, 
  loadListPdtSuccess, loadListSaleSuccess, loadInfoConsumerSuccess, 
  loadListConsumerSuccess, loadConsumerSalesSuccess
 } from '@app/actions/myoffice/omnitrition/consumer-sales-registration/consumer-sales-registration.action';


export const consumerSalesRegisFeatureKey = 'consumerSalesRegis';

export const initialState: ConsumerSalesRegisState = {
  listConsumer : [] as ConsumerSalesRegistrationModel[],
  infoConsumer: {} as ConsumerSalesRegistrationModel,
  consumerSale:  {} as ConsumerSalesRegistrationModel,
  listPdt:  [] as ConsumerSalesRegistrationModel[],
  countPdt:0,
  listSales:[] as ConsumerSalesRegistrationModel[],
  countSales:0,
  resultSave:{} as ResultProcessModel,

}

export const consumerSalesRegisReducer = createReducer(
  initialState,
  on(loadListConsumerSuccess, (state, { listConsumer}) => ({ ...state, listConsumer: listConsumer })),
  on(loadInfoConsumerSuccess, (state, { infoConsumer }) => ({ ...state, infoConsumer:infoConsumer  })),
  on(loadConsumerSalesSuccess, (state, { consumerSale }) => ({ ...state, consumerSale:consumerSale  })),
  on(loadListPdtSuccess, (state, { listPdt }) => ({ ...state, listPdt:listPdt  })),
  on(countPdtSuccess, (state, { countPdt}) => ({ ...state, countPdt: countPdt })),
  on(loadListSaleSuccess, (state, { listSales }) => ({ ...state, listSales:listSales  })),
  on(countSaleSuccess, (state, { countSales }) => ({ ...state, countSales:countSales  })),
  on(saveSuccess, (state, { resultSave }) => ({ ...state, resultSave:resultSave  })),
);