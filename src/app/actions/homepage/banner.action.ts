import { MyRollingBannerModel } from '@app/models/homepage/my-rolling-banner.module';
import { createAction, props } from '@ngrx/store';


// getBanner
export const getBanner = createAction(
  "[Banner API] get banner",
  props<{ params: any }>()
);

export const getBannerSuccess = createAction(
  "[Banner API] get banner success",
  props<{ banner: MyRollingBannerModel[] }>()
);

export const getBannerFailure = createAction(
  "[Banner API] get banner failure",
  props<{ msg: any }>()
);
