import {createAction, props} from '@ngrx/store';
import { ApiResultMember } from '../../models/system/api-result-member.model'



export const verify = createAction(
    '[Verify API] Verify',
    props<{ params: any }>()
);

export const clearResVerify = createAction(
    '[clearResVerify API] clearResVerify',
);

export const verifySuccess = createAction(
    '[Verify API] Verify Success',
    props<{ apiResultMember: ApiResultMember }>()
);

export const verifyFailure = createAction(
    '[Verify API] Verify Failure',
    props<{ msg: any }>()
);