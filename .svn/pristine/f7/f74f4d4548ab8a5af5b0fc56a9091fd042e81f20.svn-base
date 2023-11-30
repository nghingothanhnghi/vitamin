import { createReducer, on } from "@ngrx/store";

import { CenterInfoModel } from "@app/models/shoppingmall/center-info.model";
import { CenterInfoState } from "@app/selectors/shoppingmall/center-info.selector";
import { loadCenterInfoSuccess } from "@app/actions/shoppingmall/center-info.action";

export const centerInfoFeatureKey = "centerInfo";

export const initialState: CenterInfoState = {
  center: {} as CenterInfoModel,
}

export const centerInfoReducer = createReducer(
  initialState,
  on(loadCenterInfoSuccess, (state, { center }) => ({ ...state, center }))
);