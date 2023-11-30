import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MemberBoxService } from "@services/myoffice/member/member-box.service";
import * as memberBoxAction from "@app/actions/myoffice/member/member-box.action"

@Injectable()
export class MemberBoxEffect {

  constructor(
    private actions$: Actions,
    private memberBoxService: MemberBoxService
  ) { }


  findBox$ = createEffect(() => this.actions$.pipe(
    ofType(memberBoxAction.findBox),
    mergeMap(({ params }) => this.memberBoxService.findBox(params)
      .pipe(
        map(
          res => (memberBoxAction.findBoxSuccess({ members: res })
          )),
        catchError(
          msg => of(memberBoxAction.findBoxFailure({ msg: msg })
          ))
      ))
  )
  );


  getInfoMemImage$ = createEffect(() => this.actions$.pipe(
    ofType(memberBoxAction.getInfoMemImage),
    mergeMap(({ params }) => this.memberBoxService.getInfoMemImage(params)
      .pipe(
        map(
          res => (memberBoxAction.getInfoMemImageSuccess({ memberImage: res })
          )),
        catchError(
          msg => of(memberBoxAction.getInfoMemImageFailure({ msg: msg })
          ))
      ))
  )
  );

}
