import {createAction, props} from '@ngrx/store';

import { IzexRes } from 'src/app/models/system/izex.model';

export const addOrUpdatePartner = createAction(
    '[Izex API] addOrUpdatePartner',
    props<{ params: any }>()
);

export const addOrUpdatePartnerSuccess = createAction(
    '[Izex API] addOrUpdatePartnerx Success',
    props<{ izexRes: IzexRes }>()
);

export const addOrUpdatePartnerFailure = createAction(
    '[Izex API] addOrUpdatePartner Failure',
    props<{ msg: any }>()
);