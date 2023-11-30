import { createReducer, on } from '@ngrx/store';

import { BenefitStatmentSearchState } from '@app/selectors/myoffice/benefit/benefit-statement.selector';
import { PayPrintModel } from '@app/models/myoffice/benefit/pay-print.module';
import { OrderHistoryModel } from '@app/models/myoffice/benefit/order-history.module';
import { getMemberInfoSuccess, getSelectDateSuccess, searchFindOrderHistorySuccess, searchFindOrderProductHistorySuccess, searchFindPayHistorySuccess, searchFindPayPrintSuccess, sumFindOrderHistorySuccess, sumFindOrderProductHistorySuccess } from '@app/actions/myoffice/benefit/benefit-statement.action';
import { MemberBenefitModel } from '@app/models/myoffice/benefit/member-benefit.module';

export const benefitStatementSearchFeatureKey = 'benefitStatementSearch';

export const initialState: BenefitStatmentSearchState = {
  selectDateItem: [] as String[],
  searchFindPayPrint : [] as PayPrintModel[],
  searchFindPayHistory :[] as  PayPrintModel[],
  searchFindOrderHistory :[] as OrderHistoryModel[],
  sumFindOrderHistory : {} as OrderHistoryModel,
  searchFindOrderProductHistory : [] as OrderHistoryModel[],
  sumFindOrderProductHistory  : {} as OrderHistoryModel,
  searchMemberInfo :{} as MemberBenefitModel
}

export const benefitStatementSearchReducer = createReducer(
  initialState,
  on(getSelectDateSuccess, (state, { benefit }) => ({ ...state, selectDateItem: benefit })),
  on(searchFindPayPrintSuccess, (state, { benefit }) => ({ ...state, searchFindPayPrint: benefit })),
  on(searchFindPayHistorySuccess, (state, { benefit }) => ({...state, searchFindPayHistory: benefit})),
  on(searchFindOrderHistorySuccess, (state, { benefit }) => ({...state, searchFindOrderHistory: benefit})),
  on(sumFindOrderHistorySuccess, (state, { benefit }) => ({...state, sumFindOrderHistory: benefit})),
  on(searchFindOrderProductHistorySuccess, (state, { benefit }) => ({...state, searchFindOrderProductHistory: benefit})),
  on(sumFindOrderProductHistorySuccess, (state, { benefit }) => ({...state, sumFindOrderProductHistory: benefit})),
  on(getMemberInfoSuccess, (state, { member }) => ({...state, searchMemberInfo: member}))
);