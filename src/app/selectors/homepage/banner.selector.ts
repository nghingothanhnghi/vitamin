import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MyRollingBannerModel } from '@app/models/homepage/my-rolling-banner.module';
import { bannerSearchFeatureKey } from '@app/reducers/homepage/banner.reducer';

export interface BannerSearchState {
  banner: MyRollingBannerModel[];
}

export const getBannerSearchState = createFeatureSelector<BannerSearchState>(bannerSearchFeatureKey);


export const loadBannerSearchItems = createSelector(
    getBannerSearchState,
  (state: BannerSearchState) => state.banner
);

