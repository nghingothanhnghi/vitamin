import { createAction, props } from '@ngrx/store';
import { KICCCardModel } from '@app/models/shoppingmall/kicc-card.model';

export const payCard = createAction(
  "[KICC API] pay card",
  props<{ params: any }>()
);

export const payCardSuccess = createAction(
  "[KICC API] pay card success",
  props<{ cardResponse: KICCCardModel }>()
);

export const payCardFailure = createAction(
  "[KICC API] pay card failure",
  props<{ msg: any }>()
);

export const setCardResult = createAction(
  "[KICC Card Result] set card result",
  props<{ cardResult: KICCCardModel }>()
);