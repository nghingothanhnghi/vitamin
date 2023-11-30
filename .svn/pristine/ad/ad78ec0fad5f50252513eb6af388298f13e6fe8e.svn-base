import {createAction, props} from '@ngrx/store';

import { CountryModel } from 'src/app/models/system/country.model';

export const loadCountrys = createAction(
    '[Country API] Load Country'
);

export const loadCountrysSuccess = createAction(
    '[Country API] Load Country Success',
    props<{ countrys: CountryModel[] }>()
);

export const loadCountrysFailure = createAction(
    '[Country API] Load Country Failure',
    props<{ msg: any }>()
);