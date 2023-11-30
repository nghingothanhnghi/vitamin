import { createReducer, on } from '@ngrx/store';

import { CountryState } from "@app/selectors/system/country.selector";
import { CountryModel } from '@app/models/system/country.model';
import { loadCountrysSuccess } from '@app/actions/system/country.action';

export const countryFeatureKey = 'country';

export const initialState: CountryState = {
  countrys: [] as CountryModel[],
}

export const countryReducer = createReducer(
  initialState,
  on(loadCountrysSuccess, (state, { countrys }) => ({
    ...state,
    countrys: countrys
  }))
);