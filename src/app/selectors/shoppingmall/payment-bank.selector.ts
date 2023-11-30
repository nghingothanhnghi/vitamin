import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentBankModel } from '@app/models/shoppingmall/payment-bank.model';
import { paymentBankFeatureKey } from '@app/reducers/shoppingmall/payment-bank.reducer';

export interface PaymentBankState {
  paymentBanks: PaymentBankModel[];
}

export const getPaymentBankState = createFeatureSelector<PaymentBankState>(paymentBankFeatureKey);

export const getPaymentBanks = createSelector(
  getPaymentBankState,
  (state: PaymentBankState) => state.paymentBanks
);