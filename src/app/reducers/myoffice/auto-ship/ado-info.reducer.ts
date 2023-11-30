import { loadAdoByAdoNoSuccess, loadAdoPdtByAdoNoSuccess, setAdoInfo, setAdoPdts } from "@app/actions/myoffice/auto-ship/ado-info.action";
import { ADORegisterModel } from "@app/models/myoffice/auto-ship/ado-register.model";
import { ADOInfoState } from "@app/selectors/myoffice/auto-ship/ado-info.selector";
import { createReducer, on } from "@ngrx/store";

export const adoInfoFeatureKey = 'adoInfo';

export const initialState: ADOInfoState = {
  adoInfo: {} as ADORegisterModel,
  pdts: [],
}

export const adoInfoReducer = createReducer(
  initialState,
  on(loadAdoByAdoNoSuccess, (state, { ado }) => ({ ...state, adoInfo: ado })),
  on(loadAdoPdtByAdoNoSuccess, (state, { pdts }) => ({ ...state, pdts: pdts })),
  on(setAdoInfo, (state, { data }) => ({ ...state, adoInfo: data })),
  on(setAdoPdts, (state, { pdts }) => ({ ...state, pdts: pdts })),
);