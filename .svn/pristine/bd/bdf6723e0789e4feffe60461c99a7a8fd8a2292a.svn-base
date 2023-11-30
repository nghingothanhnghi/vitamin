import {createAction, props} from '@ngrx/store';
import { ConsumerSalesRegistrationModel } from '@models/myoffice/omnitrition/consumer-sales-registration.model';
import { ResultProcessModel } from '../../../../models/myoffice/result-process.model'








// load loadListConsumer 
export const loadListConsumer = createAction(
    '[loadListConsumer API] load loadListConsumer',
    props<{ params: any }>()

);

export const loadListConsumerSuccess = createAction(
    '[loadListConsumer API] load loadListConsumer Success',
    props<{ listConsumer: ConsumerSalesRegistrationModel[] }>()
);

export const loadListConsumerFailure = createAction(
    '[loadListConsumer API] load loadListConsumer Failure',
    props<{ msg: any }>()
);

// load loadInfoConsumer 
export const loadInfoConsumer = createAction(
    '[loadInfoConsumer API] load loadInfoConsumer',
    (csmId: string) => ({ csmId })

);

export const loadInfoConsumerSuccess = createAction(
    '[loadInfoConsumer API] load loadInfoConsumer Success',
    props<{ infoConsumer: ConsumerSalesRegistrationModel }>()
);

export const loadInfoConsumerFailure = createAction(
    '[loadInfoConsumer API] load loadInfoConsumer Failure',
    props<{ msg: any }>()
);

// load loadConsumerSales 
export const loadConsumerSales = createAction(
    '[loadConsumerSales API] load loadConsumerSales',
    (userId: string) => ({ userId })

);

export const loadConsumerSalesSuccess = createAction(
    '[loadConsumerSales API] load loadConsumerSales Success',
    props<{ consumerSale: ConsumerSalesRegistrationModel }>()
);

export const loadConsumerSalesFailure = createAction(
    '[loadConsumerSales API] load loadConsumerSales Failure',
    props<{ msg: any }>()
);

// getListPdt
export const loadListPdt = createAction(
    '[loadListPdt API] load loadListPdt',
    (userId: string) => ({ userId })

);

export const loadListPdtSuccess = createAction(
    '[loadListPdt API] load loadListPdt Success',
    props<{ listPdt: ConsumerSalesRegistrationModel[] }>()
);

export const loadListPdtFailure = createAction(
    '[loadListPdt API] load loadListPdt Failure',
    props<{ msg: any }>()
);

// CountPdt
export const countPdt = createAction(
    '[countPdt API] load countPdt',
    (userId: string) => ({ userId })

);

export const countPdtSuccess = createAction(
    '[countPdt API] load countPdt Success',
    props<{ countPdt: number }>()
);

export const countPdtFailure = createAction(
    '[countPdt API] load countPdt Failure',
    props<{ msg: any }>()
);

// getListSale
export const loadListSale = createAction(
    '[loadListSale API]  loadListSale',
    (userId: string) => ({ userId })

);

export const loadListSaleSuccess = createAction(
    '[loadListSale API]  loadListSale Success',
    props<{ listSales: ConsumerSalesRegistrationModel[] }>()
);

export const loadListSaleFailure = createAction(
    '[loadListSale API]  loadListSale Failure',
    props<{ msg: any }>()
);


// getCntSale
export const countSale = createAction(
    '[countSale API] load countSale',
    (userId: string) => ({ userId })

);

export const countSaleSuccess = createAction(
    '[countSale API] load countSale Success',
    props<{ countSales: number }>()
);

export const countSaleFailure = createAction(
    '[countSale API] load countPdt Failure',
    props<{ msg: any }>()
);

// save
export const save = createAction(
    '[save API] load save',
    props<{ params: any }>()

);

export const saveSuccess = createAction(
    '[save API] load save Success',
    props<{ resultSave: ResultProcessModel }>()
);

export const saveFailure = createAction(
    '[save API] load countPdt Failure',
    props<{ msg: any }>()
);