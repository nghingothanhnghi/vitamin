import { countOrderMonthlySuccess, searchOrderMonthlySuccess, sumOrderMonthlySuccess } from '@app/actions/myoffice/order/monthly-order-count.action';
import { OrderMonthlyModel } from '@app/models/myoffice/order/order-monthly.model';
import { MonthlyOrderCountState } from '@app/selectors/myoffice/order/monthly-order-count.selector';
import { createReducer, on } from '@ngrx/store';

export const monthlyOrderCountFeatureKey = 'monthlyOrderCount';

export const initialState: MonthlyOrderCountState = {
  searchItems: [] as OrderMonthlyModel[],
  totalItem: 0,
  sumItem: {} as OrderMonthlyModel,
}

export const monthlyOrderCountReducer = createReducer(
  initialState,
  on(searchOrderMonthlySuccess, (state, { orderItems }) => ({...state, searchItems: orderItems})),
  on(countOrderMonthlySuccess, (state, { total }) => ({...state, totalItem: total})),
  on(sumOrderMonthlySuccess, (state, { orderSum }) => ({...state, sumItem: orderSum})),
);