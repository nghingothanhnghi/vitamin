import {createAction, props} from '@ngrx/store';
import { ResultProc } from '@models/system/result-proc.model'

/* EncryptPass */
export const encryptPass = createAction(
    '[EncryptPass API] Load EncryptPass',
    props<{ params: any }>()
);

export const encryptPassSuccess = createAction(
    '[EncryptPass API] Load EncryptPass Success',
    props<{ encryptpass: string }>()
);

export const encryptPassFailure = createAction(
    '[EncryptPass API] Load EncryptPass Failure',
    props<{ msg: any }>()
);

/* update */
export const updatePassMem = createAction(
    '[UpdatePass API] Load UpdatePass',
    props<{ params: any }>()
);

export const updatePassMemSuccess = createAction(
    '[UpdatePass API] Load UpdatePass Success',
    props<{ result: ResultProc }>()
);

export const updatePassMemFailure = createAction(
    '[UpdatePass API] Load UpdatePass Failure',
    props<{ msg: any }>()
);