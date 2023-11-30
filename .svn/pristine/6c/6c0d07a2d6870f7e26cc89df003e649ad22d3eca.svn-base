import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductIntroService } from '@app/services/homepage/product-intro.service';
import { loadProductIntro, loadProductIntroFailure, loadProductIntroSuccess } from '@app/actions/homepage/product-intro.action';


@Injectable()
export class ProductIntroEffect {

  constructor(
    private _actions$: Actions,
    private productIntroService: ProductIntroService
  ) { }

  loadProductIntro$ = createEffect(() => this._actions$.pipe(
    ofType(loadProductIntro),
    mergeMap(({ params }) => this.productIntroService.loadProductIntro(params).pipe(
      map(res => loadProductIntroSuccess({ pdts: res })),
      catchError(res => of(loadProductIntroFailure({ msg: res }))
    )))
  ));
}