import { loadListAdoSuccess, loadTotalAdoSuccess } from "@app/actions/myoffice/auto-ship/ado-popup.action";
import { ADOPopupState } from "@app/selectors/myoffice/auto-ship/ado-popup.selector";
import { createReducer, on } from "@ngrx/store";

export const adoPopupFeatureKey = 'adoPopup';

export const initialState: ADOPopupState = {
  listAdo: [],
  totalAdo: 0,
}

export const adoPopupReducer = createReducer(
  initialState,
  on(loadListAdoSuccess, (state, { items }) => ({ ...state, listAdo: items })),
  on(loadTotalAdoSuccess, (state, { total }) => ({ ...state, totalAdo: total }))
);