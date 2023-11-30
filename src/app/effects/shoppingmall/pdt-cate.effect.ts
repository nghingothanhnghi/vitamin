import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { PdtCateService } from '@app/services/shoppingmall/pdt-cate.service';
import { loadPdtCate, loadPdtCateFailure, loadPdtCateSuccess } from '@app/actions/shoppingmall/pdt-cate.action';

@Injectable()
export class PdtCateEffect {

  constructor(
    private _actions$: Actions,
    private pdtCateService: PdtCateService
  ) { }

 loadSmWownet$ = createEffect(() => this._actions$.pipe(
    ofType(loadPdtCate),
    mergeMap(({ key }) => this.pdtCateService.loadPdtCate(key).pipe(
      map(res => loadPdtCateSuccess({ items: res })),
      catchError(res => of(loadPdtCateFailure({ msg: res })))
    ))
  ));
}