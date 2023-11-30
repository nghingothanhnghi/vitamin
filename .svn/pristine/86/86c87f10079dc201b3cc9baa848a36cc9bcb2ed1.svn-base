import { createAction, props } from '@ngrx/store';
import { PaymentCardResult } from '@app/models/shoppingmall/payment-card-result.model';

// payment VBank
export const payVBank = createAction(
  "[Settle API] pay payVBank",
  props<{ params: any }>()
);

export const payVBankSuccess = createAction(
  "[Settle API] pay payVBankSuccess success",
  props<{ cardResponse: PaymentCardResult }>()
);

export const payVBankFailure = createAction(
  "[Settle API] pay payVBankFailure failure",
  props<{ msg: any }>()
);

export const setVBankResult = createAction(
  "[Settle Card Result] set vBank result",
  props<{ cardResult: PaymentCardResult }>()
);