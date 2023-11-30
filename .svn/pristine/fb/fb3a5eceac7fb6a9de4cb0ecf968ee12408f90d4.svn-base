import { createReducer, on } from '@ngrx/store';

import { ProductIntroState } from "@app/selectors/homepage/product-intro.selector";
import { loadProductIntroSuccess } from '@app/actions/homepage/product-intro.action';

export const productIntroFeatureKey = 'productIntro';

export const initialState: ProductIntroState = {
  products: [],
}

export const productIntroReducer = createReducer(
  initialState,
  on(loadProductIntroSuccess, (state, { pdts }) => ({ ...state, products: pdts }))
);