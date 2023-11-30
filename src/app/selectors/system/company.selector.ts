import { createFeatureSelector, createSelector} from '@ngrx/store';
import { companyFeatureKey } from 'src/app/reducers/system/company.reducer';
import { Company } from '../../models/system/company.model';

export interface CompanyState {
    company: Company;
}

//export const getCompanyState = (state: CompanyState) => state;
export const getCompanyState = createFeatureSelector<CompanyState>(companyFeatureKey);

export const getCompany = createSelector(
    getCompanyState,
    (state: CompanyState) => state.company
);

export const getCompanyName = createSelector(
    getCompanyState,
    (state: CompanyState) => state.company.comName
);