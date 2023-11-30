import { createReducer, on } from '@ngrx/store';

import { FaqSearchState } from '@app/selectors/myoffice/notice/faq.selector';
import { FaqModel } from '@app/models/myoffice/notice/faq.model';
import { countFaqSuccess, loadCodesSuccess, searchFaqSuccess } from '@app/actions/myoffice/notice/faq.action';
import { CodeModel } from '@app/models/system/code.model';

export const faqSearchFeatureKey = 'faqSearch';

export const initialState: FaqSearchState = {
  searchItems: [] as FaqModel[],
  loadCodes: [] as FaqModel[],
  totalItems: 0,
}

export const faqSearchReducer = createReducer(
  initialState,
  on(searchFaqSuccess, (state, { faq }) => ({ ...state, searchItems: faq })),
  on(countFaqSuccess, (state, { total }) => ({ ...state, totalItems: total })),
  on(loadCodesSuccess, (state, { codes }) => ({ ...state, loadCodes: codes })),
);