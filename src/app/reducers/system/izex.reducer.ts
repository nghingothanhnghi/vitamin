import { createReducer, on } from '@ngrx/store';
import { IzexRes } from '../../models/system/izex.model';
import { addOrUpdatePartnerSuccess } from '../../actions/system/izex.action'
import { IzexState } from '../../selectors/system/izex.selector'

export const izexFeatureKey = 'izex';

export const initialIzex : IzexState = {
    izexRes: {} as IzexRes
};

export const izexReducer = createReducer(
    initialIzex,
    on( addOrUpdatePartnerSuccess, (state, { izexRes }) => ({
        ...state,
        izexRes,
    }))
);