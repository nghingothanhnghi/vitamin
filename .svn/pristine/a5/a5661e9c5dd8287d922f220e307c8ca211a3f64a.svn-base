import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ChangePerInfoService } from "@services/myoffice/user-profile/change-personal-information.service";
import * as changePersionalInforAction from '@app/actions/myoffice/user-profile/change-persional-infor.actions';

@Injectable()
export class ChangePerInfoEffect {
  constructor(
    private actions$: Actions,
    private changePerInfoService: ChangePerInfoService
  ) { }

  updatePerInfo$ = createEffect(() => this.actions$.pipe(
    ofType(changePersionalInforAction.updatePerInfo),
    mergeMap(({ params }) => this.changePerInfoService.updatePerInfo(params).pipe(
      map(res => (changePersionalInforAction.updatePerInfoSuccess({ result: res }))),
      catchError(msg => of(changePersionalInforAction.updatePerInfoFailure({ msg: msg })))
    ))
  ));

  checkNickName$ = createEffect(() => this.actions$.pipe(
    ofType(changePersionalInforAction.checkNickName),
    mergeMap((action) => this.changePerInfoService.checkNickName(action.userid, action.nickname)
      .pipe(
        map(
          res => (changePersionalInforAction.checkNickNameSuccess({ isNickName: res })
          )),
        catchError(
          msg => of(changePersionalInforAction.checkNickNameFailure({ msg: msg })
          ))
      ))
  )
  );
}

