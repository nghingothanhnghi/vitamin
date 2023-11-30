import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CountryModel } from 'src/app/models/system/country.model';
import { countryFeatureKey } from 'src/app/reducers/system/country.reducer';

export interface CountryState {
  countrys: CountryModel[];
}


export const getCountryState = createFeatureSelector<CountryState>(countryFeatureKey);

export const getCountrys = createSelector(
  getCountryState,
  (state: CountryState) => state.countrys
);