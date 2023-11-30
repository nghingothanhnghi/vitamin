import { createReducer, on } from '@ngrx/store';

import { countWitholdingTaxSuccess, searchWitholdingTaxSuccess, sumWitholdingTaxSuccess } from '@app/actions/myoffice/benefit/witholding-tax.action';
import { BannerSearchState } from '@app/selectors/homepage/banner.selector';
import { MyRollingBannerModel } from '@app/models/homepage/my-rolling-banner.module';
import { getBannerSuccess } from '@app/actions/homepage/banner.action';

export const bannerSearchFeatureKey = 'bannerSearch';

export const initialState: BannerSearchState = {
    banner: [] as MyRollingBannerModel[],
}

export const bannerSearchReducer = createReducer(
  initialState,
  on(getBannerSuccess, (state, { banner }) => ({ ...state, banner: banner })),
);