
import { getCardInstallSuccess, payCardKorSuccess } from "@app/actions/shoppingmall/kor-payment.action";
import { CardInstallModel } from "@app/models/shoppingmall/list-card-install.model";
import { PaymentCardResult } from "@app/models/shoppingmall/payment-card-result.model";
import { ResultProc } from "@app/models/system/result-proc.model";
import { KorPaymentState } from "@app/selectors/shoppingmall/kor-payment.selector";
import { createReducer, on} from "@ngrx/store";

export const korPaymentFeatureKey = "korPayment";

export const initialState: KorPaymentState = {
    listCardResult: {} as CardInstallModel,
    payCardResult: {} as PaymentCardResult,
    resultIns: {} as ResultProc
}

export const korPaymentReducer = createReducer (
    initialState,
    on(getCardInstallSuccess, (state, { listCardResponse }) => ({ ...state, listCardResult: listCardResponse })),
    on(payCardKorSuccess, (state, { result }) => ({ ...state, resultIns: result })),
)