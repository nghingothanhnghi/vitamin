import { FaqModel } from "@app/models/myoffice/notice/faq.model";
import { faqSearchFeatureKey } from "@app/reducers/myoffice/notice/faq.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface FaqSearchState {
    searchItems: FaqModel[];
    loadCodes: FaqModel[];
    totalItems: Number;
}
export const getFaqSearchState = createFeatureSelector<FaqSearchState>(faqSearchFeatureKey);

export const getFaqSearchItems = createSelector(
  getFaqSearchState,
  (state: FaqSearchState) => state.searchItems
);

export const getFaqTotalItems = createSelector(
  getFaqSearchState,
  (state: FaqSearchState) => state.totalItems
);
export const getCodes = createSelector(
  getFaqSearchState,
  (state: FaqSearchState) => state.loadCodes
);
