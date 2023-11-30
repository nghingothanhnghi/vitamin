import {createAction, props} from '@ngrx/store';
import { ResultProc } from '@models/system/result-proc.model'


/* checkMobile */
export const checkMobile = createAction(
    '[CheckMobile API] Load CheckMobile',
    (mobile: string) => ({ mobile })
);

export const checkMobileSuccess = createAction(
    '[CheckMobile API] Load CheckMobile Success',
    props<{ isMobile: Boolean }>()
);

export const checkMobileFailure = createAction(
    '[CheckMobile API] Load CheckMobile Failure',
    props<{ msg: any }>()
);

/* checkEmail */
export const checkEmail = createAction(
    '[CheckEmail API] Load CheckEmail',
    (email: string) => ({ email })
);

export const checkEmailSuccess = createAction(
    '[CheckEmail API] Load CheckEmail Success',
    props<{ isEmail: Boolean }>()
);

export const checkEmailFailure = createAction(
    '[CheckEmail API] Load CheckEmail Failure',
    props<{ msg: any }>()
);

/* save */
export const save = createAction(
    '[Save API] Load Save',
    props<{ params: any }>()
);

export const saveSuccess = createAction(
    '[Save API] Load Save Success',
    props<{ result: ResultProc }>()
);

export const saveFailure = createAction(
    '[Save API] Load Save Failure',
    props<{ msg: any }>()
);

export const clearStateRegis = createAction(
    '[clearStateRegis API] clear StateRegis',
);