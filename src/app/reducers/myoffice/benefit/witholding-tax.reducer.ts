import { createReducer, on } from '@ngrx/store';

import { WitholdingTaxSearchState } from '@app/selectors/myoffice/benefit/witholding-tax.selector';
import { WitholdingTaxModel } from '@app/models/myoffice/benefit/witholding-tax.module';
import { countWitholdingTaxSuccess, detailWitholdingTaxSuccess, searchWitholdingTaxSuccess, sumDetailWitholdingTaxSuccess, sumWitholdingTaxSuccess, userWitholdingTaxSuccess } from '@app/actions/myoffice/benefit/witholding-tax.action';

export const witholdingTaxSearchFeatureKey = 'witholdingTaxSearch';

export const initialState: WitholdingTaxSearchState = {
  searchItems: [] as WitholdingTaxModel[],
  totalItems: 0,
  sumItem: {} as WitholdingTaxModel,

  searchReportItems : [] as WitholdingTaxModel[],
  sumReportItems : {} as WitholdingTaxModel,
  userReportItems : {} as WitholdingTaxModel,
}

export const witholdingTaxSearchReducer = createReducer(
  initialState,
  on(searchWitholdingTaxSuccess, (state, { benefit }) => ({ ...state, searchItems: benefit })),
  on(countWitholdingTaxSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(sumWitholdingTaxSuccess, (state, { benefit }) => ({...state, sumItem: benefit})),

  on(detailWitholdingTaxSuccess, (state, { benefit }) => ({ ...state, searchReportItems: benefit })),
  on(sumDetailWitholdingTaxSuccess, (state, { benefit }) => ({ ...state, sumReportItems: benefit })),
  on(userWitholdingTaxSuccess, (state, { benefit }) => ({...state, userReportItems: benefit}))
);