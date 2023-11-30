import { createReducer, on } from '@ngrx/store';

import { OrderSearchState } from '@app/selectors/myoffice/order/order-search.selector';
import { OrderMstModel } from '@app/models/myoffice/order/order-mst.model';
import { countOrderSuccess, searchOrderSuccess, sumOrderSuccess } from '@app/actions/myoffice/order/order-search.action';

export const orderSearchFeatureKey = 'orderSearch';

export const initialState: OrderSearchState = {
  searchItems: [] as OrderMstModel[],
  totalItems: 0,
  sumItem: {} as OrderMstModel,
}

export const orderSearchReducer = createReducer(
  initialState,
  on(searchOrderSuccess, (state, { orders }) => ({ ...state, searchItems: orders })),
  on(countOrderSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumOrderSuccess, (state, { order }) => ({...state, sumItem: order}))
);