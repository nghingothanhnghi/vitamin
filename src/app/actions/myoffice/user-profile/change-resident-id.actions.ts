import {createAction, props} from '@ngrx/store';
import { ResultProcessModel } from '@models/myoffice/result-process.model'
import { Member } from '@app/models/myoffice/member/member.model';
import { ResultJumin } from '@app/models/myoffice/user-profile/result-jumin.model';
/* updateJumin */
export const updateJuminMem = createAction(
    '[updateJumin API] update updateJumin',
    props<{ params: any }>()
);

export const updateJuminMemSuccess = createAction(
    '[updateJumin API] update updateJumin Success',
    props<{ result: ResultProcessModel }>()
);

export const updateJuminMemFailure = createAction(
    '[updateJumin API] update updateJumin Failure',
    props<{ msg: any }>()
);

/* get Jumnin */
export const getJuminMem = createAction(
    '[getJumin API] get Jumin',
    (userid: string) => ({ userid })
);

export const getJuminMemSuccess = createAction(
    '[getJumin API] get Jumin Success',
    props<{ jumin: Member }>()
);

export const getJuminMemFailure = createAction(
    '[getJumin API] get Jumin Failure',
    props<{ msg: any }>()
);

/* verify Jumnin */
export const verifyJuminMem = createAction(
    '[verifyJuminMem API] verify Jumnin',
    props<{ params: any }>()
);

export const verifyJuminMemSuccess = createAction(
    '[verifyJuminMem API] verify Jumnin Success',
    props<{ resultJumin: ResultJumin }>()
);

export const verifyJuminMemFailure = createAction( 
    '[verifyJuminMem API] verify Jumnin Failure',
    props<{ msg: any }>()
);

export const clearJumnin = createAction( 
    '[clearJumnin API] clear Jumnin',
);

