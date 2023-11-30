import {createAction, props} from '@ngrx/store';
import { Bank } from '../../models/system/bank.model'

export const loadBank = createAction(
    '[Bank API] Load Bank',
    (kind: string) => ({ kind })
);

export const loadBankSuccess = createAction(
    '[Bank API] Load Bank Success',
    props<{ banks: Bank[] }>()
);

export const loadBankFailure = createAction(
    '[Bank API] Load Bank Failure',
    props<{ msg: any }>()
);