import {createAction, props} from '@ngrx/store';
import { Member } from '@models/myoffice/member/member.model'




/* findBox */
export const findBox = createAction(
    '[FindBox API] Load FindBox',
    props<{ params: any }>()
);

export const findBoxSuccess = createAction(
    '[FindBox API] Load FindBox Success',
    props<{ members: Member[] }>()
);

export const findBoxFailure = createAction(
    '[FindBox API] Load FindBox Failure',
    props<{ msg: any }>()
);

export const clearBox = createAction(
    '[clearBox API] Load clearBox Failure'
);

/* getInfoMemImage */
export const getInfoMemImage = createAction(
    '[FindBox API] Load info mem image',
    props<{ params: any }>()
);

export const getInfoMemImageSuccess = createAction(
    '[FindBox API] Load info mem image Success',
    props<{ memberImage: Member }>()
);

export const getInfoMemImageFailure = createAction(
    '[FindBox API] Load info mem image Failure',
    props<{ msg: any }>()
);

