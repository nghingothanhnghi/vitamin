import { createFeatureSelector, createSelector} from '@ngrx/store';
import { izexFeatureKey } from 'src/app/reducers/system/izex.reducer';
import { IzexRes } from '../../models/system/izex.model';

export interface IzexState {
    izexRes: IzexRes;
}

export const getIzexState = createFeatureSelector<IzexState>(izexFeatureKey);

export const addOrUpdatePartner = createSelector(
    getIzexState,
    (state: IzexState) => state.izexRes
);
