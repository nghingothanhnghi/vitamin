import { createReducer, on } from '@ngrx/store';
import { ResultProcessModel } from '@app/models/myoffice/result-process.model';
import { Member } from '@app/models/myoffice/member/member.model';
import { getJuminMemSuccess,updateJuminMemSuccess,verifyJuminMemSuccess, clearJumnin } from '@app/actions/myoffice/user-profile/change-resident-id.actions';
import { ChangeResdentIdState } from '@app/selectors/myoffice/user-profile/change-resident-id.selector';
import { ResultJumin } from '@app/models/myoffice/user-profile/result-jumin.model';



export const changeResidentIdFeatureKey = 'changeResidentId';

export const initialState: ChangeResdentIdState = {
    result: {} as ResultProcessModel,
    jumin:{} as Member,
    resultJumin:{} as ResultJumin
}

export const changeResidentIdReducer = createReducer(
    initialState,
    on( updateJuminMemSuccess, (state, { result }) => ({
        ...state,
        result,
    })),
    on(getJuminMemSuccess, (state, { jumin }) => ({
        ...state,
        jumin,
    })),
    on(verifyJuminMemSuccess, (state, { resultJumin }) => ({
        ...state,
        resultJumin,
    })),
    on( clearJumnin, () => ({
        ...initialState
    }))
)