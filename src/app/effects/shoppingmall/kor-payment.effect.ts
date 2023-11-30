import { Injectable } from "@angular/core";
import { payCardFailure } from "@app/actions/shoppingmall/kicc-payment.action";
import { getCardInstall, getCardInstallFailure, getCardInstallSuccess, payCardKor, payCardKorFailure, payCardKorSuccess } from "@app/actions/shoppingmall/kor-payment.action";
import { KorPaymentService } from "@app/services/shoppingmall/kor-payment.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class KorPaymentEffect {
    constructor(
        private _actions$: Actions,
        private korPaymentService: KorPaymentService
      ) { }

    listCard$ = createEffect(() => this._actions$.pipe(
        ofType(getCardInstall),
        mergeMap(() => this.korPaymentService.getCardInstall().pipe(
            map(res => getCardInstallSuccess({listCardResponse: res})),
            catchError(res => of(getCardInstallFailure({msg: res})))
        ))
    ));

    payCard$ = createEffect(() => this._actions$.pipe(
        ofType(payCardKor),
        mergeMap(({params}) => this.korPaymentService.payCard(params).pipe(
            map(res => payCardKorSuccess({result: res})),
            catchError(res => of(payCardKorFailure({msg: res})))
        ))
    ));
}