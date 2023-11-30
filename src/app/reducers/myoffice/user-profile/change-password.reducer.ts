import { createReducer, on } from '@ngrx/store';
import { ResultProc } from '@models/system/result-proc.model'
import * as changePassWordAction from "@app/actions/myoffice/user-profile/change-password.actions"
import * as changePassWordSelector from '@app/selectors/myoffice/user-profile/change-password.selector'

export const changePassFeatureKey = 'changePass';

export const initialState: changePassWordSelector.ChangePassWordState = {
    encryptpass: '',
    result: {} as ResultProc
}

export const changePassWordReducer = createReducer(
    initialState,
    on( changePassWordAction.encryptPassSuccess, (state, { encryptpass }) => ({
        ...state,
        encryptpass,
    })),
    on(changePassWordAction.updatePassMemSuccess, (state, { result }) => ({
        ...state,
        result,
    })),
)