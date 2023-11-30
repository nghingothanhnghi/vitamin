import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ChangeResidentIdService } from "@services/myoffice/user-profile/change-resident-id.service";
import * as jumin from "@actions/myoffice/user-profile/change-resident-id.actions";


@Injectable()
export class ChangeResidentIdEffect {
    constructor(
        private actions$: Actions,
        private changeResidentService: ChangeResidentIdService
      ) { } 
    
      updateJumin$ = createEffect(() => this.actions$.pipe(
        ofType(jumin.updateJuminMem),
        mergeMap(({ params }) => this.changeResidentService.updateJumin(params).pipe(
          map(
            res => (jumin.updateJuminMemSuccess({ result : res })
            )),
          catchError(
            msg => of(jumin.updateJuminMemFailure({ msg: msg })
            ))
        ))
      ));

      getJumin$ = createEffect(() => this.actions$.pipe(
        ofType(jumin.getJuminMem),
        mergeMap((actions) => this.changeResidentService.getJumin(actions.userid)
          .pipe(
            map(
              res => (jumin.getJuminMemSuccess({ jumin: res })
              )),
            catchError(
              msg => of(jumin.getJuminMemFailure({ msg: msg })
              ))
          ))
      )
      );
      verifyJumin$ = createEffect(() => this.actions$.pipe(
        ofType(jumin.verifyJuminMem),
        mergeMap(({ params }) => this.changeResidentService.verifyJumin(params)
          .pipe(
            map(
              res => (jumin.verifyJuminMemSuccess({ resultJumin: res })
              )),
            catchError(
              msg => of(jumin.verifyJuminMemFailure({ msg: msg })
              ))
          ))
      )
      );
}

