import { SmWownetModel } from '@app/models/system/sm-wownet.model';
import {createAction, props} from '@ngrx/store';
import { SmWownetConfigModel } from '@app/models/system/sm-wownet-config.model';
import { SmWownetPgModel } from '@app/models/system/sm-wownet-pg.model';
import { SmPayHeaderModel } from '@app/models/system/sm-pay-header.model';
import { WownetWordModel } from '@app/models/system/wownet-word.model';

export const loadSmWownet = createAction(
  "[Sm Wownet API] load sm wownet"
);

export const loadSmWownetSuccess = createAction(
  "[Sm Wownet API] load sm wownet success",
  props<{ item: SmWownetModel }>()
);

export const loadSmWownetFailure = createAction(
  "[Sm Wownet API] load sm wownet failure",
  props<{ msg: any }>()
);

/* Config */
export const loadSmWownetConfig = createAction(
  "[Sm Wownet Config API] load sm wownet Config"
);

export const loadSmWownetConfigSuccess = createAction(
  "[Sm Wownet Config API] load sm wownet Config success",
  props<{ item: SmWownetConfigModel }>()
);

export const loadSmWownetConfigFailure = createAction(
  "[Sm Wownet Config API] load sm wownet Config failure",
  props<{ msg: any }>()
);

/* PG */
export const loadSmWownetPg = createAction(
  "[Sm Wownet Pg API] load sm wownet Pg"
);

export const loadSmWownetPgSuccess = createAction(
  "[Sm Wownet Pg API] load sm wownet Pg success",
  props<{ item: SmWownetPgModel }>()
);

export const loadSmWownetPgFailure = createAction(
  "[Sm Wownet Pg API] load sm wownet Pg failure",
  props<{ msg: any }>()
);

/* loadFindPayHeader */
export const loadFindPayHeader = createAction(
  "[Sm Wownet Pg API] load pay header sm wownet"
);

export const loadFindPayHeaderSuccess = createAction(
  "[Sm Wownet Pg API] load pay header sm wownet success",
  props<{ item: SmPayHeaderModel }>()
);

export const loadFindPayHeaderFailure = createAction(
  "[Sm Wownet Pg API] load pay header sm wownet failure",
  props<{ msg: any }>()
);

/* loadWowWord */
export const loadWowWord = createAction(
  "[Sm Wownet Pg API] load wow word"
);

export const loadWowWordSuccess = createAction(
  "[Sm Wownet Pg API] load wow word success",
  props<{ item: WownetWordModel }>()
);

export const loadWowWordFailure = createAction(
  "[Sm Wownet Pg API] load wow word failure",
  props<{ msg: any }>()
);