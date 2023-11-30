import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { getBanner, getBannerFailure, getBannerSuccess } from '@app/actions/homepage/banner.action';
import { BannerService } from '@app/services/homepage/banner.service';

@Injectable()
export class BannerEffect {

  constructor(
    private _actions$: Actions,
    private bannerService: BannerService
  ) { }

    loadBanner$ = createEffect(() => this._actions$.pipe(
        ofType(getBanner),
        mergeMap(({params}) => this.bannerService.getBanner(params).pipe(
        map(res => getBannerSuccess({ banner: res })),
        catchError(res => of(getBannerFailure({ msg: res })))
        ))
    ));
}