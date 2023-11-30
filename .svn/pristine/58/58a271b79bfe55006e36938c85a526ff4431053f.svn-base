import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';

import { smWownetFeatureKey } from '@app/reducers/system/sm-wownet.reducer';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';

export interface SmWownetState {
  smWownet: SmWownetModel;
  smWownetConfig: SmWownetConfigModel;
  smWownetPg: SmWownetPgModel;
  payHeader : SmPayHeaderModel;
  wowWord : WownetWordModel;
}

export const getSmWownetState = createFeatureSelector<SmWownetState>(smWownetFeatureKey);

export const getSmWownet = createSelector(
  getSmWownetState, 
  (state: SmWownetState) => state.smWownet
);
export const getSmWownetConfig = createSelector(
  getSmWownetState, 
  (state: SmWownetState) => state.smWownetConfig
);
export const getSmWownetPg = createSelector(
  getSmWownetState, 
  (state: SmWownetState) => state.smWownetPg
);

export const getFindPayHeader = createSelector(
  getSmWownetState, 
  (state: SmWownetState) => state.payHeader
);

export const getWowWord = createSelector(
  getSmWownetState, 
  (state: SmWownetState) => state.wowWord
);
