import { CardInstallModel } from "@app/models/shoppingmall/list-card-install.model";
import { PaymentCardResult } from "@app/models/shoppingmall/payment-card-result.model";
import { ResultProc } from "@app/models/system/result-proc.model";
import { korPaymentFeatureKey } from "@app/reducers/shoppingmall/kor-payment.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface KorPaymentState {
    listCardResult: CardInstallModel,
    payCardResult: PaymentCardResult,
    resultIns: ResultProc
}

export const getKorPaymentState = createFeatureSelector<KorPaymentState>(korPaymentFeatureKey);

export const getListCardInstallResult = createSelector(
    getKorPaymentState,
    (state: KorPaymentState) => state.listCardResult
);

export const payCardResult = createSelector(
    getKorPaymentState,
    (state: KorPaymentState) => state.resultIns
);