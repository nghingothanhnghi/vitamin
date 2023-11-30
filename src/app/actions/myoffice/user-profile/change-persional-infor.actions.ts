import {createAction, props} from '@ngrx/store';
import { ResultProc } from '@models/system/result-proc.model'

/* update */
export const updatePerInfo = createAction(
    '[UpdatePerInfo API] Load UpdatePerInfo',
    props<{ params: any }>()
);

export const updatePerInfoSuccess = createAction(
    '[UpdatePerInfo API] Load UpdatePerInfo Success',
    props<{ result: ResultProc }>()
);

export const updatePerInfoFailure = createAction(
    '[UpdatePerInfo API] Load UpdatePerInfo Failure',
    props<{ msg: any }>()
);

/* checkNickName */
export const checkNickName = createAction(
    '[CheckNickName API] Load CheckNickName',
    props<{ userid: string; nickname: string }>()
);

export const checkNickNameSuccess = createAction(
    '[CheckNickName API] Load CheckNickName Success',
    props<{ isNickName: Boolean }>()
);

export const checkNickNameFailure = createAction(
    '[CheckNickName API] Load CheckNickName Failure',
    props<{ msg: any }>()
);