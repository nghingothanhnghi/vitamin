import { createReducer, on } from '@ngrx/store';
import { Company } from '../../models/system/company.model';
import { loadCompanySuccess } from '../../actions/system/company.actions'
import { CompanyState } from '../../selectors/system/company.selector'

export const companyFeatureKey = 'company';

export const initialCompany : CompanyState = {
    company: {} as Company
};

export const companyReducer = createReducer(
    initialCompany,
    on( loadCompanySuccess, (state, { company }) => ({
        ...state,
        company,
    }))
);