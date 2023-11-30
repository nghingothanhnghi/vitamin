import { CardInstallModel } from "@app/models/shoppingmall/list-card-install.model";
import { PaymentCardResult } from "@app/models/shoppingmall/payment-card-result.model";
import { ResultProc } from "@app/models/system/result-proc.model";
import { createAction, props } from "@ngrx/store";
/* card install */
export const getCardInstall = createAction(
    "[Korpay API] list card install",
);

export const getCardInstallSuccess = createAction(
    "[Korpay API] list card install success",
    props<{ listCardResponse: CardInstallModel }>()
);

export const getCardInstallFailure = createAction(
    "[Korpay API] list card install failure",
    props<{ msg: any }>()
);

/* pay card */
export const payCardKor = createAction(
    "[Korpay API] pay card",
    props<{ params: any }>()
);

export const payCardKorSuccess = createAction(
    "[Korpay API] pay card success",
    props<{ result: ResultProc }>()
);

export const payCardKorFailure = createAction(
    "[Korpay API] pay card failure",
    props<{ msg: any }>()
);