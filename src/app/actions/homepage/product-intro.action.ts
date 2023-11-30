import { OrdPdtModel } from '@app/models/shoppingmall/order-pdt.model';
import { createAction, props } from '@ngrx/store';

export const loadProductIntro = createAction(
  "[Product API] load product intro",
  props<{ params: any }>()
);

export const loadProductIntroSuccess = createAction(
  "[Product API] load product intro success",
  props<{ pdts: OrdPdtModel[] }>()
);

export const loadProductIntroFailure = createAction(
  "[Product API] load product intro failure",
  props<{ msg: any }>()
);