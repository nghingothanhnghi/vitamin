import { PaymentBankModel } from '@app/models/shoppingmall/payment-bank.model';
import { createAction, props } from '@ngrx/store';

export const loadPaymentBanks = createAction("[Order Register API] load payment banks");

export const loadPaymentBanksSuccess = createAction(
  "[Order Register API] load payment banks success",
  props<{ banks: PaymentBankModel[] }>()
);

export const loadPaymentBanksFailure = createAction(
  "[Order Register API] load payment banks failure",
  props<{ msg: any }>()
);