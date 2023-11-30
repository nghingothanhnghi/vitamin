import { createReducer, on } from '@ngrx/store';
import { ResultProc } from '@models/system/result-proc.model'
import * as changePerInforAction from "@app/actions/myoffice/user-profile/change-persional-infor.actions"
import * as changePerInforSelector from '@app/selectors/myoffice/user-profile/change-persional-information.selector'

export const changePerInforFeatureKey = 'changePerInfor';

export const initialState: changePerInforSelector.ChangePerInforState = {
    result: {} as ResultProc,
    isNickName: new Boolean
}

export const changePerInforReducer = createReducer(
    initialState,
    on(changePerInforAction.updatePerInfoSuccess, (state, { result }) => ({
        ...state,
        result,
    })),

    on( changePerInforAction.checkNickNameSuccess, (state, { isNickName }) => ({
        ...state,
        isNickName,
    })),
	
)