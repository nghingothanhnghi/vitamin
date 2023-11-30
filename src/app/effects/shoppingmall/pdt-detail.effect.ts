import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PdtDetailService } from '@app/services/shoppingmall/pdt-detail.service';
import { 
  loadPdtImages,
  loadPdtImagesFailure, 
  loadPdtImagesSuccess, 
  loadPdtInfo, 
  loadPdtInfoFailure, 
  loadPdtInfoSuccess, 
  loadPdtNotify, 
  loadPdtNotifyFailure, 
  loadPdtNotifySuccess,
  loadPdtInfosByCateCd,
  loadPdtInfosByCateCdFailure,
  loadPdtInfosByCateCdSuccess
} from '@app/actions/shoppingmall/pdt-detail.action';

@Injectable()
export class PdtDetailEffect {

  constructor(
    private _actions$: Actions,
    private pdtDetailService: PdtDetailService
  ) { }

 loadSmWownet$ = createEffect(() => this._actions$.pipe(
    ofType(loadPdtInfo),
    mergeMap(({ pdtCd }) => this.pdtDetailService.loadPdtDetail(pdtCd).pipe(
      map(res => loadPdtInfoSuccess({ item: res })),
      catchError(res => of(loadPdtInfoFailure({ msg: res })))
    ))
  ));

  loadPdtImages$ = createEffect(() => this._actions$.pipe(
    ofType(loadPdtImages),
    mergeMap(({ pdtCd, pathKind }) => this.pdtDetailService.loadPdtImages(pdtCd, pathKind).pipe(
      map(res => loadPdtImagesSuccess({ items: res })),
      catchError(res => of(loadPdtImagesFailure({ msg: res })))
    ))
  ));

  loadPdtNotify$ = createEffect(() => this._actions$.pipe(
    ofType(loadPdtNotify),
    mergeMap(({ pdtCd }) => this.pdtDetailService.loadPdtNotify(pdtCd).pipe(
      map(res => loadPdtNotifySuccess({ items: res })),
      catchError(res => of(loadPdtNotifyFailure({ msg: res })))
    ))
  ));
  loadPdtInfosByCateCd$ = createEffect(() => this._actions$.pipe(
    ofType(loadPdtInfosByCateCd),
    mergeMap((action) => this.pdtDetailService.getPdtInfosByCateCd(action.catecd, action.rowNum, action.prdCd, action.pathKind).pipe(
      map(res => loadPdtInfosByCateCdSuccess({ relatedProducts: res })),
      catchError(res => of(loadPdtInfosByCateCdFailure({ msg: res })))
    ))
  ));
}