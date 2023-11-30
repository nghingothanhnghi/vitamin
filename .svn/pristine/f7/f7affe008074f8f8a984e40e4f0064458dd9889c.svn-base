import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { VerifyService } from "../../services/system/verify.service";
import { verify, verifySuccess, verifyFailure } from "../../actions/system/verify.actions";

@Injectable()
export class VerifyEffect {

  loadVerify$ = createEffect(() => this.actions$.pipe(
      ofType(verify),
      mergeMap(({ params }) => this.verifyService.verify(params)        
        .pipe(
          map(
            res => (verifySuccess({apiResultMember: res})
            )),
          catchError(
            msg => of(verifyFailure ({msg: msg})
            ))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private verifyService: VerifyService
  ) {}
}
