import { createReducer, on } from '@ngrx/store';
import { Bank } from '../../models/system/bank.model';
import { loadBankSuccess } from '../../actions/system/bank.actions'
import { BankState } from '../../selectors/system/bank.selector'

export const bankFeatureKey = 'bank';

export const initialBank : BankState = {
    banks: [] as Bank[]
};

export const bankReducer = createReducer(
    initialBank,
    on( loadBankSuccess, (state, { banks }) => ({
        ...state,
        banks,
    }))
);