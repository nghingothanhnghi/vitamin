import { createFeatureSelector, createSelector} from '@ngrx/store';
import { bankFeatureKey } from 'src/app/reducers/system/bank.reducer';
import { Bank } from '../../models/system/bank.model';

export interface BankState {
    banks: Bank[];
}

export const getBankState = createFeatureSelector<BankState>(bankFeatureKey);

export const getBank = createSelector(
    getBankState,
    (state: BankState) => state.banks
);
