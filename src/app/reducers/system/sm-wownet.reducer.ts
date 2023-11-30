import { createReducer, on } from '@ngrx/store';

import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { SmWownetState } from '@app/selectors/system/sm-wownet.selector';
import { loadSmWownetSuccess, loadSmWownetConfigSuccess, loadSmWownetPgSuccess, loadFindPayHeaderSuccess, loadWowWordSuccess } from '@app/actions/system/sm-wownet.action';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';


export const smWownetFeatureKey = 'smWownet';

export const initialState: SmWownetState = {
  smWownet: {} as SmWownetModel,
  smWownetConfig: {} as SmWownetConfigModel,
  smWownetPg: {} as SmWownetPgModel,
  payHeader : {} as SmPayHeaderModel,
  wowWord : {} as WownetWordModel
}

export const smWownetReducer = createReducer(
  initialState,
  on(loadSmWownetSuccess, (state, { item }) => ({...state, smWownet: item})),
  on(loadSmWownetConfigSuccess, (state, { item }) => ({...state, smWownetConfig: item})),
  on(loadSmWownetPgSuccess, (state, { item }) => ({...state, smWownetPg: item})),
  on(loadFindPayHeaderSuccess, (state, { item }) => ({...state, payHeader: item})),
  on(loadWowWordSuccess, (state, { item }) => ({...state, wowWord: item})),
);