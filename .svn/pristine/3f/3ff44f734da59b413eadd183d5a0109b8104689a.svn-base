import { createReducer, on } from "@ngrx/store";

import { PdtDetailState } from "@app/selectors/shoppingmall/pdt-detail.selector";
import { PdtDetailModel } from "@app/models/shoppingmall/pdt-detail.model";
import { clearProductDetailState, loadPdtImagesSuccess, loadPdtInfosByCateCdSuccess, loadPdtInfoSuccess, loadPdtNotifySuccess, setProductNameMainHeading } from "@app/actions/shoppingmall/pdt-detail.action";

export const pdtDetailFeatureKey = "pdtDetail";

export const initialState: PdtDetailState = {
  info: {} as PdtDetailModel,
  images: [] as PdtDetailModel[],
  notify: [] as PdtDetailModel[],
  relatedProducts: [] as PdtDetailModel[],
  heading: "",
}

export const pdtDetailReducer = createReducer(
  initialState,
  on(loadPdtInfoSuccess, (state, { item }) => ({ ...state, info: item })),
  on(loadPdtImagesSuccess, (state, { items }) => ({ ...state, images: items })),
  on(loadPdtInfosByCateCdSuccess, (state, { relatedProducts }) => ({ ...state, relatedProducts: relatedProducts })),
  on(loadPdtNotifySuccess, (state, { items }) => ({ ...state, notify: items })),
  on(setProductNameMainHeading, (state, { heading }) => ({ ...state, heading: heading })),
  on(clearProductDetailState, () => ({
    info: {} as PdtDetailModel,
    images: [] as PdtDetailModel[],
    notify: [] as PdtDetailModel[],
    relatedProducts: [] as PdtDetailModel[],
    heading: ""
  }))
);