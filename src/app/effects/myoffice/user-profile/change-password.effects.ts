import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ChangePassWordService } from "@services/myoffice/user-profile/change-password.service";
import * as changePassWordAction from '@app/actions/myoffice/user-profile/change-password.actions';

@Injectable()
export class ChangePassEffect {
    constructor(
        private actions$: Actions,
        private changePassWordService: ChangePassWordService
      ) { } 
    
      getEncryptPass$ = createEffect(() => this.actions$.pipe(
        ofType(changePassWordAction.encryptPass),
        mergeMap(({ params }) => this.changePassWordService.encryptPass(params).pipe(
          map(
            res => (changePassWordAction.encryptPassSuccess({ encryptpass: res })
            )),
          catchError(
            msg => of(changePassWordAction.encryptPassFailure({ msg: msg })
            ))
        ))
      ));

      update$ = createEffect(() => this.actions$.pipe(
        ofType(changePassWordAction.updatePassMem),
        mergeMap(({params}) => this.changePassWordService.update(params)
          .pipe(
            map(
              res => (changePassWordAction.updatePassMemSuccess({ result: res })
              )),
            catchError(
              msg => of(changePassWordAction.updatePassMemFailure({ msg: msg })
              ))
          ))
      )
      );
}

