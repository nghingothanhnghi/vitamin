import { createReducer, on } from '@ngrx/store';

import { OrderPdtModel } from '@app/models/myoffice/order/order-pdt.model';
import { OrderPdtState } from '@app/selectors/myoffice/order/order-product-search.selector';
import { countOrderProductSuccess, searchOrderProductSuccess, sumOrderProductSuccess } from '@app/actions/myoffice/order/order-product-search.action';

export const orderProductSearchFeatureKey = 'orderProductSearch';

export const initialState: OrderPdtState = {
  searchItems: [] as OrderPdtModel[],
  totalItems: 0,
  sumItem: {} as OrderPdtModel,
}

export const orderProductSearchReducer = createReducer(
  initialState,
  on(searchOrderProductSuccess, (state, { ordPdts }) => ({ ...state, searchItems: ordPdts })),
  on(countOrderProductSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumOrderProductSuccess, (state, { ordPdt }) => ({ ...state, sumItem: ordPdt })),
);