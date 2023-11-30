import { createAction, props } from '@ngrx/store';
import { PdtDetailModel } from '@app/models/shoppingmall/pdt-detail.model';

// pdt detail
export const loadPdtInfo = createAction(
  "[Product API] load pdt info",
  props<{ pdtCd: string }>()
);

export const loadPdtInfoSuccess = createAction(
  "[Product API] load pdt info success",
  props<{ item: PdtDetailModel }>()
);

export const loadPdtInfoFailure = createAction(
  "[Product API] load pdt info failure",
  props<{ msg: any }>()
);

// pdt image
export const loadPdtImages = createAction(
  "[Product API] load pdt images",
  props<{ pdtCd: string, pathKind: string }>()
);

export const loadPdtImagesSuccess = createAction(
  "[Product API] load pdt images success",
  props<{ items: PdtDetailModel[] }>()
);

export const loadPdtImagesFailure = createAction(
  "[Product API] load pdt images failure",
  props<{ msg: any }>()
);

// pdt notify
export const loadPdtNotify = createAction(
  "[Product API] load pdt notify",
  props<{ pdtCd: string }>()
);

export const loadPdtNotifySuccess = createAction(
  "[Product API] load pdt notify success",
  props<{ items: PdtDetailModel[] }>()
);

export const loadPdtNotifyFailure = createAction(
  "[Product API] load pdt notify failure",
  props<{ msg: any }>()
);

// getPdtInfosByCateCd
export const loadPdtInfosByCateCd = createAction(
  "[Product API] loadPdtInfosByCateCd",
  (catecd: string, rowNum: string, prdCd: string, pathKind: string) => ({ catecd, rowNum, prdCd, pathKind })
);

export const loadPdtInfosByCateCdSuccess = createAction(
  "[Product API] loadPdtInfosByCateCd success",
  props<{ relatedProducts: PdtDetailModel[] }>()
);

export const loadPdtInfosByCateCdFailure = createAction(
  "[Product API] loadPdtInfosByCateCd failure",
  props<{ msg: any }>()
);


// set product name main heading
export const setProductNameMainHeading = createAction(
  "[Product Detail] set product name main heading",
  props<{ heading: string }>()
);

// clear product detail state
export const clearProductDetailState = createAction("[Product Detail] clear product detail state");