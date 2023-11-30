import {createAction, props} from '@ngrx/store';
import { Company } from '../../models/system/company.model'



export const loadCompany = createAction(
    '[Company API] Load Company'
);

export const loadCompanySuccess = createAction(
    '[Company API] Load Company Success',
    props<{ company: Company }>()
);

export const loadCompanyFailure = createAction(
    '[Company API] Load Company Failure',
    props<{ msg: any }>()
);