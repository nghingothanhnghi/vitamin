import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PayPrintModel } from '@app/models/myoffice/benefit/pay-print.module';
import { OrderHistoryModel } from '@app/models/myoffice/benefit/order-history.module';
import { benefitStatementSearchFeatureKey } from '@app/reducers/myoffice/benefit/benefit-statement.reducer';
import { MemberBenefitModel } from '@app/models/myoffice/benefit/member-benefit.module';

export interface BenefitStatmentSearchState {
  selectDateItem: String[];
  searchFindPayPrint : PayPrintModel[];
  searchFindPayHistory : PayPrintModel[];
  searchFindOrderHistory : OrderHistoryModel[];
  sumFindOrderHistory : OrderHistoryModel;
  searchFindOrderProductHistory : OrderHistoryModel[];
  sumFindOrderProductHistory : OrderHistoryModel;
  searchMemberInfo : MemberBenefitModel
}

export const getBenefitStatementSearchState = createFeatureSelector<BenefitStatmentSearchState>(benefitStatementSearchFeatureKey);

//find-days
export const getSelectDateItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.selectDateItem
);

//grid-pay-print
export const searchFindPayPrintItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.searchFindPayPrint
);

 // grid-pay-history
export const searchFindPayHistoryItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.searchFindPayHistory
);

//grid-order-history
export const searchFindOrderHistoryItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.searchFindOrderHistory
);

export const sumFindOrderHistoryItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.sumFindOrderHistory
);

 //grid-order-product-history
export const searchFindOrderProductHistoryItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.searchFindOrderProductHistory
);

export const sumFindOrderProductHistoryItem = createSelector(
    getBenefitStatementSearchState,
  (state: BenefitStatmentSearchState) => state.sumFindOrderProductHistory
);

//member-info
export const getMemberInfoItem = createSelector(
  getBenefitStatementSearchState,
(state: BenefitStatmentSearchState) => state.searchMemberInfo
);